#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const target = path.resolve(process.argv[2] || '.');
const graph = path.join(target, 'evidence/codegraph/graph.json');
if (!fs.existsSync(graph)) {
  console.error('Missing codegraph evidence: evidence/codegraph/graph.json');
  process.exit(1);
}
let parsed;
try {
  parsed = JSON.parse(fs.readFileSync(graph, 'utf8'));
} catch (err) {
  console.error('Invalid evidence/codegraph/graph.json');
  console.error(err.message);
  process.exit(1);
}
if (!parsed.generated_at && !parsed.generatedAt && !parsed.meta?.generated_at) {
  console.error('Codegraph graph.json missing generated_at metadata.');
  process.exit(1);
}
console.log('Codegraph freshness metadata check passed.');
