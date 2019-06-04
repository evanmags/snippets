const makeRequest = require('./makeRequest');
const { writeFile } = require('./openFile');

async function getSnippet(snippetID, file) {
  const body = {
    query: `query getSnippet($snippetID: String!){
      getSnippet(snippetID: $snippetID){
        _id
        title
        content
        tags
        language
      }
    }`,
    variables: { snippetID },
  };
  // connect to database i.e. server
  // get snippet
  await makeRequest(body)
    .catch((err) => {
      process.stdout.write(
        `Failed to retrieve snippet; Please try again.\n${err.toString()}\n`,
      );
      process.exit();
    })
    .then((query) => {
      const outfile = file || query.data.getSnippet.title;
      try {
        writeFile(outfile, query.data.getSnippet.content);
      } catch (err) {
        process.stdout.write(`Could not write to file: ${outfile}\n${err.toString()}\n`);
        process.exit(1);
      }
      return query;
    });

  process.stdout.write(`getSnippet: snippet successfully added to ${file}\n`);
  process.exit();
}

module.exports = getSnippet;
