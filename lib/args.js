export function parseArgs(argv) {
  const positional = [];
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const item = argv[i];
    if (item.startsWith("--")) {
      const key = item.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith("--")) {
        flags[key] = next;
        i += 1;
      } else {
        flags[key] = true;
      }
    } else {
      positional.push(item);
    }
  }
  return { positional, flags };
}

export function getFlag(parsed, name, fallback = ".") {
  if (Object.prototype.hasOwnProperty.call(parsed.flags, name)) return parsed.flags[name];
  return fallback;
}

export function numberFlag(flags, name, fallback = 0) {
  const raw = flags[name];
  if (raw === undefined || raw === true || raw === "") return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

export function boolFlag(flags, name) {
  return flags[name] === true || flags[name] === "true" || flags[name] === "yes" || flags[name] === "1";
}
