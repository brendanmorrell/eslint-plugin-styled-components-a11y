const parserOptionsMapper = require('./parserOptionsMapper');

const regular = ({ tag = 'div', attrs = '{}', props = '', children = 'children', errors } = {}) =>
  [
    {
      code: `
  const STYLED = styled.${tag}\`\`;
  const Func = () => <STYLED ${props}>${children}</STYLED>;
`,
      errors,
    },
  ].map(parserOptionsMapper);

const withStyledAttrs = ({ tag = 'div', attrs = '{}', children = 'children', errors } = {}) =>
  [
    {
      code: `
  const STYLED = styled.${tag}.attrs(${attrs})\`\`;
  const Func = () => <STYLED>${children}</STYLED>;
`,
      errors,
    },
  ].map(parserOptionsMapper);

const withStyledComponent = ({ tag = 'div', attrs = '{}', children = 'children', errors } = {}) =>
  [
    {
      code: `
  const STYLED = styled.${tag}.attrs(${attrs})\`\`;
  const NESTED = styled(STYLED)\`\`;
  const Func = () => <NESTED>${children}</NESTED>;
`,
      errors,
    },
  ].map(parserOptionsMapper);

const withStyledComponentAsOther = ({ tag = 'div', attrs = '{}', children = 'children', errors } = {}) =>
  [
    {
      code: `
  const STYLED = styled.${tag === 'button' ? 'div' : 'button'}.attrs(${attrs})\`\`;
  const NESTED = styled(STYLED)\`\`;
  const Func = () => <NESTED as="${tag}">${children}</NESTED>;
`,
      errors,
    },
  ].map(parserOptionsMapper);

const makeStyledTestCases = args =>
  [regular, withStyledAttrs, withStyledComponent, withStyledComponentAsOther].map(x => x(args)[0]);

makeStyledTestCases.regular = regular;
makeStyledTestCases.withStyledAttrs = withStyledAttrs;
makeStyledTestCases.withStyledComponent = withStyledComponent;
makeStyledTestCases.withStyledComponentAsOther = withStyledComponentAsOther;

module.exports = makeStyledTestCases;
