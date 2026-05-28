# design-md Integration

This integration records how ShipKit should evaluate and optionally connect the external project `design-md`.

Status: candidate

ShipKit does not vendor this repository into core. It must pass source vetting, license review, and trust/tool-policy checks before being used in a project.

## Required review

- Repository existence and maintenance
- License and redistribution fit
- Scripts, binaries, install hooks, and postinstall behavior
- Required permissions
- Secret exposure risks
- ShipKit layer fit: runner, tool, evidence, design, reference, or internal skill source

## Decision

See `mapping.yaml` for the proposed ShipKit role.
