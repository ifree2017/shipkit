# Examples

ShipKit examples are intended to show how different project profiles affect workflow weight, directory structure, checks, and evidence expectations.

## Available Examples

### Simple Solo

Path:

```text
examples/simple-solo/
```

Use this profile for a small single-owner project such as a landing page, script, internal utility, or one-off automation.

Expected command:

```bash
sk new landing-page --profile simple-solo --to ./landing-page
sk check --project ./landing-page
```

### Standard Team

Path:

```text
examples/standard-team/
```

Use this profile for a normal team project with multiple modules, shared ownership, task tracking, sync logs, and status reports.

Expected command:

```bash
sk new crm --profile standard-team --to ./crm
sk check --project ./crm
```

### Change / Bug / Refactor

Path:

```text
examples/change-bug-refactor/
```

Use this example to understand how non-linear project work should be captured.

## Example Expansion Plan

Each example should eventually include:

```text
shipkit.yaml
docs/
tasks/
evidence/
handoff/
reports/
README.md
```

For richer examples, also include:

```text
changes/
defects/
refactors/
team/
modules/
sync/
```

## Example Quality Bar

An example is useful when a user can answer:

- what profile is this using?
- what kind of project does it represent?
- what should `sk check` verify?
- what artifacts should agents update?
- what would make this project ready to ship?
