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

  invalid: [...imgNoAlt],
});

// // DEFAULT <object> TESTS
// { code: '<object aria-label="foo" />' },
// { code: '<object aria-labelledby="id1" />' },
// { code: '<object>Foo</object>' },
// { code: '<object><p>This is descriptive!</p></object>' },
// { code: '<Object />' },
// { code: '<object title="An object" />' },

// // DEFAULT <area> TESTS
// { code: '<area aria-label="foo" />' },
// { code: '<area aria-labelledby="id1" />' },
// { code: '<area alt="" />' },
// { code: '<area alt="This is descriptive!" />' },
// { code: '<area alt={altText} />' },
// { code: '<Area />' },

// // DEFAULT <input type="image"> TESTS
// { code: '<input />' },
// { code: '<input type="foo" />' },
// { code: '<input type="image" aria-label="foo" />' },
// { code: '<input type="image" aria-labelledby="id1" />' },
// { code: '<input type="image" alt="" />' },
// { code: '<input type="image" alt="This is descriptive!" />' },
// { code: '<input type="image" alt={altText} />' },
// { code: '<InputImage />' },

// // CUSTOM ELEMENT TESTS FOR ARRAY OPTION TESTS
// { code: '<Thumbnail alt="foo" />;', options: array },
// { code: '<Thumbnail alt={"foo"} />;', options: array },
// { code: '<Thumbnail alt={alt} />;', options: array },
// { code: '<Thumbnail ALT="foo" />;', options: array },
// { code: '<Thumbnail ALT={`This is the ${alt} text`} />;', options: array },
// { code: '<Thumbnail ALt="foo" />;', options: array },
// { code: '<Thumbnail alt="foo" salt={undefined} />;', options: array },
// { code: '<Thumbnail {...this.props} alt="foo" />', options: array },
// { code: '<thumbnail />', options: array },
// { code: '<Thumbnail alt={function(e) {} } />', options: array },
// { code: '<div alt={function(e) {} } />', options: array },
// { code: '<Thumbnail alt={() => void 0} />', options: array },
// { code: '<THUMBNAIL />', options: array },
// { code: '<Thumbnail alt={alt || "foo" } />', options: array },
// { code: '<Image alt="foo" />;', options: array },
// { code: '<Image alt={"foo"} />;', options: array },
// { code: '<Image alt={alt} />;', options: array },
// { code: '<Image ALT="foo" />;', options: array },
// { code: '<Image ALT={`This is the ${alt} text`} />;', options: array },
// { code: '<Image ALt="foo" />;', options: array },
// { code: '<Image alt="foo" salt={undefined} />;', options: array },
// { code: '<Image {...this.props} alt="foo" />', options: array },
// { code: '<image />', options: array },
// { code: '<Image alt={function(e) {} } />', options: array },
// { code: '<div alt={function(e) {} } />', options: array },
// { code: '<Image alt={() => void 0} />', options: array },
// { code: '<IMAGE />', options: array },
// { code: '<Image alt={alt || "foo" } />', options: array },
// { code: '<Object aria-label="foo" />', options: array },
// { code: '<Object aria-labelledby="id1" />', options: array },
// { code: '<Object>Foo</Object>', options: array },
// { code: '<Object><p>This is descriptive!</p></Object>', options: array },
// { code: '<Object title="An object" />', options: array },
// { code: '<Area aria-label="foo" />', options: array },
// { code: '<Area aria-labelledby="id1" />', options: array },
// { code: '<Area alt="" />', options: array },
// { code: '<Area alt="This is descriptive!" />', options: array },
// { code: '<Area alt={altText} />', options: array },
// { code: '<InputImage aria-label="foo" />', options: array },
// { code: '<InputImage aria-labelledby="id1" />', options: array },
// { code: '<InputImage alt="" />', options: array },
// { code: '<InputImage alt="This is descriptive!" />', options: array },
// { code: '<InputImage alt={altText} />', options: array },

// ## INVALID

// const missingPropError = type => ({
//   message: `${type} elements must have an alt prop, either with meaningful text, or an empty string for decorative images.`,
//   type: 'JSXOpeningElement',
// });

// const altValueError = type => ({
//   message: `Invalid alt value for ${type}. \
// Use alt="" for presentational images.`,
//   type: 'JSXOpeningElement',
// });

