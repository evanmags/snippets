const log = require('../log');
const makeRequest = require('../makeRequest');

async function getUser() {
  const variables = await log.in();

  const body = {
    query: `query getUser($username: String!, $hash: String!){
      getUser(username: $username, hash: $hash){
        snippets { title }
      }
    }`,
    variables,
  };

  return makeRequest(body).then(({ data }) => { return data.getUser; });
}

module.exports = getUser;
