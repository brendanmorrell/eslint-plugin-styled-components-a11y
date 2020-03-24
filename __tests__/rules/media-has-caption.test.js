const { RuleTester } = require('eslint');
const makeRule = require('../../src/utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const getSuggestion = require('../utils/getSuggestion.js');

const ruleTester = new RuleTester();
const makeStyledTestCases = require('../utils/makeStyledTestCases');

const ruleName = 'media-has-caption';
const rule = makeRule(ruleName);

const expectedError = {};

// ## VALID
// <audio><track kind="captions" {...props} /></audio>
const audioTrackCaptions = makeStyledTestCases({
  tag: 'audio',
  children: '<track kind="captions" {...props} />',
});
// <video><track kind="captions" {...props} /></video>
const videoTrackCaptions = makeStyledTestCases({
  tag: 'video',
  attrs: '{ ...props }',
  props: '{ ...props }',
  children: '<track kind="captions" {...props} />',
});
// <video muted {...props} ></video>
const videoMutedNoCaptions = makeStyledTestCases({
  tag: 'video',
  attrs: '{ ...props }',
  props: '{ ...props }',
  children: '<track kind="captions" {...props} />',
});
// ## INVALID
const audioNoCaptions = makeStyledTestCases({
  tag: 'audio',
  attrs: '{ ...props }',
  props: '{ ...props }',
  errors: [expectedError],
});
const videoNoCaptions = makeStyledTestCases({
  tag: 'video',
  attrs: '{ ...props }',
  props: '{ ...props }',
  errors: [expectedError],
});

ruleTester.run(ruleName, rule, {
  valid: [...audioTrackCaptions],
  invalid: [...audioNoCaptions, ...videoNoCaptions],
});
