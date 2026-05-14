# Agentic SaaS Blueprint

> A production-tested blueprint for building real SaaS products with Claude. Distilled from a 3-month build of a fintech platform serving SMB borrowers and lender partners.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stack](https://img.shields.io/badge/Stack-Next.js%2015%20%2B%20Prisma%20%2B%20Supabase-black)](#the-stack)
[![Workflow](https://img.shields.io/badge/Workflow-Brainstorm%20%E2%86%92%20Plan%20%E2%86%92%20TDD%20%E2%86%92%20Deploy-blue)](#the-workflow)

## Why this exists

Building a production SaaS with Claude is a different sport than writing a script or a side project. You will loop in circles if you don't have:

- A **project-level prompt** that holds the design system and non-negotiables across every chat
- A **workflow** (brainstorm → plan → subagent execute → verify) that prevents one-shot rewrites
- A **theme system** that supports light/dark from day one (not bolted on later)
- **Soft-fail wrappers** around every external API so the app builds without secrets
- **Manual deploy fallbacks** for when the Vercel webhook silently dies

This blueprint is the synthesis. Three months. 2,475 vitest tests. 450 ingested real leads. A working dark+gold marketing site. A working light/dark admin app. Multi-agent Marvin swarm with a self-improvement loop. Every lesson is in this folder.

## What's inside

| File | What it gives you |
|---|---|
| [`PROMPTS.md`](./PROMPTS.md) | The 4 paste-ready prompts: Project instructions, first-chat onboarding, per-feature template, tools setup. |
| [`HANDBOOK.md`](./HANDBOOK.md) | The workflow, the lessons learned, the deploy fallback, the MCP setup. One file, sectioned. |
| [`templates/`](./templates) | Drop-in starter code: theme system, theme toggle, theme-aware logo, clickable metric tile, admin list page pattern, soft-fail wrapper, voice-sweep test. |
| [`CHANGELOG.md`](./CHANGELOG.md) | Versioning for the blueprint itself. |

## Quick start (5 minutes)

1. **Create a Claude Project.** Paste [`PROMPTS.md`](./PROMPTS.md) section 1 into Project Instructions. Save.
2. **Enable MCP servers.** See [`HANDBOOK.md` → MCPs](./HANDBOOK.md#mcp-setup). Minimum: Serena, Vercel, Context7.
3. **Scaffold a Next.js 15 app.** Copy files from [`templates/`](./templates) into your repo at the matching paths. Start with `globals.css`, `tailwind.config.ts`, `ThemeProvider.tsx`, `ThemeToggle.tsx`.
4. **Open a new chat.** Paste [`PROMPTS.md`](./PROMPTS.md) section 2 as the first message. Claude onboards and reports status.
5. **Build your first feature.** Use [`PROMPTS.md`](./PROMPTS.md) section 3 as the template for every feature chat. Fill in the brackets.

## The stack

Locked-in defaults. Swap only with explicit reason.

- **Next.js 15+** App Router, route groups, server components by default
- **TypeScript strict** — `tsc --noEmit` is a commit gate
- **Tailwind CSS** with CSS-variable-driven theme tokens (`text-text-app`, `bg-bg-public`, etc.) — never literal color classes
- **Prisma + Postgres on Supabase** — needs `DATABASE_URL` (pooler) + `DIRECT_URL` (direct) in `.env.local`
- **NextAuth (Auth.js v5)** Credentials + Google providers. `SessionProvider` at root layout.
- **Stripe Checkout** for the 3-tier SaaS subscriptions
- **Resend** for transactional email (sandbox until DNS verified)
- **Vercel Cron** via `vercel.json` (no Inngest unless creds are present)
- **Recharts** for charts (text labels inherit `currentColor` for theme switching)
- **Cloudflare Turnstile** captcha on signup
- **Vitest** for tests; tests/ mirrors src tree

## Design principles (the short version)

1. **No hardcoded color literals.** No `text-white`, no `bg-[#xxxxxx]`. Always theme tokens. Light + dark mode from day one.
2. **Mobile-first.** Every layout tested at 375 / 768 / 1280px. No horizontal scroll. Hit targets ≥44px.
3. **Cards are clickable.** If a card represents a thing with a destination, the whole card is a `<Link>` with `-3px` hover lift + gold halo.
4. **Admin shows real data.** Stat tiles, search, filters, pagination — not bare HTML tables.
5. **Soft-fail externals.** Plaid, Stripe, Resend, Inngest — all behind env-gated wrappers that return typed no-ops when keys are missing. App builds without any third-party keys.
6. **TDD.** Failing vitest → minimal impl → green → commit. The test count grows with the feature count.
7. **No em-dashes in source.** The voice-sweep test enforces it. Use `" - "` or `": "`.
8. **PII scrubbing on every capture.** SSN, full EIN, card numbers — redacted server-side before persistence.

## The workflow

```
   brainstorm     →    write plan    →    subagent execute    →    verify deploy
   (one Q at a        (file paths,         (TDD per task,           (Vercel MCP +
    time, propose      full code in         spec review +            curl /api/health)
    2-3 approaches)    each step)           code quality review)
```

Every feature gets a markdown plan saved to `docs/superpowers/plans/YYYY-MM-DD-<slug>.md`. Every task in the plan is bite-sized (2-5 minutes). Every commit references the plan it's executing.

## License

MIT. See [`LICENSE`](./LICENSE). Free to use, fork, modify, redistribute. Attribution appreciated but not required.

## Credits

Synthesized from the New Matrix Capital build (newmatrix.capital). The lessons here cost time and circles to learn — they're free to inherit.

If you ship something good with this, [open an issue](#) and tell me. I'll add it to a "built with" section.
