# External Candidate Priority

This document records ShipKit's current integration stance for selected external repositories.

ShipKit does not treat external repositories as authoritative by default. A candidate must pass source vetting, license review, tool-policy review, and evidence/gate compatibility checks before it can affect project status.

## Priority Summary

### P0: Adopt as Evidence Adapter

#### `colbymchenry/codegraph`

Use as the highest-priority external candidate because code intelligence and impact analysis are central to ShipKit's SDLC loop.

Recommended ShipKit role:

- `evidence/codegraph/`
- `skills/codegraph/`
- `skills/impact/`
- `sk graph build`
- `sk impact`

Do not treat generated graph output as final truth without freshness and impact gates.

### P1: Rewrite or Reference

#### `VoltAgent/awesome-design-md`

Use as design-spec reference material. Do not copy third-party brand DESIGN.md files into ShipKit core by default.

Recommended ShipKit role:

- `design/DESIGN.md`
- `skills/design/`
- `skills/ui-spec/`
- `gates/check-design-spec.js`

#### `nextlevelbuilder/ui-ux-pro-max-skill`

Use as a UI/UX skill reference. Rewrite into ShipKit-specific UI/UX skills that produce evidence and review artifacts.

Recommended ShipKit role:

- `skills/ui-spec/`
- `skills/ui-review/`
- `skills/visual-review/`
- `evidence/ui-ux/`

#### `obra/superpowers`

Use as a methodology reference for brainstorming, TDD, review loops, worktree planning, and subagent review. Do not let it replace ShipKit's SDLC flow.

Recommended ShipKit role:

- `skills/brainstorm/`
- `skills/tdd/`
- `skills/review-loop/`
- `skills/worktree-plan/`

### P2: Candidate / Reference Only

#### `affaan-m/ECC`

Treat as high-value but high-overlap reference. Extract selected patterns only after source-vet.

Useful patterns:

- `sk doctor`
- `sk repair`
- `sk status`
- `sk uninstall`
- cross-harness packaging
- memory and security practices

#### `ruvnet/ruflo`

Treat as a runner candidate. It overlaps with Hive and should not become a default runner before comparison.

Runner-vet must check:

- event stream
- state persistence
- artifacts export
- human approval
- gate result export
- isolation/security model

#### `anomalyco/opencode`

Treat as a coding runner candidate, not a skill source.

It may map to build/review/test stages, but generated changes must still pass ShipKit gates.

## Standing Policy

External projects enter ShipKit through:

1. `integrations/`
2. `source-vet`
3. `license-policy`
4. `tool-policy`
5. evidence output
6. ShipKit gates

They do not enter `core` directly.
