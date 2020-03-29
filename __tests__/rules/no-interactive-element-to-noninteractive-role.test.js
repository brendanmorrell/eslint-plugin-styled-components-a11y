const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const ruleName = 'no-interactive-element-to-noninteractive-role';
const rule = makeRule(ruleName);

const errorMessage = 'Interactive elements should not be assigned non-interactive roles.';

// ## VALID
// <div role="article">
//   <button />;
// </div>;
const divArticleRoleWrapperButton = makeStyledTestCases({
  attrs: `{ role: 'article' }`,
  props: 'role="article"',
  children: '<button />',
});

// ## INVALID
// <button role="article">Save</button>
const buttonArticleRole = makeStyledTestCases({
  tag: 'button',
  attrs: `{ role: 'article' }`,
  props: 'role="article"',
  errors: [errorMessage],
});

ruleTester.run(ruleName, rule, {
  valid: divArticleRoleWrapperButton,
  invalid: buttonArticleRole,
});
