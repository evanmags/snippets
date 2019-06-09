const saveSnippet = require('../gqlQueries/saveSnippet');

/**
 * Gets userID, filename and snippet title to pass to saveSnippet
 * @param {User} user {username, _id, hash} as defined in mongodb/graphql schemas
 * @param {[Strings]} args [flag, filename, title] pulled from commandline
 */

function argsSave({ _id }, [, filename, title]) {
  return saveSnippet(_id, filename, title || null);
}

module.exports = argsSave;
