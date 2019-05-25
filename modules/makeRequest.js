const fetch = require('node-fetch');

// pass function an object with the correect structure
// {
//   query: String!,
//   variables: object,
// };

function makeRequest(body) {
  return fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'appication/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new Error(`${res.status} ${res.statusText}`);
    })
    .catch((err) => {
      process.stdout.write(err.message);
      process.exit();
    });
}

module.exports = makeRequest;
