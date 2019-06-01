const inquire = require('inquirer');
const log = require('../log');
const makeRequest = require('../makeRequest');

async function cmdDelete() {
  const login = await log.in();
  const responses = await inquire.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Which snippet would you like to delete?',
    },
  ]);

  const body = {
    query: `mutation deleteSnippet($username: String!, $hash: String!, $title: String!){
      deleteSnippet(username: $username, hash: $hash, title: $title){
        title
        content
      }
    }`,
    variables: {
      ...login,
      ...responses,
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
