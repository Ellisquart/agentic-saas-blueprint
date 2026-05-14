# Agentic SaaS Blueprint

A minimal blueprint for building production SaaS with Claude. Two files to read, one folder to copy.

## What's here

```
agentic-saas-blueprint/
├── README.md       ← you are here
├── CLAUDE.md       ← drop into your new project root
├── starter/        ← copy these into your new project (mirrors real folder structure)
└── LICENSE         ← MIT
```

## Start a new project in 3 commands

```bash
git clone https://github.com/NewMatrixCap/agentic-saas-blueprint /tmp/blueprint
mkdir my-saas && cd my-saas
cp /tmp/blueprint/CLAUDE.md . && cp -r /tmp/blueprint/starter/. .
```

That's it. Open Claude Code in the folder. Say what you want to build. CLAUDE.md handles the context.

```bash
claude
> build the marketing landing page
```

The agent reads `CLAUDE.md`, follows the design system (theme tokens, light + dark, mobile-first), writes a plan, executes with TDD. No long onboarding paste required.

## The 9 rules baked into CLAUDE.md

1. No hardcoded colors. Use theme tokens (`text-text-app`, `bg-bg-public`, `text-gold`). Light + dark for free.
2. Both modes work on every component, day one.
3. Mobile-first. Test at 375 / 768 / 1280px.
4. Cards with destinations are clickable `<Link>` wrappers with gold hover halo.
5. Admin views have stat tiles, search, filters, pagination.
6. TDD. Failing test first.
7. No em-dashes in source.
8. PII scrubbed server-side before persistence.
9. External services soft-fail when keys are missing.

## What's in `starter/`

| File | Purpose |
|---|---|
| `app/globals.css` | Theme tokens (CSS variables) + light-mode safety overrides |
| `tailwind.config.ts` | Maps Tailwind classes to the CSS variables |
| `lib/theme/ThemeProvider.tsx` | React provider + `useTheme()` hook |
| `components/ui/ThemeToggle.tsx` | Sun / Moon 2-way switch |
| `components/brand/Logo.tsx` | Theme-aware logo (`variant="auto"`) |
| `components/app/metrics/MetricTile.tsx` | Stat tile with optional clickable `href` |
| `lib/email/client.ts` | Soft-fail Resend wrapper (stub when no key) |
| `tests/voice-sweep.test.ts` | Em-dash enforcement |
| `app/admin-list-page.example.tsx` | Reference pattern for any admin list page |
| `docs/superpowers/plans/` | Where implementation plans go |
| `docs/superpowers/specs/` | Where design specs go |

The folder structure inside `starter/` is the structure you'll have in your real project. `cp -r starter/. my-saas/` and every file lands where it needs to.

## Why this is short

The first version of this repo had 5 docs and three layers of "how to use the prompts" prose. It was longer than the templates. The templates are the value. Read CLAUDE.md, copy the starter, build.

If you want the long story (the 3-month build it was distilled from, the workflow rationale, the deploy fallback for when Vercel's webhook dies, the MCP setup) — it lives in the commit history and the prior tags. Run `git log` for the receipts.

## License

MIT. Free. Fork, adapt, ship.
