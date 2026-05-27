---
name: vendor-review
description: Use when evaluating a third-party skill, plugin, MCP server, repository, workflow, or capability pack before integrating it into ShipKit.
---

# Vendor Review

Review third-party resources before use.

## Inputs

- repository URL or local path
- license file
- README
- scripts
- skill instructions
- tool permissions

## Outputs

- `evidence/vendor/vendor-review.md`
- `evidence/vendor/license-review.md`
- `evidence/vendor/trust-review.md`

## Review Areas

1. License
2. Content import mode
3. Tool permissions
4. Shell/network/destructive actions
5. Secret handling
6. Prompt-injection risk
7. Output evidence path
8. Human approval requirements

## Decision

Return one of:

- reject
- reference-only
- rewrite-internal-skill
- adapter-only
- allowlisted-tool
- vendor-after-review
