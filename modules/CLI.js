const fs = require('fs').promises;
const inquire = require('inquirer');
const openFile = require('./openFile');

async function runCLI() {
  const answers = await inquire
    .prompt([
      // get name for new snippet
      {
        type: 'input',
        name: 'name',
        message: 'Name your snippet',
      },
      // get submit style
      {
        type: 'checkbox',
        name: 'entry_type',
        message: 'How would you like to submit your snippet?',
        choices: ['Upload a file', 'Create a file (opens default code editor)'],
      },
    ])
    .catch((err) => {
      return process.stdout.write(err);
    });

  // new file for the submitted snippet
  const outfile = answers.name;

  // source file to upload.
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
      .catch((err) => {
        return process.stdout.write(err);
      });
  }

  fs.writeFile(outfile, infile);
}

module.exports = runCLI;
