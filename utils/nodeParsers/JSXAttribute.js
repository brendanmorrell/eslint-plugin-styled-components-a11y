module.exports = (context, styledComponents, rule) => ({
  JSXAttribute(node) {
    const parentName = node.parent.name.name;
    const styledComponent = styledComponents[parentName];
    if (styledComponent) {
      const { tag, attrs } = styledComponent;
      // const originalNodeAttr = node.parent.attributes;
      // const allAttrs = mergeStyledAttrsWithNodeAttrs(attrs, originalNodeAttr);
      // node.parent.attributes = allAttrs;
      node.parent.name.name = tag;
      rule.create(context).JSXAttribute(node);
      node.parent.name.name = parentName;
      // node.parent.attributes = originalNodeAttr;
    }
  },
});
