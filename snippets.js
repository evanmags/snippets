#!/usr/bin/env node

const fs = require('fs').promises;
const inquire = require('inquirer');
const openFile = require('./modules/openFile');
const runProcess = require('./modules/process');
const runCLI = require('./modules/CLI');

async function main() {
  if (process.argv) runProcess(process.argv);
  else runCLI();
  const answers = await inquire.prompt([
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
  ]);

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
      .catch((err) => { return process.stdout(err); });
  }

  fs.writeFile(outfile, infile);

  //  flow:
  //  command line args?
  //    yes:
  //      usage: snippets <infile> <outfile> (submit)
  //      usage: snippets <infile&outfile> (submit)
  //      usage: snippets <name> (fetch)
  //    no:
  //      open CLI
  //  control flow:
  //    Submit:
  //      get name of snippet
  //      get submit style
  //        if editor, open editor
  //        else ask for infile
  //      Log in to github/bitbucket/gitlab
  //      check for 'snippets' repo
  //        if exists, continue
  //        else create one
  //      create new branch named as snippet
  //      push snippet to branch
  //    Fetch:
  //      authenticate
  //      get name of snippet
  //      pull
}

main();
