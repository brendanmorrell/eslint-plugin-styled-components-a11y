"use strict";

var mergeStyledAttrsWithNodeAttrs = require('../mergeStyledAttrsWithNodeAttrs');

var getAsProp = require('../getAsProp');

var _require = require('util'),
    inspect = _require.inspect;

module.exports = function (context, styledComponents, rule, name) {
  return {
    JSXElement: function JSXElement(node) {
      try {
        var originalName = node.openingElement.name.name;
        var styledComponent = styledComponents[originalName];

        if (styledComponent) {
          var tag = styledComponent.tag,
              attrs = styledComponent.attrs;
          var originalNodeAttr = node.openingElement.attributes;
          var allAttrs = mergeStyledAttrsWithNodeAttrs(attrs, originalNodeAttr);
          var asProp = getAsProp(allAttrs);
          node.openingElement.attributes = allAttrs;
          node.openingElement.name.name = asProp || tag;
          rule.create(context).JSXElement(node);
          node.openingElement.name.name = originalName;
          node.openingElement.attributes = originalNodeAttr;
        }
      } catch (_unused) {}
    }
  };
};