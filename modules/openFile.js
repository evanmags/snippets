const fs = require('fs');
const path = require('path');

async function openFile(filename) {
  let file;
  try {
    file = await fs.readFileSync(path.join(process.cwd(), filename), 'utf-8');
  } catch (err) {
    throw new Error('Could not open file', err);
  }
  return file;
}

module.exports = openFile;
