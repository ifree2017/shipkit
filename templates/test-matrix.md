# ShipKit Test Matrix

| Area | Test | Expected | Status |
|---|---|---|---|
| CLI | node --check bin/sk.js | syntax passes |  |
| Profiles | sk new standard-team | project created |  |
| Gates | sk check --project | suite passes |  |
| Adapters | sk init codex | adapter files generated |  |
| Package | npm pack --dry-run | package builds |  |
