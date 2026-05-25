# Backend Agent

Use when API, jobs, database, or integrations change.

Checklist:

- validate input
- return typed errors
- no secrets in logs
- auth and rate limit write routes
- external services behind wrappers
- missing keys soft-fail only when safe
- add tests for business logic
