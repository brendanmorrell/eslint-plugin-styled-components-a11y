const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const expectedError = {
  message: 'An element that manages focus with `aria-activedescendant` must be tabbable',
  type: 'JSXOpeningElement',
};

const ruleName = 'aria-activedescendant-has-tabindex';
const rule = makeRule(ruleName);

//  ##VALID

// <CustomComponent />
const CustomComponent = makeStyledTestCases({ tag: 'CustomComponent' });
// <CustomComponent aria-activedescendant={someID} />;
const CustomComponentAriaActiveDescendantJsxVar = makeStyledTestCases({
  props: "{'aria-activedescendan':someID }",
  props: 'aria-activedescendant={someID}',
  tag: 'CustomComponent',
});

// <CustomComponent aria-activedescendant={someID} tabIndex={0} />
const CustomComponentAriaActiveDescendantJsxVarTabIndex = makeStyledTestCases({
  props: "{'aria-activedescendan':someID,tabIndex: 0 }",
  props: 'aria-activedescendant={someID} tabIndex={0} ',
  tag: 'CustomComponent',
});
// <CustomComponent aria-activedescendant={someID} tabIndex={-1} />
const CustomComponentAriaActiveDescendantJsxVarNegativeTabIndex = makeStyledTestCases({
  props: "{'aria-activedescendan':someID,tabIndex: -1 }",
  props: 'aria-activedescendant={someID} tabIndex={-1} ',
  tag: 'CustomComponent',
});
// <div />
const div = makeStyledTestCases();
// <input />
const input = makeStyledTestCases({
  tag: 'input',
});
// <div tabIndex={0} />
const divTabIndexZero = makeStyledTestCases({
  attrs: '{ tabIndex:0 }',
  props: 'tabIndex={0}',
});
// <div aria-activedescendant={someID} tabIndex={0} />
const divAriaActivedescendantJsxVarTabIndexZero = makeStyledTestCases({
  attrs: "{ 'aria-activedescendant':someID, tabIndex:0 }",
  props: 'aria-activedescendant={someID} tabIndex={0}',
});
// <div aria-activedescendant={someID} tabIndex="0" />
const divAriaActivedescendantJsxVarTabIndexZeroStr = makeStyledTestCases({
  attrs: `{ 'aria-activedescendant':someID, tabIndex:"0" }`,
  props: 'aria-activedescendant={someID} tabIndex="0"',
});
// <div aria-activedescendant={someID} tabIndex={1} />
const divAriaActivedescendantJsxVarTabIndexOne = makeStyledTestCases({
  attrs: `{ 'aria-activedescendant':someID, tabIndex:1 }`,
  props: 'aria-activedescendant={someID} tabIndex="1"',
});
// <input aria-activedescendant={someID} />
const inputAriaActivedescendantJsxVar = makeStyledTestCases({
  attrs: `{ 'aria-activedescendant':someID }`,
  props: 'aria-activedescendant={someID}',
  tag: 'input',
});
// <input aria-activedescendant={someID} tabIndex={0} />
const inputAriaActivedescendantJsxVarTabIndexZero = makeStyledTestCases({
  attrs: `{ 'aria-activedescendant':someID, tabIndex:0 }`,
  props: 'aria-activedescendant={someID} tabIndex={0}',
  tag: 'input',
});

//  ##INVALID
// <div aria-activedescendant={someID} />
const divAriaActiveDescendant = makeStyledTestCases({
  attrs: "{ 'aria-activedescendant':someID }",
  props: 'aria-activedescendant={someID}',
  tag: 'div',
  errors: [expectedError],
});
// <div aria-activedescendant={someID} tabIndex={-1} />
const divAriaActiveDescendantNegativeTabIndex = makeStyledTestCases({
  attrs: "{ 'aria-activedescendant':someID, tabIndex:-1 }",
  props: 'aria-activedescendant={someID} tabIndex={-1}',
  tag: 'div',
  errors: [expectedError],
});
// <div aria-activedescendant={someID} tabIndex="-1" />
const divAriaActiveDescendantNegativeTabIndexString = makeStyledTestCases({
  attrs: `{ 'aria-activedescendant':someID, tabIndex:"-1" }`,
  props: 'aria-activedescendant={someID} tabIndex="-1"',
  tag: 'div',
  errors: [expectedError],
});
// <input aria-activedescendant={someID} tabIndex={-1} />
const inputAriaActiveDescendantNegative = makeStyledTestCases({
  attrs: `{ 'aria-activedescendant':someID, tabIndex:-1 }`,
  props: 'aria-activedescendant={someID} tabIndex={-1}',
  tag: 'input',
  errors: [expectedError],
});

ruleTester.run(ruleName, rule, {
  valid: [
    ...CustomComponent,
    ...CustomComponentAriaActiveDescendantJsxVar,
    ...CustomComponentAriaActiveDescendantJsxVarTabIndex,
    ...CustomComponentAriaActiveDescendantJsxVarNegativeTabIndex,
    ...div,
    ...input,
    ...divTabIndexZero,
    ...divAriaActivedescendantJsxVarTabIndexZero,
    ...divAriaActivedescendantJsxVarTabIndexZeroStr,
    ...divAriaActivedescendantJsxVarTabIndexOne,
    ...inputAriaActivedescendantJsxVar,
    ...inputAriaActivedescendantJsxVarTabIndexZero,
  ],
  invalid: [
    ...divAriaActiveDescendant,
    ...divAriaActiveDescendantNegativeTabIndex,
    ...divAriaActiveDescendantNegativeTabIndexString,
    ...inputAriaActiveDescendantNegative,
  ],
});
