const isStyledTemplateExpression = node => node.tag.type === 'CallExpression';

const isPlainSTE = node => node.tag.callee.name === 'styled';

const isStyledFunc = node => node.tag.type === 'MemberExpression' && node.tag.object.name === 'styled';

const isAttrs = ({ tag }) => {
  return tag.callee.property.name === 'attrs';
};

const isFuncAttrs = ({ tag }) => {
  const type = tag.arguments[0].type;
  return type === 'FunctionExpression' ? 'func' : type === 'ArrowFunctionExpression' ? 'arrow' : '';
};

module.exports = function(styledComponentsDict) {
  return {
    TaggedTemplateExpression(node) {
      const scName = node.parent.id.name;
      let attrs = [];
      let tag = '';
      if (isStyledTemplateExpression(node)) {
        if (isPlainSTE(node)) {
          const ancestorScName = node.tag.arguments[0].name;
          attrs = styledComponentsDict[ancestorScName].attrs;
          tag = styledComponentsDict[ancestorScName].tag;
        } else if (isAttrs(node)) {
          let attrsPropertiesArr = [];
          tag = node.tag.callee.object.property.name;
          if (isFuncAttrs(node) === 'arrow') {
            attrsPropertiesArr = node.tag.arguments[0].body.properties;
          } else if (isFuncAttrs(node) === 'func') {
            attrsPropertiesArr = node.tag.arguments[0].body.body.find(x => x.type === 'ReturnStatement').argument
              .properties;
          } else {
            attrsPropertiesArr = node.tag.arguments[0].properties;
          }
          // filter out spread elements (which have no key nor value)
          attrs = attrsPropertiesArr
            .filter(x => x.key)
            .map(x => ({
              key: x.key.name || x.key.value,
              // this is pretty useless. would need to generate code from any template expression for this to really work
              value: x.value.type === 'TemplateLiteral' ? x.value.quasis[0].value.raw : x.value.value,
            }));
        }
        styledComponentsDict[scName] = { name: scName, attrs, tag };
      }
      if (isStyledFunc(node)) {
        tag = node.tag.property.name;
        styledComponentsDict[scName] = {
          name: scName,
          tag,
          attrs,
        };
      }
    },
  };
};
