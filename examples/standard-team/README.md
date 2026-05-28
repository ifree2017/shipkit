# Standard Team Example

This example shows the recommended ShipKit profile for a normal team project.

Use it for:

- client/internal web app projects
- multi-module feature delivery
- frontend/backend collaboration
- projects with testing and release coordination
- projects that need progress reporting and task ownership

Recommended profile:

```text
standard-team
```

Create a similar project:

```bash
sk new crm --profile standard-team --to ./crm
sk check --project ./crm
```

Expected structures include:

```text
team/
modules/
tasks/
sync/
reports/
evidence/
changes/
defects/
blockers/
dependencies/
```

A standard team project should be able to answer:

- who owns each module?
- what is each task's status?
- which tasks are blocked?
- where are test and review evidence stored?
- what is the current project status?
