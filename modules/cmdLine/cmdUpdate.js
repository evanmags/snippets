const inquire = require('inquirer');
const updateSnippet = require('../gqlQueries/updateSnippet');

/**
 * gathers information necessary to execute updateSnippet mutation
 * @param {User} user as defined in mongodb/graphql schemas
 * @returns {Snippet} as defined in mongodb/graphql schemas
 */

async function cmdUpdate(user) {
  const snippetChoiceList = user.snippets.length > 0
    ? user.snippets.map(({ title, _id }) => { return { name: title, value: _id }; })
    : [{ name: 'You have no snippets to retrieve, press enter to exit.', value: null }];

  const { snippetID } = await inquire.prompt([
    {
      type: 'list',
      name: 'snippetID',
      message: 'Which snippet would you like to get?',
      choices: snippetChoiceList,
    },
    // need to complete this section...
    // will require some design decisions
  ]);
  if (snippetID === null) process.exit();

  const [snippetToUpdate] = user.snippets.filter(({ _id }) => {
    return _id === snippetID;
  });

  const responses = await inquire.prompt([
    {
      type: 'input',
      name: 'title',
      message: `Enter a new title or press enter to keep "${snippetToUpdate.title}":`,
    },
    {
      type: 'input',
      name: 'tags',
      message: `Enter a comma separated list of tags or press enter to keep "${snippetToUpdate.tags}":`,
    },
    {
      type: 'input',
      name: 'language',
      message: `Enter a language or press enter to keep "${snippetToUpdate.language}":`,
    },
  ]);

  const snippetData = {
    title: responses.title || snippetToUpdate.title,
    content: responses.content || snippetToUpdate.content,
    tags: responses.tags.split(',') || snippetToUpdate.tags,
    language: responses.language || snippetToUpdate.language,
  };

  function isEmptyStringArray(arr) {
    if ((arr.length === 1 && arr[0] === '')
        || arr.length === 0) return true;
    return false;
  }

  Object.entries(snippetData).forEach((pair) => {
    if (pair[1] === null || isEmptyStringArray(pair[1])) delete snippetData[pair[0]];
  });

  return updateSnippet(snippetID, snippetData);
}

module.exports = cmdUpdate;
