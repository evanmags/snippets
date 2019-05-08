

const fs = require('fs').promises;
const inquire = require('inquirer');
const openFile = require('./modules/openFile');

async function main() {
  // get name for new snippet
  // get submit style
  const answers = await inquire.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Name your snippet',
    },
    {
      type: 'checkbox',
      name: 'entry_type',
      message: 'How would you like to submit your snippet?',
      choices: ['Upload a file', 'Create a file (opens default code editor)'],
    },
  ]);

  // new file for the submitted snippet
  const outfile = answers.name;
  let infile;

  if (answers.entry_type === 'Create a file') {
    inquire.prompt([
      {
        type: 'editor',
        name: 'code',
        message: 'Please enter your snippet',
      },
    ]);
  } else {
    infile = await inquire
      .prompt([
        {
          type: 'input',
          name: 'filename',
          message: 'What file would you like to upload?',
        },
      ])
      .then(openFile)
      .catch((err) => { return process.stdout(err); });
  }

  fs.writeFile(outfile, infile);
}

main();
