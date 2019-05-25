const Store = require('data-store');
const login = require('./login');
const makeRequest = require('./makeRequest');

const store = new Store('snippets');

async function snippetsInit() {
  // get user authentication informaiton
  const variables = await login();
  // if (variables.exists) return;

  const body = {
    query: `mutation createUser($username: String!, $hash: String!){
      createUser(username: $username, hash: $hash){
        username
        _id
        hash
      }
    }`,
    variables,
  };
  // connect to database i.e. server
  // get snippet
  const res = await makeRequest(body);

  // eslint-disable-next-line no-underscore-dangle
  store.set({ id: res.data.createUser._id });

  process.stdout.write(`${JSON.stringify(res.data)}\n`);
  process.exit();
}

module.exports = snippetsInit;
