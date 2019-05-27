const log = require('./log');
const makeRequest = require('./makeRequest');

async function listSnippets() {
  // get user authentication informaiton
  const variables = await log.in();

  const body = {
    query: `query listUserSnippets($username: String!, $hash: String!){
      listUserSnippets(username: $username, hash: $hash){
        snippets { title }
      }
    }`,
    variables,
  };
  // connect to database i.e. server
  // get snippet
  const list = await makeRequest(body)
    .then((query) => {
      return query.data.listUserSnippets.snippets;
    })
    .catch((err) => { console.log(err); })
    .then((data) => {
      let string = '';
      data.forEach(({ title }, i) => {
        string += `${title}\t`;
        string += (i + 1) % 3 === 0 ? '\n' : '';
      });
      return string;
    });

  process.stdout.write(`${list}\n`);
  process.exit();
}

module.exports = listSnippets;
