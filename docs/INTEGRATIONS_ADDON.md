# ShipKit Integrations Layer

This addon introduces a platform-neutral integration layer for external agent/tool ecosystems.

ShipKit should not vendor or blindly copy third-party agent repositories into `skills/`.
External capabilities are connected through mappings, trust policies, evidence outputs, and gates.

## Integration Principle

ShipKit core remains the source of process truth:

- `protocol/` defines stages, artifacts, policies, gates, and handoff contracts.
- `skills/` contains internal, rewritten ShipKit skills.
- `tools/` defines allowlisted tool/plugin/MCP capability maps.
- `integrations/` documents third-party mappings and license/trust policies.
- `evidence/` stores outputs produced by external tools.
- `gates/` decides whether external evidence is acceptable.

## External Sources Covered

| Source | ShipKit layer | Import mode |
|---|---|---|
| wshobson/agents | Tool / MCP / plugin catalog | reference + allowlist |
| assimovt/productskills | PM skill methodology | rewrite into internal skills |
| deanpeters/Product-Manager-Skills | PM methodology reference | reference only, rewrite internally |
| hingchou/pm-agent-workflow | Brownfield reverse PRD | adapter + evidence workflow |
| codegraph | Evidence layer | adapter, graph files, impact map |
| openspec | Spec layer | project spec files and drift gates |
| superpower | Capability pack | capability mapping |

## Do Not

- Do not copy third-party `SKILL.md` content into ShipKit core unless license permits.
- Do not let external plugins modify quote, contract, release, or delivery artifacts without review.
- Do not allow third-party tools to access secrets by default.
- Do not treat inferred code behavior as confirmed product requirements.
- Do not publish external scan output to clients before audit.

## Recommended Flow

```text
ShipKit Stage
  -> internal skill
  -> toolmap selects allowed external capability
  -> external tool writes evidence/
  -> ShipKit gate evaluates evidence
  -> human approval when required
  -> next stage
```

## Suggested Checks

```bash
sk check integrations --project ./client-project
sk check spec --project ./client-project
sk check evidence --project ./client-project
sk check vendor --project ./client-project
sk check toolmap --project ./client-project
```

To enable these names in `sk check`, merge `gates/registry.integrations.json` into `gates/registry.json`, or use the updated `bin/sk.js` included in this addon, which can load `registry.*.json` files automatically.
