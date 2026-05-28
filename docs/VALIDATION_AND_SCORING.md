# Validation and Scoring

ShipKit separates validation into two layers.

## 1. ShipKit self-validation

Use this to verify the ShipKit package, CLI, profiles, gates, and adapters.

```bash
npm test
sk test
sk test cli
sk test profiles
sk test gates
sk test adapters
sk test package
```

The selftest suite creates temporary projects, runs profile-driven checks, initializes platform adapters, and verifies `npm pack --dry-run`.

## 2. Project scoring

Use this to estimate whether a project workspace is ready to continue, needs review, or should be blocked.

```bash
sk score --project ./client-project
sk score --project ./client-project --write
sk score stage prd --project ./client-project
```

`--write` creates:

```text
reports/score-report.md
.shipkit/score.json
```

## Score bands

| Grade | Score | Meaning |
|---|---:|---|
| A | 90-100 | Ready |
| B | 80-89 | Good, minor issues |
| C | 70-79 | Human review required |
| D | 60-69 | Risky, fix before advancing |
| F | <60 | Blocked |

## Dimensions

The default scoring model uses eight dimensions:

- scope clarity
- traceability
- execution readiness
- team execution
- evidence quality
- risk control
- delivery readiness
- document safety

Scoring is advisory. Gates still control hard progression.
