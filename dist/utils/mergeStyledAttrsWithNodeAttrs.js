"use strict";

var _require = require('@babel/parser'),
    parse = _require.parse;

var keyValuePairToProps = require('./keyValuePairToProps');

var _require2 = require('util'),
    inspect = _require2.inspect;

module.exports = function (styledAttrs, nodeAttrs, context, node, name) {
  var jsxString = "<div ".concat(styledAttrs.map(keyValuePairToProps).join(' '), "/>");
  var ast = parse(jsxString, {
    plugins: ['jsx', 'estree']
  });
  var astAttributes = ast.program.body[0].expression.openingElement.attributes;
  return nodeAttrs.concat(astAttributes);
};