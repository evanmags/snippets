const inquire = require('inquirer');
const updateSnippet = require('../gqlQueries/updateSnippet');

function cmdUpdate(user) {
  const snippetChoiceList = user.snippets.length > 0
    ? user.snippets.map(({ title, _id }) => { return { name: title, value: _id }; })
    : [{ name: 'You have no snippets to retrieve, press enter to exit.', value: null }];

  const responses = inquire.prompt([
    {
      type: 'list',
      name: 'snippetID',
      message: 'Which snippet would you like to get?',
      choices: snippetChoiceList,
    },
    // need to complete this section...
    // will require some design decisions
  ]);

  const snippetToUpdate = user.snippets.filter(({ _id }) => {
    return _id === responses.snippetID;
  });

  const snippetData = {
    title: responses.title || snippetToUpdate.title,
    content: responses.content || snippetToUpdate.content,
    tags: responses.tags || snippetToUpdate.tags,
    language: responses.language || snippetToUpdate.language,
  };

  return updateSnippet(responses.snippetID, snippetData);
}

module.exports = cmdUpdate;
