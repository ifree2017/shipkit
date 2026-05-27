#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
const target = process.argv.includes('--project') ? process.argv[process.argv.indexOf('--project') + 1] : (process.argv.includes('--to') ? process.argv[process.argv.indexOf('--to') + 1] : process.cwd());
const root = path.resolve(target.replace(/^~/, process.env.HOME || ''));
const runs = path.join(root, '.shipkit', 'runs');
const failures = [];
if (!fs.existsSync(runs)) failures.push('Missing .shipkit/runs directory.');
else {
  const runDirs = fs.readdirSync(runs, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => path.join(runs, d.name));
  if (runDirs.length === 0) failures.push('No run directories found under .shipkit/runs.');
  for (const dir of runDirs) {
    for (const file of ['state.json', 'events.ndjson']) {
      if (!fs.existsSync(path.join(dir, file))) failures.push(`${path.relative(root, dir)} missing ${file}.`);
    }
  }
}
if (failures.length) {
  console.error(JSON.stringify({ gate: 'observability', status: 'fail', failures }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ gate: 'observability', status: 'pass' }, null, 2));
