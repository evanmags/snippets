const openFile = require('../modules/openFile');

test('returns file as string', () => {
  return openFile({ filename: `${process.cwd()}/tests/index.test.js` }).then((data) => {
    expect(typeof data).toBe('string');
  });
});

test('throws error with wrong input structure', () => {
  return openFile('index.js').catch((data) => {
    expect(data).toBeInstanceOf(Error);
  });
});
