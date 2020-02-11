const { RuleTester } = require('eslint');
const makeRule = require('../../utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const toStyled = require('../utils/toStyled');
const ruleTester = new RuleTester();

const expectedError = {
  message: 'Avoid positive integer values for tabIndex.',
  type: 'JSXAttribute',
};

const rule = makeRule('tabindex-no-positive');

const invalid = x => `
const H = styled.div\`\`;
const Component = () => <H tabIndex=${x} />
`;
const invalid2 = x => `
const H = styled.div.attrs({ tabIndex:${x} })\`\`;
const Component = () => <H />
`;
const invalid3 = x => `
const H = styled.div.attrs({ tabIndex:${x} })\`\`;
const F = styled(H)\`\`
const Component = () => <F />
`;

const really = `
const H = styled.div.attrs({ tabIndex: \`1\` })\`\`;
const F = styled(H)\`\`
const Component = () => <F />
`;

ruleTester.run('tabindex-no-positive', rule, {
  valid: [
    { code: '<div />;' },
    { code: '<div {...props} />' },
    { code: '<div id="main" />' },
    { code: '<div tabIndex={undefined} />' },
    { code: '<div tabIndex={`${undefined}`} />' },
    { code: '<div tabIndex={`${undefined}${undefined}`} />' },
    { code: '<div tabIndex={0} />' },
    { code: '<div tabIndex={-1} />' },
    { code: '<div tabIndex={null} />' },
    { code: '<div tabIndex={bar()} />' },
    { code: '<div tabIndex={bar} />' },
    { code: '<div tabIndex={"foobar"} />' },
    { code: '<div tabIndex="0" />' },
    { code: '<div tabIndex="-1" />' },
    { code: '<div tabIndex="-5" />' },
    { code: '<div tabIndex="-5.5" />' },
    { code: '<div tabIndex={-5.5} />' },
    { code: '<div tabIndex={-5} />' },
  ]
    .map(toStyled)
    .map(parserOptionsMapper),

  invalid: [
    { code: invalid('"1"'), errors: [expectedError, expectedError] },
    { code: invalid('{1}'), errors: [expectedError, expectedError] },
    { code: invalid('{`1`}'), errors: [expectedError, expectedError] },
    { code: invalid('{.589}'), errors: [expectedError, expectedError] },
    { code: invalid2(1), errors: [expectedError] },
    { code: invalid2('"1"'), errors: [expectedError] },
    { code: invalid2('`1`'), errors: [expectedError] },
    { code: invalid2("'1'"), errors: [expectedError] },
    { code: invalid2(1.589), errors: [expectedError] },
    { code: invalid3(1), errors: [expectedError] },
    { code: invalid3('"1"'), errors: [expectedError] },
    { code: invalid3('`1`'), errors: [expectedError] },
    { code: invalid3("'1'"), errors: [expectedError] },
    { code: invalid3(1.589), errors: [expectedError] },
  ].map(parserOptionsMapper),
});
