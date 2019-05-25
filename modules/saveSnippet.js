const login = require('./login');
const makeRequest = require('./makeRequest');
const openFile = require('./openFile');

async function saveSnippet(infile, outfile) {
  // get user authentication informaiton
  const variables = await login();
  variables.content = await openFile(infile);
  variables.title = outfile;
  variables.language = '';
  variables.tags = [''];

  const body = {
    query: `mutation createSnippet($username: String!, $hash: String!, $title: String!, $content: String!, $language: String, $tags: [String]){
      createSnippet(username: $username, hash: $hash, title: $title, content: $content, language: $language, tags: $tags){
        title
        languages
        tags
        content
      }
    }`,
    variables,
  };
  // connect to database i.e. server
  // get snippet
  const snippet = await makeRequest(body);

  process.stdout.write(`${JSON.stringify(snippet.data)}\n`);
  process.exit();
}

module.exports = saveSnippet;
