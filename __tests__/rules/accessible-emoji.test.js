const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const expectedError = {
  message:
    'Emojis should be wrapped in <span>, have role="img", and have an accessible description with aria-label or aria-labelledby.',
  type: 'JSXOpeningElement',
};

const ruleName = 'accessible-emoji';
const rule = makeRule(ruleName);

// ## VALID
// <span role="img" aria-label="Snowman">&#9731;</span>
const spanRoleImgLabelSnowmanUnicode = makeStyledTestCases({
  attrs: `{ role:'img', 'aria-label':'Snowman' }`,
  props: `role="img" aria-label="Snowman"`,
  children: '&#9731;',
  tag: 'span',
});
// <span role="img" aria-label="Panda">🐼</span>
const spanRoleImgLabelPandaEmoji = makeStyledTestCases({
  attrs: `{ role:'img', 'aria-label':'Panda' }`,
  props: `role="img" aria-label="Panda"`,
  children: '🐼',
  tag: 'span',
});
// <span role="img" aria-labelledby="panda1">🐼</span>
const spanRoleImgLabelledByPandaEmoji = makeStyledTestCases({
  attrs: `{ role:'img', 'aria-labelledby':'panda1' }`,
  props: `role="img" aria-labelledby="panda1"`,
  children: '🐼',
  tag: 'span',
});
// ## INVALID
// <span>🐼</span>
const spanNothingElse = makeStyledTestCases({
  children: '🐼',
  tag: 'span',
  errors: [expectedError],
});
// <i role="img" aria-label="Panda">🐼</i>
const italicTagFullyLabeled = makeStyledTestCases({
  attrs: `{ role:'img', 'aria-label':'Panda' }`,
  props: `role="img" aria-label="Panda"`,
  children: '🐼',
  tag: 'i',
  errors: [expectedError],
});

ruleTester.run(ruleName, rule, {
  valid: [...spanRoleImgLabelSnowmanUnicode, ...spanRoleImgLabelPandaEmoji, ...spanRoleImgLabelledByPandaEmoji],
  invalid: [...spanNothingElse],
});
