const testQuery = `{
longDescriptionType {
  id
  image
  hasArgs
  test {
    id
    isTest
    __typename
  }
 }
}`;

const mockSuccess = {
  data: {
    longDescriptionType: {
      id: 'abc123',
      image: '/resources/logo.svg',
      hasArgs: '{"defaultValue":"test default value"}',
      test: {
        id: 'abc123',
        isTest: true,
        __typename: 'Test',
      },
    },
  },
};

describe('GraphiQL On Initialization', () => {
    throw new Error("STUB");
});
