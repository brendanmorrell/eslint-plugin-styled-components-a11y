const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const ruleName = 'anchor-is-valid';
const rule = makeRule(ruleName);

const preferButtonErrorMessage =
  'Anchor used as a button. Anchors are primarily expected to navigate. Use the button element instead. Learn more: https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md';

const noHrefErrorMessage =
  'The href attribute is required for an anchor to be keyboard accessible. Provide a valid, navigable address as the href value. If you cannot provide an href, but still need the element to resemble a link, use a button and change it with appropriate styles. Learn more: https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md';

const invalidHrefErrorMessage =
  'The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles. Learn more: https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md';

const preferButtonexpectedError = {
  message: preferButtonErrorMessage,
  type: 'JSXOpeningElement',
};
const noHrefexpectedError = {
  message: noHrefErrorMessage,
  type: 'JSXOpeningElement',
};
const invalidHrefexpectedError = {
  message: invalidHrefErrorMessage,
  type: 'JSXOpeningElement',
};

// ## VALID
// <a href="https://github.com" />
const aHref = makeStyledTestCases({
  attrs: `{href: 'https://github.com'}`,
  props: 'href="https://github.com"',
  tag: 'a',
});
// <a href="#section" />
const aHrefHashSection = makeStyledTestCases({
  attrs: `{href: '#section'}`,
  props: 'href="#section"',
  tag: 'a',
});
// <a href="foo" />
const aHrefStr = makeStyledTestCases({
  attrs: `{href: 'foo'}`,
  props: 'href="foo"',
  tag: 'a',
});
// <a href="/foo/bar" />
const aHrefStrPath = makeStyledTestCases({
  attrs: `{href: '/foo/bar'}`,
  props: 'href="/foo/bar"',
  tag: 'a',
});

// TODO get this working
// <a href={someValidPath} />
const aHrefVar = makeStyledTestCases({
  attrs: `{href: someValidPath}`,
  props: 'href={someValidPath}',
  tag: 'a',
});
// <a href="https://github.com" onClick={foo} />
const aHrefOnClick = makeStyledTestCases({
  attrs: `{href: "https://github.com", onClick: foo}`,
  props: 'href="https://github.com" onClick={foo}',
  tag: 'a',
});
// <a href="#section" onClick={foo} />
const aHrefHashSectionOnClick = makeStyledTestCases({
  attrs: `{href: "#section", onClick: foo}`,
  props: 'href="#section" onClick={foo}',
  tag: 'a',
});
// <a href="foo" onClick={foo} />
const aHrefStrOnClick = makeStyledTestCases({
  attrs: `{href: "foo", onClick: foo}`,
  props: 'href="foo" onClick={foo}',
  tag: 'a',
});
// <a href="/foo/bar" onClick={foo} />
const aHrefStrPathOnClick = makeStyledTestCases({
  attrs: `{href: "/foo/bar", onClick: foo}`,
  props: 'href="/foo/bar" onClick={foo}',
  tag: 'a',
});
// <a href={someValidPath} onClick={foo} />
const aHrefVarOnClick = makeStyledTestCases({
  attrs: `{href: someValidPath, onClick: foo}`,
  props: 'href={someValidPath} onClick={foo}',
  tag: 'a',
});

