# Changelog

All notable changes to this blueprint will be documented in this file.

## [0.2.0] - 2026-05-14

### Added
- `CLAUDE-CODE.md` - Claude Code (terminal/CLI) kit: a CLAUDE.md to drop at project root, a first-message prompt, and 5 day-to-day chat openers (build, fix, audit, ship, resync)

### Changed
- README quick-start split into two paths: Claude Projects (web UI) and Claude Code (CLI)

## [0.1.0] - 2026-05-14

### Added
- Initial public release
- 4 paste-ready prompts: Project Instructions, First-Chat Onboarding, Feature/Fix Template, Tools Setup Checklist
- Handbook: workflow, design system, lessons learned, deployment, MCP setup, TDD pattern, plan structure
- Templates: globals.css with theme tokens + light-mode overrides, tailwind.config.ts, ThemeProvider, ThemeToggle (2-way), Logo (theme-aware), MetricTile (optional clickable href), admin-list-page pattern, soft-fail external API wrapper, voice-sweep test

### Lessons distilled from
- New Matrix Capital (newmatrix.capital) - Credit-Karma-for-business SaaS
- 3 months of build time
- 2,475 vitest tests
- 450 ingested real merchant lead packets
- 11-specialist Marvin agent swarm with self-improvement loop
- Light + dark theme system across marketing + app interior
