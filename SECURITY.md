# Security Policy

## Supported code

Security reports should identify the affected repository, branch or commit, the affected component, and a concise description of the issue.

## Reporting a vulnerability

Please do not publish credentials, exploit details, personal data or an unpatched vulnerability in a public issue.

Use GitHub's **Report a vulnerability** option in the repository's Security tab when private vulnerability reporting is available. If that option is unavailable, contact the repository owner through their GitHub profile and request a private channel.

## Credential handling

- Never commit API keys, access tokens, passwords, private keys, database connection strings or production data.
- Keep secrets in local environment files or trusted hosting-provider secret stores.
- Treat frontend build-time variables (including `VITE_*`) as public.
- Revoke and rotate any credential that may have been exposed. Deleting the value from Git history is not sufficient.