// ##INVALID
// <a onClick={foo} />
const aOnClick = makeStyledTestCases({
  attrs: '{onClick: foo}',
  props: 'onClick={foo}',
  tag: 'a',
  errors: [preferButtonErrorMessage],
});
// <a href="#" onClick={foo} />
const aHrefEmptyHashOnClick = makeStyledTestCases({
  attrs: `{href:'#', onClick: foo}`,
  props: 'href="#" onClick={foo}',
  tag: 'a',
  errors: [preferButtonErrorMessage],
});
// <a href={"#"} onClick={foo} />
const aHrefEmptyHashJsxExpressionOnClick = makeStyledTestCases({
  attrs: `{href:'#', onClick: foo}`,
  props: 'href={"#"} onClick={foo}',
  tag: 'a',
  errors: [preferButtonErrorMessage],
});
// <a href={`#`} onClick={foo} />
const aHrefEmptyHashJsxExpressionBacktickOnClick = makeStyledTestCases({
  attrs: `{href:'#', onClick: foo}`,
  props: 'href={`#`} onClick={foo}',
  tag: 'a',
  errors: [preferButtonErrorMessage],
});
// <a href="javascript:void(0)" onClick={foo} />
const aHrefJavascriptVoidOnClick = makeStyledTestCases({
  attrs: `{href:'javascript:void(0)', onClick: foo}`,
  props: 'href="javascript:void(0)" onClick={foo}',
  tag: 'a',
  errors: [preferButtonErrorMessage],
});
// <a href={"javascript:void(0)"} onClick={foo} />
const aHrefJsxExpressionJavascriptVoidOnClick = makeStyledTestCases({
  attrs: `{href:'javascript:void(0)', onClick: foo}`,
  props: 'href={"javascript:void(0)" }onClick={foo}',
  tag: 'a',
  errors: [preferButtonErrorMessage],
});
// <a href={`javascript:void(0)`} onClick={foo} />
const aHrefJsxExpressionJavascriptVoidBacktickOnClick = makeStyledTestCases({
  attrs: '{href:`javascript:void(0)`, onClick: foo}',
  props: 'href={`javascript:void(0)`} onClick={foo}',
  tag: 'a',
  errors: [preferButtonErrorMessage],
});
// <a />
const a = makeStyledTestCases({
  tag: 'a',
  errors: [noHrefexpectedError],
});
// <a href={undefined} />
const aHrefUndefined = makeStyledTestCases({
  attrs: '{ href: undefined }',
  props: 'href={undefined}',
  tag: 'a',
  errors: [noHrefexpectedError],
});
// <a href={null} />
const aHrefNull = makeStyledTestCases({
  attrs: '{ href: null }',
  props: 'href={null}',
  tag: 'a',
  errors: [noHrefexpectedError],
});
// <a href="#" />
const aHrefHash = makeStyledTestCases({
  attrs: '{ href: "#" }',
  props: 'href="#"',
  tag: 'a',
  errors: [invalidHrefexpectedError],
});
// <a href={"#"} />
const aHrefHashJsxExpression = makeStyledTestCases({
  attrs: '{ href: "#" }',
  props: 'href={"#"}',
  tag: 'a',
  errors: [invalidHrefexpectedError],
});
// <a href={`#`} />
const aHrefHashJsxExpressionBacktick = makeStyledTestCases({
  attrs: '{ href: `#` }',
  props: 'href={`#`}',
  tag: 'a',
  errors: [invalidHrefexpectedError],
});
// <a href="javascript:void(0)" />
const aHrefJavascriptVoid = makeStyledTestCases({
  attrs: '{ href: "javascript:void(0)" }',
  props: 'href="javascript:void(0)"',
  tag: 'a',
  errors: [invalidHrefexpectedError],
});
// <a href={"javascript:void(0)"} />
const aHrefJsxExpressionJavascriptVoid = makeStyledTestCases({
  attrs: '{ href: "javascript:void(0)" }',
  props: 'href={"javascript:void(0)"}',
  tag: 'a',
  errors: [invalidHrefexpectedError],
});
// <a href={`javascript:void(0)`} />
const aHrefJsxExpressionJavascriptVoidBacktick = makeStyledTestCases({
  attrs: '{ href: `javascript:void(0)` }',
  props: 'href={`javascript:void(0)`}',
  tag: 'a',
  errors: [invalidHrefexpectedError],
});

ruleTester.run(ruleName, rule, {
  valid: [
    ...aHref,
    ...aHrefHashSection,
    ...aHrefStr,
    ...aHrefStrPath,
    ...aHrefVar,
    ...aHrefOnClick,
    ...aHrefHashSectionOnClick,
    ...aHrefStrOnClick,
    ...aHrefStrPathOnClick,
    ...aHrefVarOnClick,
  ],
  invalid: [
    ...aOnClick,
    ...aHrefEmptyHashOnClick,
    ...aHrefEmptyHashJsxExpressionOnClick,
    ...aHrefEmptyHashJsxExpressionBacktickOnClick,
    ...aHrefJavascriptVoidOnClick,
    ...aHrefJsxExpressionJavascriptVoidOnClick,
    ...aHrefJsxExpressionJavascriptVoidBacktickOnClick,
    ...a,
    ...aHrefUndefined,
    ...aHrefNull,
    ...aHrefHash,
    ...aHrefHashJsxExpression,
    ...aHrefHashJsxExpressionBacktick,
    ...aHrefJavascriptVoid,
    ...aHrefJsxExpressionJavascriptVoid,
    ...aHrefJsxExpressionJavascriptVoidBacktick,
  ],
});
