---
name: env
description: Use when local, test, staging, production, customer, or CI/CD environment readiness is uncertain or failing.
---

# Environment

Environment issues must be separated from product defects.

For each environment issue, produce:
1. Environment
2. Issue
3. Expected configuration
4. Actual configuration
5. Affected modules
6. Owner
7. Fix plan
8. Verification steps
9. Release impact
10. Rollback implication

Before release, verify:
- env vars
- domain and certificate
- database
- storage
- third-party credentials
- logs
- backup
- rollback
