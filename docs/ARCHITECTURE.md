# Architecture

The blueprint has four layers.

## 1. Product App

The app is a normal Next.js project:

- `app/`
- `components/`
- `lib/`
- `tests/`

It should still work if every AI tool is removed.

## 2. Agent Operating Layer

The `.ai-os/` folder stores agent behavior and project state:

- `agents/` role instructions
- `workflows/` repeatable build loops
- `memory/` durable decisions
- `tasks/` machine-readable tasks
- `logs/` event history
- `tools/` tool registry

Claude reads these files instead of depending on hidden chat memory.

## 3. Tool Connector Layer

The `.mcp/` folder stores templates for MCP tools.

Tools are opt-in. They are never assumed active.

## 4. Human Control Layer

The user owns:

- API keys
- local apps
- vendor accounts
- deploy target
- final approvals

Agents can prepare the path, but the user must approve risky actions.
