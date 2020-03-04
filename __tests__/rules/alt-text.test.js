const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const expectedError = {
  message: 'The scope prop can only be used on <th> elements.',
  type: 'JSXAttribute',
};
const ruleName = 'scope';
const rule = makeRule(ruleName);

// ## VALID
// DEFAULT ELEMENT 'img' TESTS
// { code: '<img alt="foo" />;' },
const ImgAltStr = makeStyledTestCases({
  props: 'alt="foo"',
  attrs: '{ alt: "foo" }',
  tag: 'img',
});
// { code: '<img alt={"foo"} />;' },
const ImgAltStrProp = makeStyledTestCases({
  props: 'alt={"foo"}',
  attrs: '{ alt: "foo" }',
  tag: 'img',
});

// { code: '<img alt={alt} />;' },
const ImgAltProp = makeStyledTestCases({
  props: 'alt={alt}',
  attrs: '{ alt: alt }',
  tag: 'img',
});
// { code: '<img ALT="foo" />;' },
const ImgALTStr = makeStyledTestCases({
  props: 'ALT="foo"',
  attrs: '{ ALT: "foo" }',
  tag: 'img',
});
// { code: '<img ALT={`This is the ${alt} text`} />;' },
const ImgALTTemplateStrProp = makeStyledTestCases({
  props: 'ALT={`This is the ${alt} text`}',
  attrs: '{ ALT: `This is the ${alt} text` }',
  tag: 'img',
});
// { code: '<img ALt="foo" />;' },
const ImgALtStr = makeStyledTestCases({
  props: 'ALt="foo"',
  attrs: "{ ALt: 'foo' }",
  tag: 'img',
});
// { code: '<img alt="foo" salt={undefined} />;' },
const ImgAltStrSalt = makeStyledTestCases({
  props: 'alt="foo" salt={undefined}',
  attrs: "{ alt: 'foo', salt:undefined }",
  tag: 'img',
});

// { code: '<img {...this.props} alt="foo" />' },
const ImgSpreadAltStr = makeStyledTestCases({
  props: '{...this.props } alt="foo"',
  attrs: "{ ...this.props, alt: 'foo' }",
  tag: 'img',
});

// { code: '<a />' },
const anchor = makeStyledTestCases({
  tag: 'a',
});

// { code: '<div />' },
const div = makeStyledTestCases();

// { code: '<img alt={function(e) {} } />' },
const imgAltFunc = makeStyledTestCases({
  props: 'alt={function(e) {}}',
  attrs: '{ alt: function(){} }',
  tag: 'img',
});

// { code: '<div alt={function(e) {} } />' },
const divAltFunc = makeStyledTestCases({
  props: 'alt={function(e) {}}',
  attrs: '{ alt: function(e){} }',
});

// { code: '<img alt={() => void 0} />' },
const imgAltArrowFunc = makeStyledTestCases({
  props: 'alt={() => void 0}',
  attrs: '{ alt: () => void 0 }',
  tag: 'img',
});

// { code: '<img alt={alt || "Alt text" } />' },
const imgAltVarOrStr = makeStyledTestCases({
  props: 'alt={alt || "Alt text" }',
  attrs: '{ alt: alt || "Alt text"  }',
  tag: 'img',
});
// { code: '<img alt={photo.caption} />;' },
const imgAltObjProp = makeStyledTestCases({
  props: 'alt={photo.caption}',
  attrs: '{ alt: photo.caption }',
  tag: 'img',
});
// { code: '<img alt={bar()} />;' },
const imgAltCalledFunc = makeStyledTestCases({
  props: 'alt={bar()}',
  attrs: '{ alt: bar() }',
  tag: 'img',
});
// { code: '<img alt={foo.bar || ""} />' },
const imgAltObjPropOrEmptyStr = makeStyledTestCases({
  props: 'alt={foo.bar || ""}',
  attrs: '{ alt: foo.bar || "" }',
  tag: 'img',
});
// { code: '<img alt={bar() || ""} />' },
const imgAltCalledFuncOrEmptyStr = makeStyledTestCases({
  props: 'alt={bar() || ""}',
  attrs: '{ alt: bar() || "" }',
  tag: 'img',
});
// { code: '<img alt={foo.bar() || ""} />' },
const imgAltObjPropCalledFuncOrEmptyStr = makeStyledTestCases({
  props: 'alt={foo.bar() || ""}',
  attrs: '{ alt: foo.bar() || "" }',
  tag: 'img',
});
// { code: '<img alt="" />' },
const imgAltEmptyStr = makeStyledTestCases({
  props: 'alt=""',
  attrs: '{ alt: "" }',
  tag: 'img',
});
// { code: '<img alt={`${undefined}`} />' },
const imgAltTemplateStrUndefined = makeStyledTestCases({
  props: 'alt={`${undefined}`}',
  attrs: '{ alt: `${undefined}` }',
  tag: 'img',
});
// { code: '<img alt=" " />' },
const imgAltWhitespace = makeStyledTestCases({
  props: 'alt=" "',
  attrs: '{ alt: " " }',
  tag: 'img',
});
// { code: '<img alt="" role="presentation" />' },
const imgAltEmptyRolePresentation = makeStyledTestCases({
  props: 'alt="" role="presentation"',
  attrs: '{ alt: "", role: "presentation" }',
  tag: 'img',
});
// { code: '<img alt="" role="none" />' },
const imgAltEmptyRoleNone = makeStyledTestCases({
  props: 'alt="" role="none"',
  attrs: '{ alt: "", role: "none" }',
  tag: 'img',
});
// { code: '<img alt="" role={`presentation`} />' },
const imgAltEmptyRoleTemplatePresentation = makeStyledTestCases({
  props: 'alt="" role={`presentation`}',
  attrs: '{ alt: "", role: `presentation` }',
  tag: 'img',
});

