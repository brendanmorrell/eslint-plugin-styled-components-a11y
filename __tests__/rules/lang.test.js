const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const ruleName = 'lang';
const rule = makeRule(ruleName);

const expectedError = {
  message: 'lang attribute must have a valid value.',
  type: 'JSXAttribute',
};

// ## VALID
// <html lang="en">
const htmlLangEn = makeStyledTestCases({
  tag: 'html',
  attrs: `{ lang: 'en' }`,
  props: 'lang="en"',
});
// <html lang="en-US"></html>
const htmlLangEnUs = makeStyledTestCases({
  tag: 'html',
  attrs: `{ lang: 'en-US' }`,
  props: 'lang="en-US"',
});

// ## INVALID
// <html>
const html = makeStyledTestCases({
  tag: 'html',
  errors: [expectedError],
});
// <html lang="foo"></html>
const htmlLangFoo = makeStyledTestCases({
  tag: 'html',
  attrs: `{ lang: 'foo' }`,
  props: 'lang="foo"',
  errors: [expectedError],
});

ruleTester.run(ruleName, rule, {
  valid: [...htmlLangEn, ...htmlLangEnUs],
  invalid: [...html, ...htmlLangFoo],
});
