const fs = require('fs').promises;

async function openFile({ filename }) {
  let file;
  try {
    file = await fs.readFile(filename, 'utf-8');
  } catch (err) {
    throw new Error('Coule not open file', err);
  }
  return file;
}

module.exports = openFile;
