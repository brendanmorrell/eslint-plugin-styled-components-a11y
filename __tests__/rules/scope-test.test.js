const { RuleTester } = require('eslint');
const makeRule = require('../../utils/makeRule');
const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const expectedError = {
  message: 'The scope prop can only be used on <th> elements.',
  type: 'JSXAttribute',
};
const ruleName = 'scope';
const rule = makeRule(ruleName);

// ## VALID
// <Div />
const div = makeStyledTestCases();
// <Div foo />
const divFoo = makeStyledTestCases({ props: 'foo', attrs: '{ foo: true }' });
// <Th scope />
const thScope = makeStyledTestCases({ tag: 'th', props: 'scope', attrs: '{ scope: true }' });
// <Th scope="row" />
const thScopeRow = makeStyledTestCases({ tag: 'th', props: 'scope="row"', attrs: `{ scope: 'row' }` });
// <Th scope={foo} />
const thScopeFoo = makeStyledTestCases({ tag: 'th', props: 'scope={foo}', attrs: '{ scope: foo }' });
// <Th scope="col" {...props} />
const thScopeColSpread = makeStyledTestCases.withStyledAttrs({
  tag: 'th',
  props: 'scope="col" { ...props}',
  attrs: '{ scope: "col", ...props }',
});

// ## INVALID
// <Div scope {...props} />
const divScope = makeStyledTestCases.withStyledAttrs({
  props: 'scope',
  attrs: '{ scope: true }',
  errors: [expectedError],
});
console.log('TCL: divScope', divScope);

ruleTester.run(ruleName, rule, {
  valid: [...div, ...divFoo, ...thScope, ...thScopeRow, ...thScopeFoo, ...thScopeColSpread],
  invalid: divScope,
});
