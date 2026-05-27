---
name: secrets
description: Use when auditing repositories, scripts, templates, or delivery artifacts for hard-coded credentials, tokens, API keys, private URLs, or client-sensitive data.
---

# Secrets

Secrets are release blockers.

## Red lines

Never commit or publish:

- API keys
- app secrets
- access tokens
- refresh tokens
- private keys
- passwords
- webhook secrets
- tenant credentials
- production database URLs
- client personal identifiers unless explicitly approved and redacted

## If a secret is found

1. Do not repeat the secret value.
2. Mark the file and approximate location.
3. Recommend immediate rotation.
4. Move configuration to environment variables.
5. Add `.env` to `.gitignore`.
6. Add a gate to prevent recurrence.
7. If published, create an incident record.

## Output

- severity
- affected file
- secret type
- exposure risk
- remediation steps
- whether release is blocked

