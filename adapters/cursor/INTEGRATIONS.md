# ShipKit Integrations on cursor

This adapter should load ShipKit core first, then use `integrations/`, `tools/`, and `protocol/` files to decide whether external tools are allowed.

Recommended order:

1. Read `protocol/integration-policy.yaml`.
2. Read `tools/tool-policy.yaml`.
3. Use `tools/plugin-map.yaml` and `tools/mcp-map.yaml` to select tools.
4. Store outputs under project `evidence/`.
5. Run relevant gates before stage progression.

Never let platform-specific plugins bypass ShipKit gates for quote, contract, release, or client-facing delivery.
