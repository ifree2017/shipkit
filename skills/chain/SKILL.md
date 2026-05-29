---
name: chain
description: Close a business chain by tracing trigger, roles, normal path, data flow, external dependencies, exception paths, acceptance owner, and evidence.
---

# Chain

Use this skill when a request is still a feature point instead of a complete business scenario.

## Required Chain Elements

For every chain, document:

- trigger event
- initiating actor
- participating roles
- current workflow
- target workflow
- input data
- processing steps
- output data
- downstream system or human action
- external dependencies
- normal path
- exception paths
- timeout/retry/compensation needs
- acceptance owner
- acceptance evidence

## Outputs

Create or update:

- `docs/01-discover/business-chain.md`
- `docs/01-discover/data-flow.md`
- `docs/01-discover/exception-paths.md`
- `docs/01-discover/role-matrix.md`

## Completion Criteria

A chain is closed only when it has:

- a clear start point
- a clear end point
- data source and destination
- normal and exception paths
- dependencies
- acceptance criteria and evidence

If any element is missing, route to `clarify`, `dependency`, or `risk`.
