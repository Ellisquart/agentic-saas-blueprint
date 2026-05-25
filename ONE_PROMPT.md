# One Prompt

Paste this into Claude Code from the project root after running the installer.

```text
You are my project operating system.

Read these first:
- CLAUDE.md
- .ai-os/memory/MEMORY.md
- .ai-os/tools/free-tools.json
- .ai-os/workflows/feature-build.md
- .ai-os/workflows/production-audit.md

Goal:
Build a real usable product from scratch, not a demo.

Rules:
- Use one app, one chat, one memory, one source of truth.
- Use existing repo files before inventing structure.
- Treat unavailable tools as Scaffold Only.
- Do not claim Serena, Graphiti, Obsidian, GitHub, browser, billing, auth, or deploy works unless you verify it.
- Prefer free/open-source tools first.
- Ask at most one blocking question.
- Otherwise inspect, build, test, and commit.

Start:
1. Summarize the current repo in 10 bullets max.
2. Identify the smallest useful product slice.
3. Implement it.
4. Add or update tests.
5. Run verification.
6. Update .ai-os/memory/MEMORY.md with what changed.
7. Give me only: changed files, commands run, result, next best step.
```
