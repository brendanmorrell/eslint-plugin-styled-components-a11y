const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const ruleName = 'aria-unsupported-elements';
const rule = makeRule(ruleName);

const errorMessage = invalidProp => ({
  message: `This element does not support ARIA roles, states and properties. \
Try removing the prop '${invalidProp}'.`,
  type: 'JSXOpeningElement',
});

// ##VALID
// <meta charset="UTF-8" />
const metaCharset = makeStyledTestCases({
  attrs: "{ 'charset': 'UTF-8' }",
  props: 'charset="UTF-8"',
  tag: 'meta',
});
// ##INVALID
// <meta charset="UTF-8" aria-hidden="false" />
const metaCharsetAriaHidden = makeStyledTestCases({
  attrs: "{ 'aria-hidden': false }",
  props: 'aria-hidden="false"',
  tag: 'meta',
  errors: [errorMessage('aria-hidden')],
});

ruleTester.run(ruleName, rule, {
  valid: [...metaCharset],
  invalid: [...metaCharsetAriaHidden],
});
