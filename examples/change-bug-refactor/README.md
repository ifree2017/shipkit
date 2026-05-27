# Change / Bug / Refactor Examples

Use these examples to validate the ShipKit reverse-flow model:

- New requirement during build: create `changes/CR-0001.md`
- Failed UAT case: create `defects/BUG-0001.md`
- Internal technical redesign: create `refactors/RF-0001.md`

Run checks from a project root:

```bash
node gates/check-change-impact.js .
node gates/check-bug-traceability.js .
node gates/check-refactor-approval.js .
```
