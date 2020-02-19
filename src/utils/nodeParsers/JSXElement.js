const mergeStyledAttrsWithNodeAttrs = require('../mergeStyledAttrsWithNodeAttrs');
const getAsProp = require('../getAsProp');
const { inspect } = require('util');
module.exports = (context, styledComponents, rule, name) => ({
  JSXElement(node) {
    try {
      const originalName = node.openingElement.name.name;
      const styledComponent = styledComponents[originalName];
      if (styledComponent) {
        const { tag, attrs } = styledComponent;
        const originalNodeAttr = node.openingElement.attributes;
        const allAttrs = mergeStyledAttrsWithNodeAttrs(attrs, originalNodeAttr);
        const asProp = getAsProp(allAttrs);
        node.openingElement.attributes = allAttrs;
        node.openingElement.name.name = asProp || tag;
        rule.create(context).JSXElement(node);
        node.openingElement.name.name = originalName;
        node.openingElement.attributes = originalNodeAttr;
      }
    } catch {}
  },
});
