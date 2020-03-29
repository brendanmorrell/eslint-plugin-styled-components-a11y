const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const ruleName = 'role-has-required-aria-props';
const rule = makeRule(ruleName);

const expectedError = (role, requiredProps) =>
  `Elements with the ARIA role "${role}" must have the following attributes defined: ${String(
    requiredProps,
  ).toLowerCase()}`;

// ## VALID
// <!-- Good: the checkbox role requires the aria-checked state -->
// <span role="checkbox" aria-checked="false" aria-labelledby="foo" tabindex="0"></span>
const roleCheckboxAriaChecked = makeStyledTestCases({
  tag: 'span',
  props: 'role="checkbox" aria-checked="false" aria-labelledby="foo" tabindex="0"',
  attrs: "{ role:'checkbox', 'aria-checked':false, 'aria-labelledby':'foo', tabindex:'0' }",
});

// ## INVALID
// <!-- Bad: the checkbox role requires the aria-checked state -->
// <span role="checkbox" aria-labelledby="foo" tabindex="0"></span>
const roleCheckboxNoAriaChecked = makeStyledTestCases({
  tag: 'span',
  props: 'role="checkbox" aria-labelledby="foo" tabindex="0"',
  attrs: "{ role:'checkbox', 'aria-labelledby':'foo', tabindex:'0' }",
  errors: [expectedError('checkbox', 'aria-checked')],
});

ruleTester.run(ruleName, rule, {
  valid: roleCheckboxAriaChecked,
  invalid: roleCheckboxNoAriaChecked,
});
