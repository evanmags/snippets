const fetch = require('node-fetch');
const login = require('./login');

async function snippetsInit() {
  // get user authentication informaiton
  const loginInfo = await login();

  const createUser = `mutation createUser($username: String!, $hash: String!){
    createUser(username: $username, hash: $hash){
      username
      _id
      hash
    }
  }`;
  // connect to database i.e. server
  // get snippet
  const snippet = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'appication/json',
    },
    body: JSON.stringify({
      query: createUser,
      variables: loginInfo,
    }),
  })
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new Error(`${res.status} ${res.statusText}`);
    })
    .catch((err) => {
      process.stdout.write(err.message);
      process.exit();
    });
  process.stdout.write(`${JSON.stringify(snippet)}\n`);
  process.exit();
}

module.exports = snippetsInit;
