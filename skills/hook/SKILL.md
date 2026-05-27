---
name: hook
description: Use when defining or reviewing lifecycle hooks before/after stages, tools, gates, approvals, handoffs, or failures for ShipKit runners and adapters.
---

# Hook

## Purpose

Define safe lifecycle hooks for runner adapters.

## Hook Points

- before_stage
- before_tool
- after_tool
- before_gate
- after_gate
- before_handoff
- after_handoff
- on_failure
- on_human_approval_required

## Rules

- Hooks must not silently override gate failures.
- Hooks must write observable evidence.
- Hooks that block execution must explain why and how to recover.
- Hooks that require approval must produce a permission request.
