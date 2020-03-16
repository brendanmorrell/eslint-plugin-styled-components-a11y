const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const ruleName = 'iframe-has-title';
const rule = makeRule(ruleName);

const expectedError = {
  message: '<iframe> elements must have a unique title property.',
  type: 'JSXOpeningElement',
};

// ## VALID
// <iframe title="This is a unique title" />
const iframeTitle = makeStyledTestCases({
  tag: 'iframe',
  attrs: `{ title: 'this is a unique title' }`,
  props: 'title="This is a unique title"',
});
// <iframe title={uniqueTitle} />
const iframeTitleVar = makeStyledTestCases({
  tag: 'iframe',
  attrs: `{ title: uniqueTitle }`,
  props: 'title={uniqueTitle}',
});

// ## INVALID
// <iframe />
const emptyIframe = makeStyledTestCases({ tag: 'iframe', errors: [expectedError] });
// <iframe {...props} />
const emptyIframeProps = makeStyledTestCases({
  tag: 'iframe',
  attrs: '{ ...props }',
  props: '{...props}',
  errors: [expectedError],
});
// <iframe title="" />
const iframeEmptyTitle = makeStyledTestCases({
  tag: 'iframe',
  attrs: "{ title:'' }",
  props: 'title=""',
  errors: [expectedError],
});
// <iframe title={''} />
const iframeEmptyTitleJsxSingle = makeStyledTestCases({
  tag: 'iframe',
  attrs: "{ title:'' }",
  props: `title={''}`,
  errors: [expectedError],
});
// <iframe title={``} />
const iframeEmptyTitleJsxBackticks = makeStyledTestCases({
  tag: 'iframe',
  attrs: '{ title:`` }',
  props: 'title={``}',
  errors: [expectedError],
});
// <iframe title={undefined} />
const iframeEmptyTitleUndefined = makeStyledTestCases({
  tag: 'iframe',
  attrs: '{ title: undefined }',
  props: 'title={undefined}',
  errors: [expectedError],
});
// <iframe title={false} />
const iframeEmptyTitleFalse = makeStyledTestCases({
  tag: 'iframe',
  attrs: '{ title: false }',
  props: 'title={false}',
  errors: [expectedError],
});
// <iframe title={true} />
const iframeEmptyTitleTrue = makeStyledTestCases({
  tag: 'iframe',
  attrs: '{ title: true }',
  props: 'title={true}',
  errors: [expectedError],
});
// <iframe title={42} />
const iframeEmptyTitleNumber = makeStyledTestCases({
  tag: 'iframe',
  attrs: '{ title: 42 }',
  props: 'title={42}',
  errors: [expectedError],
});

ruleTester.run(ruleName, rule, {
  valid: [...iframeTitle, ...iframeTitleVar],
  invalid: [
    ...emptyIframe,
    ...emptyIframeProps,
    ...iframeEmptyTitle,
    ...iframeEmptyTitleJsxSingle,
    ...iframeEmptyTitleJsxBackticks,
    ...iframeEmptyTitleUndefined,
    ...iframeEmptyTitleFalse,
    ...iframeEmptyTitleTrue,
    ...iframeEmptyTitleNumber,
  ],
});
