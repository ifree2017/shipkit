# Simple Solo Example

This example shows the lightest useful ShipKit workflow.

Use it for:

- a small script
- a landing page
- a simple internal tool
- a one-person feature
- a short project with low delivery risk

Recommended profile:

```text
simple-solo
```

Create a similar project:

```bash
sk new landing-page --profile simple-solo --to ./landing-page
sk check --project ./landing-page
```

The project should keep only enough structure to preserve facts, scope, tasks, evidence, and delivery notes.

Minimum expected artifacts:

```text
shipkit.yaml
docs/00-intake/
docs/02-scope/
tasks/
evidence/
delivery/
handoff/
```

Simple projects should not be forced into heavy team governance unless they become standard or complex projects.