// { code: '<img alt="this is lit..." role="presentation" />' },
const imgAltStrRolePresentation = makeStyledTestCases({
  props: 'alt="this is lit..." role="presentation"',
  attrs: '{ alt: "this is lit...", role: "presentation" }',
  tag: 'img',
});
// { code: '<img alt={error ? "not working": "working"} />' },
const imgAltTernaryObjStrStr = makeStyledTestCases({
  props: 'alt={error ? "not working": "working"}',
  attrs: '{ alt: error ? "not working": "working" }',
  tag: 'img',
});
// { code: '<img alt={undefined ? "working": "not working"} />' },
const imgAltTernaryUndefinedStrStr = makeStyledTestCases({
  props: 'alt={undefined ? "working": "not working"}',
  attrs: '{ alt: undefined ? "working": "not working" }',
  tag: 'img',
});
// { code: '<img alt={plugin.name + " Logo"} />' },
const imgAltObjPropPlusStr = makeStyledTestCases({
  props: 'alt={plugin.name + " Logo"}',
  attrs: '{ alt: plugin.name + " Logo" }',
  tag: 'img',
});
// { code: '<img aria-label="foo" />' },
const imgAriaLabelStr = makeStyledTestCases({
  props: 'aria-label="foo"',
  attrs: '{ "aria-label": "foo" }',
  tag: 'img',
});
// { code: '<img aria-labelledby="id1" />' },
const imgAriaLabelByStr = makeStyledTestCases({
  props: 'aria-labelledby="id1"',
  attrs: '{ "aria-labelledby": "id1" }',
  tag: 'img',
});

const missingPropError = type => ({
  message: `${type} elements must have an alt prop, either with meaningful text, or an empty string for decorative images.`,
  type: 'JSXOpeningElement',
});

// ## INVALID
//     { code: '<img />;', errors: [missingPropError('img')] },
const imgNoAlt = makeStyledTestCases({
  type: 'img',
  errors: [missingPropError('img')],
});
ruleTester.run(ruleName, rule, {
  valid: [
    ...ImgAltStr,
    ...ImgAltStrProp,
    ...ImgAltProp,
    ...ImgALTStr,
    ...ImgALTTemplateStrProp,
    ...ImgALtStr,
    ...ImgAltStrSalt,
    ...ImgSpreadAltStr,
    ...anchor,
    ...div,
    ...imgAltFunc,
    ...divAltFunc,
    ...imgAltArrowFunc,
    ...imgAltVarOrStr,
    ...imgAltObjProp,
    ...imgAltCalledFunc,
    ...imgAltObjPropOrEmptyStr,
    ...imgAltCalledFuncOrEmptyStr,
    ...imgAltObjPropCalledFuncOrEmptyStr,
    ...imgAltEmptyStr,
    ...imgAltTemplateStrUndefined,
    ...imgAltWhitespace,
    ...imgAltEmptyRolePresentation,
    ...imgAltEmptyRoleNone,
    ...imgAltEmptyRoleTemplatePresentation,
    ...imgAltStrRolePresentation,
    ...imgAltTernaryObjStrStr,
    ...imgAltTernaryUndefinedStrStr,
    ...imgAltObjPropPlusStr,
    ...imgAriaLabelStr,
    ...imgAriaLabelByStr,
  ],
  invalid: [
    /* ...imgNoAlt */
  ],
});
