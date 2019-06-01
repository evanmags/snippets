const log = require('./log');
const makeRequest = require('./makeRequest');
const { readFile } = require('./openFile');

async function saveSnippet(infile, outfile) {
  // get user authentication informaiton
  const variables = await log.in();
  variables.content = await readFile(infile).catch((err) => {
    process.stdout.write(err.message);
  });
  variables.title = outfile;
  variables.tags = [];

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
  await makeRequest(body)
    .then((res) => {
      if (res.errors && !res.data) {
        console.log(res);
        res.errors.forEach((error) => {
          process.stdout.write(`saveSnippet: ${error.message}\n`);
          console.log(`saveSnippet: ${error}\n`);
        });
      }
    })
    .catch((err) => {
      process.stdout.write(`Failed to save snippet ${outfile}; Please try again.\n${err.message}`);
      process.exit();
    });

  process.exit();
}

module.exports = saveSnippet;
