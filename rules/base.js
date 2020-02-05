module.exports = function(context) {
  const styledComponents = {};
  return {
    TaggedTemplateExpression(node) {
      if (node.tag.object.name === "styled") {
        styledComponents[node.parent.id.name] = {
          name: node.parent.id.name,
          tag: node.tag.property.name
        };
      }
    },
    JSXOpeningElement(node) {
      if (styledComponents[node.name.name]) {
        const { tag } = styledComponents[node.name.name];
        node.name.name = tag;
        context.report({
          node,
          message: `this is a styled component: ${JSON.stringify(
            styledComponents[node.name.name]
          )}`
        });
      }
    }
  };
};
