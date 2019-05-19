const inquire = require('inquirer');

function getLoginInfo() {
  return inquire.prompt([
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
}

function login() {
  return getLoginInfo();
}

module.exports = login;