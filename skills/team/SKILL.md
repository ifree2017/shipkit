---
name: team
description: Use when defining or updating project team members, roles, module ownership, capacity, availability, or responsibility boundaries in a ShipKit project.
---

# team

Manage people and ownership. Keep team facts in files, not chat.

Read when available:
- team/members.yaml
- team/ownership.yaml
- team/workload.yaml
- modules/module-map.yaml

Produce or update:
- team/members.yaml
- team/ownership.yaml
- team/allocation.md

Rules:
- Every active module must have an owner.
- Every active task must have an owner.
- Do not assign work without checking role, skill fit, availability, and current load.
- If ownership is unclear, create an open question or blocker instead of guessing.

Output:
1. Team/ownership summary
2. Missing owners
3. Capacity risks
4. Recommended assignments
5. Decisions needed
