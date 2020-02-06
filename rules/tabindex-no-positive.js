const { rules } = require('eslint-plugin-jsx-a11y');
const path = require('path');
const rule = rules[path.basename(__filename).replace(/\..*/, '')];
const collectStyledComponentData = require('../utils/collectStyledComponentData');

module.exports = function(context) {
  const styledComponentsDict = {};
  return {
    ...collectStyledComponentData(styledComponentsDict),
    JSXAttribute(node) {
      const parentName = node.parent.name.name;
      const styledComponent = styledComponentsDict[parentName];
      if (styledComponent) {
        rule.create(context).JSXAttribute(node);
      }
    },
  };
};
