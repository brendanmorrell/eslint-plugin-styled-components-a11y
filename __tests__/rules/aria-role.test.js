const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const expectedError = {
  message: 'Elements with ARIA roles must use a valid, non-abstract ARIA role.',
  type: 'JSXAttribute',
};

const ruleName = 'aria-role';
const rule = makeRule(ruleName);

// ## VALID
// <div role="button"></div>
const divRoleButton = makeStyledTestCases({
  attrs: "{ role: 'button'}",
  props: 'role="button"',
});
// <div role={role}></div>
const divRoleVar = makeStyledTestCases({
  attrs: '{ role }',
  props: 'role={role}',
});
// <div></div>
const div = makeStyledTestCases();

// ## INVALID
// <div role="datepicker"></div>
const divRoleDatepicker = makeStyledTestCases({
  attrs: `{ role:'datepicker' }`,
  props: 'role="datepicker"',
  errors: [expectedError],
});
// <div role="range"></div>
const divRoleRange = makeStyledTestCases({
  attrs: `{ role:"range" }`,
  props: 'role="range"',
  errors: [expectedError],
});
// <div role=""></div>
const divRoleEmpty = makeStyledTestCases({
  attrs: `{ role:"" }`,
  props: 'role=""',
  errors: [expectedError],
});

ruleTester.run(ruleName, rule, {
  valid: [...divRoleButton, ...divRoleVar, ...div],
  invalid: [...divRoleDatepicker, ...divRoleRange, ...divRoleEmpty],
});
