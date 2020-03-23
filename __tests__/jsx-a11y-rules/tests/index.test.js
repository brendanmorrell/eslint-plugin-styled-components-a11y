const RuleTester = require('eslint').RuleTester;
const makeRule = require('../../utils/makeRule');
const parserOptionsMapper = require('../../utils/parserOptionsMapper');

const ruleTester = new RuleTester();

const rule = makeRule('accessible-emoji');

const expectedError = {
  message:
    'Emojis should be wrapped in <span>, have role="img", and have an accessible description with aria-label or aria-labelledby.',
  type: 'JSXOpeningElement',
};

const test = {
  create(context) {
    const parserOptionsMapper = require('../../utils/parserOptionsMapper');
    return {
      JSXOpeningElement(node) {
        context.report(node, 'bullsh');
      },
    };
  },
};

ruleTester.run('accessible-emoji', rule, {
  valid: [
    { code: '<div />;' },
    { code: '<span />' },
    { code: '<span>No emoji here!</span>' },
    { code: '<span role="img" aria-label="Panda face">🐼</span>' },
    { code: '<span role="img" aria-label="Snowman">&#9731;</span>' },
    { code: '<span role="img" aria-labelledby="id1">🐼</span>' },
    { code: '<span role="img" aria-labelledby="id1">&#9731;</span>' },
    { code: '<span role="img" aria-labelledby="id1" aria-label="Snowman">&#9731;</span>' },
    { code: '<span>{props.emoji}</span>' },
    { code: '<span aria-hidden>{props.emoji}</span>' },
    { code: '<span aria-hidden="true">🐼</span>' },
    { code: '<span aria-hidden>🐼</span>' },
    { code: '<div aria-hidden="true">🐼</div>' },
  ].map(parserOptionsMapper),
  invalid: [],
  // invalid: [
  //   { code: '<span>🐼</span>', errors: [expectedError] },
  //   { code: '<span>foo🐼bar</span>', errors: [expectedError] },
  //   { code: '<span>foo 🐼 bar</span>', errors: [expectedError] },
  //   { code: '<i role="img" aria-label="Panda face">🐼</i>', errors: [expectedError] },
  //   { code: '<i role="img" aria-labelledby="id1">🐼</i>', errors: [expectedError] },
  //   { code: '<Foo>🐼</Foo>', errors: [expectedError] },
  //   { code: '<span aria-hidden="false">🐼</span>', errors: [expectedError] },
  // ].map(parserOptionsMapper),
});
