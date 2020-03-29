const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const ruleName = 'no-noninteractive-element-interactions';
const rule = makeRule(ruleName);

const expectedError = 'Non-interactive elements should not be assigned mouse or keyboard event listeners.';

// ## VALID
// <div onClick={() => void 0} role="button" />
const divRoleButton = makeStyledTestCases({
  props: 'onClick={() => void 0} role="button"',
  attrs: "{ onClick:() => 0, role:'button' }",
});
// <div onClick={() => void 0} role="presentation" />
const divRolePresentation = makeStyledTestCases({
  props: 'onClick={() => void 0} role="button"',
  attrs: "{ onClick:() => 0, role:'button' }",
});
// <input type="text" onClick={() => void 0} /> // Interactive element does not require role.
const inputOnClick = makeStyledTestCases({
  props: 'type="text" onClick={() => 0}',
  attrs: "{ onClick:() => 0, type:'text' }",
  tag: 'input',
});
// <button onClick={() => void 0} className="foo" /> // button is interactive.
const buttonOnClick = makeStyledTestCases({
  props: 'onClick={() => 0} className="foo"',
  attrs: "{ onClick:() => 0, className:'foo' }",
  tag: 'input',
});
// <div onClick={() => void 0} role="button" aria-hidden /> // This is hidden from screenreader.
const divRoleButtonAriaHidden = makeStyledTestCases({
  props: 'onClick={() => 0} role="button" aria-hidden',
  attrs: "{ onClick:() => 0, role:'button', 'aria-hidden':true }",
  tag: 'input',
});

// ## INVALID
// <li onClick={() => void 0} />
const listItemOnclick = makeStyledTestCases({
  props: 'onClick={() => 0}',
  attrs: '{ onClick:() => 0 }',
  tag: 'li',
  errors: [expectedError],
});
// <div onClick={() => void 0} role="listitem" />
const divRoleListItem = makeStyledTestCases({
  props: 'onClick={() => void 0} role="listitem"',
  attrs: "{ onClick:() => 0, role: 'listitem' }",
  tag: 'li',
  errors: [expectedError],
});

ruleTester.run(ruleName, rule, {
  valid: [...divRoleButton, ...divRolePresentation, ...inputOnClick, ...buttonOnClick, ...divRoleButtonAriaHidden],
  invalid: [...listItemOnclick, ...divRoleListItem],
});
