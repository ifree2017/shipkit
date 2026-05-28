# Project Profiles

ShipKit projects do not all need the same process weight. A one-person one-week project should not be forced through the same workflow as a multi-team production release.

ShipKit uses profiles to decide which directories, skills, gates, reports, and governance layers are enabled.

## Profiles

| Profile | Use When | Default Gate Suite |
|---|---|---|
| `simple-solo` | Small solo task, 1-3 features, low risk | `smoke + secrets + profile` |
| `simple-team` | Small project with multiple contributors | `smoke + secrets + profile + team` |
| `standard-solo` | Normal solo delivery with PRD, changes and delivery records | `core + changes + profile` |
| `standard-team` | Normal team software delivery with modules, workload and integration records | `core + changes + team + ops + profile` |
| `complex-team` | High-risk team delivery with release, approvals, security/data concerns | `core + team + changes + ops + control + harness + delivery + profile` |
| `complex-multi` | Multi-team or vendor delivery with strict handoff and integration governance | `complex-team + integrations` |

## New Project

```bash
sk new landing-page --profile simple-solo
sk new crm --profile standard-team --to ~/Projects/crm
sk new erp --auto --features 18 --modules 8 --contributors 6 --external --data --production
```

## Classification

```bash
sk classify --project ~/Projects/crm
```

If a project already contains `shipkit.yaml`, `sk classify` reads its existing profile. If no project file exists, pass signals such as `--features`, `--modules`, `--contributors`, `--external`, `--data`, `--security`, `--production`, and `--acceptance`.

## Check Behavior

When a project is provided and no explicit suite is requested, ShipKit reads `shipkit.yaml` and uses the project's profile:

```bash
sk check --project ~/Projects/crm
```

This avoids forcing simple projects through heavy gates while still requiring complex projects to pass stronger governance.

## Override Policy

Users may override the recommendation with `--profile`, `--mode`, or `--team`. Overrides should be recorded in `shipkit.yaml` under `classification.reasons`.
