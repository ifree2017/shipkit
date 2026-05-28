---
name: runner-vet
description: Use when evaluating a candidate execution runner such as Hive, OpenCode, Ruflo, OpenClaw, Codex, Claude Code, or Hermes for ShipKit.
---

# Runner Vet

A runner executes work. ShipKit controls protocol, evidence, gates, and delivery progression.

Evaluate whether the runner supports:

- run identity
- event stream
- state persistence
- artifact reporting
- gate result reporting
- human approval events
- pause/resume
- tool permissions
- sandboxing
- logs and replay

Runner outputs must map to:

- `.shipkit/runs/<run-id>/state.json`
- `.shipkit/runs/<run-id>/events.ndjson`
- `.shipkit/runs/<run-id>/artifacts.json`
- `.shipkit/runs/<run-id>/gate-results.json`
- `.shipkit/runs/<run-id>/report.md`

Do not approve a runner that can change production, delete files, access secrets, or send customer messages without human approval.
