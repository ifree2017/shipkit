export function yamlList(items, indent = 4) {
  return items.map((item) => `${" ".repeat(indent)}- ${item}`).join("\n");
}

export function parseSimpleYamlValue(text, key) {
  const re = new RegExp(`^\\s*${key}:\\s*([^\\n#]+)`, "m");
  const match = re.exec(text || "");
  return match ? match[1].trim().replace(/^['\"]|['\"]$/g, "") : null;
}
