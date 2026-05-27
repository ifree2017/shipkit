---
name: spawn
description: Use when preparing a subagent brief, deciding whether to spawn, or collecting subagent handoff artifacts in OpenClaw, Codex, Claude, Hermes, Cursor, or other agent platforms.
---

# Spawn

A subagent task must be self-contained.

## Before spawn

Check:

- Is the task clear?
- Are inputs listed?
- Are outputs listed?
- Is success measurable?
- Is it safe to delegate?
- Is human approval required first?

## Brief template

```markdown
## Task

## Background

## Input files

## Output artifacts

## Success criteria

## Constraints

## Forbidden actions

## Verification

## Handoff format
```

## Completion

A subagent is complete only after it returns:

- summary
- files read
- files changed
- artifacts created
- tests/checks run
- risks
- unresolved questions
- next steps

