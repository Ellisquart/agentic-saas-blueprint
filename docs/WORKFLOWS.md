# Workflows

## New Project

1. Run installer.
2. Open project in Claude Code.
3. Paste `ONE_PROMPT.md`.
4. Build smallest useful product slice.
5. Verify with tests and browser.
6. Commit.

## Feature Build

1. Read memory.
2. Inspect current files.
3. Write failing test when logic is risky.
4. Implement.
5. Verify desktop and mobile if UI changed.
6. Update memory.
7. Commit.

## Production Audit

1. Build.
2. Test.
3. Check auth gates.
4. Check secrets.
5. Check rate limits.
6. Check empty, loading, error states.
7. Check mobile layout.
8. Check logs do not leak PII.
9. Write blocker list.
