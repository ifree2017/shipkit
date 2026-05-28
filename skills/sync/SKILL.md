---
name: sync
description: Use when planning, running, recording, or troubleshooting multi-person or multi-module integration work.
---

# sync

Coordinate integration and joint debugging.

Read:
- sync/integration-plan.md
- sync/integration-log.md
- modules/module-map.yaml
- dependencies/
- blockers/
- defects/
- spec/

Produce or update:
- sync/integration-plan.md
- sync/integration-log.md
- evidence/integrations/

Rules:
- Integration must have participating modules, owners, environment, test data, API/spec readiness, and expected result.
- Integration failure must be classified as bug, dependency, env, data, clarification, or change.
- Do not mark integration done without evidence and next-step closure.

Output:
1. Integration readiness
2. Integration log entry
3. Failed checks
4. Issue classification
5. Next action owner
