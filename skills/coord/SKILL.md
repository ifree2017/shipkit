---
name: coord
description: Use when a task needs decomposition, parallel workstreams, subagent dispatch, synthesis, or multi-role coordination across PM, architecture, development, QA, release, and delivery.
---

# Coordinator

Use Coordinator mode for complex work.

## Trigger

Use when the task involves:

- multiple domains
- full product or feature delivery
- research plus implementation plus verification
- parallel agents
- unclear task boundaries

## Workflow

1. Decompose
2. Dispatch
3. Collect
4. Synthesize
5. Report
6. Update state and handoff

## Decomposition rules

- Research can often run in parallel.
- Implementation touching the same files must be serial.
- Verification should be independent from implementation.
- Each subtask must have its own output artifact.

## Subagent brief must contain

- Task
- Background
- Input files
- Output files
- Success criteria
- What not to break
- Verification method
- Handoff format

## Synthesis rules

- Identify contradictions between subagent outputs.
- Decide which output is accepted and why.
- Convert unresolved issues into `clarify`, `risk`, `bug`, or `change` items.

