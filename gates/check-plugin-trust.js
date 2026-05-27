#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const target = path.resolve(process.argv[2] || '.');
const root = fs.existsSync(path.join(target, 'tools')) ? target : process.cwd();
const files = [
  path.join(root, 'tools/plugin-map.yaml'),
  path.join(root, 'integrations/wshobson-agents/plugin-map.yaml')
];
const existing = files.filter((file) => fs.existsSync(file));
if (!existing.length) {
  console.error('Missing plugin map files. Expected tools/plugin-map.yaml or integrations/wshobson-agents/plugin-map.yaml');
  process.exit(1);
}
const toolMap = fs.readFileSync(path.join(root, 'tools/plugin-map.yaml'), 'utf8');
const pluginEntries = [...toolMap.matchAll(/^\s{2}([A-Za-z0-9:_-]+):\s*$/gm)].map((m) => m[1]);
const missingTrust = [];
for (const plugin of pluginEntries) {
  const re = new RegExp(`${plugin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:[\\s\\S]*?trust_level:`, 'm');
  if (!re.test(toolMap)) missingTrust.push(plugin);
}
if (missingTrust.length) {
  console.error('Plugins missing trust_level:');
  for (const plugin of missingTrust) console.error(`- ${plugin}`);
  process.exit(1);
}
console.log(`Plugin trust check passed for ${pluginEntries.length} plugin entries.`);
