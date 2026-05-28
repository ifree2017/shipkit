#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const root = process.argv[2] || process.cwd();
const candidates = [
  'design/DESIGN.md',
  'templates/DESIGN.md',
  'protocol/design-layer.yaml'
];
const exists = candidates.some((p) => fs.existsSync(path.join(root, p)));
if (!exists) {
  console.error('Design spec check failed. Missing design/DESIGN.md or ShipKit design templates/protocol.');
  process.exit(1);
}
console.log('Design spec check passed.');
