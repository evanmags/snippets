/* eslint-disable no-underscore-dangle */
const inquire = require('inquirer');
const saveSnippet = require('../gqlQueries/saveSnippet');

/**
 * gathers information necessary to execute saveSnippet query
 * @param {User} user as defined in mongodb/graphql schemas
 * @returns {Snippet} as defined in mongodb/graphql schemas
 */

async function cmdSave(user) {
  const { file, title } = await inquire.prompt([
    {
      type: 'input',
      name: 'file',
      message: 'Which file would you like to add?',
    },
    {
      type: 'input',
      name: 'title',
      message: 'What would you like to name your snippet? (press <enter> to keep filename)',
    },
  ]);

  if (title === '') return saveSnippet(user._id, file, file);
  return saveSnippet(user._id, file, title);
}

module.exports = cmdSave;
