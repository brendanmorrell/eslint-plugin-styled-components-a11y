const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const ruleName = 'no-redundant-roles';
const rule = makeRule(ruleName);

const expectedError = (element, implicitRole) =>
  `The element ${element} has an implicit role of ${implicitRole}. Defining this explicitly is redundant and should be avoided.`;

const DEFAULT_ROLE_EXCEPTIONS = { nav: ['navigation'] };

// ## VALID
// <div />
const div = makeStyledTestCases();
// <button role="presentation" />
const buttonRolePresentation = makeStyledTestCases({
  tag: 'button',
  props: 'role="presentation"',
  attrs: "{ role:'presentation' }",
});
// <div role="main" />
const divMainRole = makeStyledTestCases({
  props: 'role="main"',
  attrs: "{ role:'main' }",
});

// ## INVALID
// <button role="button" />
const buttonRoleButton = makeStyledTestCases({
  tag: 'button',
  attrs: "{ role:'button' }",
  props: 'role="button"',
  errors: [expectedError('button', 'button')],
});
// <img role="img" src="foo.jpg" />
const imgRoleImg = makeStyledTestCases({
  tag: 'img',
  attrs: "{ role:'img', src:'foo.jpg' }",
  props: 'role="img" src="foo.jpg"',
  errors: [expectedError('img', 'img')],
});

ruleTester.run(ruleName, rule, {
  valid: [...div, ...buttonRolePresentation, ...divMainRole],
  invalid: [...buttonRoleButton, ...imgRoleImg],
});
