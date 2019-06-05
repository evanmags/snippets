const makeRequest = require('../makeRequest');
const { readFile } = require('../openFile');

async function saveSnippet(userID, file, title) {
  const content = await readFile(file).catch((err) => {
    process.stdout.write(err.message);
  });

  const body = {
    query: `mutation createSnippet($userID: String!, $title: String!, $content: String!, $language: String, $tags: [String]){
      createSnippet(userID: $userID, title: $title, content: $content, language: $language, tags: $tags){
        title
        language
        tags
        content
      }
    }`,
    variables: {
      userID,
      snippetInfo: {
        user: userID,
        content,
        title,
        tags: [],
        language: null,
      },
    },
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
