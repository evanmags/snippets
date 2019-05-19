const fetch = require('node-fetch');
const login = require('./login');

async function snippetsInit() {
  // get user authentication informaiton
  const loginInfo = await login();
  console.log(loginInfo.username);
  const createUser = `mutation{
    createUser(username: "${loginInfo.username}", hash: "${loginInfo.password}"){
      username
      hash
    }
  }`;

  // connect to database i.e. server
  // get snippet
  const snippet = await fetch(`http://localhost:4000/graphQL?query=${createUser}`, {
    method: 'post',
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
      if (res.ok) return res.json();
      throw new Error(`${res.status}, ${res.statusText}`);
    })
    .catch((err) => {
      process.stdout.write(err.message);
      process.exit();
    });
  process.stdout.write(`${JSON.stringify(snippet.data)}\n`);
  process.exit();
}

module.exports = snippetsInit;
