const fs = require('fs');
const path = require('path');

async function readFile(filename) {
  let file;
  try {
    file = await fs.readFileSync(path.join(process.cwd(), filename), 'utf-8');
  } catch (err) {
    throw new Error('Could not open file', err);
  }
  return file;
}

async function writeFile(filename, snippet) {
  let file;
  try {
    file = await fs.appendFileSync(path.join(process.cwd(), filename), snippet, 'utf-8');
  } catch (err) {
    throw new Error('Could not open file', err);
  }
  return file;
}

module.exports = {
  readFile,
  writeFile,
};
