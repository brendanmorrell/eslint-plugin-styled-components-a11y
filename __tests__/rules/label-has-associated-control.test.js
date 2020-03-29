const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const ruleName = 'label-has-associated-control';
const rule = makeRule(ruleName);

const expectedError = 'A form label must be associated with a control.';

// ## VALID
// <label>
//   Surname
//   <input type="text" />
// </label>;
const labelInnerInput = makeStyledTestCases({
  tag: 'label',
  children: `
  Surname
   <input type="text" />`,
});

// <label htmlFor={domId}>Surname</label>
const labelHtmlFor = makeStyledTestCases({
  tag: 'label',
  attrs: '{ htmlFor:domId }',
  props: 'htmlFor={domId}',
  children: 'Surname',
});

// <input type="text" id={domId} />
const input = makeStyledTestCases({
  tag: 'input',
  attrs: "{ type:'text',id:domId }",
  props: 'type="text" id={domId} ',
});

// ## INVALID
// <label {...props} />
const labelSpreadProps = makeStyledTestCases({
  tag: 'label',
  props: '{ ...props }',
  attrs: '{ ...props }',
  errors: [expectedError],
});

// <input type="text" />
// <label>Surname</label>
const siblingInputLabel = makeStyledTestCases({
  tag: 'label',
  children: 'Surname',
  siblings: '<input type="text" />',
  errors: [expectedError],
});

ruleTester.run(ruleName, rule, {
  valid: [...labelInnerInput, ...labelHtmlFor, ...input],
  invalid: [...labelSpreadProps, ...siblingInputLabel],
});
