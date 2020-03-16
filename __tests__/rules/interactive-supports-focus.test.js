const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const ruleName = 'interactive-supports-focus';
const rule = makeRule(ruleName);
const expectedError = {
  message: "Elements with the 'button' interactive role must be focusable.",
  type: 'JSXOpeningElement',
};

// ## VALID
// <span onClick={someFunction} tabindex="0"></span>
const spanClickTabIndexZero = makeStyledTestCases({
  tag: 'span',
  attrs: '{ onClick:someFunction, tabIndex: "0" }',
  props: 'onClick={someFunction} tabindex="0"',
});
// <span onClick={someFunction} aria-hidden="true"></span>
const spanClickAriaHidden = makeStyledTestCases({
  tag: 'span',
  attrs: `{ onClick:someFunction, 'aria-hidden': "true" }`,
  props: 'onClick={someFunction} aria-hidden="true"',
});
// <button onClick={someFunction}></button>
const buttonClick = makeStyledTestCases({
  tag: 'button',
  attrs: `{ onClick:someFunction }`,
  props: 'onClick={someFunction}',
});

// ## INVALID
// fails when there is an `onClick` with no `tabIndex`
// <span onClick={someFunction}></span>
const spanClick = makeStyledTestCases({
  tag: 'span',
  attrs: `{ onClick:someFunction, role:'button' }`,
  props: 'onClick={someFunction} role="button"',
  errors: [''],
});

ruleTester.run(ruleName, rule, {
  valid: [...spanClickTabIndexZero, ...spanClickAriaHidden, ...buttonClick],
  invalid: [...spanClick],
});
