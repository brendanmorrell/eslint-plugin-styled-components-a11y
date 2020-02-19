const { readdirSync } = require('fs');
const { join } = require('path');
const { exec } = require('child_process');
const async = require('async');

const rulesDir = join(__dirname, 'rules');

const files = readdirSync(rulesDir);
const funcs = files.map(file => exec.bind(null, `node ${join(rulesDir, file)}`));

function getResults(err, data) {
  if (err) return console.log(err);
  const results = data.map(lines => lines.join('')).filter(Boolean);
  console.log(results);
}

async.parallel(funcs, getResults);
