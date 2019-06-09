const getSnippet = require('../gqlQueries/getSnippet');

/**
 * gets the snippetID and determines filename to pass to getSnippet
 * @param {User} user as defined in mongodb/graphql schemas
 * @param {[Strings]} args [flag, title, filename] pulled from commandline
 */

function argsGet({ snippets }, [, title, filename]) {
  const { _id } = snippets.filter((snippet) => { return snippet.title === title; })[0];
  return getSnippet(_id, filename || null);
}

module.exports = argsGet;
