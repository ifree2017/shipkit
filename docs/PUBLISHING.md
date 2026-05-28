# Publishing

This document defines the minimum checklist before publishing ShipKit as an npm alpha.

## Package identity

```text
name: @ifree2017/shipkit
bin: sk
license: MIT
status: alpha
```

## Pre-publish checklist

Run:

```bash
node --check bin/sk.js
node bin/sk.js check --to .
node bin/sk.js check list --to .
node bin/sk.js check integrations --to . --soft
node bin/sk.js check harness --to . --soft
node bin/sk.js check release-readiness --to .
npm pack --dry-run
```

If installed:

```bash
node bin/sk.js test
```

Create a smoke project:

```bash
node bin/sk.js new smoke-standard --to /tmp/shipkit-smoke-standard --profile standard-team
node bin/sk.js check --project /tmp/shipkit-smoke-standard
```

## Versioning

Use semver.

- `0.1.x`: alpha protocol, CLI, gates, profiles, and docs.
- `0.2.x`: runner adapters and stronger tests.
- `0.3.x`: codegraph/spec integration and richer scoring.
- `1.0.0`: stable protocol and migration path.

## Do not publish if

- `sk check` fails on the package root.
- `sk new` cannot create a project.
- `sk check --project` fails on a newly created standard-team project.
- npm packaging excludes required directories.
- public docs still describe the project as only a scaffold.
- third-party content has been copied without a clear license path.

## What may remain experimental in alpha

- `sk up`
- runner adapters
- Hive integration
- CodeGraph execution
- OpenSpec execution
- deep license scanning
- external tool invocation
