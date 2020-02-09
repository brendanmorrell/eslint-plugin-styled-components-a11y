const generate = require('@babel/generator').default;

module.exports = attributesAst => {
  const output = generate(attributesAst, { plugins: ['jsx', 'estree'] });
  const [, match] = output.match(/as=(.+?)\W/) || ['', ''];
  return match.replace(/^{/, '').replace(/}$/, '');
};
