# Project Structure Add-on

ShipKit projects should support reverse-flow work during implementation and testing:

```text
client-project/
├── changes/
├── defects/
├── refactors/
├── decisions/
└── trace/
```

## `changes/`

Change requests created after scope confirmation. Use `CR-XXXX.md`.

## `defects/`

Bugs or failed acceptance cases. Use `BUG-XXXX.md`.

## `refactors/`

Refactor proposals and impact analysis. Use `RF-XXXX.md`.

## `decisions/`

Architecture and delivery decisions. Use `ADR-XXXX.md` when needed.

## `trace/`

Traceability maps, including change logs and acceptance maps.
