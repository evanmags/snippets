const log = require('./log');
const makeRequest = require('./makeRequest');
const { readFile } = require('./openFile');

async function saveSnippet(infile, outfile) {
  // get user authentication informaiton
  const variables = await log.in();
  variables.content = await readFile(infile).catch((err) => {
    process.stdout.write(err);
  });
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
  await makeRequest(body).catch((err) => {
    process.stdout.write(`Failed to save snippet ${outfile}; Please try again.\n${err.toString()}`);
    process.exit();
  });

  process.exit();
}

module.exports = saveSnippet;
