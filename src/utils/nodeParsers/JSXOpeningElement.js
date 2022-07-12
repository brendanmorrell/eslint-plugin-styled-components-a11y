const mergeStyledAttrsWithNodeAttrs = require('../mergeStyledAttrsWithNodeAttrs');
const getAsProp = require('../getAsProp');
const { inspect } = require('util');
const { cloneDeep } = require('lodash');

module.exports = (context, styledComponents, rule, name) => ({
  JSXOpeningElement(node) {
    const func = (inspectee) => name.includes('scope') && context.report(node, inspect(inspectee || node));
    try {
      let elementName = node.name.name;

      if (!elementName && node.name.type === 'JSXMemberExpression') {
        elementName = `${node.name.object.name}.${node.name.property.name}`;
      }

      const styledComponent = styledComponents[elementName];

      if (styledComponent) {
        const { tag, attrs } = styledComponent;
        const originalNodeAttr = node.attributes;
        const originalNodeName = cloneDeep(node.name);

        try {
          const allAttrs = mergeStyledAttrsWithNodeAttrs(attrs, originalNodeAttr);
          const asProp = getAsProp(allAttrs);
          node.attributes = allAttrs;

          // Convert JSXMemberExpression to JSXIdentifier, so it'll be properly handled by eslint-plugin-jsx-a11y plugin
          node.name = {
            type: 'JSXIdentifier',
            name: asProp || tag,
            start: originalNodeName.start,
            end: originalNodeName.end,
            loc: originalNodeName.loc,
            range: originalNodeName.range,
            parent: originalNodeName.parent,
          };

          rule.create(context).JSXOpeningElement(node);
        } finally {
          node.name = originalNodeName;
          node.attributes = originalNodeAttr;
        }
      }
    } catch {}
  },
});
