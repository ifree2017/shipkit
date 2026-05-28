# External Candidates Layer

This document records how ShipKit evaluates and integrates external harness, runner, design, and code-intelligence projects.

ShipKit does not vendor external repositories into core by default. External projects must enter through the integration layer, pass source vetting, and produce evidence before gates or delivery status can rely on them.

## Candidate projects

| Project | ShipKit role | Priority | Default action |
|---|---|---:|---|
| `colbymchenry/codegraph` | Code intelligence / evidence layer | P0 | Integrate as codegraph evidence adapter |
| `anomalyco/opencode` | Coding runner adapter | P1 | Integrate as runner candidate after contract vetting |
| `VoltAgent/awesome-design-md` | DESIGN.md and UI spec reference | P1 | Use as design-spec reference, do not vendor templates wholesale |
| `obra/superpowers` | Skill framework / capability pack reference | P1/P2 | Reference skill lifecycle and hooks patterns |
| `affaan-m/ECC` | Cross-harness capability catalog | P2 | Reference doctor/status/repair/cross-harness packaging ideas |
| `ruvnet/ruflo` | Multi-agent runner candidate | P2 | Vet against Hive/OpenClaw before integration |
| `nextlevelbuilder/ui-ux-pro-max-skill` | UI/UX skill reference | P2 | Rewrite into internal UI review/design audit skills if useful |

## Integration rule

External projects must follow this route:

```text
candidate repo
  -> integrations/<name>/
  -> source-vet
  -> license/trust/tool-policy checks
  -> mapping.yaml
  -> evidence output
  -> ShipKit gates
```

External tools must not directly change ShipKit delivery status. They write evidence first; ShipKit gates decide progression.

## Recommended next implementation order

1. CodeGraph evidence adapter.
2. Design layer and UI review skills.
3. Source and runner vetting gates.
4. OpenCode runner adapter.
5. Hive runner adapter.
6. ECC/Superpowers capability lessons.
7. Ruflo runner evaluation.
