# Integrations

This directory maps external repositories, plugins, MCP servers, skills, and capability packs into ShipKit without making them part of core.

Each integration should include:

- `README.md` — what it does and where it fits.
- `mapping.yaml` — how it maps to ShipKit stages/flows.
- `import-policy.md` — whether content may be copied, rewritten, referenced, or adapted.
- `trust-policy.md` — execution and security rules.

Core rule: external tools produce evidence; ShipKit gates evaluate evidence.
