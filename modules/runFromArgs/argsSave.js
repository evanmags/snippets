const saveSnippet = require('../gqlQueries/saveSnippet');

/**
 * Gets userID, filename and snippet title to pass to saveSnippet
 * @param {User} user // {username, _id, hash}
 * @param {[Strings]} args // [flag, filename, title]
 */

function argsSave({ _id }, [, filename, title]) {
  return saveSnippet(_id, filename, title || null);
}

module.exports = argsSave;
