const { rules } = require('eslint-plugin-jsx-a11y');
const path = require('path');
const rule = rules[path.basename(__filename).replace(/\..*/, '')];
const collectStyledComponentData = require('../utils/collectStyledComponentData');

module.exports = function(context) {
  const styledComponentsDict = {};
  return {
    ...collectStyledComponentData(styledComponentsDict),
    JSXElement(node) {
      const originalName = node.openingElement.name.name;
      const styledComponent = styledComponentsDict[originalName];
      if (styledComponent) {
        const { tag, attrs } = styledComponent;
        node.openingElement.name.name = tag;
        rule.create(context).JSXElement(node);
        node.openingElement.name.name = originalName;
      }
    },
  };
};
