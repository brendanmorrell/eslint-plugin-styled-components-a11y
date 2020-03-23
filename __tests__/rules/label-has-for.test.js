const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const ruleName = 'label-has-for';
const rule = makeRule(ruleName);

const expectedNestingError = {
  message: 'Form label must have the following type of associated control: nesting',
  type: 'JSXOpeningElement',
};

const expectedSomeError = {
  message: 'Form label must have ANY of the following types of associated control: nesting, id',
  type: 'JSXOpeningElement',
};

const expectedEveryError = {
  message: 'Form label must have ALL of the following types of associated control: nesting, id',
  type: 'JSXOpeningElement',
};

// ## VALID
// <label htmlFor={htmlFor} {...props}>
//  <input type="text" id={htmlFor} />
// </label>
const labelHtmlForNested = makeStyledTestCases({
  tag: 'label',
  attrs: '{ htmlFor, ...props }',
  props: 'htmlFor={htmlFor} { ...props }',
  children: '<input type="text" id={htmlFor} />',
});

// ## INVALID
//  <label {...props} />;
const labelSpreadAllErrors = makeStyledTestCases({
  tag: 'label',
  attrs: '{ ...props }',
  props: '{...props}',
  errors: [expectedEveryError],
});
//  <label {...props} />;
const labelSpreadNested = makeStyledTestCases({
  tag: 'label',
  attrs: '{ type:"text",...props }',
  props: ' type="text" {...props}',
  errors: [expectedEveryError],
  siblings: '<input type="text" />',
});

const labelHtmlForNoNesting = makeStyledTestCases({
  tag: 'label',
  attrs: '{ htmlFor }',
  props: 'htmlFor={htmlFor}',
  errors: [expectedEveryError],
  siblings: '<input type="text" />',
});

ruleTester.run(ruleName, rule, {
  valid: [...labelHtmlForNested],
  invalid: [...labelSpreadAllErrors, ...labelSpreadNested, ...labelHtmlForNoNesting],
});
