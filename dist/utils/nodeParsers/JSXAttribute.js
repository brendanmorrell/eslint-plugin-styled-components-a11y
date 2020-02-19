"use strict";

var mergeStyledAttrsWithNodeAttrs = require('../mergeStyledAttrsWithNodeAttrs');

var getAsProp = require('../getAsProp');

var _require = require('util'),
    inspect = _require.inspect;

module.exports = function (context, styledComponents, rule, name) {
  return {
    // JSXAttribute(node) {
    //   try {
    //     const parentName = node.parent.name.name;
    //     const styledComponent = styledComponents[parentName];
    //     if (styledComponent) {
    //       const { tag, attrs } = styledComponent;
    //       const originalNodeAttr = node.parent.attributes;
    //       const allAttrs = mergeStyledAttrsWithNodeAttrs(attrs, originalNodeAttr);
    //       node.parent.attributes = allAttrs;
    //       const asProp = getAsProp(allAttrs);
    //       node.parent.name.name = asProp || tag;
    //       rule.create(context).JSXAttribute(node);
    //       node.parent.name.name = parentName;
    //       node.parent.attributes = originalNodeAttr;
    //     }
    //   } catch {}
    // },
    JSXOpeningElement: function JSXOpeningElement(node) {
      try {
        var originalName = node.name.name;
        var styledComponent = styledComponents[originalName];

        if (styledComponent) {
          var tag = styledComponent.tag,
              attrs = styledComponent.attrs;
          var originalNodeAttr = node.attributes;
          var allAttrs = mergeStyledAttrsWithNodeAttrs(attrs, originalNodeAttr);
          allAttrs.forEach(function (atr) {
            var atrName = atr.name.name;
            var originalAtrLoc = atr.loc;
            atr.loc = node.parent.loc;
            rule.create(context).JSXAttribute(atr);
            atr.loc = originalAtrLoc;
          });
        }
      } catch (_unused) {}
    }
  };
};