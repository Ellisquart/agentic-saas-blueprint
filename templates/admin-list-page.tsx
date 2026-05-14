/**
 * admin-list-page.tsx
 *
 * Pattern for any admin list page. Stat tiles up top, filter chips, search,
 * polished table chrome, pagination. Reskinned but the structure is the same
 * whether you're listing users, deals, leads, partners, etc.
 *
 * Rename the imports, the Prisma queries, the columns. Keep the layout.
 */
import Link from 'next/link';
import { db } from '@/lib/db';
import { requireAdmin } from '@/lib/auth-helpers';
import { Database, Activity } from 'lucide-react';

export const metadata = { title: '[FEATURE] - Admin' };

const PAGE_SIZE = 50;

type SearchParams = Promise<{
  q?: string;
  filter?: string;
  page?: string;
}>;

export default async function AdminFeatureListPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  await requireAdmin();
  const sp = await searchParams;
  const q = sp.q?.trim() || undefined;
  const filter = sp.filter && sp.filter !== 'all' ? sp.filter : undefined;
  const page = Math.max(1, parseInt(sp.page ?? '1', 10) || 1);

  const where = {
    ...(filter && { /* your filter shape */ }),
    ...(q && {
      // adjust to your model's searchable fields
      name: { contains: q, mode: 'insensitive' as const },
    }),
  };

  // Replace `yourModel` with your Prisma model name
  const [total, rows, stat24h, stat7d, filterCounts] = await Promise.all([
    db.yourModel.count({ where }),
    db.yourModel.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    db.yourModel.count({
      where: { createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
    }),
    db.yourModel.count({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    }),
    db.yourModel.groupBy({ by: ['someField'], _count: { _all: true } }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <header>
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold font-bold mb-2">
          <Database size={14} strokeWidth={2.5} />
          [Section name]
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-app leading-tight mb-3">
          {total.toLocaleString()} [items]
        </h1>
        <p className="text-sm text-text-app-2 leading-relaxed max-w-2xl">
          [One-sentence description of what's listed here and what the admin can do.]
        </p>
      </header>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatTile label="Last 24h" value={stat24h.toLocaleString()} />
        <StatTile label="Last 7 days" value={stat7d.toLocaleString()} />
        <StatTile label="Total" value={total.toLocaleString()} />
        <StatTile label="Active" value="-" />
      </div>

      {/* Filter chips */}
      {filterCounts.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {filterCounts.map((f: { someField: string; _count: { _all: number } }) => (
            <Link
              key={f.someField}
              href={`/dashboard/admin/feature?filter=${f.someField}`}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors ${
                filter === f.someField
                  ? 'bg-gold/15 border-gold/40 text-gold'
                  : 'bg-white/[0.04] border-white/[0.12] text-text-app-2 hover:text-text-app hover:bg-white/[0.08]'
              }`}
            >
              {f.someField}
              <span className="text-text-app-2/70 tabular-nums">{f._count._all}</span>
            </Link>
          ))}
        </div>
      )}

      {/* Search form */}
      <form className="flex flex-wrap items-center gap-3 text-sm">
        <input
          type="text"
          name="q"
          defaultValue={q ?? ''}
          placeholder="Search..."
          className="px-3 py-2 rounded-md bg-white/[0.04] border border-white/[0.15] text-text-app placeholder:text-text-app-2/60 focus:outline-none focus:border-gold/50 focus:bg-white/[0.06] min-w-[220px] flex-1 sm:flex-initial"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-gradient-to-b from-gold to-[#b8860b] text-bg-public text-xs font-bold uppercase tracking-[0.1em] shadow-[0_2px_10px_-2px_rgba(212,168,83,0.4)] hover:shadow-[0_4px_16px_-2px_rgba(212,168,83,0.55)] transition-all"
        >
          Filter
        </button>
        {(q || filter) && (
          <Link href="/dashboard/admin/feature" className="text-xs text-text-app-2 hover:text-text-app">
            Reset
          </Link>
        )}
      </form>

      {/* Table */}
      {rows.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.12] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-12 text-center">
          <Activity size={28} className="text-text-app-2/40 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-text-app mb-2">No matching items</h2>
          <p className="text-sm text-text-app-2">Try widening the filters.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-white/[0.12] bg-gradient-to-br from-white/[0.04] to-white/[0.01] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.04] border-b border-white/[0.10]">
                <tr className="text-left text-[11px] uppercase tracking-wider text-text-app-2">
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Created</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r: { id: string; name?: string; status?: string; createdAt: Date }) => (
                  <tr
                    key={r.id}
                    className="border-b border-white/[0.05] last:border-b-0 hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-4 py-3 text-text-app font-medium">{r.name ?? '-'}</td>
                    <td className="px-4 py-3 text-text-app-2 text-xs">{r.status ?? '-'}</td>
                    <td className="px-4 py-3 text-text-app-2 text-[11px] tabular-nums">
                      {r.createdAt.toISOString().slice(0, 10)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/dashboard/admin/feature/${r.id}`}
                        className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.15] text-[11px] text-text-app hover:bg-white/[0.08] hover:border-gold/40 transition"
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} q={q} filter={filter} />
      )}
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl p-4 bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.12]">
      <div className="text-[10px] uppercase tracking-wider text-text-app-2 mb-1.5">{label}</div>
      <div className="text-2xl font-extrabold text-text-app tabular-nums">{value}</div>
    </div>
  );
}

function Pagination({
  page, totalPages, q, filter,
}: { page: number; totalPages: number; q?: string; filter?: string }) {
  const mkHref = (p: number) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (filter) params.set('filter', filter);
    if (p > 1) params.set('page', String(p));
    const qs = params.toString();
    return qs ? `/dashboard/admin/feature?${qs}` : '/dashboard/admin/feature';
  };
  return (
    <nav className="flex items-center justify-between gap-3 text-xs text-text-app-2">
      <div>
        Page <span className="text-text-app font-bold">{page}</span> of{' '}
        <span className="text-text-app font-bold">{totalPages}</span>
      </div>
      <div className="flex items-center gap-2">
        {page > 1 && (
          <Link href={mkHref(page - 1)} className="px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.15] hover:bg-white/[0.08] hover:text-text-app transition">
            Prev
          </Link>
        )}
        {page < totalPages && (
          <Link href={mkHref(page + 1)} className="px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.15] hover:bg-white/[0.08] hover:text-text-app transition">
            Next
          </Link>
        )}
      </div>
    </nav>
  );
}
