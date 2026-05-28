#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const root = process.argv[2] || process.cwd();
const files = ['design/ui-spec.md', 'design/visual-review.md'];
const hasProjectDesign = files.some((p) => fs.existsSync(path.join(root, p)));
const hasTemplates = ['templates/ui-spec.md', 'templates/visual-review.md'].every((p) => fs.existsSync(path.join(root, p)));
if (!hasProjectDesign && !hasTemplates) {
  console.error('UI consistency check failed. Missing project design evidence or ShipKit UI templates.');
  process.exit(1);
}
console.log('UI consistency check passed.');
