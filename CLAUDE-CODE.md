# Claude Code Kit

Two paste-ready artifacts for starting a new project in **Claude Code** (the CLI / terminal tool), as opposed to Claude Projects in the web UI.

- [Part A: CLAUDE.md to drop at your project root](#part-a-claudemd-project-context)
- [Part B: First-message prompt for the new chat](#part-b-first-message-paste-this-into-claude-code)
- [Part C: Day-to-day chat openers](#part-c-day-to-day-chat-openers)

In Claude Code, `CLAUDE.md` at the root of the project is the equivalent of "Project Instructions" in the web UI. Claude Code reads it on every session in that directory. Drop one in and the agent never forgets your design system.

---

## Part A: `CLAUDE.md` (project context)

Copy this verbatim into a new file at the **root** of your new project: `[your-project-folder]/CLAUDE.md`. Edit the bracketed parts.

````markdown
# [PROJECT NAME]

[One-sentence description, e.g. "Credit-Karma-for-business SaaS serving SMB borrowers with a lender-referral revenue model."]

Production URL: [URL]
Branch in active development: [BRANCH NAME]
Canonical contact email: [info@yourdomain.com]

## Stack (locked - propose alternatives only with explicit reason)

- Next.js 15+ App Router with route groups: (marketing), (auth), (app), (partner)
- TypeScript strict; `tsc --noEmit` is a commit gate
- Tailwind CSS with CSS-variable-driven theme tokens (text-text-app, bg-bg-public, text-gold) - never literal color classes
- Prisma + Postgres on Supabase. `.env.local` needs `DATABASE_URL` (pooler) + `DIRECT_URL` (direct)
- NextAuth (Auth.js v5) with Credentials + Google providers. SessionProvider mounted at app/layout.tsx root
- Stripe Checkout + webhooks for SaaS subscriptions
- Resend for transactional email (sandbox `onboarding@resend.dev` until DNS verified)
- Recharts for charts (text labels inherit currentColor)
- Cloudflare Turnstile captcha on signup
- Vercel Cron via vercel.json (no Inngest unless creds present)
- Vitest for tests; tests/ mirrors src tree

## Non-negotiables

1. **No hardcoded color literals.** Never `text-white`, `bg-white/[0.04]`, `border-white/X`, `text-[#xxxxxx]`, `bg-[#xxxxxx]`. Always theme tokens. The tokens flip on `[data-theme='dark' | 'light']` in `globals.css` automatically.
2. **Light + dark mode both work on every component, day one.** Visually test both with the Sun/Moon ThemeToggle before claiming done.
3. **Mobile-first.** Test 375 / 768 / 1280px. No horizontal scroll. Hit targets >=44px.
4. **Cards with a destination are clickable** `<Link>` wrappers with -3px hover lift + gold halo.
5. **Admin views show real data.** Stat tiles, search, filters, pagination. Not bare HTML tables.
6. **TDD.** Failing vitest first. Tests required for every commit.
7. **No em-dashes in source.** Voice-sweep test enforces. Use " - " or ": ".
8. **PII scrubbing on capture.** SSN, full EIN, card numbers redacted server-side before persistence.
9. **Soft-fail on external services.** Every Plaid/Stripe/Resend/Inngest integration sits behind an env-gated wrapper that returns typed no-ops without keys. App builds without any third-party keys.

## Workflow

1. New feature/fix: invoke `superpowers:brainstorming` -> design doc -> `superpowers:writing-plans` -> save to `docs/superpowers/plans/YYYY-MM-DD-<slug>.md` -> `superpowers:subagent-driven-development` to execute.
2. Pure bug fix: read components, write failing test, fix, run tests, commit.
3. Commits: imperative subject, body explains WHY. Co-author trailer for Claude.
4. Push to [BRANCH]. Then VERIFY Vercel deploy fired via Vercel MCP `list_deployments`. Webhook is unreliable; if SHA doesn't match HEAD, manual `vercel deploy --prod --yes`.
5. Use Serena MCP for code navigation. Prefer `find_symbol` / `get_symbols_overview` / `find_referencing_symbols` over Read.

## Anti-patterns (do not repeat)

- "Hotfix" comments disabling features - fix the root cause or don't merge.
- Single-theme UI with plans to "add light later" - both modes from start.
- Component-by-component color sweep migrations - use a single CSS specificity layer in globals.css scoped to `[data-theme='light']` when the pattern is uniform.
- Skipping mobile review until polish week.
- Bare HTML tables in admin pages.
- Plans with placeholders ("TODO", "fill in details", "appropriate validation").
- Commits without typecheck + vitest first.
- Trusting Vercel auto-deploy webhook without verification.

## Environment

- OS: Windows 11
- Vercel project: [PROJECT ID] / [TEAM ID]
- Lead data / assets: [PATHS TO EXTERNAL DRIVES OR DIRS, if any]

## How you should behave

Default to action. Ask exactly one clarifying question only when ambiguity blocks progress. When asked to plan, plan in full file paths + complete code blocks. When asked to build, write the failing test, the code, the commit. When asked to ship, push AND verify the deploy AND curl `/api/health`.
````

---

## Part B: First message (paste this into Claude Code)

After creating the `CLAUDE.md` above, open a new Claude Code chat from your project directory and paste this as the first message. Edit the bracketed parts.

````
We're starting [PROJECT NAME]. The blueprint we're building from is at C:\Users\MATRI\Desktop\agentic-saas-blueprint\. Project root is [ABSOLUTE PATH TO NEW PROJECT FOLDER].

Onboarding pass (do all of this before asking me anything):

1. Read CLAUDE.md at the project root. That's the design system contract.
2. Read C:\Users\MATRI\Desktop\agentic-saas-blueprint\HANDBOOK.md so you have the workflow + lessons + deploy fallback + MCP setup in context.
3. Scan C:\Users\MATRI\Desktop\agentic-saas-blueprint\templates\ - list the files there. These are drop-in starter files.
4. If this is a fresh project (no package.json yet), tell me. If there's existing code, run `git status`, `git log --oneline -20`, `ls app/` and report.
5. Activate Serena on this project: mcp__plugin_serena_serena__activate_project on [ABSOLUTE PATH].
6. Confirm MCP availability: tell me whether Serena, Vercel, and Context7 MCPs are responding. Don't try to install missing ones.

After the onboarding, give me a one-screen status:
- Project state (fresh / existing / dirty / clean)
- Which blueprint templates apply (e.g. globals.css needed, tailwind.config.ts needed, ThemeProvider needed)
- MCP availability
- Next recommended step

Then WAIT for my next instruction. Don't start scaffolding code until I tell you what to build first.

Context priors:
- I built newmatrix.capital using this blueprint's lessons. The same patterns work here.
- I prefer one task at a time, brainstorming first, then plan, then execute task-by-task. No big-bang rewrites.
- I use Windows 11, Node 22+, npm. Vercel CLI on PATH. GitHub CLI on PATH (may need `gh auth login`).
- I want light and dark mode functional from the first commit, not bolted on later.

Proceed.
````

---

## Part C: Day-to-day chat openers

Once the project is bootstrapped, every subsequent chat starts with one of these short patterns.

### Build a feature

````
Build: [one-sentence goal].

Workflow: brainstorm 2-3 approaches first, ask me ONE question if anything is ambiguous, save a plan to docs/superpowers/plans/, then execute task-by-task with TDD. Verify the deploy fires after push.

Constraints:
- [feature-specific constraint]

Done = [explicit success criteria]
````

### Fix a bug

````
Fix: [the bug, with exact URL or file:line if known].

Workflow: reproduce with a failing test, fix, confirm green, commit, push, verify deploy.

What I observed: [behavior]
What I expected: [behavior]
````

### Audit / review

````
Audit [scope, e.g. "all components for hardcoded color literals" or "admin pages for missing pagination"].

Output: a markdown table of (file, issue, severity, suggested fix). No code changes - reporting only.
````

### Ship work in progress

````
Ship what's on this branch:

1. git status + diff summary
2. npx tsc --noEmit + npx vitest run
3. If green: commit (you draft the message, I approve), push
4. Verify Vercel deploy fired via Vercel MCP
5. curl /api/health and confirm 200
6. Report final live URL
````

### Cold pickup after a break

````
Resync: where did we leave off?

1. git log --oneline -10 + git status
2. Latest Vercel deploy state (Vercel MCP)
3. /api/health
4. Pending docs/superpowers/plans/ that aren't fully executed
5. Anything in TODO comments

Give me a one-screen status. Don't start anything new.
````

---

## How this all fits together

```
[Once per machine]
   ~/.claude/CLAUDE.md          - your global preferences (response style, etc.)

[Once per project]
   <project-root>/CLAUDE.md     - design system contract (Part A)
   .vercel/project.json         - via `vercel link` for deploys
   .env.local                   - DATABASE_URL + DIRECT_URL + secrets

[Once per chat - first message]
   Part B for first chat of a new project
   Part C for every subsequent chat
```

Claude Code reads `CLAUDE.md` automatically. You don't need to paste it into every chat. The first-message prompt is just the kickoff for context-setting in that specific session.
