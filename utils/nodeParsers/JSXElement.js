module.exports = (context, styledComponentsDict, rule) => ({
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
});
