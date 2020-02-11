module.exports = function(styledComponentsDict) {
  return {
    TaggedTemplateExpression(node) {
      const scName = node.parent.id.name;
      let attrs = [];
      let tag = '';
      if (node.tag.type === 'CallExpression') {
        if (node.tag.callee.name === 'styled') {
          const ancestorScName = node.tag.arguments[0].name;
          attrs = styledComponentsDict[ancestorScName].attrs;
          tag = styledComponentsDict[ancestorScName].tag;
        } else if (checkIfAttrs(node.tag)) {
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

          attrs = attrsPropertiesArr.map(x => ({
            key: x.key.name,
            // this is pretty useless. would need to generate code from any template expression for this to really work
            value: x.value.type === 'TemplateLiteral' ? x.value.quasis[0].value.raw : x.value.value,
          }));
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
