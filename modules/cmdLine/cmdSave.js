const inquire = require('inquirer');
const saveSnippet = require('../saveSnippet');

async function cmdSave() {
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

  if (title === '') return saveSnippet(file, file);

  return saveSnippet(file, title);
}

module.exports = cmdSave;
