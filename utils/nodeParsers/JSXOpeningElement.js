const { rules } = require('eslint-plugin-jsx-a11y');

module.exports = (context, styledComponentsDict) => ({
  JSXOpeningElement(node) {
    const originalName = node.name.name;
    const styledComponent = styledComponentsDict[originalName];
    if (styledComponent) {
      const { tag, attrs } = styledComponent;
      node.name.name = tag;
      rule.create(context).JSXOpeningElement(node);
      node.name.name = originalName;
    }
  },
});
