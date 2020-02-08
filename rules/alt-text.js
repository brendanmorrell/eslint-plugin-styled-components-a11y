const { rules } = require('eslint-plugin-jsx-a11y');
const path = require('path');
const rule = rules[path.basename(__filename).replace(/\..*/, '')];
const collectStyledComponentData = require('../utils/collectStyledComponentData');
const mergeStyledAttrsWithNodeAttrs = require('../utils/mergeStyledAttrsWithNodeAttrs');

module.exports = function(context) {
  const styledComponentsDict = {};
  return {
    ...collectStyledComponentData(styledComponentsDict),
    JSXOpeningElement(node) {
      const originalName = node.name.name;
      const styledComponent = styledComponentsDict[originalName];
      if (styledComponent) {
        const { tag, attrs } = styledComponent;
        const originalNodeAttr = node.attributes;
        const allAttrs = mergeStyledAttrsWithNodeAttrs(attrs, originalNodeAttr);
        node.attributes = allAttrs;
        node.name.name = tag;
        rule.create(context).JSXOpeningElement(node);
        node.name.name = originalName;
        node.attributes = originalNodeAttr;
      }
    },
  };
};
