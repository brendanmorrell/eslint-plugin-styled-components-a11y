module.exports = (attributes) =>
  attributes.map((attribute) => {
    if (attribute.value?.expression?.type === 'ChainExpression') {
      attribute.value.expression = attribute.value.expression.expression;
    }

    return attribute;
  });
