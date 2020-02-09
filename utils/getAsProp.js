module.exports = attributes => {
  const [asProp] = attributes.filter(x => x.name.name === 'as').map(x => x.value.value);
  return asProp;
};
