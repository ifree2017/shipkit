# ShipKit CLI Reference

The ShipKit CLI command is `sk`.

## Help

```bash
sk --help
```

## Initialize a Platform Workspace

```bash
sk init <platform> --to <path>
```

Supported platforms:

- `openclaw`
- `codex`
- `claude`
- `cursor`
- `hermes`
- `generic`

Examples:

```bash
sk init codex --to .
sk init openclaw --to ~/.openclaw/workspaces/shipkit
sk init claude --to ./client-project
sk init cursor --to ./client-project
```

## Create a Project

```bash
sk new <project-name> [--to <path>] [--profile <profile>]
```

Examples:

```bash
sk new landing-page --profile simple-solo
sk new crm --profile standard-team --to ~/Projects/crm
sk new migration --profile complex-team --to ~/Projects/migration
```

Supported profiles:

- `simple-solo`
- `simple-team`
- `standard-solo`
- `standard-team`
- `complex-team`
- `complex-multi`

## Auto-Classify a Project

```bash
sk classify [--project <path>] [--features <n>] [--modules <n>] [--contributors <n>]
```

Examples:

```bash
sk classify --features 6 --modules 3 --contributors 4 --external --production
sk classify --project ~/Projects/crm
```

Classification produces a recommended profile. Users can accept or override the recommendation.

## Run Gates

```bash
sk check [gate|suite] [--to <path>] [--project <name|path>] [--json] [--strict]
```

Examples:

```bash
sk check --project ./crm
sk check core --project ./crm
sk check team --project ./crm
sk check integrations --to . --soft
sk check list
```

If no gate or suite is given and `--project` points to a ShipKit project, ShipKit reads the project profile from `shipkit.yaml` and runs the profile's default suite.

## Common Suites

```bash
sk check core
sk check team
sk check integrations
sk check harness
sk check changes
sk check ops
sk check delivery
```

The exact suites are defined in `gates/registry*.json`.

## JSON Output

```bash
sk check core --project ./crm --json
```

Use JSON output for CI, dashboards, or runner adapters.

## Strict vs Soft Mode

Strict mode fails the process when a required gate fails:

```bash
sk check delivery --project ./crm --strict
```

Soft mode reports failures without failing the shell process:

```bash
sk check delivery --project ./crm --soft
```

## Experimental Commands

```bash
sk up
```

`sk up` is reserved for future upgrade behavior and is not implemented yet.

## Validation and scoring

```bash
sk test
sk test profiles
sk test gates
sk score --project ./client-project
sk score --project ./client-project --write
sk score stage prd --project ./client-project
```

`sk test` validates ShipKit itself. `sk score` produces an advisory readiness score for a project workspace. Gates still decide hard progression.
