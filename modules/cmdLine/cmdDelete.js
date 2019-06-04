const inquire = require('inquirer');
const makeRequest = require('../makeRequest');

async function cmdDelete(user) {
  const snippetChoiceList = user.snippets.length > 0
    ? user.snippets.map(({ title, _id }) => { return { name: title, value: _id }; })
    : [{ name: 'You have no snippets to delete, press enter to exit.', value: null }];

  const responses = await inquire.prompt([
    {
      type: 'list',
      name: 'snippetID',
      message: 'Which snippet would you like to delete?',
      choices: snippetChoiceList,
    },
  ]);
  if (responses.title === null) process.exit();

  const body = {
    query: `mutation deleteSnippet($userID: String!, $snippetID: String!){
      deleteSnippet(userID: $userID, snippetID: $snippetID){
        title
        content
      }
    }`,
    variables: {
      // eslint-disable-next-line no-underscore-dangle
      userID: user._id,
      snippetID: responses.snippetID,
    },
  };

  await makeRequest(body)
    .then((res) => {
      if (res.errors) {
        res.errors.forEach((error) => {
          process.stdout.write(`saveSnippet: ${error.message}\n`);
        });
      }
      process.stdout.write(`Snippets: ${responses.title} successfully deleted.\n`);
      process.exit();
    })
    .catch((err) => {
      process.stdout.write(
        `Snippets: ${responses.title} could not be deleted, please try again.\n`,
      );
      process.stdout.write(`${err.message}\n`);
      process.exit();
    });
}

module.exports = cmdDelete;
