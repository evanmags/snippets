const inquire = require('inquirer');
const Store = require('data-store');

const store = new Store('snippets');

async function getLoginInfo() {
  if (store.get('username')) {
    console.log(store);
    return {
      username: store.get('username'),
      hash: store.get('hash'),
    };
  }
  const info = await inquire.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'Enter username: ',
    },
    {
      type: 'password',
      name: 'hash',
      message: 'Enter password: ',
    },
  ]);

  store.set(info);
  console.log('data-store', store);
  return info;
}

async function login() {
  return getLoginInfo();
}

module.exports = login;
