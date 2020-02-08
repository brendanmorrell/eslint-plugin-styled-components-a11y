const { rules } = require('eslint-plugin-jsx-a11y');
const path = require('path');
const collectStyledComponentData = require('./collectStyledComponentData');

const ruleNameToTypeDict = {
  'accessible-emoji': 'noop',
  'alt-text': 'JSXOpeningElement',
  'tabindex-no-positive': 'noop',
  scope: 'JSXAttribute',
};

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