// const ariaLabelValueError =
//   'The aria-label attribute must have a value. The alt attribute is preferred over aria-label for images.';
// const ariaLabelledbyValueError =
//   'The aria-labelledby attribute must have a value. The alt attribute is preferred over aria-labelledby for images.';

// const preferAltError = () => ({
//   message:
//     'Prefer alt="" over a presentational role. First rule of aria is to not use aria if it can be achieved via native HTML.',
//   type: 'JSXOpeningElement',
// });

// const objectError =
//   'Embedded <object> elements must have alternative text by providing inner text, aria-label or aria-labelledby props.';

// const areaError =
//   'Each area of an image map must have a text alternative through the `alt`, `aria-label`, or `aria-labelledby` prop.';

// const inputImageError =
//   '<input> elements with type="image" must have a text alternative through the `alt`, `aria-label`, or `aria-labelledby` prop.';

// const array = [
//   {
//     img: ['Thumbnail', 'Image'],
//     object: ['Object'],
//     area: ['Area'],
//     'input[type="image"]': ['InputImage'],
//   },
// ];

// ruleTester.run('alt-text', rule, {
//   valid: [
//     // DEFAULT ELEMENT 'img' TESTS
//     { code: '<img alt="foo" />;' },
//     { code: '<img alt={"foo"} />;' },
//     { code: '<img alt={alt} />;' },
//     { code: '<img ALT="foo" />;' },
//     { code: '<img ALT={`This is the ${alt} text`} />;' },
//     { code: '<img ALt="foo" />;' },
//     { code: '<img alt="foo" salt={undefined} />;' },
//     { code: '<img {...this.props} alt="foo" />' },
//     { code: '<a />' },
//     { code: '<div />' },
//     { code: '<img alt={function(e) {} } />' },
//     { code: '<div alt={function(e) {} } />' },
//     { code: '<img alt={() => void 0} />' },
//     { code: '<IMG />' },
//     { code: '<UX.Layout>test</UX.Layout>' },
//     { code: '<img alt={alt || "Alt text" } />' },
//     { code: '<img alt={photo.caption} />;' },
//     { code: '<img alt={bar()} />;' },
//     { code: '<img alt={foo.bar || ""} />' },
//     { code: '<img alt={bar() || ""} />' },
//     { code: '<img alt={foo.bar() || ""} />' },
//     { code: '<img alt="" />' },
//     { code: '<img alt={`${undefined}`} />' },
//     { code: '<img alt=" " />' },
//     { code: '<img alt="" role="presentation" />' },
//     { code: '<img alt="" role="none" />' },
//     { code: '<img alt="" role={`presentation`} />' },
//     { code: '<img alt="" role={"presentation"} />' },
//     { code: '<img alt="this is lit..." role="presentation" />' },
//     { code: '<img alt={error ? "not working": "working"} />' },
//     { code: '<img alt={undefined ? "working": "not working"} />' },
//     { code: '<img alt={plugin.name + " Logo"} />' },
//     { code: '<img aria-label="foo" />' },
//     { code: '<img aria-labelledby="id1" />' },

//     // DEFAULT <object> TESTS
//     { code: '<object aria-label="foo" />' },
//     { code: '<object aria-labelledby="id1" />' },
//     { code: '<object>Foo</object>' },
//     { code: '<object><p>This is descriptive!</p></object>' },
//     { code: '<Object />' },
//     { code: '<object title="An object" />' },

//     // DEFAULT <area> TESTS
//     { code: '<area aria-label="foo" />' },
//     { code: '<area aria-labelledby="id1" />' },
//     { code: '<area alt="" />' },
//     { code: '<area alt="This is descriptive!" />' },
//     { code: '<area alt={altText} />' },
//     { code: '<Area />' },

//     // DEFAULT <input type="image"> TESTS
//     { code: '<input />' },
//     { code: '<input type="foo" />' },
//     { code: '<input type="image" aria-label="foo" />' },
//     { code: '<input type="image" aria-labelledby="id1" />' },
//     { code: '<input type="image" alt="" />' },
//     { code: '<input type="image" alt="This is descriptive!" />' },
//     { code: '<input type="image" alt={altText} />' },
//     { code: '<InputImage />' },

