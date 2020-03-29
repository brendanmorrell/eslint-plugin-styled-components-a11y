const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const ruleName = 'role-supports-aria-props';
const rule = makeRule(ruleName);

const errorMessage = (attr, role, tag, isImplicit) => {
  if (isImplicit) {
    `The attribute ${attr} is not supported by the role ${role}. \
This role is implicit on the element ${tag}.`;
  }

  return `The attribute ${attr} is not supported by the role ${role}.`;
};

// ## VALID
// <!-- Good: the radiogroup role does support the aria-required property -->
// <ul role="radiogroup" aria-required aria-labelledby="foo">
//     <li tabIndex="-1" role="radio" aria-checked="false">Rainbow Trout</li>
//     <li tabIndex="-1" role="radio" aria-checked="false">Brook Trout</li>
//     <li tabIndex="0" role="radio" aria-checked="true">Lake Trout</li>
// </ul>
const radioGroupAriaRequired = makeStyledTestCases({
  tag: 'ul',
  attrs: "{ role:'radiogroup','aria-required':true, 'aria-labelledby':'foo' }",
  props: 'role="radiogroup" aria-required aria-labelledby="foo"',
  children: `
            <li tabIndex="-1" role="radio" aria-checked="false">Rainbow Trout</li>        
            <li tabIndex="-1" role="radio" aria-checked="false">Brook Trout</li>
            <li tabIndex="0" role="radio" aria-checked="true">Lake Trout</li>`,
});

// ## INVALID
// <!-- Bad: the radio role does not support the aria-required property -->
// <ul role="radio" aria-required aria-labelledby="foo">
//     <li aria-required tabIndex="-1" role="radio" aria-checked="false">Rainbow Trout</li>
//     <li aria-required tabIndex="-1" role="radio" aria-checked="false">Brook Trout</li>
//     <li aria-required tabIndex="0" role="radio" aria-checked="true">Lake Trout</li>
// </ul>

const radioGroupNoAriaRequired = makeStyledTestCases({
  tag: 'ul',
  attrs: "{ role:'button', 'aria-required':true,'aria-labelledby':'foo' }",
  props: 'role="button" aria-required aria-labelledby="foo"',
  children: `
            <li aria-required tabIndex="-1" role="radio" aria-checked="false">Rainbow Trout</li>
            <li aria-required tabIndex="-1" role="radio" aria-checked="false">Brook Trout</li>
            <li aria-required tabIndex="0" role="radio" aria-checked="true">Lake Trout</li>`,
  errors: [errorMessage('aria-required', 'button')],
});

ruleTester.run(ruleName, rule, {
  valid: radioGroupAriaRequired,
  invalid: radioGroupNoAriaRequired,
});
