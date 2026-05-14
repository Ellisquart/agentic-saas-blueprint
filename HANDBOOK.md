# Handbook

Everything you need to know that didn't fit in `PROMPTS.md`. Read top-to-bottom once. Reference as needed.

- [The workflow](#the-workflow)
- [Design system](#design-system)
- [Lessons learned](#lessons-learned)
- [Deployment](#deployment)
- [MCP setup](#mcp-setup)
- [TDD pattern](#tdd-pattern)
- [Plan structure](#plan-structure)

---

## The workflow

```
   brainstorming    →    writing-plans    →    subagent-driven-development    →    finishing-a-development-branch
        ↓                     ↓                          ↓                                  ↓
   one Q at a            file paths,            TDD per task,                       lint, build, push,
   time, propose         full code in           spec review +                       verify deploy,
   2-3 approaches        each step              code-quality review                 curl /api/health
```

Each step is a `superpowers` skill. Each step has a markdown artifact.

### Brainstorming
- One clarifying question at a time, multiple choice when possible
- Propose **2-3 approaches** with trade-offs, recommend one
- Output: a saved design doc at `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`

### Writing plans
- Decompose the spec into 2-5 minute tasks
- Each task lists: files to create/modify, the exact test code (red first), the exact impl code, the run command + expected output, the commit command + message
- Output: a saved plan at `docs/superpowers/plans/YYYY-MM-DD-<slug>.md`
- **No placeholders.** No "TODO", "TBD", "fill in details", "add appropriate validation", "write tests for the above". Every code block contains the actual code.

### Subagent execution
- Fresh subagent per task. Subagent has only the task text + necessary context. No leftover history.
- Two-stage review after each task: **spec compliance** first, then **code quality**.
- Subagent reports DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED.
- Controller handles BLOCKED by re-dispatching with more context or a more capable model.

### Finishing
- `npx tsc --noEmit`, `npx vitest run`, `npx next build` all green
- Commit with imperative subject + WHY body
- Push to feature branch
- **Verify deploy via Vercel MCP** — do not trust the webhook
- Curl production `/api/health` to confirm
- If anything off, manual `vercel deploy --prod --yes`

---

## Design system

The whole system rests on **CSS variables** that map to Tailwind tokens. The variables flip on `[data-theme='dark' | 'light']`. Every component uses the tokens, not the literals.

### Theme tokens (Tailwind class names)

| Token | Dark value | Light value | Use for |
|---|---|---|---|
| `bg-bg-public` | `#060912` | `#f8f6f1` | Marketing page bodies |
| `bg-bg-app` | `#0b1220` | `#ffffff` | App interior bodies |
| `bg-surface-public` | `#0f1322` | `#ffffff` | Marketing card surfaces |
| `bg-surface-app` | `#111a2a` | `#f8fafc` | App card surfaces |
| `text-text-public` | `#ffffff` | `#0f1929` | Marketing primary text |
| `text-text-public-2` | `#8892a4` | `#475569` | Marketing secondary text |
| `text-text-app` | `#ffffff` | `#0f1929` | App primary text |
| `text-text-app-2` | `#8892a4` | `#475569` | App secondary text |
| `text-gold` | `#d4a853` | `#b8860b` | Brand accent |
| `text-success-app` | `#4ecb71` | `#16a34a` | Success state |
| `text-danger-app` | `#e05555` | `#dc2626` | Danger state |

See [`templates/globals.css`](./templates/globals.css) for the exact CSS variable definitions.

### The light-mode-from-day-one rule

Every component you build must render correctly in both modes. The test:

1. Toggle the Sun/Moon button in the nav
2. The page should still be readable
3. No white text on white background
4. No invisible card outlines
5. Gold halos on hover still visible (the dark gold #b8860b in light, the warm gold #d4a853 in dark)

If you find yourself reaching for `text-white` or `bg-white/[0.04]`, you're about to create technical debt. Use the token instead.

### The "I've already got 90 components with text-white" fallback

You don't have to rewrite every file. Add specificity-scoped overrides to `globals.css`:

```css
[data-theme='light'] .text-white { color: #0f1929 !important; }
[data-theme='light'] .bg-white\/\[0\.04\] { background-color: rgba(15, 25, 41, 0.04) !important; }
/* ... etc for the opacity variants you actually use */
```

This is the safety valve. **Use it once** to retroactively fix a legacy codebase. **Don't write new code that relies on it** — new code uses tokens.

---

## Lessons learned

The expensive ones. Each one cost hours of looping.

### ❌ Hardcoded color literals throughout components
**Why it hurts:** Adding light mode later requires editing 90+ files. Slow, risky, easy to miss spots.
**The fix:** Theme tokens via CSS variables from day one. The 11 tokens listed above cover ~95% of needs.
**The escape valve:** If a codebase already has the literals, scoped CSS overrides in `globals.css` flip them all at once.

### ❌ "Hotfix" comments that disable features
**Why it hurts:** `// Hotfix: theme toggle hidden until light tokens land` becomes permanent debt. Future you reads the comment, gets blocked, doesn't fix the root cause.
**The fix:** Fix the root cause or don't merge it. If you must ship now, file a real issue with a deadline.

### ❌ Building UI for dark mode, planning to "add light later"
**Why it hurts:** The mental model for what "elevated" looks like changes between modes. `bg-white/[0.04]` on dark looks like a card; on light it's invisible. Retrofitting takes longer than building for both.
**The fix:** Every component, every PR — visually test both modes. The ThemeToggle is in the nav for exactly this reason.

### ❌ Trusting the Vercel GitHub auto-deploy webhook
**Why it hurts:** Sometimes it dies silently. You push, the live site doesn't update, you assume CDN cache, you waste 30 minutes.
**The fix:** After every `git push`, verify the latest READY deploy commit SHA matches HEAD via Vercel MCP `list_deployments`. If not, `vercel deploy --prod --yes` manually.

### ❌ Component-by-component sweep migrations
**Why it hurts:** "Fix all text-white" → 1827 files, 560 hits, 3 days of edits, bugs from missed spots.
**The fix:** When the pattern is uniform, a single CSS specificity layer scoped to `[data-theme='light']` does the job in 30 lines.

### ❌ Skipping mobile review
**Why it hurts:** You ship, real users open it on iPhones, the hero text overflows, the sidebar covers the content, the CTA buttons are 28px tall and unfair to tap.
**The fix:** Test at 375px / 768px / 1280px in every chat. Add `responsive: viewport @ 375` to your "done" criteria.

### ❌ Admin pages as bare HTML tables
**Why it hurts:** You can't see your own data. "I don't see all my signups" becomes a recurring complaint. You add the feature, never look at the data, find out months later something's wrong.
**The fix:** Every admin list page has: stat tiles up top, search, filters, role-pill chips, pagination, polished table chrome matching the rest of the app. Pattern in [`templates/admin-list-page.tsx`](./templates/admin-list-page.tsx).

### ❌ Plans with placeholders
**Why it hurts:** "TODO: add appropriate validation" — the subagent makes up the validation, it doesn't match what you wanted, you redo it.
**The fix:** Every code block in the plan contains the actual code. Every test step contains the actual test. Engineer should be able to copy-paste and have it work.

### ❌ Commits without typecheck + vitest
**Why it hurts:** Red CI, broken main, time spent on revert + fix instead of next feature.
**The fix:** Pre-commit hook (lefthook or husky) runs `tsc --noEmit` + `vitest run --changed`. Or just make it your reflex: typecheck, test, commit, push, verify deploy, curl health.

### ❌ External integrations that hard-fail without keys
**Why it hurts:** New contributor can't run the app locally. CI can't build. Every fresh checkout requires populating 20 env vars.
**The fix:** Soft-fail wrapper pattern. See [`templates/soft-fail-wrapper.ts`](./templates/soft-fail-wrapper.ts). When `RESEND_API_KEY` is missing, `sendEmail()` becomes a typed no-op that logs to console. App builds, app runs, the feature is dormant.

### ❌ Em-dashes in source files
**Why it hurts:** They're an "AI tell." Reviewers spot them, lose trust, assume the rest is also auto-generated slop.
**The fix:** Voice-sweep test ([`templates/voice-sweep.test.ts`](./templates/voice-sweep.test.ts)) scans every source file and fails on `—`. Use `" - "` or `": "` instead.

---

## Deployment

### The setup

1. Vercel project linked via `vercel link` (creates `.vercel/project.json`)
2. Custom domain pointed at the project
3. GitHub integration auto-deploys on push to the configured branch
4. `vercel.json` declares any cron jobs

### The webhook problem

The GitHub → Vercel auto-deploy webhook **stops firing intermittently** on some branches. There's no warning. Your push succeeds. The live site stays stale. You waste time debugging "stale CDN cache."

### The fix: verify every deploy

After every `git push`:

```bash
# 1. Note the HEAD SHA
git rev-parse HEAD

# 2. Wait ~30s, then check Vercel's latest READY deploy SHA
# (Use Vercel MCP list_deployments tool, or)
vercel inspect <prod-domain> --token <token>

# 3. If they don't match, manual deploy:
vercel deploy --prod --yes
```

### Rollback

Vercel keeps all READY deploys. Promote any previous deploy in 2 clicks via the Vercel dashboard, or:

```bash
vercel promote <deployment-url> --yes
```

Bookmark the previous READY deploy ID before shipping anything risky.

### Cron jobs

`vercel.json` is the source of truth. Example:

```json
{
  "crons": [
    { "path": "/api/cron/funnel/run", "schedule": "0 3 * * *" },
    { "path": "/api/cron/learning/run", "schedule": "0 4 * * *" }
  ]
}
```

The cron routes go in `app/api/cron/<name>/route.ts` and should call `verifyCronAuth(request)` first to reject anything not from Vercel.

---

## MCP setup

These MCP servers transform Claude from "smart but blind" to "smart and contextually aware."

### Required

- **Serena** — code navigation. `find_symbol`, `get_symbols_overview`, `find_referencing_symbols` beat `Read` for code files. Activate per project with `activate_project`.
- **Vercel** — `list_deployments`, `get_deployment_build_logs`, `deploy_to_vercel`. Needed for the deploy-verification workflow above.
- **Context7** — fresh docs for Next.js, Prisma, NextAuth, Tailwind, etc. Beat training-data staleness.

### Recommended

- **Prisma local** — `migrate-dev`, `migrate-status` against your dev DB without leaving Claude.
- **Playwright / Chrome DevTools** — for screenshotting the live site during reviews.
- **GitHub CLI** (`gh`) on PATH — Claude shells out for issue/PR ops.

### Wire them in

In Claude Desktop / Code / Cowork, edit `mcp_servers.json` to add each server. The Serena docs walk you through it. After adding, restart the client. Test with `mcp__plugin_serena_serena__check_onboarding_performed`.

---

## TDD pattern

Test-driven development is non-negotiable. The shape:

1. **Red:** Write the smallest failing test.
   ```ts
   it('parses business name from row', () => {
     expect(parseLeadRow({ Business: 'Acme' }).businessName).toBe('Acme');
   });
   ```
2. **Verify red:** Run it. Confirm it fails for the *right* reason ("function not defined").
3. **Green:** Write the minimal implementation.
4. **Verify green:** Run again. Confirm it passes.
5. **Commit.** Each test+impl pair is a commit.

Skip steps and you'll write tests that pass for the wrong reasons, or write impl that solves a problem you didn't have.

### Where tests live

Mirror the source tree:
```
src/lib/leads/parse-excel.ts
tests/lib/leads/parse-excel.test.ts
```

### What to test

- Pure functions: every branch
- React components: render, then assert what the user sees
- API routes: request/response shape + auth gate
- Database mutations: don't mock Prisma, run against a test DB

---

## Plan structure

Every plan starts with:

```markdown
# [Feature Name] Implementation Plan

> **For agentic workers:** Use superpowers:subagent-driven-development to execute this plan task-by-task.

**Goal:** [one sentence]
**Architecture:** [2-3 sentences about approach]
**Tech Stack:** [key technologies]

---

### Task N: [Component Name]

**Files:**
- Create: `exact/path/to/file.ts`
- Modify: `exact/path/to/existing.tsx:123-145`
- Test: `tests/exact/path/to/test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// the actual test code
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/exact/path -t "exact test name"`
Expected: FAIL with "function not defined"

- [ ] **Step 3: Write minimal implementation**

```ts
// the actual implementation
```

- [ ] **Step 4: Run test to verify it passes**

- [ ] **Step 5: Commit**

```bash
git add tests/path src/path
git commit -m "feat: add specific feature"
```
```

Every step is one action, 2-5 minutes. Every code block contains the actual code. No "fill in the details."

---

## When you're stuck

The order:

1. **Re-read the plan.** Are you executing the task as written, or improvising?
2. **Check the design tokens.** Are you reaching for a literal because the token doesn't exist? If so, add the token to `globals.css` and `tailwind.config.ts` first.
3. **Read the failing test message** carefully. Don't skim. The error usually names the file + line.
4. **Use Serena `find_referencing_symbols`** to understand what calls into the thing you're changing.
5. **Spawn a fresh subagent** with the full task context. Stuck-because-of-context is the most common stuck.
6. **Last resort: blocked status.** Tell the human exactly what's blocking. Don't loop silently.
