const inquire = require('inquirer');
const getSnippet = require('../gqlQueries/getSnippet');

async function cmdGet(user) {
  const snippetChoiceList = user.snippets.length > 0
    ? user.snippets.map(({ title, _id }) => { return { name: title, value: _id }; })
    : [{ name: 'You have no snippets to retrieve, press enter to exit.', value: null }];

  const { snippetID, file } = await inquire.prompt([
    {
      type: 'list',
      name: 'snippetID',
      message: 'Which snippet would you like to get?',
      choices: snippetChoiceList,
    },
    {
      type: 'input',
      name: 'file',
      message: 'Which file would you like to add it too?',
    },
  ]);
  if (snippetID === null) process.exit();

  return getSnippet(snippetID, file);
}

module.exports = cmdGet;
