const fetch = require('node-fetch');

// pass function an object with the correect structure
// {
//   query: String!,
//   variables: object,
// };

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
    .catch((err) => {
      process.stdout.write(`Request Error (in function makeRequest): ${err}`);
      process.exit(1);
    });
  return data;
}

module.exports = makeRequest;
