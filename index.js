const snippetsInit = require('./modules/init');
const displayHelp = require('./modules/help');
const getUser = require('./modules/gqlQueries/getUser');
const log = require('./modules/log');
const CLIcontroller = require('./modules/cmdLine');
const runFromArgs = require('./modules/runFromArgs');

/**
 * controller function for the entrie tool
 * parses arguments and determines course of action required.
 * flag definitions:
 *  ** autenticated user not required
 *    --help: help
 *    -init: init snippets on first use
 *    -logout: remove user information from store
 *  ** authentication required
 *    -list: display all available user snippets
 *    -g: retrieve the snippet listed as the second argument,
 *        append to file in third arg or
 *        create file with the same name as snippet
 *    -s: save the snippet listed as the second argument as a new snippet
 *        under the title listed as third argument
 */

async function main() {
  // remove path information and call to snippets from argv
  const args = process.argv.slice(2);

  // watch for flags that do not require a user to be authenticated
  // short circuit if found
  if (args.includes('--help')) return displayHelp();
  if (args.includes('-init')) return snippetsInit();
  if (args.includes('-logout')) return log.out();

  const user = await getUser();
  if (!user) {
    process.stdout.write("No user exists on this computer, please run 'snippets -init'");
    process.exit(0);
  }
  // short circuit checking arguments if none exist from here.
  if (!args.length) return CLIcontroller(user);
  return runFromArgs(user, args);
}

module.exports = main;
