---
name: toolmap
description: Use when selecting, reviewing, or routing external tools, MCP servers, plugins, or capability packs for a ShipKit stage or issue flow.
---

# Toolmap

Use `protocol/toolmap.yaml`, `tools/plugin-map.yaml`, `tools/mcp-map.yaml`, and `tools/tool-policy.yaml` to choose tools safely.

## Required Checks

Before using an external tool:

1. Is it allowlisted?
2. Which stage or flow may use it?
3. What can it read?
4. What can it write?
5. Where must evidence be stored?
6. Does it require human approval?
7. Which gate evaluates its output?

## Rule

External tools do not decide stage progression. They only produce evidence.
