const { parse } = require('@babel/parser');
const { inspect } = require('util');
const keyValuePairToProps = require('./keyValuePairToProps');

module.exports = (styledAttrs, nodeAttrs, context, node, name) => {
  const jsxString = `<div ${styledAttrs.map(keyValuePairToProps).join(' ')}/>`;
  const ast = parse(jsxString, { plugins: ['jsx', 'estree'] });
  const astAttributes = ast.program.body[0].expression.openingElement.attributes;
  return nodeAttrs.concat(astAttributes);
};
