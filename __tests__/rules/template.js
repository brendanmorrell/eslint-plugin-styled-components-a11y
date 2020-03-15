const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const ruleName = '';
const rule = makeRule(ruleName);

const expectedError = {};

// ## VALID

// ## INVALID

ruleTester.run(ruleName, rule, {
  valid: [],
  invalid: [],
});
