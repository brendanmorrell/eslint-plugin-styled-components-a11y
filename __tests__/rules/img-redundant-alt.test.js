const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const ruleName = 'img-redundant-alt';
const rule = makeRule(ruleName);

const expectedError = {
  message:
    'Redundant alt attribute. Screen-readers already announce `img` tags as an image. You don’t need to use the words `image`, `photo,` or `picture` (or any specified custom words) in the alt prop.',
  type: 'JSXOpeningElement',
};

// ## VALID
// <img src="foo" alt="Foo eating a sandwich." />
const imgAlt = makeStyledTestCases({
  tag: 'img',
  attrs: '{ src:"foo", alt:"Foo eating a sandwich."  }',
  props: 'src="foo" alt="Foo eating a sandwich." ',
});
// <img src="bar" aria-hidden alt="Picture of me taking a photo of an image" />
const imgAltPictureAriaHidden = makeStyledTestCases({
  tag: 'img',
  attrs: `{ src:"bar", 'aria-hidden':true, alt:"Picture of me taking a photo of an image"  }`,
  props: 'src="bar" aria-hidden alt="Picture of me taking a photo of an image"',
});
// <img src="baz" alt={`Baz taking a ${photo}`} /> // This is valid since photo is a variable name.
const imgAltPhotoVariable = makeStyledTestCases({
  tag: 'img',
  attrs: '{ src:"baz", alt:`Baz taking a ${photo}` }',
  props: 'src="baz" alt={`Baz taking a ${photo}`} ',
});

// ## INVALID
// <img src="foo" alt="Photo of foo being weird." />
const photoImg = makeStyledTestCases({
  tag: 'img',
  attrs: `{ src:'foo', alt: 'Photo of foo being weird.' }`,
  props: 'src="foo" alt="Photo of foo being weird." ',
  errors: [expectedError],
});
// <img src="bar" alt="Image of me at a bar!" />
const imageImg = makeStyledTestCases({
  tag: 'img',
  attrs: `{ src:'bar', alt: 'Image of me at a bar!' }`,
  props: 'src="bar" alt="Image of me at a bar!" ',
  errors: [expectedError],
});
// <img src="baz" alt="Picture of baz fixing a bug." />
const pictureImg = makeStyledTestCases({
  tag: 'img',
  attrs: `{ src:'baz', alt: 'Picture of baz fixing a bug.' }`,
  props: 'src="baz" alt="Picture of baz fixing a bug." ',
  errors: [expectedError],
});

ruleTester.run(ruleName, rule, {
  valid: [...imgAlt, ...imgAltPictureAriaHidden, ...imgAltPhotoVariable],
  invalid: [...photoImg, ...imageImg, ...pictureImg],
});
