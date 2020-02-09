const mergeStyledAttrsWithNodeAttrs = require('../mergeStyledAttrsWithNodeAttrs');

module.exports = (context, styledComponents, rule) => ({
  JSXAttribute(node) {
    try {
      const parentName = node.parent.name.name;
      const styledComponent = styledComponents[parentName];
      if (styledComponent) {
        const { tag, attrs } = styledComponent;
        const originalNodeAttr = node.parent.attributes;
        const allAttrs = mergeStyledAttrsWithNodeAttrs(attrs, originalNodeAttr);
        node.parent.attributes = allAttrs;
        node.parent.name.name = tag;
        rule.create(context).JSXAttribute(node);
        node.parent.name.name = parentName;
        node.parent.attributes = originalNodeAttr;
      }
    } catch {}
  },
  JSXOpeningElement(node) {
    try {
      const originalName = node.name.name;
      const styledComponent = styledComponents[originalName];
      if (styledComponent) {
        const { tag, attrs } = styledComponent;
        const originalNodeAttr = node.attributes;
        const allAttrs = mergeStyledAttrsWithNodeAttrs(attrs, originalNodeAttr);

        allAttrs.forEach(atr => {
          const atrName = atr.name.name;
          const originalAtrLoc = atr.loc;
          atr.loc = node.parent.loc;
          rule.create(context).JSXAttribute(atr);
          atr.loc = originalAtrLoc;
        });
      }
    } catch {}
  },
});
