const mergeStyledAttrsWithNodeAttrs = require('../mergeStyledAttrsWithNodeAttrs');

module.exports = (context, styledComponentsDict, rule) => ({
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
});
