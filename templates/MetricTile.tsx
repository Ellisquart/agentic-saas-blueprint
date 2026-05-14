/**
 * MetricTile.tsx
 *
 * Stat tile with optional clickable href. When href is provided, the entire
 * tile becomes a Link with a -3px hover lift, gold halo, and an animated
 * arrow icon in the top-right. Without href, the tile is static.
 *
 * Use case: admin dashboards where each metric drills into its detail page.
 *   <MetricTile label="Signups" value="1,234" href="/admin/users" />
 *   <MetricTile label="Apps this month" value="42" sparkline={[...]} />
 *
 * Server-component compatible.
 */
import Link from 'next/link';
import { TrendingUp, TrendingDown, Minus, ArrowUpRight } from 'lucide-react';

export type MetricTileProps = {
  label: string;
  value: string | number;
  deltaPct?: number | null;
  deltaLabel?: string;
  sparkline?: number[];
  hint?: string;
  href?: string;
};

function formatDelta(deltaPct: number | null | undefined) {
  if (deltaPct == null || !isFinite(deltaPct)) return { label: '-', tone: 'flat' as const };
  const sign = deltaPct > 0 ? '+' : '';
  return {
    label: `${sign}${deltaPct.toFixed(0)}%`,
    tone: deltaPct > 0 ? ('up' as const) : deltaPct < 0 ? ('down' as const) : ('flat' as const),
  };
}

export function MetricTile(props: MetricTileProps) {
  const delta = formatDelta(props.deltaPct);
  const Icon = delta.tone === 'up' ? TrendingUp : delta.tone === 'down' ? TrendingDown : Minus;
  const deltaColor =
    delta.tone === 'up' ? 'text-success-app' :
    delta.tone === 'down' ? 'text-danger-app' :
    'text-text-app-2';

  const interactive = Boolean(props.href);
  const baseChrome =
    'rounded-xl p-5 bg-gradient-to-br from-white/[0.06] to-white/[0.02] ' +
    'border border-white/[0.12] shadow-[0_8px_28px_-12px_rgba(0,0,0,0.6)] ' +
    'transition-all duration-300 group relative';
  const interactiveChrome = interactive
    ? ' block cursor-pointer hover:border-gold/55 hover:-translate-y-[3px] ' +
      'hover:shadow-[0_24px_56px_-12px_rgba(212,168,83,0.40)] ' +
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 ' +
      'focus-visible:ring-offset-2 focus-visible:ring-offset-bg-app'
    : ' hover:border-gold/40 hover:-translate-y-[2px]';

  const inner = (
    <>
      <div className="flex items-baseline justify-between gap-2">
        <div className="text-[10px] uppercase tracking-[0.18em] text-gold/80 font-semibold">
          {props.label}
        </div>
        {props.deltaPct != null && (
          <div className={`flex items-center gap-0.5 text-[11px] font-semibold tabular-nums ${deltaColor}`}>
            <Icon size={10} />
            {delta.label}
          </div>
        )}
      </div>
      <div className="mt-2 text-2xl font-extrabold text-text-app tabular-nums">{props.value}</div>
      {props.deltaLabel && (
        <div className="text-[11px] text-text-app-2 mt-1 tabular-nums">{props.deltaLabel}</div>
      )}
      {interactive && (
        <div
          aria-hidden
          className="absolute top-3 right-3 w-7 h-7 rounded-md flex items-center justify-center bg-gold/0 group-hover:bg-gold/15 border border-transparent group-hover:border-gold/30 text-gold opacity-0 group-hover:opacity-100 transition-all duration-200"
        >
          <ArrowUpRight size={14} strokeWidth={2.5} />
        </div>
      )}
    </>
  );

  if (interactive) {
    return (
      <Link href={props.href!} title={props.hint} className={baseChrome + interactiveChrome}>
        {inner}
      </Link>
    );
  }
  return (
    <div className={baseChrome + interactiveChrome} title={props.hint}>
      {inner}
    </div>
  );
}
