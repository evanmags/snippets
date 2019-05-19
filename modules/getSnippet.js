const fetch = require('node-fetch');
const login = require('./login');

async function getSnippet(files) {
  // get user authentication informaiton
  const body = await login();
  body.files = files;
  // connect to database i.e. server
  // get snippet
  const snippet = await fetch(`http://localhost:3000/graphql?query=${JSON.stringify(body)}`)
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

module.exports = getSnippet;
