const log = require('../log');
const makeRequest = require('../makeRequest');

/**
 * gets user log in information locally then
 * sends graphql request to get the whole user object from the database.
 */

async function getUser() {
  const variables = await log.in();

  const body = {
    query: `query getUser($username: String!, $hash: String!){
      getUser(username: $username, hash: $hash){
        _id
        snippets { 
          _id
          title
        }
      }
    }`,
    variables,
  };

  return makeRequest(body)
    .then(({ data }) => {
      return data.getUser || null;
    })
    .catch((err) => {
      process.stdout.write(err.message);
    });
}

module.exports = getUser;
