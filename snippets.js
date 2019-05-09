#!/usr/bin/env node

const getSnippet = require('./modules/getSnippet');
const saveSnippet = require('./modules/saveSnippet');
const runCLI = require('./modules/CLI');

async function main() {
  // remove path information from argv
  const args = process.argv.slice(2);

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

  // watch for -g (get) flag
  if (args.includes('-g')) return getSnippet(args.slice(1));

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
