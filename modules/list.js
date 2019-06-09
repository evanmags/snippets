/**
 * prints a list of all user snippets to the console.
 * @param {User} user
 */

async function listSnippets({ snippets }) {
  snippets.forEach(({ title }, i) => {
    process.stdout.write(`${title}\t`);
    if ((i + 1) % 5 === 0)process.stdout.write('\n');
  });
  process.stdout.write('\n');
  process.exit(0);
}

module.exports = listSnippets;
