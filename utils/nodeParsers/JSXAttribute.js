module.exports = (context, styledComponentsDict, rule) => ({
  JSXAttribute(node) {
    context.report(node, 'jsx attribute');
    const parentName = node.parent.name.name;
    const styledComponent = styledComponentsDict[parentName];
    if (styledComponent) {
      const { tag } = styledComponent;
      node.parent.name.name = tag;
      rule.create(context).JSXAttribute(node);
      node.parent.name.name = parentName;
    }
  },
});
