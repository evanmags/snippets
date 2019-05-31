const inquire = require('inquirer');
const cmdDelete = require('./cmdDelete');
const cmdUpdate = require('./cmdUpdate');
const cmdSave = require('./cmdSave');
const cmdGet = require('./cmdGet');

async function CLIcontroller() {
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

  switch (mode) {
    case 'save': return cmdSave();
    case 'get': return cmdGet();
    case 'update': return cmdUpdate();
    case 'delete': return cmdDelete();
    default: return CLIcontroller();
  }
}

module.exports = CLIcontroller;
