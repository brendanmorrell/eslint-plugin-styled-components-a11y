const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const ruleName = 'control-has-associated-label';
const rule = makeRule(ruleName);

const expectedError = {
  message: 'A control must be associated with a text label.',
  type: 'JSXOpeningElement',
};

// ## VALID
// <button type="button" aria-label="Save" class="icon-save" />
const ariaLabelSaveButton = makeStyledTestCases({
  tag: 'button',
  attrs: `{ type:'button', 'aria-label':'Save', class:'icon-save' }`,
  props: `type="button" aria-label="Save" class="icon-save" `,
});

// ## INVALID
// <button type="button" class="icon-save" />
const button = makeStyledTestCases({
  tag: 'button',
  attrs: "{ type: 'button', class: 'icon-save' }",
  props: 'type="button" class="icon-save"',
  errors: [expectedError],
});

ruleTester.run(ruleName, rule, {
  valid: ariaLabelSaveButton,
  invalid: button,
});
