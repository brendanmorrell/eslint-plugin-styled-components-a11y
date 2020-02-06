module.exports = function(styledComponentsDict) {
  return {
    TaggedTemplateExpression(node) {
      const scName = node.parent.id.name;
      let attrs = {};
      let tag = '';
      if (node.tag.type === 'CallExpression') {
        const isAttrs = checkIfAttrs(node.tag);
        if (isAttrs) {
          let attrsPropertiesArr = [];
          tag = node.tag.callee.object.property.name;
          const isFunctionAttrs = checkIfFunctionAttrs(node.tag) || checkIfArrowFunctionAttrs(node.tag);
          if (checkIfArrowFunctionAttrs(node.tag)) {
            attrsPropertiesArr = node.tag.arguments[0].body.properties;
          } else if (checkIfFunctionAttrs(node.tag)) {
            attrsPropertiesArr = node.tag.arguments[0].body.body.find(x => x.type === 'ReturnStatement').argument
              .properties;
          } else {
            attrsPropertiesArr = node.tag.arguments[0].properties;
          }
          attrs = attrsPropertiesArr.map(propertyToJsxAttribute);
        }
        styledComponentsDict[scName] = { name: scName, attrs, tag };
      }
      if (node.tag.type === 'MemberExpression') {
        if (node.tag.object.name === 'styled') {
          tag = node.tag.property.name;
          styledComponentsDict[scName] = {
            name: scName,
            tag,
            attrs,
          };
        }
      }
    },
  };
};

function checkIfAttrs(tagNode) {
  return tagNode.callee.property.name === 'attrs';
}

function checkIfFunctionAttrs(tagNode) {
  const type = tagNode.arguments[0].type;
  return type === 'FunctionExpression';
}

function checkIfArrowFunctionAttrs(tagNode) {
  const type = tagNode.arguments[0].type;
  return type === 'ArrowFunctionExpression';
}

function propertyToJsxAttribute({ key, value }) {
  return {
    type: 'JSXAttribute',
    name: { type: `JSX${key.type}}`, name: key.name },
    value: value,
  };
}
