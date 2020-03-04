const isStyledTemplateExpression = node => node.tag.type === 'CallExpression';

const isPlainSTE = node => node.tag.callee.name === 'styled';

const isStyledFunc = node => node.tag.type === 'MemberExpression' && node.tag.object.name === 'styled';

const isAttrs = ({ tag }) => tag.callee.property.name === 'attrs';

const isFuncAttrs = ({ tag }) => {
  const { type } = tag.arguments[0];
  return type === 'FunctionExpression' ? 'func' : type === 'ArrowFunctionExpression' ? 'arrow' : '';
};

module.exports = styledComponentsDict => ({
  TaggedTemplateExpression(node) {
    const scName = node.parent.id.name;
    let attrs = [];
    let tag = '';
    // const A = styled.div`` || styled.attrs(...).div``
    if (isStyledTemplateExpression(node)) {
      if (isPlainSTE(node)) {
        const ancestorScName = node.tag.arguments[0].name;
        ({ attrs } = styledComponentsDict[ancestorScName]);
        ({ tag } = styledComponentsDict[ancestorScName]);
      } else if (isAttrs(node)) {
        let attrsPropertiesArr = [];
        tag = node.tag.callee.object.property.name;
        // styled.div.attrs(function() { return {} })``
        if (isFuncAttrs(node) === 'arrow') {
          attrsPropertiesArr = node.tag.arguments[0].body.properties;
          // styled.div.attrs(() => ({}))``
        } else if (isFuncAttrs(node) === 'func') {
          attrsPropertiesArr = node.tag.arguments[0].body.body.find(x => x.type === 'ReturnStatement').argument
            .properties;
          // styled.div.attrs({})``
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
    // const A = styled(Component)``
    if (isStyledFunc(node)) {
      tag = node.tag.property.name;
      styledComponentsDict[scName] = {
        name: scName,
        tag,
        attrs,
      };
    }
  },
});