//     // CUSTOM ELEMENT TESTS FOR ARRAY OPTION TESTS
//     { code: '<Thumbnail alt="foo" />;', options: array },
//     { code: '<Thumbnail alt={"foo"} />;', options: array },
//     { code: '<Thumbnail alt={alt} />;', options: array },
//     { code: '<Thumbnail ALT="foo" />;', options: array },
//     { code: '<Thumbnail ALT={`This is the ${alt} text`} />;', options: array },
//     { code: '<Thumbnail ALt="foo" />;', options: array },
//     { code: '<Thumbnail alt="foo" salt={undefined} />;', options: array },
//     { code: '<Thumbnail {...this.props} alt="foo" />', options: array },
//     { code: '<thumbnail />', options: array },
//     { code: '<Thumbnail alt={function(e) {} } />', options: array },
//     { code: '<div alt={function(e) {} } />', options: array },
//     { code: '<Thumbnail alt={() => void 0} />', options: array },
//     { code: '<THUMBNAIL />', options: array },
//     { code: '<Thumbnail alt={alt || "foo" } />', options: array },
//     { code: '<Image alt="foo" />;', options: array },
//     { code: '<Image alt={"foo"} />;', options: array },
//     { code: '<Image alt={alt} />;', options: array },
//     { code: '<Image ALT="foo" />;', options: array },
//     { code: '<Image ALT={`This is the ${alt} text`} />;', options: array },
//     { code: '<Image ALt="foo" />;', options: array },
//     { code: '<Image alt="foo" salt={undefined} />;', options: array },
//     { code: '<Image {...this.props} alt="foo" />', options: array },
//     { code: '<image />', options: array },
//     { code: '<Image alt={function(e) {} } />', options: array },
//     { code: '<div alt={function(e) {} } />', options: array },
//     { code: '<Image alt={() => void 0} />', options: array },
//     { code: '<IMAGE />', options: array },
//     { code: '<Image alt={alt || "foo" } />', options: array },
//     { code: '<Object aria-label="foo" />', options: array },
//     { code: '<Object aria-labelledby="id1" />', options: array },
//     { code: '<Object>Foo</Object>', options: array },
//     { code: '<Object><p>This is descriptive!</p></Object>', options: array },
//     { code: '<Object title="An object" />', options: array },
//     { code: '<Area aria-label="foo" />', options: array },
//     { code: '<Area aria-labelledby="id1" />', options: array },
//     { code: '<Area alt="" />', options: array },
//     { code: '<Area alt="This is descriptive!" />', options: array },
//     { code: '<Area alt={altText} />', options: array },
//     { code: '<InputImage aria-label="foo" />', options: array },
//     { code: '<InputImage aria-labelledby="id1" />', options: array },
//     { code: '<InputImage alt="" />', options: array },
//     { code: '<InputImage alt="This is descriptive!" />', options: array },
//     { code: '<InputImage alt={altText} />', options: array },
//   ].map(parserOptionsMapper),
//   invalid: [
//     // DEFAULT ELEMENT 'img' TESTS
//     { code: '<img />;', errors: [missingPropError('img')] },
//     { code: '<img alt />;', errors: [altValueError('img')] },
//     { code: '<img alt={undefined} />;', errors: [altValueError('img')] },
//     { code: '<img src="xyz" />', errors: [missingPropError('img')] },
//     { code: '<img role />', errors: [missingPropError('img')] },
//     { code: '<img {...this.props} />', errors: [missingPropError('img')] },
//     { code: '<img alt={false || false} />', errors: [altValueError('img')] },
//     { code: '<img alt={undefined} role="presentation" />;', errors: [altValueError('img')] },
//     { code: '<img alt role="presentation" />;', errors: [altValueError('img')] },
//     { code: '<img role="presentation" />;', errors: [preferAltError()] },
//     { code: '<img role="none" />;', errors: [preferAltError()] },
//     { code: '<img aria-label={undefined} />', errors: [ariaLabelValueError] },
//     { code: '<img aria-labelledby={undefined} />', errors: [ariaLabelledbyValueError] },
//     { code: '<img aria-label="" />', errors: [ariaLabelValueError] },
//     { code: '<img aria-labelledby="" />', errors: [ariaLabelledbyValueError] },

