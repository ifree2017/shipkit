# ShipKit Pull Request

## Summary

- 

## Layer touched

- [ ] protocol
- [ ] skills
- [ ] gates
- [ ] workflows
- [ ] templates
- [ ] adapters
- [ ] integrations
- [ ] docs
- [ ] examples
- [ ] CLI

## Validation

Run what applies:

```bash
node --check bin/sk.js
node bin/sk.js check --to .
node bin/sk.js check release-check --to .
node bin/sk.js new demo --to /tmp/shipkit-demo --profile standard-team
node bin/sk.js check --project /tmp/shipkit-demo
npm pack --dry-run
```

## Notes

- [ ] Does not vendor third-party content into core without review.
- [ ] Does not add production automation without human approval policy.
- [ ] Updates docs or examples if user-facing behavior changes.
