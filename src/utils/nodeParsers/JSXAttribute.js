const mergeStyledAttrsWithNodeAttrs = require('../mergeStyledAttrsWithNodeAttrs');
const getAsProp = require('../getAsProp');
const { inspect } = require('util');

module.exports = (context, styledComponents, rule, name) => ({
  JSXOpeningElement(node) {
    const func = (inspectee) => name.includes('') && context.report(node, inspect(inspectee || node));
    try {
      let elementName = node.name.name;

      if (!elementName && node.name.type === 'JSXMemberExpression') {
        elementName = `${node.name.object.name}.${node.name.property.name}`;
      }

      const styledComponent = styledComponents[elementName];

      if (styledComponent) {
        const { tag, attrs } = styledComponent;
        const originalNodeAttr = node.attributes;
        const originalNodeName = node.name;

        const allAttrs = mergeStyledAttrsWithNodeAttrs(attrs, originalNodeAttr);
        const asProp = getAsProp(allAttrs);

        allAttrs.forEach((atr) => {
          const originalAtrLoc = atr.loc;
          const originalParent = atr.parent;
          // need to save the attrs of both the atr parent and the actual node depending on which one we use as the parent so we can reassign them back after
          const originalAtrParentAttributes = atr.parent && atr.parent.attributes;
          const originalNodeAttributes = node.attributes;
          let nodeNameProperties;

          try {
            if (!atr.parent) {
              atr.parent = node;
              nodeNameProperties = originalNodeName;
            } else {
              nodeNameProperties = originalParent.name;
            }

            atr.loc = node.loc;
            // Convert JSXMemberExpression to JSXIdentifier, so it'll be properly handled by eslint-plugin-jsx-a11y plugin
            atr.parent.name = {
              type: 'JSXIdentifier',
              name: asProp || tag,
              start: nodeNameProperties.start,
              end: nodeNameProperties.end,
              loc: nodeNameProperties.loc,
              range: nodeNameProperties.range,
              parent: nodeNameProperties.parent,
            };
            atr.parent.attributes = allAttrs;
            rule.create(context).JSXAttribute(atr, func);
          } finally {
            atr.loc = originalAtrLoc;
            atr.parent = originalParent;
            if (originalAtrParentAttributes) atr.parent.attributes = originalAtrParentAttributes;
            node.name = originalNodeName;
            node.attributes = originalNodeAttributes;
          }
        });
      }
    } catch {}
  },
});
