const log = require('./log');
const makeRequest = require('./makeRequest');
const { readFile } = require('./openFile');

async function saveSnippet(file, title) {
  // get user authentication informaiton
  const variables = await log.in();
  variables.content = await readFile(file).catch((err) => {
    process.stdout.write(err.message);
  });
  variables.title = title;
  variables.tags = [];
  variables.language = null;

  const body = {
    query: `mutation createSnippet($username: String!, $hash: String!, $title: String!, $content: String!, $language: String, $tags: [String]){
      createSnippet(username: $username, hash: $hash, title: $title, content: $content, language: $language, tags: $tags){
        title
        language
        tags
        content
      }
    }`,
    variables,
  };
  // connect to database i.e. server
  // get snippet
  await makeRequest(body)
    .catch((err) => {
      process.stdout.write(`Failed to save snippet ${title}; Please try again.\n${err.message}`);
      process.exit();
    });

  process.exit();
}

module.exports = saveSnippet;
