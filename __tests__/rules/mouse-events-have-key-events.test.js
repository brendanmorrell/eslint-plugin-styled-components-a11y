const mouseOverError = {
  message: 'onMouseOver must be accompanied by onFocus for accessibility.',
  type: 'JSXOpeningElement',
};
const mouseOutError = {
  message: 'onMouseOut must be accompanied by onBlur for accessibility.',
  type: 'JSXOpeningElement',
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
// <div onMouseOver={ () => void 0 } onFocus={ () => void 0 } />
const divMouseOverFocus = makeStyledTestCases({
  attrs: '{ onMouseOver:() => 0 , onFocus: () => 0}',
  props: 'onMouseOver={ () => void 0 } onFocus={ () => void 0 }',
});
// <div onMouseOut={ () => void 0 } onBlur={ () => void 0 } />
// <div onMouseOver={ () => void 0 } onFocus={ () => void 0 } {...otherProps} />
// <div onMouseOut={ () => void 0 } onBlur={ () => void 0 } {...otherProps} />

// ## INVALID
// <div onMouseOver={ () => void 0 } />
const divMouseOverNoFocus = makeStyledTestCases({
  attrs: '{ onMouseOver:() => 0 }',
  props: 'onMouseOver={ () => void 0 }',
  errors: [mouseOverError],
});
// <div onMouseOut={ () => void 0 } />
// <div onMouseOver={ () => void 0 } {...otherProps} />
// <div onMouseOut={ () => void 0 } {...otherProps} />
return console.log(divMouseOverNoFocus);
ruleTester.run(ruleName, rule, {
  valid: [...divMouseOverFocus],
  invalid: [...divMouseOverNoFocus],
});