//     // DEFAULT ELEMENT 'object' TESTS
//     { code: '<object />', errors: [objectError] },
//     { code: '<object><div aria-hidden /></object>', errors: [objectError] },
//     { code: '<object title={undefined} />', errors: [objectError] },
//     { code: '<object aria-label="" />', errors: [objectError] },
//     { code: '<object aria-labelledby="" />', errors: [objectError] },
//     { code: '<object aria-label={undefined} />', errors: [objectError] },
//     { code: '<object aria-labelledby={undefined} />', errors: [objectError] },

//     // DEFAULT ELEMENT 'area' TESTS
//     { code: '<area />', errors: [areaError] },
//     { code: '<area alt />', errors: [areaError] },
//     { code: '<area alt={undefined} />', errors: [areaError] },
//     { code: '<area src="xyz" />', errors: [areaError] },
//     { code: '<area {...this.props} />', errors: [areaError] },
//     { code: '<area aria-label="" />', errors: [areaError] },
//     { code: '<area aria-label={undefined} />', errors: [areaError] },
//     { code: '<area aria-labelledby="" />', errors: [areaError] },
//     { code: '<area aria-labelledby={undefined} />', errors: [areaError] },

//     // DEFAULT ELEMENT 'input type="image"' TESTS
//     { code: '<input type="image" />', errors: [inputImageError] },
//     { code: '<input type="image" alt />', errors: [inputImageError] },
//     { code: '<input type="image" alt={undefined} />', errors: [inputImageError] },
//     { code: '<input type="image">Foo</input>', errors: [inputImageError] },
//     { code: '<input type="image" {...this.props} />', errors: [inputImageError] },
//     { code: '<input type="image" aria-label="" />', errors: [inputImageError] },
//     { code: '<input type="image" aria-label={undefined} />', errors: [inputImageError] },
//     { code: '<input type="image" aria-labelledby="" />', errors: [inputImageError] },
//     { code: '<input type="image" aria-labelledby={undefined} />', errors: [inputImageError] },

//     // CUSTOM ELEMENT TESTS FOR ARRAY OPTION TESTS
//     {
//       code: '<Thumbnail />;',
//       errors: [missingPropError('Thumbnail')],
//       options: array,
//     },
//     {
//       code: '<Thumbnail alt />;',
//       errors: [altValueError('Thumbnail')],
//       options: array,
//     },
//     {
//       code: '<Thumbnail alt={undefined} />;',
//       errors: [altValueError('Thumbnail')],
//       options: array,
//     },
//     {
//       code: '<Thumbnail src="xyz" />',
//       errors: [missingPropError('Thumbnail')],
//       options: array,
//     },
//     {
//       code: '<Thumbnail {...this.props} />',
//       errors: [missingPropError('Thumbnail')],
//       options: array,
//     },
//     { code: '<Image />;', errors: [missingPropError('Image')], options: array },
//     { code: '<Image alt />;', errors: [altValueError('Image')], options: array },
//     {
//       code: '<Image alt={undefined} />;',
//       errors: [altValueError('Image')],
//       options: array,
//     },
//     {
//       code: '<Image src="xyz" />',
//       errors: [missingPropError('Image')],
//       options: array,
//     },
//     {
//       code: '<Image {...this.props} />',
//       errors: [missingPropError('Image')],
//       options: array,
//     },
//     { code: '<Object />', errors: [objectError], options: array },
//     { code: '<Object><div aria-hidden /></Object>', errors: [objectError], options: array },
//     { code: '<Object title={undefined} />', errors: [objectError], options: array },
//     { code: '<Area />', errors: [areaError], options: array },
//     { code: '<Area alt />', errors: [areaError], options: array },
//     { code: '<Area alt={undefined} />', errors: [areaError], options: array },
//     { code: '<Area src="xyz" />', errors: [areaError], options: array },
//     { code: '<Area {...this.props} />', errors: [areaError], options: array },
//     { code: '<InputImage />', errors: [inputImageError], options: array },
//     { code: '<InputImage alt />', errors: [inputImageError], options: array },
//     { code: '<InputImage alt={undefined} />', errors: [inputImageError], options: array },
//     { code: '<InputImage>Foo</InputImage>', errors: [inputImageError], options: array },
//     { code: '<InputImage {...this.props} />', errors: [inputImageError], options: array },
//   ].map(parserOptionsMapper),
// });
