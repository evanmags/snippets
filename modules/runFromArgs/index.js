const listSnippets = require('../list');
const displayHelp = require('../help');
const argsGet = require('./argsGet');
const argsSave = require('./argsSave');

/**
 * switch for command line arguments that to run snippets from passing arguments
 * @param {User} user as defined in mongodb/graphql schemas
 * @param {[Strings]} args [flag, ...] pulled from commandline
 */

function runFromArgs(user, args) {
  if (args.includes('-list')) return listSnippets(user);
  if (args.includes('-g')) return argsGet(user, args);
  if (args.includes('-s')) return argsSave(user, args);
  return displayHelp();
}

module.exports = runFromArgs;
