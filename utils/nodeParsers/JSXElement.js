module.exports = (context, styledComponents, rule) => ({
  JSXElement(node) {
    const originalName = node.openingElement.name.name;
    const styledComponent = styledComponents[originalName];
    if (styledComponent) {
      const { tag, attrs } = styledComponent;
      node.openingElement.name.name = tag;
      rule.create(context).JSXElement(node);
      node.openingElement.name.name = originalName;
    }
  },
});
