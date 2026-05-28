---
name: classify
description: Use this when creating or reviewing a ShipKit project to recommend whether it should run as simple-solo, simple-team, standard-solo, standard-team, complex-team, or complex-multi. It prevents lightweight projects from being overloaded and complex projects from missing governance.
---

# Project Classifier

Use this skill before creating or reconfiguring a ShipKit project.

## Inputs

Ask or infer:

- Number of feature points
- Number of modules
- Number of contributors
- Whether there are external APIs or third-party systems
- Whether data import, migration, export, or sync is required
- Whether permissions, sensitive data, or security review are required
- Whether production release is required
- Whether formal customer acceptance or contract boundary exists
- Expected duration

## Output

Recommend exactly one profile:

- simple-solo
- simple-team
- standard-solo
- standard-team
- complex-team
- complex-multi

Return:

1. Recommended profile
2. Reasons
3. Enabled layers
4. Disabled layers
5. Whether the user should confirm or override

## Rules

- Do not force team execution on solo simple work.
- Do not skip traceability, dependency, approval, or release governance for complex work.
- If unsure, choose the safer standard profile and list assumptions.
- User override is allowed, but the override reason must be recorded.
