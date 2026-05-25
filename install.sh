#!/usr/bin/env bash
set -euo pipefail

PROJECT_PATH="${1:-}"
if [ -z "$PROJECT_PATH" ]; then
  echo "Usage: ./install.sh /path/to/my-project"
  exit 1
fi

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STARTER="$ROOT/starter"

mkdir -p "$PROJECT_PATH"
cp -R "$STARTER"/. "$PROJECT_PATH"/
cp "$ROOT/CLAUDE.md" "$PROJECT_PATH/CLAUDE.md"
cp "$ROOT/ONE_PROMPT.md" "$PROJECT_PATH/ONE_PROMPT.md"

if [ ! -f "$PROJECT_PATH/.env.example" ]; then
  cat > "$PROJECT_PATH/.env.example" <<'EOF'
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=
AUTH_SECRET=
OBSIDIAN_REST_API_KEY=
GRAPHITI_URL=
SERENA_PROJECT=
EOF
fi

echo "Installed Agentic SaaS OS starter at $PROJECT_PATH"
echo "Next:"
echo "  cd $PROJECT_PATH"
echo "  pnpm install"
echo "  pnpm dev"
echo "  claude"
echo "Paste ONE_PROMPT.md into Claude."
