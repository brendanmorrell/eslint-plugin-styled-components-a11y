const { rules } = require("eslint-plugin-jsx-a11y");

const clickEventsHaveKeyEvents = rules["click-events-have-key-events"];

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
      const styledComponent = styledComponents[node.name.name];
      if (styledComponent) {
        const { tag } = styledComponent;
        node.name.name = tag;
        clickEventsHaveKeyEvents.create(context).JSXOpeningElement(node);
      }
    }
  };
};
