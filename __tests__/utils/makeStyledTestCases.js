const parserOptionsMapper = require('./parserOptionsMapper');

const makeRuleMaker = func => ({ tag = 'div', attrs = '{}', props = '', children = '', errors } = {}) => {
  const args = { tag, attrs, props, children, errors };
  const code = func(args);
  return [{ code, errors }].map(parserOptionsMapper)[0];
};

const regular = ({ tag, props, children }) =>
  `
  const STYLED = styled.${tag}\`\`;
  const Func = () => ${children ? `<STYLED ${props}>${children}</STYLED>` : `<STYLED ${props} />`};
`;

const withStyledAttrs = ({ tag, attrs, children }) =>
  `
  const STYLED = styled.${tag}.attrs(${attrs})\`\`;
  const Func = () => ${children ? `<STYLED>${children}</STYLED>` : `<STYLED />`};
`;

const withStyledComponent = ({ tag, attrs, children }) =>
  `
  const STYLED = styled.${tag}.attrs(${attrs})\`\`;
  const NESTED = styled(STYLED)\`\`;
  const Func = () => ${children ? `<NESTED>${children}</NESTED>` : `<NESTED />`};
`;

const withStyledComponentAsOther = ({ tag, attrs, children }) =>
  `
  const STYLED = styled.${tag === 'button' ? 'div' : 'button'}.attrs(${attrs})\`\`;
  const NESTED = styled(STYLED)\`\`;
  const Func = () => ${children ? `<NESTED as="${tag}">${children}</NESTED>` : `<NESTED as="${tag}" />`};
`;

const makeStyledTestCases = args =>
  [regular, withStyledAttrs, withStyledComponent, withStyledComponentAsOther].map(makeRuleMaker).map(x => x(args));

makeStyledTestCases.regular = regular;
makeStyledTestCases.withStyledAttrs = withStyledAttrs;
makeStyledTestCases.withStyledComponent = withStyledComponent;
makeStyledTestCases.withStyledComponentAsOther = withStyledComponentAsOther;

module.exports = makeStyledTestCases;
