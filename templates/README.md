# Templates

Drop-in starter files. Copy each into your repo at the matching path. Edit to taste. The patterns are proven; the names are conventional.

## What's here

| File | Drop into | Purpose |
|---|---|---|
| `globals.css` | `app/globals.css` | Theme tokens (CSS variables) + light-mode overrides |
| `tailwind.config.ts` | `tailwind.config.ts` | Maps Tailwind classes to the CSS variables |
| `ThemeProvider.tsx` | `lib/theme/ThemeProvider.tsx` | React provider + useTheme hook |
| `ThemeToggle.tsx` | `components/ui/ThemeToggle.tsx` | Sun/Moon 2-way switch button |
| `Logo.tsx` | `components/brand/Logo.tsx` | Theme-aware logo (variant="auto") |
| `MetricTile.tsx` | `components/app/metrics/MetricTile.tsx` | Stat tile with optional clickable href |
| `admin-list-page.tsx` | `app/(app)/dashboard/admin/<feature>/page.tsx` | Stat tiles + search + filters + pagination pattern |
| `soft-fail-wrapper.ts` | `lib/<service>/client.ts` | Env-gated external API wrapper |
| `voice-sweep.test.ts` | `tests/voice-sweep.test.ts` | Em-dash enforcement |

## How to adopt

1. **Start fresh:** Copy all of these as the first step of a new project. Wire `ThemeProvider` at `app/layout.tsx` root.
2. **Adopt later:** Copy `globals.css` + `tailwind.config.ts` first. Run the app, confirm both modes render. Then copy `ThemeToggle.tsx`, add to your nav. Then the rest as needed.
3. **Logo:** Replace `/public/logo.png` with your real artwork. The CSS filter inverts black-on-transparent to white-on-transparent for dark mode automatically. If your logo isn't black-on-transparent, supply a separate `/public/logo-light.png` and tweak `Logo.tsx`.

## Read order

The most leveraged file is `globals.css`. The token system there is what makes everything else easy. Read it first.

After that:
1. `tailwind.config.ts` — see how the CSS variables become Tailwind utilities
2. `ThemeProvider.tsx` — the React-side state
3. `ThemeToggle.tsx` — the user-facing control
4. `admin-list-page.tsx` — the pattern every admin list page should follow
