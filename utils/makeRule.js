const { rules } = require('eslint-plugin-jsx-a11y');
const path = require('path');

const collectStyledComponentData = require('./collectStyledComponentData');
const ruleNameToTypeDict = require('./ruleNameToTypeDict');

module.exports = name => ({
  create(context) {
    const nodeParserPath = path.join(__dirname, 'nodeParsers', ruleNameToTypeDict[name]);
    const rule = rules[name];
    const styledComponents = {};
    return {
      ...collectStyledComponentData(styledComponents),
      ...require(nodeParserPath)(context, styledComponents, rule),
    };
  },
});
