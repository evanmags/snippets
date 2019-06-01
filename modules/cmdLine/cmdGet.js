const inquire = require('inquirer');
const getSnippet = require('../getSnippet');
const log = require('../log');
const makeRequest = require('../makeRequest');

async function cmdGet() {
  const variables = await log.in();
  const body = {
    query: `query getUser($username: String!, $hash: String!){
      getUser(username: $username, hash: $hash){
        snippets { title }
      }
    }`,
    variables,
  };
  const snippetList = await makeRequest(body)
    .then(({ data }) => {
      return data.getUser.snippets;
    });

  const responses = await inquire.prompt([
    {
      type: 'list',
      name: 'title',
      message: 'Which snippet would you like to get?',
      choices: snippetList.map((snippet) => { return snippet.title; }),
    },
    {
      type: 'input',
      name: 'file',
      message: 'Which file would you like to add it too?',
    },
  ]);

  return getSnippet(responses.title, responses.file);
}

module.exports = cmdGet;
