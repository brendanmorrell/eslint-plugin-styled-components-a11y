const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const ruleName = 'no-noninteractive-element-to-interactive-role';
const rule = makeRule(ruleName);

const expectedError = 'Non-interactive elements should not be assigned interactive roles.';

// ## VALID
// <li>
//   <div role="button" onClick={() => {}} onKeyPress={() => {}}>
//     Save
//   </div>
// </li>;
const innerDivButton = makeStyledTestCases({
  tag: 'li',
  children: `
<div role="button" onClick={() => {}} onKeyPress={() => {}}>
  Save
</div>
`,
});

// <div role="button" onClick={() => {}} onKeyPress={() => {}} tabIndex="0">
//   <img src="some/file.png" alt="Save" />
// </div>;
const divRoleButtonWrapImg = makeStyledTestCases({
  attrs: "{ role:'button', onClick:() => 0, onKeyPress:() => 0, tabIndex:0 }",
  props: 'role="button" onClick={() => {}} onKeyPress={() => {}} tabIndex="0"',
  children: '<img src="some/file.png" alt="Save" />',
});

// ## INVALID
//   <img src="some/file.png" alt="Save" onClick={() => 0} role="button" />
const imgRoleButton = makeStyledTestCases({
  tag: 'img',
  props: 'src="some/file.png" alt="Save" onClick={() => 0} role="button"',
  attrs: "{src:'some/file.png', alt:'Save', onClick:() => 0, role:'button'}",
  errors: [expectedError],
});

//   <li role="button" onClick={() => {}} onKeyPress={() => {}}>
//     Save
//   </li>
const listItemRoleButton = makeStyledTestCases({
  tag: 'li',
  attrs: "{ role:'button', onClick:() => 0, onKeyPress:() => 0 }",
  props: 'role="button" onClick={() => 0} onKeyPress={() => 0}',
  errors: [expectedError],
});

ruleTester.run(ruleName, rule, {
  valid: [...innerDivButton, ...divRoleButtonWrapImg],
  invalid: [...imgRoleButton, ...listItemRoleButton],
});
