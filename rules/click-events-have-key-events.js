const { rules } = require("eslint-plugin-jsx-a11y");

const clickEventsHaveKeyEvents = rules["click-events-have-key-events"];

module.exports = function(context) {
  const styledComponents = {};
  return {
    TaggedTemplateExpression(node) {
      if (node.tag.type === "MemberExpression") {
        if (node.tag.object.name === "styled") {
          styledComponents[node.parent.id.name] = {
            name: node.parent.id.name,
            tag: node.tag.property.name
          };
        }
      }
    },
    JSXOpeningElement(node) {
      const styledComponent = styledComponents[node.name.name];
      if (styledComponent) {
        const { tag } = styledComponent;
        node.name.name = tag;
        clickEventsHaveKeyEvents.create(context).JSXOpeningElement(node);
      }
    }
  };
};

/*const Input = styled.input.attrs({
  type: 'text',
  size: 51,
})``; */

const checkIfAttrs = tagNode => {
  return tagNode.callee.property.name === "attrs";
};

const checkIfFunctionAttrs = tagNode => {
  const type = tagNode.arguments[0].type;
  return type === "FunctionExpression";
};

const checkIfArrowFunctionAttrs = tagNode => {
  const type = tagNode.arguments[0].type;
  return type === "ArrowFunctionExpression";
};



export default function(context) {
  const styledComponents = {};
  return {
    TaggedTemplateExpression(node) {
      const scName = node.parent.id.name;
      let attrs = {};
      let tag = "";
      if (node.tag.type === "CallExpression") {
        const isAttrs = checkIfAttrs(node.tag);
        if (isAttrs) {
          let attrsPropertiesArr = [];
          tag = node.tag.callee.object.property.name;
          const isFunctionAttrs =
            checkIfFunctionAttrs(node.tag) ||
            checkIfArrowFunctionAttrs(node.tag);
          if (checkIfArrowFunctionAttrs(node.tag)) {
            attrsPropertiesArr = node.tag.arguments[0].body.properties;
          } else if (checkIfFunctionAttrs(node.tag)) {
            attrsPropertiesArr = node.tag.arguments[0].body.body.find(
              x => x.type === "ReturnStatement"
            ).argument.properties;
          } else {
            attrsPropertiesArr = node.tag.arguments[0].properties;
          }
          attrs = attrsPropertiesArr.map(x => ({
            key: x.key.name,
            value: x.value.value
          }));
        }
        styledComponents[scName] = { name: scName, attrs, tag };
        context.report({
          message: `${JSON.stringify(styledComponents)}`,
          node
        });
      }
      if (node.tag.type === "MemberExpression") {
        if (node.tag.object.name === "styled") {
          tag = node.tag.property.name;
          styledComponents[scName] = {
            name: scName,
            tag,
            attrs
          };
        }
      }
    }
  };
}
