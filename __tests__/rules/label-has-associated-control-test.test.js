const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const expectedError = {
  message: 'A form label must be associated with a control.',
  type: 'JSXOpeningElement',
};

const ruleTester = new RuleTester();
const ruleName = 'label-has-associated-control';
const rule = makeRule(ruleName);

// ## VALID
// <label htmlFor={htmlFor}>
//   Surname
//   <input type="text" id={htmlFor} />
// </label>
const inputInLabel = makeStyledTestCases({
  tag: 'label',
  attrs: '{ type: "text" }',
  siblings: 'Surname',
  props: ' type="text" htmlFor={htmlFor} ',
  children: '<input type="text" id={htmlFor} />',
});

// ## INVALID
// <label {...props} />
const labelSpreadProps = makeStyledTestCases({
  tag: 'label',
  attrs: '{ ...props }',
  props: '{...props}',
  errors: [expectedError],
});
// <input type="text" />
// <label>Surname</label>
const siblingInputLabel = makeStyledTestCases({
  tag: 'label',
  siblings: '<input type="text" />',
  errors: [expectedError],
});

const code = `
let STYLED = styled.label\`\`;
`;

const item = { code };

ruleTester.run(ruleName, rule, {
  valid: [item],
  invalid: [
    /* ...labelSpreadProps, ...siblingInputLabel */
  ],
});
