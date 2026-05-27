---
name: registry
description: Use when creating, updating, assigning, completing, or auditing ShipKit tasks across agents and stages. Maintains a platform-neutral task registry.
---

# Registry

Tasks must be traceable and artifact-backed.

## Task creation

Create a task when work is assigned, delegated, or tracked across time.

Required fields:

- id
- type
- title
- description
- status
- priority
- source reference
- expected artifacts
- verification

## Task completion

A task can be completed only when:

- the result summary exists
- produced artifacts are listed
- verification is recorded
- trace link exists
- unresolved risks are recorded

## Routing

If work is actually a new requirement, route to `change`.
If work is a failed expected behavior, route to `bug`.
If work is internal structural improvement, route to `refactor`.
If work lacks information, route to `clarify`.

