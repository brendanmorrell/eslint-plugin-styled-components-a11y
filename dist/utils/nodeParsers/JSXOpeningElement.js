"use strict";

var mergeStyledAttrsWithNodeAttrs = require('../mergeStyledAttrsWithNodeAttrs');

var getAsProp = require('../getAsProp');

var _require = require('util'),
    inspect = _require.inspect;

module.exports = function (context, styledComponents, rule, name) {
  return {
    JSXOpeningElement: function JSXOpeningElement(node) {
      try {
        var originalName = node.name.name;
        var styledComponent = styledComponents[originalName];

        if (styledComponent) {
          var tag = styledComponent.tag,
              attrs = styledComponent.attrs;
          var originalNodeAttr = node.attributes;
          var allAttrs = mergeStyledAttrsWithNodeAttrs(attrs, originalNodeAttr);
          var asProp = getAsProp(allAttrs);
          node.attributes = allAttrs;
          node.name.name = asProp || tag;
          rule.create(context).JSXOpeningElement(node);
          node.name.name = originalName;
          node.attributes = originalNodeAttr;
        }
      } catch (_unused) {}
    }
  };
};