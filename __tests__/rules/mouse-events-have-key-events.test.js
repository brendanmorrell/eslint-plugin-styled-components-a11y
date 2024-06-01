const mouseOverError = {
  message: 'onMouseOver must be accompanied by onFocus for accessibility.',
};
const mouseOutError = {
  message: 'onMouseOut must be accompanied by onBlur for accessibility.',
};

const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const ruleName = 'mouse-events-have-key-events';
const rule = makeRule(ruleName);

const expectedError = {};

// ## VALID
// <div onMouseOver={() => 0} onFocus={() => 0} />
const divMouseOverFocus = makeStyledTestCases({
  attrs: '{ onMouseOver:() => 0 , onFocus: () => 0}',
  props: 'onMouseOver={() => 0} onFocus={() => 0}',
});
// <div onMouseOut={() => 0} onBlur={() => 0} />
const divMouseOutBlur = makeStyledTestCases({
  attrs: '{ onMouseOut:() => 0 , onBlur: () => 0}',
  props: 'onMouseOut={() => 0} onBlur={() => 0}',
});
// <div onMouseOver={() => 0} onFocus={() => 0} {...otherProps} />
const divMouseOverFocuseSpread = makeStyledTestCases({
  attrs: '{ onMouseOver:() => 0 , onFocus: () => 0,...props}',
  props: 'onMouseOver={() => 0} onFocus={() => 0} {...props}',
});
// <div onMouseOut={() => 0} onBlur={() => 0} {...otherProps} />
const divMouseOutBlurSpread = makeStyledTestCases({
  attrs: '{ onMouseOut:() => 0 , onBlur: () => 0,...props}',
  props: 'onMouseOut={() => 0} onBlur={() => 0} {...props}',
});

// ## INVALID
// <div onMouseOver={() => 0} />
const divMouseOverNoFocus = makeStyledTestCases({
  attrs: '{ onMouseOver:() => 0}',
  props: 'onMouseOver={() => 0}',
  errors: [mouseOverError],
});
// <div onMouseOut={() => 0} />
const divMouseOutNoFocus = makeStyledTestCases({
  attrs: '{ onMouseOut:() => 0}',
  props: 'onMouseOut={() => 0}',
  errors: [mouseOutError],
});
// <div onMouseOver={() => 0} {...props} />
const divMouseOutNoFocusSpread = makeStyledTestCases({
  attrs: '{ onMouseOver:() => 0, ...props }',
  props: 'onMouseOver={() => 0} {...props}',
  errors: [mouseOverError],
});
// <div onMouseOut={() => 0} {...props} />
const divMouseOverNoFocusSpread = makeStyledTestCases({
  attrs: '{ onMouseOut:() => 0, props }',
  props: 'onMouseOut={() => 0} {..props}',
  errors: [mouseOutError],
});

ruleTester.run(ruleName, rule, {
  valid: [...divMouseOverFocus, ...divMouseOutBlur, ...divMouseOverFocuseSpread, ...divMouseOutBlurSpread],
  invalid: [...divMouseOverNoFocus, ...divMouseOutNoFocus, ...divMouseOutNoFocusSpread, ...divMouseOutNoFocusSpread],
});
