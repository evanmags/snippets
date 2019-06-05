const inquire = require('inquirer');
const deleteSnippet = require('../gqlQueries/deleteSnippet');

async function cmdDelete(user) {
  const snippetChoiceList = user.snippets.length > 0
    ? user.snippets.map(({ title, _id }) => { return { name: title, value: _id }; })
    : [{ name: 'You have no snippets to delete, press enter to exit.', value: null }];

  const { snippetID } = await inquire.prompt([
    {
      type: 'list',
      name: 'snippetID',
      message: 'Which snippet would you like to delete?',
      choices: snippetChoiceList,
    },
  ]);
  if (snippetID === null) process.exit(0);

  // eslint-disable-next-line no-underscore-dangle
  await deleteSnippet(user._id, snippetID);
}

module.exports = cmdDelete;
