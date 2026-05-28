# Team Execution Layer

ShipKit Team Execution Layer adds structured collaboration for multi-person software delivery.

It answers:

- Who owns each module?
- Which tasks are assigned and in progress?
- What is the estimated and actual workload?
- Which modules are ready for integration?
- What evidence exists for development, testing, review, and integration?
- What is the current project/module/member status?

## Project directories

```text
team/       members, ownership, workload, allocation
modules/    module map and progress
tasks/      task files and board
sync/       integration plan, integration log, daily log
reports/    status, workload, progress reports
evidence/   commits, tests, reviews, integrations
```

## Principles

1. Every active task must have an owner.
2. Every task must link to a module, requirement, acceptance criteria, and evidence.
3. Development, testing, review, and integration must leave artifacts.
4. Module progress is computed from task, test, integration, and gate evidence.
5. Workload assignment must consider capacity, skill fit, ownership, priority, and risk.
6. Integration failures must be classified as bug, dependency, env, data, change, or clarification.
7. Status reports must show progress, risks, blockers, workload, decisions needed, and next actions.

## Checks

```bash
sk check team --project ./client-project
sk check execution --project ./client-project
sk check sync --project ./client-project
```

## Recommended workflow

```text
plan
  -> create modules and owners
  -> create tasks and estimates
  -> assign workload
build/test
  -> update task status and evidence
  -> update module progress
sync
  -> plan and log integration
  -> classify integration failures
delivery
  -> generate status/progress/workload reports
```
