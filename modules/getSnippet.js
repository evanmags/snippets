const fetch = require('node-fetch');
const inquirer = require('inquirer');

async function getSnippet(files) {
  // get user authentication informaiton
  const body = await inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'Enter username: ',
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter password: ',
    },
  ]);

  body.files = files;
  // connect to database i.e. server
  // get snippet
  const snippet = await fetch(`http://localhost:3000/graphQL/${JSON.stringify(body)}`, {
    // body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error(`${res.status}, ${res.statusText}`);
    })
    .catch((err) => {
      process.stdout.write(err.message);
      process.exit();
    });
  process.stdout.write(`${snippet.data.message}\n`);
  process.exit();
}

module.exports = getSnippet;
