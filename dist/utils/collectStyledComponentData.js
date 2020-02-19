"use strict";

function checkIfAttrs(tagNode) {
  return tagNode.callee.property.name === 'attrs';
}

function checkIfFunctionAttrs(tagNode) {
  var type = tagNode.arguments[0].type;
  return type === 'FunctionExpression';
}

function checkIfArrowFunctionAttrs(tagNode) {
  var type = tagNode.arguments[0].type;
  return type === 'ArrowFunctionExpression';
}

module.exports = function (styledComponentsDict) {
  return {
    TaggedTemplateExpression: function TaggedTemplateExpression(node) {
      var scName = node.parent.id.name;
      var attrs = [];
      var tag = '';

      if (node.tag.type === 'CallExpression') {
        if (node.tag.callee.name === 'styled') {
          var ancestorScName = node.tag.arguments[0].name;
          attrs = styledComponentsDict[ancestorScName].attrs;
          tag = styledComponentsDict[ancestorScName].tag;
        } else if (checkIfAttrs(node.tag)) {
          var attrsPropertiesArr = [];
          tag = node.tag.callee.object.property.name;
          var isFunctionAttrs = checkIfFunctionAttrs(node.tag) || checkIfArrowFunctionAttrs(node.tag);

          if (checkIfArrowFunctionAttrs(node.tag)) {
            attrsPropertiesArr = node.tag.arguments[0].body.properties;
          } else if (checkIfFunctionAttrs(node.tag)) {
            attrsPropertiesArr = node.tag.arguments[0].body.body.find(function (x) {
              return x.type === 'ReturnStatement';
            }).argument.properties;
          } else {
            attrsPropertiesArr = node.tag.arguments[0].properties;
          } // filter out spread elements (which have no key nor value)


          attrs = attrsPropertiesArr.filter(function (x) {
            return x.key;
          }).map(function (x) {
            return {
              key: x.key.name || x.key.value,
              // this is pretty useless. would need to generate code from any template expression for this to really work
              value: x.value.type === 'TemplateLiteral' ? x.value.quasis[0].value.raw : x.value.value
            };
          });
        }

        styledComponentsDict[scName] = {
          name: scName,
          attrs: attrs,
          tag: tag
        };
      }

      if (node.tag.type === 'MemberExpression') {
        if (node.tag.object.name === 'styled') {
          tag = node.tag.property.name;
          styledComponentsDict[scName] = {
            name: scName,
            tag: tag,
            attrs: attrs
          };
        }
      }
    }
  };
};