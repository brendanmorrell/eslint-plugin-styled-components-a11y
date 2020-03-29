const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const ruleName = 'no-noninteractive-tabindex';
const rule = makeRule(ruleName);

const expectedError = '`tabIndex` should only be declared on interactive elements.';

// ## VALID
// <div />
const div = makeStyledTestCases();
// <button />
const button = makeStyledTestCases({ tag: 'button' });
// <button tabIndex="0" />
const buttonTabIndexStr = makeStyledTestCases({ tag: 'button', props: 'tabIndex="0"', attrs: "{ tabIndex:'0' }" });
// <button tabIndex={0} />
const buttonTabIndexNum = makeStyledTestCases({ tag: 'button', props: 'tabIndex={0}', attrs: '{ tabIndex:0 }' });
// <div tabIndex="-1" />
const divTabIndexNegativeOne = makeStyledTestCases({
  props: 'tabIndex="-1"',
  attrs: "{ tabIndex:'-1' }",
});
// <div role="button" tabIndex="0" />
const divTabIndexRoleButton = makeStyledTestCases({
  props: 'role="button" tabIndex="0"',
  attrs: "{ role:'button',tabIndex:'0' }",
});
// <div role="article" tabIndex="-1" />
const divTabIndexRoleArticle = makeStyledTestCases({
  props: 'role="article" tabIndex="-1"',
  attrs: "{ role:'article',tabIndex:'-1' }",
});
// <article tabIndex="-1" />
const articleTabIndex = makeStyledTestCases({ tag: 'article', props: 'tabIndex="-1"', attrs: "{ tabIndex:'-1' }" });

// ## INVALID
// <div tabIndex="0" />
const divTabIndexZero = makeStyledTestCases({
  props: 'tabIndex="0"',
  attrs: "{ tabIndex:'0' }",
  errors: [expectedError],
});
// <div role="article" tabIndex="0" />
const divTabIndexZeroRoleArticle = makeStyledTestCases({
  props: 'role="article" tabIndex="0"',
  attrs: "{ tabIndex:'0', role:'article' }",
  errors: [expectedError],
});
// <article tabIndex="0" />
const articleTabIndexZeroStr = makeStyledTestCases({
  tag: 'article',
  props: 'tabIndex="0"',
  attrs: "{ tabIndex:'0' }",
  errors: [expectedError],
});
// <article tabIndex={0} />
const articleTabIndexZeroNum = makeStyledTestCases({
  tag: 'article',
  props: 'tabIndex={0}',
  attrs: '{ tabIndex:0 }',
  errors: [expectedError],
});

ruleTester.run(ruleName, rule, {
  valid: [
    ...div,
    ...buttonTabIndexStr,
    ...buttonTabIndexStr,
    ...buttonTabIndexNum,
    ...divTabIndexNegativeOne,
    ...divTabIndexRoleButton,
    ...divTabIndexRoleArticle,
    ...articleTabIndex,
  ],
  invalid: [...divTabIndexZero, ...divTabIndexZeroRoleArticle, ...articleTabIndexZeroStr, ...articleTabIndexZeroNum],
});
