const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const ruleName = 'no-onchange';
const rule = makeRule(ruleName);

const expectedError =
  'onBlur must be used instead of onchange, unless absolutely necessary and it causes no negative consequences for keyboard only or screen reader users.';

// ## VALID
// <select onBlur={updateModel}>
//   <option/>
// </select>
const selectOnBlur = makeStyledTestCases({
  tag: 'select',
  attrs: '{ onBlue: updateModel }',
  props: 'onBlue={updateModel}',
  children: '<option/>',
});
// <select>
//   <option onBlur={handleOnBlur} onChange={handleOnChange} />
// </select>
const optionOnBlur = makeStyledTestCases({
  tag: 'select',
  children: '<option onBlur={handleOnBlur} onChange={handleOnChange} />',
});

// ## INVALID
// <select onChange={updateModel} />
const selectOnChange = makeStyledTestCases({
  tag: 'select',
  props: 'onChange={updateModel}',
  attrs: '{ onChange:updateModel }',
  errors: [expectedError],
});

ruleTester.run(ruleName, rule, {
  valid: [...selectOnBlur, ...optionOnBlur],
  invalid: [...selectOnChange],
});
