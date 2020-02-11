module.exports = ({ key, value }) => `${key}=${typeof value === 'string' ? `"${value}"` : `{${value}}`} `;
