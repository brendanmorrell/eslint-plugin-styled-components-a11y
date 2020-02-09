const mergeStyledAttrsWithNodeAttrs = require('../mergeStyledAttrsWithNodeAttrs');
const getAsProp = require('../getAsProp');

module.exports = (context, styledComponents, rule) => ({
  JSXOpeningElement(node) {
    try {
      const originalName = node.name.name;
      const styledComponent = styledComponents[originalName];
      if (styledComponent) {
        const { tag, attrs } = styledComponent;
        const originalNodeAttr = node.attributes;
        const allAttrs = mergeStyledAttrsWithNodeAttrs(attrs, originalNodeAttr);
        const asProp = getAsProp(allAttrs);
        node.attributes = allAttrs;
        node.name.name = asProp || tag;
        rule.create(context).JSXOpeningElement(node);
        node.name.name = originalName;
        node.attributes = originalNodeAttr;
      }
    } catch {}
  },
});
