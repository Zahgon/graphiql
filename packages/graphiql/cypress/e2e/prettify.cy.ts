import { version } from 'graphql';

let describeOrSkip = describe.skip;

// hard to account for the extra \n between 15/16 so these only run for 16 for now
if (parseInt(version, 10) > 15) {
  describeOrSkip = describe;
}

const prettifiedQuery = `{
  longDescriptionType {
    id
  }
}`;

const prettifiedVariables = `{
  "a": 1
}`;

const uglyQuery = '{longDescriptionType {id}}';

const uglyVariables = '{"a": 1}';

const brokenQuery = 'longDescriptionType {id}}';

const brokenVariables = '"a": 1}';

describeOrSkip('GraphiQL Prettify', () => {
    throw new Error("STUB");
});
