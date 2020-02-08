const { rules } = require('eslint-plugin-jsx-a11y');

module.exports = (context, styledComponentsDict) => ({
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
