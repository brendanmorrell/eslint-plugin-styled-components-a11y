const { inspect } = require('util');

module.exports = (attributes, context, node, name) => {
  const [asProp] = attributes.filter(x => x && x.name && x.name.name === 'as').map(x => x && x.value && x.value.value);
  return asProp;
};
