const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const ruleName = 'heading-has-content';
const rule = makeRule(ruleName);

const expectedError = {
  message: 'Headings must have content and the content must be accessible by a screen reader.',
  type: 'JSXOpeningElement',
};

// ## VALID
// <h1>Heading Content!</h1>
const h1WithContent = makeStyledTestCases({
  tag: 'h1',
  children: 'Heading Content!',
});
// <h1><TextWrapper /><h1>
const h1WithComponent = makeStyledTestCases({
  tag: 'h1',
  children: '<TextWrapper />',
});
// <h1 dangerouslySetInnerHTML={{ __html: 'foo' }} />
const h1DangerousInnerHtml = makeStyledTestCases({
  tag: 'h1',
  attrs: `{ dangerouslySetInnerHTML: { __html: 'foo' } }`,
  props: `dangerouslySetInnerHTML={{ __html: 'foo' }}`,
});

// ## INVALID
// <h1 />

const emptyH1 = makeStyledTestCases({ tag: 'h1', errors: [expectedError] });
// <h1><TextWrapper aria-hidden /></h1>
const h1ComponentAriaHidden = makeStyledTestCases({
  tag: 'h1',
  children: '<TextWrapper aria-hidden />',
  errors: [expectedError],
});

ruleTester.run(ruleName, rule, {
  valid: [...h1WithContent, ...h1WithComponent, ...h1DangerousInnerHtml],
  invalid: [...emptyH1, ...h1ComponentAriaHidden],
});
