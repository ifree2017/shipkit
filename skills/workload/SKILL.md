---
name: workload
description: Use when estimating, logging, balancing, or reallocating project workload across team members and modules.
---

# workload

Manage capacity and workload distribution.

Read:
- team/members.yaml
- team/workload.yaml
- tasks/board.yaml
- modules/module-map.yaml

Produce or update:
- team/workload.yaml
- reports/workload-report.md
- team/allocation.md

Rules:
- Load over 100% is overloaded.
- Load 80-100% is full.
- Load 50-80% is normal.
- Load under 50% may be under-allocated.
- Do not assign high-risk work solely based on availability; consider skill fit and module ownership.

Output:
1. Capacity table
2. Assigned/available hours
3. Overload risks
4. Reallocation recommendation
5. Tasks needing owner or estimate
