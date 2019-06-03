const log = require('./log');
const makeRequest = require('./makeRequest');

async function listSnippets() {
  // get user authentication informaiton
  const variables = await log.in();

  const body = {
    query: `query getUser($username: String!, $hash: String!){
      getUser(username: $username, hash: $hash){
        snippets { title }
      }
    }`,
    variables,
  };
  // connect to database i.e. server
  // get snippet
  const list = await makeRequest(body)
    .catch((err) => {
      process.stdout.write(err.errors.message);
    })
    .then((query) => {
      return query.data.getUser.snippets;
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
