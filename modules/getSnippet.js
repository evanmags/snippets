const login = require('./login');
const makeRequest = require('./makeRequest');

async function getSnippet(files) {
  // get user authentication informaiton
  const variables = await login();
  variables.files = files;

  const body = {
    query: '',
    variables,
  };
  // connect to database i.e. server
  // get snippet
  const snippet = await makeRequest(body);

  process.stdout.write(`${JSON.parse(snippet).data}\n`);
  process.exit();
}

module.exports = getSnippet;
