const fs = require('fs').promises;

async function openFile({ filename }) {
  let filePointer;
  try {
    filePointer = await fs.readFile(filename, 'utf-8');
  } catch (err) {
    throw new Error('Coule not open file', err);
  }
  return filePointer;
}

module.exports = openFile;
