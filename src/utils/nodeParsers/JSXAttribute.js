const mergeStyledAttrsWithNodeAttrs = require('../mergeStyledAttrsWithNodeAttrs');
const getAsProp = require('../getAsProp');
const { inspect } = require('util');
module.exports = (context, styledComponents, rule, name) => ({
  JSXOpeningElement(node) {
    const func = inspectee => name.includes('') && context.report(node, inspect(inspectee || node));
    try {
      const originalName = node.name.name;
      const styledComponent = styledComponents[originalName];
      if (styledComponent) {
        const { tag, attrs } = styledComponent;
        const originalNodeAttr = node.attributes;
        const allAttrs = mergeStyledAttrsWithNodeAttrs(attrs, originalNodeAttr);
        const asProp = getAsProp(allAttrs);

        allAttrs.forEach(atr => {
          const originalAtrLoc = atr.loc;
          const originalParent = atr.parent;
          // need to save the attrs of both the atr parent and the actual node depending on which one we use as the parent so we can reassign them back after
          const originalAtrParentAttributes = atr.parent && atr.parent.attributes;
          const originalNodeAttributes = node.attributes;
          if (!atr.parent) atr.parent = node;
          try {
            atr.loc = node.loc;
            atr.parent.name.name = asProp || tag;
            atr.parent.attributes = allAttrs;
            rule.create(context).JSXAttribute(atr, func);
          } finally {
            atr.loc = originalAtrLoc;
            atr.parent = originalParent;
            if (originalAtrParentAttributes) atr.parent.attributes = originalAtrParentAttributes;
            node.name.name = originalName;
            node.attributes = originalNodeAttributes;
          }
        });
      }
    } catch {}
  },
});
