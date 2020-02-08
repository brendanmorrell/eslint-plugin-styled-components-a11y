// // const { rules } = require('eslint-plugin-jsx-a11y');
// // const path = require('path');
// // const rule = rules[path.basename(__filename).replace(/\..*/, '')];
// const collectStyledComponentData = require('./collectStyledComponentData');

const ruleNameToTypeDict = {
  'tabindex-no-positive': '',
  scope: 'JSXAttribute',
};

module.exports = name => ({
  create: function(context) {
    const styledComponentsDict = {};
    return {
      JSXElement(node) {
        context.report(node, 'heyo');

        // const originalName = node.openingElement.name.name;
        // const styledComponent = styledComponentsDict[originalName];
        // if (styledComponent) {
        //   const { tag, attrs } = styledComponent;
        //   node.openingElement.name.name = tag;
        //   rule.create(context).JSXElement(node);
        //   node.openingElement.name.name = originalName;
        // }
      },
      // ...collectStyledComponentData(styledComponentsDict),
      // ...require(ruleNameToTypeDict[path.join('nodeParsers',`${name}.js`)])(context, styledComponentsDict)
    };
  },
});
