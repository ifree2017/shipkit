# Import Policy

Do not copy wshobson plugin content into ShipKit core by default.
Use plugin references and adapter mapping.

Allowed:
- Map plugin names to ShipKit stages.
- Document recommended plugin usage.
- Store plugin outputs under `evidence/`.

Not allowed by default:
- Copy plugin source into `skills/`.
- Let plugins write contract, quote, or delivery artifacts without audit.
