import { MetricTile } from '@/components/app/metrics/MetricTile';

const tools = [
  ['Claude Code', 'Configured'],
  ['Serena MCP', 'Scaffold Only'],
  ['Graphiti', 'Scaffold Only'],
  ['Obsidian', 'Configured'],
  ['Ollama', 'Scaffold Only'],
  ['GitHub CLI', 'Scaffold Only'],
];

const tasks = [
  'Read CLAUDE.md',
  'Paste ONE_PROMPT.md',
  'Pick smallest useful product slice',
  'Build and verify',
  'Update .ai-os/memory/MEMORY.md',
];

export default function DashboardPage() {
  return (
    <main className="theme-app min-h-screen">
      <div className="mx-auto max-w-wide px-5 py-6">
        <div className="mb-6">
          <p className="text-tiny uppercase tracking-[0.18em] text-gold">Cockpit</p>
          <h1 className="text-display-sm font-semibold">Agentic project control</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-text-app-2">
            Track what exists, what is verified, and what Claude should do next.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <MetricTile label="Agents" value="8" />
          <MetricTile label="Workflows" value="4" />
          <MetricTile label="Verified tools" value="1" />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <section className="rounded-md border border-border-app bg-surface-app p-4">
            <h2 className="font-semibold">Tool status</h2>
            <div className="mt-4 space-y-2">
              {tools.map(([name, status]) => (
                <div key={name} className="flex items-center justify-between rounded-md border border-border-app px-3 py-2">
                  <span className="text-sm">{name}</span>
                  <span className="text-tiny uppercase tracking-[0.12em] text-gold">{status}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-md border border-border-app bg-surface-app p-4">
            <h2 className="font-semibold">Next actions</h2>
            <ol className="mt-4 space-y-2">
              {tasks.map((task, index) => (
                <li key={task} className="flex gap-3 rounded-md border border-border-app px-3 py-2 text-sm">
                  <span className="text-gold">{index + 1}</span>
                  <span>{task}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </main>
  );
}
