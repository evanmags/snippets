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
    .catch((err) => {
      process.stdout.write(
        `Failed to retrieve snippet ${title}; Please try again.\n${err.toString()}`,
      );
      process.exit();
    })
    .then((query) => {
      const outfile = file || title;
      try {
        writeFile(outfile, query.data.getSnippet.content);
      } catch (err) {
        process.stdout.write(`Could not write to file: ${outfile}\n${err.toString()}`);
        process.exit(1);
      }
      return query;
    });

  process.stdout.write(`getSnippet: ${snippet.data.getSnippet.content}`);
  process.exit();
}

module.exports = getSnippet;
