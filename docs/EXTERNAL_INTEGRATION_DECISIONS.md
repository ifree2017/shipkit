# External Integration Decisions

ShipKit evaluates external repositories by role, not popularity.

Stars, forks, and social activity may help discovery, but they are not enough to approve integration. ShipKit integration decisions are based on:

- role fit
- license compatibility
- supply-chain risk
- output evidence quality
- gate compatibility
- platform neutrality
- overlap with existing ShipKit layers

## Current Decisions

| Candidate | Decision | Rationale |
|---|---|---|
| `colbymchenry/codegraph` | P0 evidence adapter | Strong fit for code intelligence, impact analysis, refactor planning, and regression selection. |
| `VoltAgent/awesome-design-md` | P1 reference-only | Useful DESIGN.md pattern source, but third-party brand docs should not be copied into core. |
| `nextlevelbuilder/ui-ux-pro-max-skill` | P1 internal rewrite | Useful UI/UX skill source; must be rewritten into ShipKit artifact/evidence contracts. |
| `obra/superpowers` | P1 methodology reference | Useful methods for brainstorm, TDD, review, worktrees, and subagent review. Do not replace ShipKit flow. |
| `affaan-m/ECC` | P2 reference-only | High value but high overlap; useful for doctor/repair/status/cross-harness ideas. |
| `ruvnet/ruflo` | P2 runner candidate | Potential multi-agent runner; overlaps with Hive and requires runner-vet. |
| `anomalyco/opencode` | P2 runner candidate | Coding agent runtime; map as runner, not skill source. |

## Integration Modes

### `evidence_adapter`

The external tool generates structured evidence. ShipKit gates decide whether that evidence can advance project state.

### `reference_only`

The repository is used for ideas, examples, or design patterns. Content is not copied into ShipKit by default.

### `rewrite_internal_skill`

The external method inspires a ShipKit-native skill with ShipKit inputs, outputs, evidence, and gates.

### `runner_candidate`

The external system may execute stages, but must conform to ShipKit's runner contract:

- run state
- event log
- artifacts registry
- gate result export
- human approval events
- failure attribution

## Non-goals

ShipKit does not aim to become a collection of vendored third-party skills.

ShipKit aims to provide a stable protocol, gate, evidence, and adapter layer that can safely use external systems.
