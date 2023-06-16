const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const ruleName = 'no-static-element-interactions';
const rule = makeRule(ruleName);

const expectedError = 'Avoid non-native interactive elements. If using native HTML is not possible, add an appropriate role and support for tabbing, mouse, keyboard, and touch inputs to an interactive content element.';

// ## VALID
// <button onClick={() => 0} className="foo" />
const button = makeStyledTestCases({
  tag: 'button',
  attrs: "{ onClick:() => 0, className:'foo' }",
  props: 'onClick={() => 0} className="foo"',
});
// <div className="foo" onClick={() => 0} role="button" />
const divRoleButton = makeStyledTestCases({
  attrs: "{ onClick:() => 0, className:'foo', role:'button' }",
  props: 'onClick={() => 0} className="foo" role="button"',
});
// <input type="text" onClick={() => 0} />
const input = makeStyledTestCases({
  tag: 'input',
  attrs: "{ onClick:() => 0, type:'text' }",
  props: 'type="text" onClick={() => 0}',
});

// ## INVALID
// <div onClick={() => 0} />
const divOnClick = makeStyledTestCases({
  attrs: '{ onClick:() => 0 }',
  props: 'onClick={() => 0}',
  errors: [expectedError],
});

ruleTester.run(ruleName, rule, {
  valid: [...button, ...divRoleButton, ...input],
  invalid: divOnClick,
});
