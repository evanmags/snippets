const Store = require('data-store');
const makeRequest = require('../makeRequest');

const store = new Store('snippets');

/**
 * sends graphql mutation query to create a user as part of init.
 * stores data using data-store package
 * @param {String} username
 * @param {String} hash
 */

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
      store.set({ _id: res.data.createUser._id });
    });
}

module.exports = createUser;
