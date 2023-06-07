const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const ruleName = 'no-access-key';
const rule = makeRule(ruleName);

const errorMessage =
  'No access key attribute allowed. Inconsistencies between keyboard shortcuts and keyboard commands used by screenreaders and keyboard-only users create a11y complications.';

// ## VALID
const noAccessKey = makeStyledTestCases();
// ## INVALID
const accessKey = makeStyledTestCases({
  attrs: `{ accessKey: 'h' }`,
  props: 'accessKey="h"',
  errors: [errorMessage],
});

ruleTester.run(ruleName, rule, {
  valid: [...noAccessKey],
  invalid: [...accessKey],
});
