const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const expectedError = {
  message: 'The scope prop can only be used on <th> elements.',
  type: 'JSXAttribute',
};
const ruleName = 'label-has-associated-control';
const rule = makeRule(ruleName);

// ## VALID
// <label>
//   Surname
//   <input type="text" htmlFor={htmlFor} />
// </label>;
const label = makeStyledTestCases({
  tag: 'label',
  attrs: `{ type: 'text', htmlFor }`,
  siblings: 'Surname',
  props: 'type="text" htmlFor={htmlFor} ',
  children: '<input type="text" />',
});

// <label htmlFor={htmlFor} {...otherProps} />;

// ## INVALID
// <input type="text" />
// <label>Surname</label>

// <input type="text" id={htmlFor/>
// <label htmlFor={htmlFor} >Surname</label>

// <label {...props} />;

ruleTester.run(ruleName, rule, {
  valid: [],
  invalid: [],
});
