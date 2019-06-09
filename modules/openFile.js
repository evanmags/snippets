const fs = require('fs');
const path = require('path');

/**
 * opens, reads, and returns file at path specified in filepath as a string
 * @param {String} filepath
 */

async function readFile(filepath) {
  let file;
  try {
    file = await fs.readFileSync(path.join(process.cwd(), filepath), 'utf-8');
  } catch (err) {
    throw new Error(`Could not read file ${filepath}: `, err);
  }
  return file;
}

/**
 * writes string provided as snippet to the file at filepath relative to cwd
 * @param {String} filename
 * @param {String} snippet
 */

async function writeFile(filename, snippet) {
  if (!snippet) throw new Error(`Could not write to file ${filename}: no content to write`);
  try {
    fs.appendFileSync(path.join(process.cwd(), filename), snippet, 'utf-8');
  } catch (err) {
    throw new Error(`Could not write to file ${filename}: `, err);
  }
}

module.exports = {
  readFile,
  writeFile,
};
