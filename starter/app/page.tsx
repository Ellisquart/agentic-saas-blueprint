import Link from 'next/link';
import { ArrowRight, Brain, GitBranch, Network, ShieldCheck } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const blocks = [
  {
    icon: Brain,
    title: 'Memory',
    body: 'Store decisions in files Claude can read again.',
  },
  {
    icon: Network,
    title: 'Tools',
    body: 'Keep Serena, Graphiti, Obsidian, GitHub, and local models status-tracked.',
  },
  {
    icon: GitBranch,
    title: 'Workflows',
    body: 'Run repeatable build, audit, and bug-hunt loops.',
  },
  {
    icon: ShieldCheck,
    title: 'Honesty',
    body: 'Unavailable integrations stay labeled Scaffold Only until verified.',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-bg-public text-text-public">
      <header className="mx-auto flex max-w-wide items-center justify-between px-5 py-4">
        <div>
          <p className="text-tiny uppercase tracking-[0.18em] text-gold">Agentic OS</p>
          <h1 className="text-display-sm font-semibold">Project cockpit</h1>
        </div>
        <ThemeToggle />
      </header>

      <section className="mx-auto grid max-w-wide gap-6 px-5 py-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="max-w-3xl text-display-lg font-semibold">
              Build complex projects with Claude, memory, agents, and real verification.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-text-public-2">
              This starter gives Claude a working project surface, durable memory, role files,
              repeatable workflows, and MCP templates without pretending optional tools are installed.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="inline-flex h-btn-lg items-center gap-2 rounded-md bg-gold px-5 text-sm font-semibold text-bg-public"
            >
              Open cockpit <ArrowRight size={16} />
            </Link>
            <a
              href="https://github.com/NewMatrixCap/agentic-saas-blueprint"
              className="inline-flex h-btn-lg items-center rounded-md border border-border-public px-5 text-sm font-semibold text-text-public hover:bg-white/5"
            >
              Fork repo
            </a>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {blocks.map((block) => {
            const Icon = block.icon;
            return (
              <article key={block.title} className="rounded-md border border-border-public bg-surface-public p-4">
                <Icon className="mb-4 text-gold" size={22} />
                <h3 className="font-semibold">{block.title}</h3>
                <p className="mt-2 text-sm leading-6 text-text-public-2">{block.body}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
