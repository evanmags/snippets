const inquire = require('inquirer');
const cmdDelete = require('./cmdDelete');
const cmdUpdate = require('./cmdUpdate');
const cmdSave = require('./cmdSave');
const cmdGet = require('./cmdGet');

/**
 * switch controller for the CLI when not run by passing arguments.
 * @param {*} user
 * @returns {null} function call or runs itself recurrsively
 */

async function CLIcontroller(user) {
  const mode = await inquire.prompt([
    {
      type: 'checkbox',
      name: 'mode',
      message: 'What would you like to do?',
      choices: [
        { name: 'Save a snippet', value: 'save' },
        { name: 'Get a snippet', value: 'get' },
        { name: 'Update a snippet', value: 'update' },
        { name: 'Delete a snippet', value: 'delete' },
      ],
    },
  ]).then((data) => { return data.mode[0]; });

  // need to pass user to all other functions to avoid making more requests than necessary.
  // will require restructuring all requests and command line functions.
  switch (mode) {
    case 'save': return cmdSave(user);
    case 'get': return cmdGet(user);
    case 'update': return cmdUpdate(user);
    case 'delete': return cmdDelete(user);
    default: return CLIcontroller(user);
  }
}

module.exports = CLIcontroller;
