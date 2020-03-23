const mergeStyledAttrsWithNodeAttrs = require('../mergeStyledAttrsWithNodeAttrs');
const getAsProp = require('../getAsProp');
const { inspect } = require('util');
module.exports = (context, styledComponents, rule, name) => ({
  JSXOpeningElement(node) {
    const func = inspectee => name.includes('scope') && context.report(node, inspect(inspectee || node));
    return func('lang attribute must have a valid value.');
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
          if (!atr.parent) atr.parent = node;
          try {
            atr.loc = node.loc;
            atr.parent.name.name = asProp || tag;

            rule.create(context).JSXAttribute(atr, func);
          } finally {
            atr.loc = originalAtrLoc;
            atr.parent = originalParent;
            node.name.name = originalName;
          }
        });
      }
    } catch {}
  },
});
