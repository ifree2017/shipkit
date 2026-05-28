# Differentiation

ShipKit is a portable SDLC agent harness.

It is not:

- a general agent framework
- a coding agent
- a prompt pack
- a replacement for OpenClaw, Codex, Claude Code, Cursor, Hive, OpenCode, LangGraph, or CrewAI
- a generic skills marketplace

ShipKit is the delivery control layer above those tools.

```text
Runner executes. ShipKit controls.
```

## What ShipKit Owns

ShipKit defines:

- SDLC stages
- artifacts
- project profiles
- gates
- evidence
- scoring
- team execution records
- handoffs
- approvals
- runner adapter contracts

## What Runners Own

Runners execute work:

- OpenClaw runs agent workspaces.
- Codex and Claude Code operate inside repositories.
- Hive may coordinate multi-agent execution.
- CodeGraph may produce code intelligence evidence.
- OpenSpec may produce machine-readable specs.

ShipKit should collect their evidence and decide whether work can advance.

## Positioning

ShipKit is focused on taking software projects from requirements to shipped delivery with traceable artifacts, profile-driven governance, and quality gates.
