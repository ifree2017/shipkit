# Hermes Adapter: ShipKit Control Layer

Recommended mapping:

- `hermes.profile.md` maps to role/persona.
- `hermes.workflow.yaml` maps to ShipKit stages and control flows.
- `skills/` maps to Hermes skills.
- `protocol/` maps to the Hermes state machine and gates.

Hermes should not fork ShipKit core. It should load ShipKit protocol and translate stage commands into Hermes workflow actions.
