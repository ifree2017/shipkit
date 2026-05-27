# wshobson/agents Integration

Use this integration as a plugin/tool catalog, not as vendored ShipKit core.

Recommended role:

- `conductor` for planning and phased execution.
- `full-stack-orchestration` for backend/frontend implementation coordination.
- `security-scanning` for security evidence.
- `git-pr-workflows` for PR workflows.
- `comprehensive-review` for pre-release review.
- `deployment-validation` for release readiness.
- `code-documentation` for architecture and delivery docs.

ShipKit controls when these plugins are called through `tools/plugin-map.yaml` and gates their evidence output.
