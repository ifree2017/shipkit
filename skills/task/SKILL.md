---
name: task
description: Use when creating, splitting, assigning, tracking, or closing delivery tasks tied to requirements, modules, PRD sections, tests, or evidence.
---

# task

Turn scoped work into traceable tasks.

Read when available:
- docs/03-prd/prd.md
- docs/05-plan/
- modules/module-map.yaml
- tasks/board.yaml
- trace/trace-map.md

Produce or update:
- tasks/TASK-xxxx.yaml
- tasks/board.yaml
- trace/trace-map.md

Rules:
- A task must have owner, module, estimate, status, related requirement, acceptance, and evidence fields.
- No task can move to in_progress without owner and estimate.
- No task can move to done without test/evidence.
- If a task is new scope, create a change request first.

Output:
1. Task list or task update
2. Traceability changes
3. Missing evidence
4. Blockers and dependencies
