const getSnippet = require('./getSnippet');
const saveSnippet = require('./saveSnippet');
const runCLI = require('./CLI');

async function parseArgs(cmdln) {
  const args = cmdln.slice(2);
  if ('-g' in args) return getSnippet();

  switch (args.length) {
    case 1:
      return saveSnippet(args[0], args[0]);
    case 2:
      return saveSnippet(args[0], args[1]);
    default:
      return runCLI();
  }
}

module.exports = parseArgs;
