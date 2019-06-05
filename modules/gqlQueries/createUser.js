const Store = require('data-store');
const makeRequest = require('../makeRequest');

const store = new Store('snippets');

async function createUser(username, hash) {
  const body = {
    query: `mutation createUser($username: String!, $hash: String!){
      createUser(username: $username, hash: $hash){
        username
        _id
        hash
      }
    }`,
    variables: {
      username,
      hash,
    },
  };
  // connect to database i.e. server
  // get snippet
  await makeRequest(body)
    .then((res) => {
      // eslint-disable-next-line no-underscore-dangle
      store.set({ id: res.data.createUser._id });
    });
}

module.exports = createUser;
