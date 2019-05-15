const fetch = require('node-fetch');
const getLoginInfo = require('./login');

async function snippetsInit() {
  // get user authentication informaiton
  const loginInfo = await getLoginInfo();

  const isUser = `{
    isUser(username: $username){
      Boolean
    }
  }`;

  // connect to database i.e. server
  // get snippet
  const snippet = await fetch('http://localhost:3000/graphql', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
      Accept: 'appication/json',
    },
    body: JSON.stringify({
      query: isUser,
      variables: { username: loginInfo.username },
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
