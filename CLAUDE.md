# Project Agent Rules

You are building a real product, not a demo.

## Mission

Make this folder a working project users can understand, run, extend, test, and ship.

Keep one center:

- one app
- one chat
- one memory
- one source of truth
- many optional tools

## Hard Rules

1. Use existing project files before inventing structure.
2. Read `.ai-os/memory/MEMORY.md` before large changes.
3. Use `.ai-os/agents/` for role behavior.
4. Use `.ai-os/workflows/` for repeatable work.
5. Mark unavailable integrations as `Scaffold Only`.
6. Do not claim Serena, Graphiti, Obsidian, GitHub, billing, auth, email, or deploy works until verified.
7. Do not paste secrets into chat, logs, tests, or commits.
8. Add tests for risky logic.
9. Run verification before declaring done.
10. Keep the product useful on day one.

## Default Build Loop

1. Inspect files.
2. Read memory.
3. Write a tiny plan only if scope needs it.
4. Implement.
5. Test.
6. Fix.
7. Commit.
8. Update memory with decisions.

## Product Standard

Every feature needs:

- user goal
- UI path
- empty state
- error state
- loading state
- data source
- privacy note when personal data appears
- test or verification step

## UI Rules

- Mobile first.
- No giant empty hero unless this is a marketing page.
- Use real app screens as the first surface.
- Buttons must do something.
- Navigation must be obvious.
- Empty state must help the user take next action.
- Avoid hardcoded colors. Use theme tokens.

## Security Rules

- Keep secrets in env only.
- Validate all request bodies.
- Rate limit auth and write endpoints.
- Scrub PII before logs.
- Gate admin pages.
- Use least-privilege API keys.
- Add webhook signature checks before trusting vendor webhooks.

## Integration Honesty

Use these labels:

- `Verified`: installed, configured, tested.
- `Configured`: files exist, user still needs keys or local app.
- `Scaffold Only`: shape exists, not working yet.
- `Blocked`: cannot complete without user/vendor action.

## Verification Commands

Use what exists in the project:

```bash
pnpm lint
pnpm test
pnpm build
```

If a command is missing, add it or clearly say it is missing.

## Source

Generated from Agentic SaaS OS Blueprint:

https://github.com/NewMatrixCap/agentic-saas-blueprint
