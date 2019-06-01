const Store = require('data-store');
const log = require('./log');
const makeRequest = require('./makeRequest');

const store = new Store('snippets');

async function snippetsInit() {
  // get user authentication informaiton
  const variables = await log.in();
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
  await makeRequest(body)
    .then((res) => {
      console.log(res);
      // eslint-disable-next-line no-underscore-dangle
      store.set({ id: res.data.createUser._id });
    })
    .catch((err) => {
      process.stdout.write(`${err.message}\n`);
    });

  process.exit();
}

module.exports = snippetsInit;
