const { rules } = require('eslint-plugin-jsx-a11y');
const path = require('path');

const collectStyledComponentData = require('./collectStyledComponentData');
const ruleNameToTypeDict = require('./ruleNameToTypeDict');

module.exports = name => ({
  create(context) {
    const nodeParserPath = path.join(__dirname, 'nodeParsers', ruleNameToTypeDict[name]);
    const rule = rules[name];
    const styledComponentsDict = {};
    return {
      ...collectStyledComponentData(styledComponentsDict),
      ...require(nodeParserPath)(context, styledComponentsDict, rule),
    };
  },
});
