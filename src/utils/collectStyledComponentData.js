const isStyledTemplateExpression = node => node.tag.type === 'CallExpression';

const isPlainSTE = node => node.tag.callee.name === 'styled';

const isStyledFunc = node => node.tag.type === 'MemberExpression' && node.tag.object.name === 'styled';

const isAttrs = ({ tag }) => tag.callee.property.name === 'attrs';

const isFuncAttrs = ({ tag }) => {
  const { type } = tag.arguments[0];
  return type === 'FunctionExpression' ? 'func' : type === 'ArrowFunctionExpression' ? 'arrow' : '';
};
const { inspect } = require('util');
const { __UNKNOWN_IDENTIFER__ } = require('./constants');

module.exports = (styledComponentsDict, context, name) => ({
  TaggedTemplateExpression(node) {
    const scName = node.parent.id.name;
    let attrs = [];
    let tag = '';
    const func = inspectee => name.includes('anchor-is-valid') && context.report(node, inspect(inspectee || node));
    // const A = styled.div`` || styled.div.attrs(...)``
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
        const arithmeticUnaryOperators = ['+', '-'];
        // filter out spread elements (which have no key nor value)
        attrs = attrsPropertiesArr
          .filter(x => x.key)
          .map(x => ({
            key: x.key.name || x.key.value,
            // this is pretty useless. would need to generate code from any template expression for this to really work
            value:
              x.value.type === 'TemplateLiteral'
                ? // need to grab falsy vals like empty strings, thus the x ? x : identifier instead of x|| identifier
                  typeof x.value.quasis[0].value.raw === 'undefined'
                  ? __UNKNOWN_IDENTIFER__
                  : x.value.quasis[0].value.raw
                : x.value.type === 'UnaryExpression' && arithmeticUnaryOperators.includes(x.value.operator)
                ? // if simple arithemetic, concat the symbol and the strings (like a negative) and then coerce to a number
                  +(x.value.operator + x.value.argument.value)
                : x.value.type === 'Identifier'
                ? x.value.name === 'undefined'
                  ? undefined
                  : __UNKNOWN_IDENTIFER__
                : typeof x.value.value === 'undefined'
                ? // if property exists, but no value found, just set it to our unknown identifier so it returns truthy and not something specific like a number or boolean or undefined as these are tested in specific ways for different linting rules
                  // too many options for what this could be, but this can approxinate what is needed for linting
                  // need to grab falsy vals like empty strings, thus the x ? x : identifier instead of x|| identifier
                  __UNKNOWN_IDENTIFER__
                : x.value.value,
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
