const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const expectedError = {
  message: 'Avoid positive integer values for tabIndex.',
  type: 'JSXAttribute',
};

const rule = makeRule('tabindex-no-positive');
//  ## VALID
// <div />;
const div = makeStyledTestCases();
// <div {...props} />
const divSpread = makeStyledTestCases({ attrs: '{ ...props }', props: '{...props}' });
// <div id="main" />
const divIdMain = makeStyledTestCases({ id: "{ id: 'main' }", props: 'id="main"' });
// <div tabIndex={undefined} />
const divTabUndefined = makeStyledTestCases({ id: '{ tabIndex: undefined }', props: 'tabIndex={undefined}' });
// <div tabIndex={`${undefined}`} />
const divTabUndefinedTemplate = makeStyledTestCases({
  id: '{ tabIndex: `${undefined}` }',
  props: 'tabIndex={`${undefined}`}',
});
// <div tabIndex={`${undefined}${undefined}`} />
const divTabUndefinedUndefined = makeStyledTestCases({
  id: '{ tabIndex: `${undefined}${undefined}` }',
  props: 'tabIndex={`${undefined}${undefined}`}',
});
// <div tabIndex={0} />
const divTabZero = makeStyledTestCases({ id: '{ tabIndex: 0 }', props: 'tabIndex={0}' });
// <div tabIndex={-1} />
const divTabNegative = makeStyledTestCases({ id: '{ tabIndex: -1 }', props: 'tabIndex={-1}' });
// <div tabIndex={null} />
const divTabNull = makeStyledTestCases({ id: '{ tabIndex: null }', props: 'tabIndex={null}' });
// <div tabIndex={bar()} />
const divTabFunc = makeStyledTestCases({ id: '{ tabIndex: bar() }', props: 'tabIndex={bar()}' });
// <div tabIndex={bar} />
const divTabVar = makeStyledTestCases({ id: '{ tabIndex: bar }', props: 'tabIndex={bar}' });
// <div tabIndex={"foobar"} />
const divTabString = makeStyledTestCases({ id: '{ tabIndex: "foobar" }', props: 'tabIndex={"foobar"}' });
// <div tabIndex="0" />
const divTabStringZero = makeStyledTestCases({ id: '{ tabIndex: "0" }', props: 'tabIndex="0"' });
// <div tabIndex="-1" />
const divTabStringNegative = makeStyledTestCases({ id: '{ tabIndex: "-1" }', props: 'tabIndex="-1"' });
// <div tabIndex="-5" />
const divTabStringNegativeFive = makeStyledTestCases({ id: '{ tabIndex: "-5" }', props: 'tabIndex="-5"' });
// <div tabIndex="-5.5" />
const divTabStringNegativeFiveDecimal = makeStyledTestCases({ id: '{ tabIndex: "-5.5" }', props: 'tabIndex="-5.5"' });
// <div tabIndex={-5.5} />
const divTabNegativeFiveDecimal = makeStyledTestCases({ id: '{ tabIndex: -5.5 }', props: 'tabIndex={-5.5}' });
// <div tabIndex={-5} />
const divTabNegativeFive = makeStyledTestCases({ id: '{ tabIndex: -5 }', props: 'tabIndex={-5}' });

//  ## INVALID

// <div tabIndex="1" />
const divTabStrOne = makeStyledTestCases({
  attrs: '{ tabIndex: "1" }',
  props: 'tabIndex="1"',
  errors: [expectedError],
});
// <div tabIndex={1} />
const divTabOne = makeStyledTestCases({
  attrs: '{ tabIndex: 1 }',
  props: 'tabIndex={1}',
  errors: [expectedError],
});
// <div tabIndex={"1"} />
const divTabOneStrProp = makeStyledTestCases({
  attrs: '{ tabIndex: "1" }',
  props: 'tabIndex={"1"}',
  errors: [expectedError],
});
// <div tabIndex={`1`} />
const divTabOneTemplate = makeStyledTestCases({
  attrs: '{ tabIndex: `1` }',
  props: 'tabIndex={`1`}',
  errors: [expectedError],
});
// <div tabIndex={1.589} />
const divTabDecimal = makeStyledTestCases({
  attrs: '{ tabIndex: 1.589 }',
  props: 'tabIndex={1.589}',
  errors: [expectedError],
});

ruleTester.run('tabindex-no-positive', rule, {
  valid: [
    ...div,
    ...divSpread,
    ...divIdMain,
    ...divTabUndefined,
    ...divTabUndefinedTemplate,
    ...divTabUndefinedUndefined,
    ...divTabZero,
    ...divTabNegative,
    ...divTabNull,
    ...divTabFunc,
    ...divTabVar,
    ...divTabString,
    ...divTabStringZero,
    ...divTabStringNegative,
    ...divTabStringNegativeFive,
    ...divTabStringNegativeFiveDecimal,
    ...divTabNegativeFiveDecimal,
    ...divTabNegativeFive,
  ],

  invalid: [...divTabStrOne, ...divTabOne, ...divTabOneStrProp, ...divTabOneTemplate, ...divTabDecimal],
});
