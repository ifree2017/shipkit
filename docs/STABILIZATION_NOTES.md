# ShipKit Stabilization Notes

This patch stabilizes ShipKit as an installable and checkable portable SDLC harness.

## Changes

- Added `gates/registry.json` so default/core/project suites resolve to real gate scripts.
- Updated the gate registry loader to merge both `aliases` and metadata-style `gates` entries.
- Kept addon registries such as `registry.harness.json` and `registry.integrations.json` composable.
- Updated `sk init` to copy `docs/`, `integrations/`, `tools/`, and `spec/` into target workspaces.
- Updated `sk new` to initialize `.shipkit/runs`, `.shipkit/events`, `.shipkit/approvals`, and `spec/`.
- Updated npm package files to include docs, integrations, tools, spec, and GitHub templates.
- Updated GitHub Actions to run package-safe checks instead of project-only gates on the package root.

## Recommended checks

```bash
node --check bin/sk.js
node bin/sk.js check --to . --soft
node bin/sk.js check list --to .
node bin/sk.js new demo --to /tmp/shipkit-demo
node bin/sk.js check core --project /tmp/shipkit-demo --soft
node bin/sk.js init codex --to /tmp/shipkit-codex
node bin/sk.js init openclaw --to /tmp/shipkit-openclaw
```

## Next stabilization work

- Split `bin/sk.js` into `commands/` and `lib/` modules.
- Add a `check-registry` gate for duplicate ids, missing scripts, and suite validity.
- Strengthen primary skills: intake, discover, scope, prd, arch, test, delivery.
- Add runner adapters such as Hive after the core gate runner is stable.
