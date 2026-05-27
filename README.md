# ShipKit

Portable agent workflow kit for taking software projects from requirements to shipped delivery.

ShipKit helps agent platforms run a consistent software delivery flow:

```text
intake -> discover -> scope -> prd -> arch -> plan -> build -> test -> release -> delivery
```

## Install

```bash
npm install -g @ifree2017/shipkit
```

Or run directly:

```bash
npx @ifree2017/shipkit init codex --to .
npx @ifree2017/shipkit init openclaw --to .
```

## CLI

```bash
sk init <platform> --to <path>
sk new <project-name>
sk check
sk up
```

Supported platforms:

- openclaw
- codex
- claude
- cursor
- hermes
- generic

## Status

ShipKit is currently in early scaffold stage.
