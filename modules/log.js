const inquire = require('inquirer');
const Store = require('data-store');

const store = new Store('snippets');

/**
 * prompts user for login information
 * sets info to store
 */

function getLoginInfo() {
  return inquire.prompt([
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
  ])
    .then((info) => {
      store.set(info);
      return info;
    });
}

/**
 * log.in: checks for existing information.
 *         if present, returns with a flag stating that it existed
 *         otherwise, calls getLoginInfo
 *
 * log.out: overwrites all information in store to null.
 */

const log = {
  in: async () => {
    return store.get('username')
      ? {
        username: store.get('username'),
        hash: store.get('hash'),
        // flag to allow catch if init is called when a user already exists.
        exists: true,
      }
      : getLoginInfo();
  },
  out: () => {
    store.set({
      username: null,
      hash: null,
      _id: null,
    });
  },
};

module.exports = log;
