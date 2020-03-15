const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');
const { aria } = require('aria-query');

const ruleName = 'aria-proptypes';
const rule = makeRule(ruleName);

const errorMessage = name => {
  const { type, values: permittedValues } = aria.get(name.toLowerCase());

  switch (type) {
    case 'tristate':
      return `The value for ${name} must be a boolean or the string "mixed".`;
    case 'token':
      return `The value for ${name} must be a single token from the following: ${permittedValues}.`;
    case 'tokenlist':
      return `The value for ${name} must be a list of one or more \
tokens from the following: ${permittedValues}.`;
    case 'idlist':
      return `The value for ${name} must be a list of strings that represent DOM element IDs (idlist)`;
    case 'id':
      return `The value for ${name} must be a string that represents a DOM element ID`;
    case 'boolean':
    case 'string':
    case 'integer':
    case 'number':
    default:
      return `The value for ${name} must be a ${type}.`;
  }
};

// ##VALID
// <span aria-hidden="true">foo</span>
const ariaHiddenBool = makeStyledTestCases({
  attrs: "{ 'aria-hidden': true }",
  props: 'aria-hidden="true"',
  tag: 'span',
});
// ##INVALID
// <span aria-hidden="yes">foo</span>
const ariaHiddenString = makeStyledTestCases({
  attrs: "{ 'aria-hidden': 'yes' }",
  props: 'aria-hidden="yes"',
  tag: 'span',
  errors: [errorMessage('aria-hidden')],
});

ruleTester.run(ruleName, rule, {
  valid: [...ariaHiddenBool],
  invalid: [...ariaHiddenString],
});
