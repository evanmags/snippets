/**
 * prints help to the console
 */

function displayHelp() {
  [
    '\n\tUsage:\n\n',

    '\tsnippets --help\t\t\t\t=> Displays help menu\n',
    '\tsnippets -init\t\t\t\t=> snippets setup for initial use\n',
    '\tsnippets -logout\t\t\t=> log current user out of snippets on machine\n\n',

    '\t\t\t\t*** Authentication Required ***\n\n',

    '\tsnippets\t\t\t\t=> Opens CLI to get, save, update, and delete snippets step by step\n',
    '\tsnippets -s <infile>\t\t\t=> Saves snippet as infile name\n',
    '\tsnippets -s <infile> <snippet_name>\t=> Saves snippet as snippet_name\n',
    '\tsnippets -g <snippet_name>\t\t=> Retrieves snippet, creates new file named <snippet_name>\n',
    '\tsnippets -g <snippet_name> <outfile>\t=> Retrieves snippet, appends to outfile\n',
    '\tsnippets -list\t\t\t\t=> list all user snippets\n\n',
  ].forEach((e) => { process.stdout.write(e); });
  process.exit();
}

module.exports = displayHelp;
