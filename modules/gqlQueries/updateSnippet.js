const makeRequest = require('../makeRequest');

/**
 * executes updateSnippet graphql mutation
 * @param {String} snippetID
 * @param {Snippet} snippetData // as delivered from mongoDB
 */

async function updateSnippet(snippetID, snippetData) {
  const body = {
    query: `mutation updateSnippet($snippetID: String!, $snippetData: Snippet!){
      updateSnippet(snippetID: $snippetID, snippetData: $snippetData){
        _id
        title
        content
        tags
        language
      }
    }`,
    variables: {
      snippetID,
      snippetData,
    },
  };

  await makeRequest(body).then(({ data }) => { return data.updateSnippet; });
}

module.exports = updateSnippet;
