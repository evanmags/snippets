#!/usr/bin/env node

const fs = require('fs').promises;
const inquire = require('inquirer');
const openFile = require('./modules/openFile');
const getSnippet = require('./modules/getSnippet');
const saveSnippet = require('./modules/saveSnippet');
const runCLI = require('./modules/CLI');

async function main() {
  // remove path information from argv
  const args = process.argv.slice(2);

  // watch for -g (get) flag
  if (args.includes('-g')) getSnippet(args.slice(1));

  // watch for --help (help) flag
  if (args.includes('--help')) {
    [
      '\nUsage:\n',
      '\tsnippets\t\t\t => Opens CLI to get or save snippets step by step\n',
      '\tsnippets <infile>\t\t => Saves snippet as infile name\n',
      '\tsnippets <infile> <snippet_name> => Saves snippet as snippet_name\n',
      '\tsnippets -g <...snippet_names>\t => Retrieves snippets\n\n',
    ].forEach((e) => { process.stdout.write(e); });
    process.exit();
  }

  // determine correct in and out file;
  switch (args.length) {
    case 1:
      saveSnippet(args[0], args[0]);
      break;
    case 2:
      saveSnippet(args[0], args[1]);
      break;
    default:
      runCLI();
  }

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
  return null;
}

main();
