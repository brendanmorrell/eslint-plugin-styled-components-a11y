"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('eslint-plugin-jsx-a11y'),
    rules = _require.rules;

var path = require('path');

var collectStyledComponentData = require('./collectStyledComponentData');

var ruleNameToTypeDict = require('./ruleNameToTypeDict');

var _require2 = require('util'),
    inspect = _require2.inspect;

module.exports = function (name) {
  return {
    create: function create(context) {
      var nodeParserPath = path.join(__dirname, 'nodeParsers', ruleNameToTypeDict[name]);
      var rule = rules[name];
      var styledComponents = {};
      return _objectSpread({}, collectStyledComponentData(styledComponents, context, name), {}, require(nodeParserPath)(context, styledComponents, rule, name));
    }
  };
};