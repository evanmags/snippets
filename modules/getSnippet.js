const fetch = require('node-fetch');
const inquirer = require('inquirer');

async function getSnippet(...files) {
  // get user authentication informaiton
  const body = inquirer.prompt([
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
  const snippet = await fetch(`https://localhost/${body.username}`, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) return res.text();
      throw new Error(`${res.status}, ${res.statusText}`);
    })
    .catch((err) => {
      process.stdout.write(err.message);
      process.exit();
    });
  return snippet;
}

module.exports = getSnippet;
