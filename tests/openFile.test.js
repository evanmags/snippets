const { readFile, writeFile } = require('../modules/openFile');

// readFile tests
test('readFile: accepts paths starting with "../", "./", "/", or ""', () => {
  expect(readFile('tests/snip.js')).not.toBeInstanceOf(Error);
  expect(readFile('/tests/snip.js')).not.toBeInstanceOf(Error);
  expect(readFile('./tests/snip.js')).not.toBeInstanceOf(Error);
  expect(readFile('../cli/tests/snip.js')).not.toBeInstanceOf(Error);
});

test('readFile: Throws error when file does not exist', async () => {
  const response = await readFile('asd').catch((err) => { return err; });
  expect(response).toBeInstanceOf(Error);
});

test('readFile: Returns file contents as a string', async () => {
  const response = await readFile('tests/snip.js');
  expect(typeof response).toBe('string');
});

// write file tests
test('writeFile: Accepts paths starting with "../", "./", "/", or ""', () => {
  expect(writeFile('tests/snip.js', 'hello World')).not.toBeInstanceOf(Error);
  expect(writeFile('/tests/snip.js', 'hello World')).not.toBeInstanceOf(Error);
  expect(writeFile('./tests/snip.js', 'hello World')).not.toBeInstanceOf(Error);
  expect(writeFile('../cli/tests/snip.js', 'hello World')).not.toBeInstanceOf(Error);
});

test('writeFile: Throws error when no content provided', async () => {
  const response = await writeFile('test/snip.js').catch((err) => { return err; });
  expect(response).toBeInstanceOf(Error);
});

test('writeFile: Throws error when no content provided', async () => {
  const response = await writeFile().catch((err) => { return err; });
  expect(response).toBeInstanceOf(Error);
});
