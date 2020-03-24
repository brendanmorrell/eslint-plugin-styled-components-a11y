const { readdirSync, writeFileSync } = require('fs');
const { join } = require('path');
const { exec } = require('child_process');
const async = require('async');

const rulesDir = join(__dirname, 'rules');

const files = readdirSync(rulesDir);
const funcs = files.map(file => exec.bind(null, `node ${join(rulesDir, file)}`));

function getResults(err, data) {
  if (err) return console.log(err);
  const [results] = data.map(lines => lines.join('')).filter(Boolean);
  console.log(results ? printResults(results) : `✓ Tests Pass`);
  // writeFileSync(join(__dirname, './debug.js'), formatted, 'UTF-8');
}

async.parallel(funcs, getResults);

function printResults(str = '') {
  return str
    .replace(`[ { code:`, '')
    .replace(`{ code:`, '')
    .replace(`{ code:`, '')
    .replace(`{ code:`, '')
    .replace(`'n`, '')
    .replace(`\\n  `, '')
    .replace(`\\n  `, '')
    .replace(`\\n  `, '')
    .replace(`\\n  `, '')
    .replace(`\\n',  `, '')
    .replace(`\\n',  `, '')
    .replace(`\\n',  `, '')
    .replace(`\\n',  `, '')
    .replace(`\\n',  `, '')
    .replace(`\\n  ',  `, '')
    .replace(`\\n  ',  `, '')
    .replace(`\\n  ',  `, '')
    .replace(`\\n  ',  `, '')
    .replace(`\\n  ',  `, '')
    .replace(`\\n  ',  `, '')
    .replace(`\\n  ',  `, '')
    .replace('\\', '')
    .replace('\\', '')
    .replace('\\', '')
    .replace('\\', '')
    .replace('\\', '')
    .replace('\\', '')
    .replace('\\', '')
    .replace('\\', '')
    .replace('\\', '')
    .replace('\\', '')
    .replace('\\', '')
    .replace('\\', '')
    .replace('\\', '')
    .replace('\\', '')
    .replace('\\', '')
    .replace('\\', '')
    .replace('\\', '')
    .replace('\\', '')
    .replace('\\', '')
    .replace('\\', '')
    .replace('\\', '')
    .replace('\\', '')
    .replace('\\', '')
    .replace('\\', '')
    .replace('\\', '')
    .replace(`'const `, 'const ')
    .replace(`'const `, 'const ')
    .replace(`'const `, 'const ')
    .replace(`'const `, 'const ')
    .replace(`'const `, 'const ')
    .replace(`errors: [ [Object] ],`, '')
    .replace(`errors: [ [Object] ],`, '')
    .replace(`errors: [ [Object] ],`, '')
    .replace(`errors: [ [Object] ],`, '')
    .replace(`options: [],`, '')
    .replace(`options: [],`, '')
    .replace(`options: [],`, '')
    .replace(`options: [],`, '')
    .replace(`parserOptions: { ecmaVersion: 2018, ecmaFeatures: [Object] } },`, '')
    .replace(`parserOptions: { ecmaVersion: 2018, ecmaFeatures: [Object] } },`, '')
    .replace(`parserOptions: { ecmaVersion: 2018, ecmaFeatures: [Object] } },`, '')
    .replace(`parserOptions: { ecmaVersion: 2018, ecmaFeatures: [Object] } } ]`, '');
}
