const { rules } = require('eslint-plugin-jsx-a11y');

module.exports = (context, styledComponentsDict) => ({
  JSXAttribute(node) {
    context.report(node, 'jsx attribute');
    // const parentName = node.parent.name.name;
    // const styledComponent = styledComponentsDict[parentName];
    // if (styledComponent) {
    //   const { tag } = styledComponent;
    //   node.parent.name.name = tag;
    //   rule.create(context).JSXAttribute(node);
    //   node.parent.name.name = parentName;
    // }
  },
});
