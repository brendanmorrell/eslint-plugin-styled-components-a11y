module.exports = test => ({ ...test, code: test.code.replace(/\<?\\[a-z]/g, match => match.toUpperCase()) });
