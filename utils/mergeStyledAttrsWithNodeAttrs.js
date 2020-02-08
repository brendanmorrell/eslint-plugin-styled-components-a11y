const { parse } = require('@babel/parser');

module.exports = (styledAttrs, nodeAttrs) => {
  const jsxString = `<div ${styledAttrs.map(keyValuePairToProps)}/>`;
  const ast = parse(jsxString, { plugins: ['jsx', 'estree'] });
  const astAttributes = ast.program.body[0].expression.openingElement.attributes;
  return nodeAttrs.concat(astAttributes);
};

function keyValuePairToProps({ key, value }) {
  return `${key}=${typeof value === 'string' ? `"${value}"` : `{${value}}`} `;
}
