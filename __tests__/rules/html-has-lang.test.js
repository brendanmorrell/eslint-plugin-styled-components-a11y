const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const ruleName = 'html-has-lang';
const rule = makeRule(ruleName);

const expectedError = {
  message: '<html> elements must have the lang prop.',
  type: 'JSXOpeningElement',
};

// ## VALID
// <html lang="en">
const htmlEn = makeStyledTestCases({ tag: 'html', attrs: `{ lang:'en' }`, props: 'lang="en"' });
// <html lang="en-US">
const htmlEnUs = makeStyledTestCases({ tag: 'html', attrs: `{ lang:'en-US' }`, props: 'lang="en-US"' });
// <html lang={language}></html>
const htmlVarLang = makeStyledTestCases({ tag: 'html', attrs: `{ lang: language }`, props: 'lang={language}' });

// ## INVALID
// <html>
const emptyHtml = makeStyledTestCases({ tag: 'html', errors: [expectedError] });

ruleTester.run(ruleName, rule, {
  valid: [...htmlEn, ...htmlEnUs, ...htmlVarLang],
  invalid: [...emptyHtml],
});
