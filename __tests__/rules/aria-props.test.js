const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');
const { aria } = require('aria-query');
const ariaAttributes = [...aria.keys()];

const errorMessage = name => {
  const suggestions = getSuggestion(name, ariaAttributes);
  const message = `${name}: This attribute is an invalid ARIA attribute.`;

  if (suggestions.length > 0) {
    return {
      type: 'JSXAttribute',
      message: `${message} Did you mean to use ${suggestions}?`,
    };
  }

  return {
    type: 'JSXAttribute',
    message,
  };
};
const ruleName = 'aria-props';
const rule = makeRule(ruleName);

// ## VALID

// ## INVALID

ruleTester.run(ruleName, rule, {
  valid: [],
  invalid: [],
});
