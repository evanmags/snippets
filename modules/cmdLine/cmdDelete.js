const inquire = require('inquirer');
const log = require('../log');
const makeRequest = require('../makeRequest');

async function cmdDelete() {
  const login = await log.in();
  const responses = await inquire.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Which snippet would you like to delete?',
    },
  ]);

  const body = {
    query: `query deleteSnippet($username: String!, $hash: String!, $title: String!){
      deleteSnippet(username: $username, hash: $hash, title: $title){
        snippet
      }
    }`,
    variables: {
      ...login,
      ...responses,
    },
  };

  await makeRequest(body)
    .then(() => {
      process.stdout.write(`Snippet: ${responses.title} successfully deleted.`);
      process.exit();
    })
    .catch((err) => {
      process.stdout.write(`Snippet: ${responses.title} could not be deleted, please try again.`);
      process.stdout.write(err.message);
      process.exit();
    });
}

module.exports = cmdDelete;
