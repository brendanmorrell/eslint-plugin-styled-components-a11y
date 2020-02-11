module.exports = test => {
  const { code, ...rest } = test;
  const [, tag] = code.match(/\<([a-z]*)/) || [];
  const beginning = `const STYLED = styled.${tag}\`\`;`;
  const replaced = code.replace(/\<\/?[a-zA-Z]*/g, match => match.replace(/[a-zA-Z]+/, 'STYLED'));
  return { ...rest, code: beginning + replaced };
};
