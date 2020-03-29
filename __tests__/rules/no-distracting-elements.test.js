const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const errorMessage = element =>
  `Do not use <${element}> elements as they can create visual accessibility issues and are deprecated.`;

const ruleName = 'no-distracting-elements';
const rule = makeRule(ruleName);

const expectedError = {};

// ## VALID
const div = makeStyledTestCases();
// ## INVALID
const marquee = makeStyledTestCases({ tag: 'marquee', errors: [errorMessage('marquee')] });
const blink = makeStyledTestCases({ tag: 'blink', errors: [errorMessage('blink')] });

ruleTester.run(ruleName, rule, {
  valid: div,
  invalid: [...marquee, ...blink],
});
