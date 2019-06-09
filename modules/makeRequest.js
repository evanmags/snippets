const fetch = require('node-fetch');

/**
 * structures and executes all requests to the graphQL server.
 * @param {query: String!, variables: {...Snippet or User properties}} body
 */

async function makeRequest(body) {
  const data = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'appication/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => { return res.json(); })
    .then((res) => {
      if (res.errors) {
        res.errors.forEach((error) => {
          process.stdout.write(`makeRequest:\t${error.message}\n\t\tIn ${error.path} (${error.locations[0].line}:${error.locations[0].column})\n`);
        });
      }
      if (res.data) return res;
      return process.exit(1);
    })
    .catch((err) => {
      process.stdout.write(`Request Error (in function makeRequest): ${err}`);
      process.exit(1);
    });
  return data;
}

module.exports = makeRequest;
