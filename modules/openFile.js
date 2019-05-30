const fs = require('fs');
const path = require('path');

async function readFile(filename) {
  let file;
  try {
    file = await fs.readFileSync(path.join(process.cwd(), filename), 'utf-8');
  } catch (err) {
    throw new Error(`Could not read file ${filename}: `, err);
  }
  return file;
}

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
