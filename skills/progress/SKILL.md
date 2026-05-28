---
name: progress
description: Use to compute and summarize project, module, stage, task, test, release, and delivery progress from ShipKit project artifacts.
---

# progress

Compute progress from structured project artifacts, not from optimistic chat summaries.

Read:
- tasks/board.yaml
- modules/module-map.yaml
- team/workload.yaml
- sync/integration-log.md
- defects/
- blockers/
- risks/
- gates outputs

Produce or update:
- modules/progress.md
- reports/progress-report.md
- reports/status-report.md

Rules:
- Prefer estimate-weighted progress over manually entered percentage.
- Surface blocked work separately from incomplete work.
- Report confidence and missing data.
- Progress must mention open bugs, blockers, changes, and dependencies.

Output:
1. Overall progress
2. Module progress table
3. Stage progress
4. Risk-adjusted status
5. Next actions
