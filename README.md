# Agentic SaaS OS Blueprint

Free open-source starter for building serious software with Claude Code and local agent workflows.

This is not only a SaaS theme kit. It is a small "AI operating system" starter:

- Claude setup prompt
- project rules in `CLAUDE.md`
- local memory folder
- Obsidian vault starter
- agent role files
- repeatable workflows
- MCP config templates
- Serena, Graphiti, Obsidian, GitHub, filesystem hooks as opt-in tools
- runnable Next.js SaaS starter

MIT licensed. Fork it, sell your app, keep it free, change everything.

## Fast Start

```powershell
git clone https://github.com/NewMatrixCap/agentic-saas-blueprint.git
cd agentic-saas-blueprint
.\install.ps1 -ProjectPath C:\work\my-new-app
cd C:\work\my-new-app
pnpm install
pnpm dev
claude
```

Then paste:

```text
Read CLAUDE.md and ONE_PROMPT.md. Build this project end to end. Use the local memory, agents, workflows, and MCP templates. Mark unavailable tools as Scaffold Only. Start with the smallest useful product slice, then verify it.
```

Mac/Linux:

```bash
git clone https://github.com/NewMatrixCap/agentic-saas-blueprint.git
cd agentic-saas-blueprint
./install.sh ~/work/my-new-app
cd ~/work/my-new-app
pnpm install
pnpm dev
claude
```

## What You Get

```text
my-new-app/
  CLAUDE.md
  ONE_PROMPT.md
  app/
  components/
  lib/
  tests/
  docs/
  .ai-os/
    agents/
    workflows/
    memory/
    tasks/
    logs/
    tools/
  .mcp/
    claude_desktop_config.template.json
```

## Tool Status

This repo does not pretend tools are installed when they are not.

| Tool | Status | Notes |
|---|---|---|
| Claude Code | user installs | main agent runtime |
| Serena MCP | template | semantic code tools, user installs |
| Graphiti | template | graph memory, user installs Neo4j or service |
| Obsidian | template | local vault workflow |
| Obsidian Local REST API | optional | user installs plugin and API key |
| Ollama | optional | local model fallback |
| GitHub CLI | optional | repo, issue, PR automation |
| Next.js starter | included | runnable app starter |

Official Claude Code MCP setup is documented by Anthropic: https://code.claude.com/docs/en/mcp

Graphiti open-source repo: https://github.com/getzep/graphiti

Obsidian Local REST API plugin info: https://www.obsidianstats.com/plugins/obsidian-local-rest-api

## Core Rules

- One app, one chat, one brain.
- Real project context first.
- No demo-only dashboard as the main product.
- No fake integrations.
- Unknown tools are `Scaffold Only`.
- Use memory before repeating old decisions.
- Write files, run checks, commit cleanly.
- Prefer boring working software over architecture theater.

## Repo Contents

| Path | Purpose |
|---|---|
| `CLAUDE.md` | rules to copy into any project |
| `ONE_PROMPT.md` | paste-ready Claude bootstrap prompt |
| `install.ps1` | Windows project installer |
| `install.sh` | Mac/Linux project installer |
| `starter/` | runnable Next.js starter plus AI OS folders |
| `docs/FREE_STACK.md` | free and open-source stack map |
| `docs/TOOL_REGISTRY.md` | tool statuses and install notes |
| `docs/WORKFLOWS.md` | repeatable build workflows |
| `docs/ARCHITECTURE.md` | how the pieces fit |

## License

MIT.
