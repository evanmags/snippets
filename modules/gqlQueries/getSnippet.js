const makeRequest = require('../makeRequest');
const { writeFile } = require('../openFile');

/**
 * retrieves a snippet from the database through graphql
 * @param {String} snippetID
 * @param {String} filename
 *    filename is optional, file to which the snippet should be added
 *    default to snippet title
 */

async function getSnippet(snippetID, filename) {
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
      const outfile = filename || query.data.getSnippet.title;
      try {
        writeFile(outfile, query.data.getSnippet.content);
      } catch (err) {
        process.stdout.write(`Could not write to file: ${outfile}\n${err.toString()}\n`);
        process.exit(1);
      }
    });

  process.stdout.write(`getSnippet: snippet successfully added to ${filename}\n`);
  process.exit();
}

module.exports = getSnippet;
