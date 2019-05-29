const makeRequest = require('../modules/makeRequest');

const query = `query getSnippet($username: String!, $hash: String!, $title: String!){
  getSnippet(username: $username, hash: $hash, title: $title){
    title
  }
}`;

const badquery = `query gretSnippet($username: String!, $hash: String!, $title: String!){
  getSnippet(username: $username, hash: $hash, title: $title){
    title
  }
}`;

const variables = {
  username: 'evan',
  hash: 'magnussen',
  title: 'test.js',
};

const badvariables1 = {
  username: 'evan',
  hash: 'magnussen',
  title: 'te.js',
};

const badvariables2 = {
  username: 'bad',
  hash: 'things',
  title: 'test.js',
};

// timing out... because my network is crap
test('accepts valid graphQL query', async () => {
  return makeRequest({ query, variables }).then((data) => {
    expect(data.data.getSnippet).toBeDefined();
  });
});

test('rejects invalid graphQL query', async () => {
  return makeRequest({ badquery, variables }).then((data) => {
    expect(data.errors).toBeDefined();
  });
});

test('rejects invalid authentication', async () => {
  return makeRequest({ query, badvariables2 }).then((data) => {
    expect(data.errors).toBeDefined();
  });
});

test('rejects invalid snippet name', async () => {
  return makeRequest({ query, badvariables1 }).then((data) => {
    expect(data.errors).toBeDefined();
  });
});
