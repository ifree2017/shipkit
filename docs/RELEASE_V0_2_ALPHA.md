# Release Plan: v0.2.0-alpha

This document defines the minimum bar for the first public alpha release of ShipKit.

## Release Goal

Make ShipKit safe to install, inspect, and try on small or standard projects.

The release does not need to provide full production automation. It must provide a coherent alpha experience:

- clear README
- working CLI basics
- project profiles
- gate runner
- examples
- package dry run
- known limitations

## Release Checklist

Before tagging `v0.2.0-alpha`, verify:

```bash
node --check bin/sk.js
sk check --to .
sk check list --to .
sk new demo --profile simple-solo --to /tmp/shipkit-simple
sk check --project /tmp/shipkit-simple
sk new crm --profile standard-team --to /tmp/shipkit-standard
sk check --project /tmp/shipkit-standard
sk init codex --to /tmp/shipkit-codex
sk init openclaw --to /tmp/shipkit-openclaw
npm pack --dry-run
```

## Required Docs

- `README.md`
- `HARNESS.md`
- `docs/README.md`
- `docs/CLI_REFERENCE.md`
- `docs/PROJECT_PROFILES.md`
- `docs/ALPHA_STABILIZATION_ROADMAP.md`
- `docs/PUBLISHING.md`
- `docs/EXAMPLES.md`

## Required Examples

At minimum:

- `examples/simple-solo/`
- `examples/standard-team/`

Each example should explain:

- when to use it
- which profile it uses
- what checks should pass
- what artifacts a real project would add

## Release Notes Template

```md
# ShipKit v0.2.0-alpha

ShipKit is a portable SDLC agent harness for moving software projects from requirements to shipped delivery.

This alpha includes:

- project profiles
- project scaffolding
- gate runner
- platform workspace adapters
- team execution structures
- external integration mappings
- initial examples

Known limitations:

- runner adapters are still evolving
- some skills are scaffold-level
- `sk up` is not implemented
- vendor/license checks are structural and not legal advice
```

## Publish Commands

```bash
npm version 0.2.0-alpha.0
git push origin main --tags
npm publish --access public --tag alpha
```

Only publish after the release checklist passes.
