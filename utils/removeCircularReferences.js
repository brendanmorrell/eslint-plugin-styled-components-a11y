module.exports = node => JSON.parse(JSON.stringify(node, (name, value) => (name === 'parent' ? undefined : value)));
