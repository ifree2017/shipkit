# Wangyuyan Adapter

This adapter maps prior Wangyuyan OpenClaw workspace patterns into ShipKit. It is not a direct copy of that workspace.

## Mapping

| Wangyuyan pattern | ShipKit equivalent |
|---|---|
| RD Lead identity | `skills/lead` |
| AGENTS.md operating rules | OpenClaw adapter `AGENTS.md` plus `protocol/*` |
| SOUL.md persona | adapter persona file |
| MEMORY.md / daily logs | `skills/memory`, `protocol/context-fabric.yaml` |
| STATE.md per project | `templates/STATE.md` |
| task-manager and task schema | `protocol/task-registry.yaml`, `skills/registry` |
| coordinator skill | `skills/coord` |
| subagent spawn standards | `protocol/subagent-policy.yaml`, `skills/spawn` |
| subagent review v2 | `protocol/review-loop.yaml`, `skills/review` |
| process validation test | `protocol/pvt.yaml`, `skills/pvt` |
| tool vocabulary | `protocol/tool-policy.yaml`, `skills/toolmap` |
| hard-coded secret incident | `skills/secrets`, `gates/check-secret-redlines.js` |

## Import policy

Do not import:

- personal identity files
- private memory logs
- hard-coded secrets
- user-specific server paths
- one-off project lists

Import only:

- process patterns
- protocol ideas
- templates after redaction
- platform capability lessons
