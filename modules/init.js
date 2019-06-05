const log = require('./log');
const createUser = require('./gqlQueries/createUser');


async function snippetsInit() {
  // get user authentication informaiton
  const { username, hash, exists } = await log.in();
  if (exists) return;

  await createUser(username, hash)
    .catch(() => {
      process.stdout.write('An error occurred while creating your account, please try again.');
      snippetsInit();
    });

  process.stdout.write('Your snippets account has been set up, run command <snippets> to start or <snippets --help> for help');
  process.exit();
}

module.exports = snippetsInit;
