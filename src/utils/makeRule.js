const { rules } = require('eslint-plugin-jsx-a11y');
const path = require('path');

const { inspect } = require('util');
const collectStyledComponentData = require(process.env.NODE_ENV === 'test'
  ? '../../lib/utils/collectStyledComponentData.js'
  : './collectStyledComponentData');

const ruleNameToTypeDict = require('./ruleNameToTypeDict');

module.exports = (name) => ({
  create(context) {
    const nodeParserPath = path.join(__dirname, 'nodeParsers', ruleNameToTypeDict[name]);
    const rule = rules[name];
    const styledComponents = {};
    const nodesArray = [];
    const parserMapping = {
      JSXOpeningElement: 'JSXOpeningElement',
      JSXElement: 'JSXElement',
      JSXAttribute: 'JSXOpeningElement'
    };
    const parsedElement = parserMapping[ruleNameToTypeDict[name]];
    return {
      ...(collectStyledComponentData(styledComponents, context, name)),
      [parsedElement]: (node) => nodesArray.push(node),
      "Program:exit": () => {
        const parser = require(nodeParserPath)(context, styledComponents, rule, name);
        nodesArray.forEach((node) => parser[parsedElement](node))
      }
    };
  },
});
