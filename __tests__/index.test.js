// const { RuleTester } = require('eslint');
// const fs = require('fs');
// const path = require('path');

// const makeRule = require('../utils/makeRule');
// const parserOptionsMapper = require('./utils/parserOptionsMapper');

// const ruleTester = new RuleTester();
// const expectedError = {
//   message:
//     'Emojis should be wrapped in <span>, have role="img", and have an accessible description with aria-label or aria-labelledby.',
//   type: 'JSXOpeningElement',
// };
// const name = 'accessible-emoji';
// const rule = makeRule(name);

// const makeStyled = (type, code) => {
//   const Component = type.toUpperCase();
//   const typeRegex = new RegExp(type, 'g');
//   return `const ${Component} = styled.${type}\`\`;${code.replace(typeRegex, Component)}`;
// };

// ruleTester.run(name, rule, {
//   valid: [
//     { code: makeStyled('div', '<div />;') },
//     { code: makeStyled('span', '<span />') },
//     { code: makeStyled('span', '<span>No emoji here!</span>') },
//     { code: makeStyled('span', '<span role="img" aria-label="Panda face">🐼</span>') },
//     { code: makeStyled('span', '<span role="img" aria-label="Snowman">&#9731;</span>') },
//     { code: makeStyled('span', '<span role="img" aria-labelledby="id1">🐼</span>') },
//     { code: makeStyled('span', '<span role="img" aria-labelledby="id1">&#9731;</span>') },
//     { code: makeStyled('span', '<span role="img" aria-labelledby="id1" aria-label="Snowman">&#9731;</span>') },
//     { code: makeStyled('span', '<span>{props.emoji}</span>') },
//     { code: makeStyled('span', '<span aria-hidden>{props.emoji}</span>') },
//     { code: makeStyled('span', '<span aria-hidden="true">🐼</span>') },
//     { code: makeStyled('span', '<span aria-hidden>🐼</span>') },
//     { code: makeStyled('div', '<div aria-hidden="true">🐼</div>') },
//   ].map(parserOptionsMapper),
//   invalid: [
//     // { code: '<span>🐼</span>', errors: [expectedError] },
//     // { code: '<span>foo🐼bar</span>', errors: [expectedError] },
//     // { code: '<span>foo 🐼 bar</span>', errors: [expectedError] },
//     // { code: '<i role="img" aria-label="Panda face">🐼</i>', errors: [expectedError] },
//     // { code: '<i role="img" aria-labelledby="id1">🐼</i>', errors: [expectedError] },
//     // { code: '<Foo>🐼</Foo>', errors: [expectedError] },
//     // { code: '<span aria-hidden="false">🐼</span>', errors: [expectedError] },
//   ].map(parserOptionsMapper),
// });
// // const jsxAllyRulesPath = path.join(__dirname, 'jsx-a11y-rules');

// // const jsxAllyRules = fs
// //   .readdirSync(jsxAllyRulesPath)
// //   .map(rule => path.join(jsxAllyRulesPath, rule))
// //   .map(require);
const { readdirSync } = require('fs');
const { join } = require('path');
const { exec } = require('child_process');
const async = require('async');

const rulesDir = join(__dirname, 'rules');

const files = readdirSync(rulesDir);
const funcs = files.map(file => exec.bind(null, `node ${join(rulesDir, file)}`));

function getResults(err, data) {
  if (err) return console.log(err);
  const results = data.map(lines => lines.join(''));
  console.log(results);
}

async.parallel(funcs, getResults);
