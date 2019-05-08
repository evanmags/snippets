const shell = require('../modules/shell');

async function validShellTest() {
  const response = await shell('ls');
  return expect(response.stdout).toBeDefined();
}

test('resolves valid shell scripts', validShellTest);

async function invalidShellTest() {
  return shell('hello').catch((error) => {
    expect(error).toBeDefined();
  });
}

test('rejects invalid shell scripts', invalidShellTest);

// test('resolves valid shell scripts', () => {
//   return shell('').then()
// });
