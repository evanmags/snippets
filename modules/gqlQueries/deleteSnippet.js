const makeRequest = require('../makeRequest');

async function deleteSnippet(userID, snippetID) {
  const body = {
    query: `mutation deleteSnippet($userID: String!, $snippetID: String!){
      deleteSnippet(userID: $userID, snippetID: $snippetID){
        title
        content
      }
    }`,
    variables: {
      userID,
      snippetID,
    },
  };

  await makeRequest(body)
    .then((res) => {
      if (res.errors) {
        res.errors.forEach((error) => {
          process.stdout.write(`saveSnippet: ${error.message}\n`);
        });
      }
      process.stdout.write(`Snippets: ${res.data.deleteSnippet.title} successfully deleted.\n`);
      process.exit();
    })
    .catch((err) => {
      process.stdout.write(
        'Snippets: could not delete snippet, please try again.\n',
      );
      process.stdout.write(`${err.message}\n`);
      process.exit(1);
    });
}

module.exports = deleteSnippet;
