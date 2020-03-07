const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const expectedError = {
  message: 'Anchors must have content and the content must be accessible by a screen reader.',
  tag: 'JSXOpeningElement',
};
const ruleName = 'anchor-has-content';
const rule = makeRule(ruleName);

// ## VALID
// <div />;
const div = makeStyledTestCases();
// <a>Foo</a>
const anchorTextChildren = makeStyledTestCases({
  children: 'Foo',
  tag: 'a',
});
// <a><Bar /></a>
const anchorComponentChild = makeStyledTestCases({
  children: '<Bar />',
  tag: 'a',
});
// <a>{foo}</a>
const anchorJsxExpressionChild = makeStyledTestCases({
  children: '{foo}',
  tag: 'a',
});
// <a>{foo.bar}</a>
const anchorJsxExpressionDotNotationChild = makeStyledTestCases({
  children: '{foo.bar}',
  tag: 'a',
});

// <a dangerouslySetInnerHTML={{ __html: "foo" }} />
const anchorDangerousHtml = makeStyledTestCases({
  attrs: `{dangerouslySetInnerHTML:{ __html: 'foo' } }`,
  props: 'dangerouslySetInnerHTML={{ __html: "foo" }}',
  tag: 'a',
});
// <a children={children} />
const anchorChildrenDirectProp = makeStyledTestCases({
  attrs: `{children: children }`,
  props: 'children={children}',
  tag: 'a',
});
// ## INVALID
// <a />
const anchor = makeStyledTestCases({
  tag: 'a',
  errors: [expectedError],
});
// <a><Bar aria-hidden /></a>
const anchorAriaHiddenComponentChild = makeStyledTestCases({
  children: '<Bar aria-hidden />',
  tag: 'a',
  errors: [expectedError],
});
// <a>{undefined}</a>
const anchorChildrenUndefined = makeStyledTestCases({
  children: '{undefined}',
  tag: 'a',
  errors: [expectedError],
});
ruleTester.run(ruleName, rule, {
  valid: [
    ...div,
    ...anchorTextChildren,
    ...anchorComponentChild,
    ...anchorJsxExpressionChild,
    ...anchorJsxExpressionDotNotationChild,
    ...anchorDangerousHtml,
    ...anchorChildrenDirectProp,
  ],
  invalid: [...anchor, ...anchorAriaHiddenComponentChild],
});
