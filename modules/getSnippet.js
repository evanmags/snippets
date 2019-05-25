const log = require('./log');
const makeRequest = require('./makeRequest');
const { writeFile } = require('./openFile');

async function getSnippet(title, file) {
  // get user authentication informaiton
  const variables = await log.in();
  variables.title = title;

  const body = {
    query: `query getSnippet($username: String!, $hash: String!, $title: String!){
      getSnippet(username: $username, hash: $hash, title: $title){
        title
        content
      }
    }`,
    variables,
  };
  // connect to database i.e. server
  // get snippet
  const snippet = await makeRequest(body)
    .then((query) => {
      const outfile = file || title;
      try {
        writeFile(outfile, query.data.getSnippet.content);
      } catch (err) {
        process.stdout.write(`could not write to file: ${outfile}\n${err}`);
      }
      return query;
    });

  process.stdout.write(`getSnippet: ${snippet.data.getSnippet.content}`);
  process.exit();
}

module.exports = getSnippet;
