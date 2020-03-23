const { RuleTester } = require('eslint');
const parserOptionsMapper = require('../../__util__/parserOptionsMapper');
const rule = require('../../../src/rules/lang');

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'lang attribute must have a valid value.',
  type: 'JSXAttribute',
};

ruleTester.run('lang', rule, {
  valid: [
    { code: '<div />;' },
    { code: '<div foo="bar" />;' },
    { code: '<div lang="foo" />;' },
    { code: '<html lang="en" />' },
    { code: '<html lang="en-US" />' },
    { code: '<html lang={foo} />' },
    { code: '<HTML lang="foo" />' },
    { code: '<Foo lang="bar" />' },
  ].map(parserOptionsMapper),
  invalid: [
    { code: '<html lang="foo" />', errors: [expectedError] },
    { code: '<html lang="zz-LL" />', errors: [expectedError] },
    { code: '<html lang={undefined} />', errors: [expectedError] },
  ].map(parserOptionsMapper),
});
