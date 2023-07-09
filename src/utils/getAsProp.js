module.exports = (attributes) => {
  const [asProp] = attributes
    .filter((x) => x && x.name && x.name.name === 'as')
    .map((x) => x && x.value && x.value.value);
  return asProp;
};
