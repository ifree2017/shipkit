#!/usr/bin/env node
import fs from 'fs';
const file = process.argv[2];
if (!file || !fs.existsSync(file)) {
  console.error('Usage: check-spawn-brief.js <brief.md>');
  process.exit(1);
}
const text = fs.readFileSync(file, 'utf8').toLowerCase();
const required = ['task','background','input files','output artifacts','success criteria','constraints','verification','handoff format'];
const missing = required.filter(x => !text.includes(x));
if (missing.length) {
  console.error('Spawn brief missing sections: ' + missing.join(', '));
  process.exit(1);
}
console.log('OK: spawn brief complete');
