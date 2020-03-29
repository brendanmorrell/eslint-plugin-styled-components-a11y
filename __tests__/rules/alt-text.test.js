const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const missingPropError = type => ({
  message: `${type} elements must have an alt prop, either with meaningful text, or an empty string for decorative images.`,
  type: 'JSXOpeningElement',
});

const altValueError = type => ({
  message: `Invalid alt value for ${type}. \
Use alt="" for presentational images.`,
  type: 'JSXOpeningElement',
});

const ariaLabelValueError =
  'The aria-label attribute must have a value. The alt attribute is preferred over aria-label for images.';
const ariaLabelledbyValueError =
  'The aria-labelledby attribute must have a value. The alt attribute is preferred over aria-labelledby for images.';

const preferAltError = {
  message:
    'Prefer alt="" over a presentational role. First rule of aria is to not use aria if it can be achieved via native HTML.',
  type: 'JSXOpeningElement',
};

const objectError =
  'Embedded <object> elements must have alternative text by providing inner text, aria-label or aria-labelledby props.';

const areaError =
  'Each area of an image map must have a text alternative through the `alt`, `aria-label`, or `aria-labelledby` prop.';

const inputImageError =
  '<input> elements with type="image" must have a text alternative through the `alt`, `aria-label`, or `aria-labelledby` prop.';
const imgAltTextError =
  'img elements must have an alt prop, either with meaningful text, or an empty string for decorative images.';

const ruleName = 'alt-text';
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

// ## INVALID
//     { code: '<img />;', errors: [missingPropError('img')] },
const imgNoAlt = makeStyledTestCases({
  tag: 'img',
  errors: [missingPropError('img')],
});

// <img src="foo" />
const imgSrcNoAlt = makeStyledTestCases({
  attrs: `{ src: 'foo' }`,
  props: `src="foo"`,
  tag: 'img',
  errors: [missingPropError('img')],
});
// <img {...props} />
const imgPropsSpread = makeStyledTestCases({
  attrs: `{ ...props }`,
  props: `{ ...props }`,
  tag: 'img',
  errors: [missingPropError('img')],
});
// <img {...props} alt /> // Has no value (this one doesnt work with any but the first test since you can't set an abject key with no value. using true doesn't trigger the same error so the tests fail)
const [imgPropsSpreadEmptyAlt] = makeStyledTestCases({
  props: ` {...props} alt `,
  tag: 'img',
  errors: [altValueError('img')],
});
// <img {...props} alt={undefined} /> // Has no value
const imgPropsSpreadUndefinedAlt = makeStyledTestCases({
  attrs: `{ ...props, alt:undefined }`,
  props: ` {...props} alt={undefined} `,
  tag: 'img',
  errors: [altValueError('img')],
});

// <img src="foo" role="presentation" /> // Avoid ARIA if it can be achieved without
const imgSrcRolePresentation = makeStyledTestCases({
  attrs: '{ src:"foo", role:"presentation" }',
  props: ' src="foo" role="presentation"',
  tag: 'img',
  errors: [preferAltError],
});
// <img src="foo" role="none" /> // Avoid ARIA if it can be achieved without
const imgSrcRoleNone = makeStyledTestCases({
  attrs: '{ src:"foo", role:"none" }',
  props: ' src="foo" role="none"',
  tag: 'img',
  errors: [preferAltError],
});

// <object {...props} />
const objectPropsSpread = makeStyledTestCases({
  attrs: '{ ...props }',
  props: ' { ...props } ',
  tag: 'object',
  errors: [objectError],
});
// <area {...props} />
const areaPropsSpread = makeStyledTestCases({
  attrs: '{ ...props }',
  props: ' { ...props } ',
  tag: 'area',
  errors: [areaError],
});

// <input type="image" {...props} />
const inputTypeImagePropsSpread = makeStyledTestCases({
  attrs: '{ type: "image", ...props }',
  props: ' type="image" { ...props } ',
  tag: 'input',
  errors: [inputImageError],
});

// { code: '<img aria-label="foo" />' },
const imgAriaLabelStr = makeStyledTestCases({
  props: 'aria-label="foo"',
  attrs: '{ "aria-label": "foo" }',
  tag: 'img',
  errors: [imgAltTextError],
});

// { code: '<img aria-labelledby="id1" />' },
const imgAriaLabelByStr = makeStyledTestCases({
  props: 'aria-labelledby="id1"',
  attrs: '{ "aria-labelledby": "id1" }',
  tag: 'img',
  errors: [imgAltTextError],
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
  ],
  invalid: [
    ...imgNoAlt,
    ...imgSrcNoAlt,
    ...imgPropsSpread,
    imgPropsSpreadEmptyAlt,
    ...imgPropsSpreadUndefinedAlt,
    ...imgSrcRolePresentation,
    ...imgSrcRoleNone,
    ...objectPropsSpread,
    ...areaPropsSpread,
    ...inputTypeImagePropsSpread,
    ...imgAriaLabelStr,
    ...imgAriaLabelByStr,
  ],
});
