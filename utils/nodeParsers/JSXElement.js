module.exports = (context, styledComponents, rule) => ({
  JSXElement(node) {
    const originalName = node.openingElement.name.name;
    const styledComponent = styledComponents[originalName];
    if (styledComponent) {
      const { tag, attrs } = styledComponent;
      // const originalNodeAttr = node.openingElement.attributes;
      // const allAttrs = mergeStyledAttrsWithNodeAttrs(attrs, originalNodeAttr);
      // node.openingElement.attributes = allAttrs;
      node.openingElement.name.name = tag;
      rule.create(context).JSXElement(node);
      node.openingElement.name.name = originalName;
      // node.openingElement.attributes = originalNodeAttr;
    }
  },
});
