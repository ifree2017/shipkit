---
name: memory
description: Use when summarizing session history, updating durable project memory, flushing context, or maintaining STATE.md and MEMORY.md during long-running ShipKit projects.
---

# Memory

Persistent facts belong in files.

## Memory layers

- `STATE.md`: current authoritative project state
- `MEMORY.md`: compact long-term index
- `memory/YYYY-MM-DD.md`: daily work log
- `handoff/*.handoff.md`: stage transition records
- `trace/trace-map.md`: requirement-to-delivery mapping

## When to update

Update `STATE.md` when:

- stage changes
- blocker appears or is resolved
- change, bug, or refactor is opened or closed
- key decision is made
- release or delivery status changes

Append daily log when:

- major task completes
- issue is discovered
- important decision is made
- context flush is needed

## Context budget

At high context usage:

1. Stop spawning new agents.
2. Write a concise current-state summary.
3. Update `STATE.md`.
4. Update current handoff.
5. Record unresolved work.

