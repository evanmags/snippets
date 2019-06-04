const inquire = require('inquirer');
const cmdDelete = require('./cmdDelete');
const cmdUpdate = require('./cmdUpdate');
const cmdSave = require('./cmdSave');
const cmdGet = require('./cmdGet');
const log = require('../log');
const makeRequest = require('../makeRequest');

async function CLIcontroller() {
  const loginInfo = await log.in();

  const body = {
    query: `query getUser($username: String!, $hash: String!){
      getUser(username: $username, hash: $hash){
        _id
        snippets{
          title
          language
          _id
          tags
        }
      }
    }`,
    variables: loginInfo,
  };
  // create session
  const user = await makeRequest(body)
    .then(({ data }) => { return data.getUser; });

  const mode = await inquire.prompt([
    {
      type: 'checkbox',
      name: 'mode',
      message: 'What would you like to do?',
      choices: [
        { name: 'Save a snippet', value: 'save' },
        { name: 'Get a snippet', value: 'get' },
        { name: 'Update a snippet', value: 'update' },
        { name: 'Delete a snippet', value: 'delete' },
      ],
    },
  ]).then((data) => { return data.mode[0]; });

  // need to pass user to all other functions to avoid making more requests than necessary.
  // will require restructuring all requests and command line functions.
  switch (mode) {
    case 'save': return cmdSave();
    case 'get': return cmdGet(user);
    case 'update': return cmdUpdate();
    case 'delete': return cmdDelete(user);
    default: return CLIcontroller();
  }
}

module.exports = CLIcontroller;
