const { RuleTester } = require('eslint');
const makeRule = require('../../utils/makeRule');
const parserOptionsMapper = require('../utils/parserOptionsMapper');
const toStyled = require('../utils/toStyled');
const ruleTester = new RuleTester();

const expectedError = {
  message: 'The scope prop can only be used on <th> elements.',
  type: 'JSXAttribute',
};

const attrsToProps = attrs => Object.entries(attrs).map(([key, value]) =>`${key}=${typeof value === 'string' ? `"${value}"` : `{${value}}`}`).join(' ')
const attrsToAttrsObj = attrs => `{${Object.entries(attrs).map(([key, value]) =>`${key}: ${typeof value === 'string' ? `"${value}"` : value}`).join(', ')}}`


const regular = ({ tag = 'div', attrs ={}, children ='children' } = {}) => `
  const STYLED = styled.${tag}\`\`;
  const Func = () => <STYLED ${attrsToProps(attrs)}>${children}</STYLED>;
`;


const withStyledAttrs = ({ tag = 'div', attrs ={}, children ='children' } = {}) => `
  const STYLED = styled.${tag}.attrs(${attrsToAttrsObj(attrs)})\`\`;
  const Func = () => <STYLED>${children}</STYLED>;
`;

const withStyledComponent = ({ tag = 'div', attrs ={}, children ='children' } = {}) => `
  const STYLED = styled.${tag}.attrs(${attrsToAttrsObj(attrs)})\`\`;
  const NESTED = styled(STYLED)\`\`;
  const Func = () => <NESTED>${children}</NESTED>;
`;

const withStyledComponentAsOther = ({ tag = 'div', attrs ={}, children ='children' } = {}) => `
  const STYLED = styled.${tag === 'button' ? 'div' : 'button'}.attrs(${attrsToAttrsObj(attrs)})\`\`;
  const NESTED = styled(STYLED)\`\`;
  const Func = () => <NESTED as="${tag}">${children}</NESTED>;
`;





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
const ruleName = 'scope'
const rule = makeRule(ruleName);



ruleTester.run(ruleName, rule, {
  valid: [
    { code: '<div />;' },
    { code: '<div foo />;' },
    { code: '<th scope />' },
    { code: '<th scope="row" />' },
    { code: '<th scope={foo} />' },
    { code: '<th scope={"col"} {...props} />' },
    { code: '<Foo scope="bar" {...props} />' },
    { code: '<Foo scope="bar" {...props} />` },
  ]
    .map(toStyled)
    .map(parserOptionsMapper),
  invalid: [{ code: '<div scope />', errors: [expectedError] }].map(parserOptionsMapper),
});
