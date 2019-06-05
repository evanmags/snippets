const getUser = require('./gqlQueries/getUser');

async function listSnippets() {
  const list = await getUser()
    .catch((err) => {
      process.stdout.write(err.errors.message);
    })
    .then((user) => {
      return user.snippets;
    })
    .then((data) => {
      let string = '';
      data.forEach(({ title }, i) => {
        string += `${title}\t\t`;
        string += (i + 1) % 3 === 0 ? '\n' : '';
      });
      return string;
    })
    .catch((err) => {
      process.stdout.write(err.message);
    });

  process.stdout.write(`${list}\n`);
  process.exit();
}

module.exports = listSnippets;
