import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import {
  AlertTriangle, ArrowDown, ArrowUp, ArrowUpDown, BarChart3, CalendarClock, Download, GraduationCap, Hourglass,
  Lightbulb, RefreshCw, Search, Table2, TrendingDown, TrendingUp, Users, Wallet, X, Award, Inbox, PiggyBank,
} from 'lucide-react';
import {
  Bar, BarChart, CartesianGrid, Cell, LabelList, Line, LineChart, Pie, PieChart, ReferenceArea, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts';
import { Button, Card, Progress, cx } from '../components/ui';
import {
  currentSchoolYearId, currentScholars, disbursedTotal, schoolYears, scholarsBySchool,
} from '../lib/data';
import type { SchoolYearRecord } from '../lib/data';
import logo1 from '@/assets/logo1.png';
import logo2 from '@/assets/logo2.png';

/* ============ Formatting ============ */
const phpFull = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', minimumFractionDigits: 2, maximumFractionDigits: 2 });
const int = new Intl.NumberFormat('en-PH');
export const fmtFull = (n: number) => phpFull.format(n);
export const fmtShort = (n: number) => {
  if (Math.abs(n) >= 1_000_000) return `₱${(n / 1_000_000).toFixed(2)}M`;
  if (Math.abs(n) >= 1_000) return `₱${(n / 1_000).toFixed(1)}K`;
  return `₱${n.toFixed(0)}`;
};
export const fmtInt = (n: number) => int.format(n);
const pct = (n: number, d = 1) => `${n.toFixed(d)}%`;
const syLabel = (y: SchoolYearRecord) => `S.Y. ${y.label}`;

/* ============ Shared filter store (persists across Staff screens) ============ */
export type DemoState = 'live' | 'loading' | 'empty' | 'error';
type FilterState = { yearId: string; demo: DemoState; nonce: number };
let filterState: FilterState = { yearId: currentSchoolYearId, demo: 'live', nonce: 0 };
const listeners = new Set<() => void>();
const setFilter = (patch: Partial<FilterState>) => {
  filterState = { ...filterState, ...patch };
  listeners.forEach((l) => l());
};
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useStaffFilters() {
  const s = useSyncExternalStore(subscribe, () => filterState);
  const year = schoolYears.find((y) => y.id === s.yearId) ?? schoolYears[schoolYears.length - 1];
  const index = schoolYears.indexOf(year);
  const prev = index > 0 ? schoolYears[index - 1] : null;

  // Brief simulated fetch whenever the school year changes (or on retry).
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, [s.yearId, s.nonce]);

  const hasData = !!year.sem1;
  const status: DemoState = s.demo !== 'live' ? s.demo : loading ? 'loading' : hasData ? 'live' : 'empty';

  return {
    year, prev, status, demo: s.demo,
    isDefault: s.yearId === currentSchoolYearId,
    isCurrent: year.id === currentSchoolYearId,
    select: (id: string) => setFilter({ yearId: id }),
    clear: () => setFilter({ yearId: currentSchoolYearId }),
    setDemo: (demo: DemoState) => setFilter({ demo }),
    retry: () => setFilter({ demo: 'live', nonce: s.nonce + 1 }),
  };
}
export type StaffFilters = ReturnType<typeof useStaffFilters>;

/* ============ Small primitives ============ */
/** Abbreviated currency; full value on hover and keyboard focus. */
export function Money({ value, className }: { value: number; className?: string }) {
  return (
    <span tabIndex={0} className={cx('group relative inline-flex cursor-help rounded tabular-nums', className)} aria-label={fmtFull(value)}>
      <span aria-hidden>{fmtShort(value)}</span>
      <span role="tooltip" aria-hidden className="pointer-events-none absolute bottom-full left-0 z-30 mb-2 hidden whitespace-nowrap rounded-lg bg-brand-950 px-2.5 py-1.5 font-sans text-xs font-medium text-white shadow-lg group-hover:block group-focus-visible:block">
        {fmtFull(value)}
      </span>
    </span>
  );
}

function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cx('rounded-xl bg-brand-100/70 motion-safe:animate-pulse', className)} />;
}

function PendingBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex h-full items-start gap-3 rounded-xl border border-dashed border-gold-500 bg-gold-50 p-4">
      <Hourglass size={18} className="mt-0.5 shrink-0 text-gold-600" aria-hidden />
      <div>
        <p className="text-sm font-semibold text-brand-900">{title} <span className="ml-1 rounded-full bg-gold-100 px-2 py-0.5 text-xs font-semibold text-brand-900 ring-1 ring-gold-500/60">Pending</span></p>
        <p className="mt-1 text-sm text-ink-soft">{body}</p>
      </div>
    </div>
  );
}

function StatePanel({ f, rows = 3 }: { f: StaffFilters; rows?: number }) {
  if (f.status === 'loading') {
    return (
      <div className="space-y-3" aria-busy="true" aria-label="Loading data">
        <Skeleton className="h-6 w-1/3" />
        {Array.from({ length: rows }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
      </div>
    );
  }
  if (f.status === 'empty') {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-700"><Inbox size={20} aria-hidden /></span>
        <p className="font-display text-base font-semibold text-ink">No data for this school year</p>
        <p className="max-w-sm text-sm text-ink-soft">Nothing has been recorded for {syLabel(f.year)} yet. Choose another school year above.</p>
      </div>
    );
  }
  return (
    <div role="alert" className="flex flex-col items-center justify-center gap-2 py-10 text-center">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-danger-100 text-danger-600"><AlertTriangle size={20} aria-hidden /></span>
      <p className="font-display text-base font-semibold text-ink">We couldn't load this report</p>
      <p className="max-w-sm text-sm text-ink-soft">The ESSO records service did not respond. Your filters are kept.</p>
      <Button size="sm" variant="outline" className="mt-1" icon={<RefreshCw size={14} />} onClick={f.retry}>Try again</Button>
    </div>
  );
}

/** Card with heading, optional actions and a "View as table" toggle for charts. */
export function Panel({
  id, title, description, children, table, actions, className, f,
}: {
  id: string; title: string; description?: string; children: React.ReactNode; table?: React.ReactNode;
  actions?: React.ReactNode; className?: string; f?: StaffFilters;
}) {
  const [asTable, setAsTable] = useState(false);
  const ready = !f || f.status === 'live';
  return (
    <section aria-labelledby={id} className={cx('min-w-0 rounded-2xl border border-line bg-white p-5 shadow-sm shadow-brand-900/[0.03] sm:p-6', className)}>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 id={id} className="text-base font-semibold text-ink">{title}</h3>
          {description && <p className="mt-0.5 text-sm text-ink-soft">{description}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-2 print:hidden">
          {actions}
          {table && ready && (
            <button
              type="button" aria-pressed={asTable} onClick={() => setAsTable((v) => !v)}
              className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs font-semibold text-brand-700 hover:border-brand-300 hover:bg-brand-50"
            >
              {asTable ? <BarChart3 size={14} aria-hidden /> : <Table2 size={14} aria-hidden />}
              {asTable ? 'View as chart' : 'View as table'}
            </button>
          )}
        </div>
      </div>
      {!ready && f ? <StatePanel f={f} /> : asTable && table ? table : children}
    </section>
  );
}

/* Data table primitives — single header row, right-aligned tabular numbers */
const th = 'px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-ink-soft';
const td = 'px-3 py-2.5 text-sm';
const num = 'text-right tabular-nums whitespace-nowrap';

function TableWrap({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto scrollbar-slim rounded-xl border border-line">
      <table className="w-full min-w-[520px] border-collapse">
        <caption className="sr-only">{caption}</caption>
        {children}
      </table>
    </div>
  );
}

const tooltipBox = 'rounded-xl border border-line bg-white px-3 py-2 text-xs shadow-lg';

/* CSV export used by report sections */
export function downloadCsv(filename: string, rows: (string | number)[][]) {
  const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function CsvButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs font-semibold text-ink hover:border-brand-300 hover:bg-brand-50">
      <Download size={14} aria-hidden /> CSV
    </button>
  );
}

/* ============ Header ============ */
export function ExecutiveHeader() {
  return (
    <header className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm shadow-brand-900/[0.03] sm:flex-row sm:items-center sm:p-6">
      <div className="flex shrink-0 items-center gap-2">
        <img src={logo1} alt="Education, Scholarships and Sports Office seal" className="h-14 w-14 object-contain" />
        <img src={logo2} alt="Naga City Scholars Guild seal" className="h-14 w-14 object-contain" />
      </div>
      <div className="min-w-0 sm:border-l sm:border-line sm:pl-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">City of Naga · ESSO</p>
        <h1 className="mt-0.5 text-xl font-bold text-ink sm:text-2xl">Education, Scholarships and Sports Office</h1>
        <p className="text-sm font-medium text-ink-soft">Executive Dashboard · scholarship budget, disbursement and outcomes</p>
      </div>
    </header>
  );
}

/* ============ Filter bar: school year + yearly budget ============ */
export function YearFilterBar({ f }: { f: StaffFilters }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const idx = schoolYears.findIndex((y) => y.id === f.year.id);
  const move = (to: number) => {
    const n = (to + schoolYears.length) % schoolYears.length;
    f.select(schoolYears[n].id);
    refs.current[n]?.focus();
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); move(idx + 1); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); move(idx - 1); }
    if (e.key === 'Home') { e.preventDefault(); move(0); }
    if (e.key === 'End') { e.preventDefault(); move(schoolYears.length - 1); }
  };

  return (
    <section aria-labelledby="sy-filter" className="rounded-2xl border border-line bg-white p-4 shadow-sm shadow-brand-900/[0.03] sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <CalendarClock size={16} className="text-brand-700" aria-hidden />
          <h2 id="sy-filter" className="text-sm font-semibold text-ink">School year &amp; yearly budget</h2>
          {!f.isDefault && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-100 py-0.5 pl-2.5 pr-0.5 text-xs font-semibold text-brand-700">
              Filter: {syLabel(f.year)}
              <button type="button" onClick={f.clear} className="inline-flex min-h-6 items-center gap-1 rounded-full px-2 py-0.5 hover:bg-brand-200" aria-label={`Clear school year filter, return to S.Y. ${schoolYears[schoolYears.length - 1].label}`}>
                <X size={12} aria-hidden /> Clear
              </button>
            </span>
          )}
        </div>
      </div>

      <div role="radiogroup" aria-labelledby="sy-filter" className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {schoolYears.map((y, i) => {
          const on = y.id === f.year.id;
          const current = y.id === currentSchoolYearId;
          return (
            <button
              key={y.id} ref={(el) => { refs.current[i] = el; }} type="button" role="radio" aria-checked={on}
              tabIndex={on ? 0 : -1} onKeyDown={onKey} onClick={() => f.select(y.id)}
              aria-label={`School year ${y.label}${current ? ', current' : ''}, yearly budget ${fmtFull(y.budget)}`}
              className={cx(
                'flex min-h-14 flex-col items-start justify-center rounded-xl border px-3 py-2 text-left transition-colors',
                on ? 'border-brand-700 bg-brand-700 text-white shadow-sm shadow-brand-900/20' : 'border-line bg-white text-ink hover:border-brand-300 hover:bg-brand-50',
              )}
            >
              <span className="flex w-full items-center justify-between gap-1">
                <span className="font-display text-sm font-semibold">{y.label}</span>
                {current && <span className={cx('rounded-full px-1.5 py-0.5 text-[11px] font-semibold', on ? 'bg-gold-400 text-brand-950' : 'bg-gold-100 text-brand-900')}>Current</span>}
              </span>
              <span className={cx('text-xs tabular-nums', on ? 'text-brand-100' : 'text-ink-soft')}>Budget {fmtShort(y.budget)}</span>
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="sr-only">Showing data for {syLabel(f.year)}{f.isCurrent ? ', current school year' : ''}.</p>
    </section>
  );
}

/* ============ View tabs ============ */
export type ExecView = 'executive' | 'ntsp' | 'insights';
const views: { key: ExecView; label: string }[] = [
  { key: 'executive', label: 'Executive Dashboard' },
  { key: 'ntsp', label: 'NTSP' },
  { key: 'insights', label: 'Insights' },
];
export function ViewTabs({ value, onChange }: { value: ExecView; onChange: (v: ExecView) => void }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + views.length) % views.length;
    onChange(views[n].key);
    refs.current[n]?.focus();
  };
  return (
    <div role="tablist" aria-label="Dashboard views" className="inline-flex max-w-full flex-wrap gap-1 rounded-xl border border-line bg-white p-1">
      {views.map((v, i) => (
        <button
          key={v.key} ref={(el) => { refs.current[i] = el; }} role="tab" id={`tab-${v.key}`} aria-controls={`panel-${v.key}`}
          aria-selected={value === v.key} tabIndex={value === v.key ? 0 : -1} onKeyDown={(e) => onKey(e, i)} onClick={() => onChange(v.key)}
          className={cx('min-h-9 rounded-lg px-4 py-2 text-sm font-semibold transition-colors', value === v.key ? 'bg-brand-900 text-white' : 'text-ink-soft hover:bg-brand-50 hover:text-brand-700')}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}

/* ============ KPI card ============ */
function Kpi({ icon, label, children, foot, f, className }: { icon: React.ReactNode; label: string; children: React.ReactNode; foot?: React.ReactNode; f: StaffFilters; className?: string }) {
  return (
    <Card className={cx('min-w-0 p-5', className)}>
      <div className="flex items-center gap-2 text-ink-soft">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand-700" aria-hidden>{icon}</span>
        <h3 className="text-sm font-medium text-ink-soft">{label}</h3>
      </div>
      {f.status === 'loading' ? (
        <div className="mt-3 space-y-2"><Skeleton className="h-8 w-2/3" /><Skeleton className="h-4 w-1/2" /></div>
      ) : f.status !== 'live' ? (
        <p className="mt-3 font-display text-2xl font-bold text-ink-soft">—</p>
      ) : (
        <>
          <div className="mt-3 font-display text-[28px] font-bold leading-tight text-ink">{children}</div>
          {foot && <div className="mt-1 text-sm text-ink-soft">{foot}</div>}
        </>
      )}
    </Card>
  );
}

function Delta({ value, basis }: { value: number | null; basis: string }) {
  if (value === null) return <span>No previous year to compare</span>;
  const up = value >= 0;
  return (
    <span className="inline-flex flex-wrap items-center gap-1">
      <span className={cx('inline-flex items-center gap-0.5 font-semibold tabular-nums', up ? 'text-success-600' : 'text-danger-600')}>
        {up ? <TrendingUp size={14} aria-hidden /> : <TrendingDown size={14} aria-hidden />}
        {up ? '+' : '−'}{pct(Math.abs(value))}
      </span>
      <span>{basis}</span>
    </span>
  );
}

/** Like-for-like change in scholars: compare the same latest semester of the previous year. */
function scholarChange(y: SchoolYearRecord, prev: SchoolYearRecord | null) {
  if (!prev) return { change: null as number | null, basis: '' };
  const sem = y.sem2 ? 'sem2' : 'sem1';
  const now = y[sem]?.students ?? 0;
  const before = prev[sem]?.students ?? 0;
  return {
    change: before ? ((now - before) / before) * 100 : null,
    basis: `vs ${sem === 'sem2' ? '2nd' : '1st'} sem ${prev.label}`,
  };
}

function utilization(y: SchoolYearRecord) {
  return (disbursedTotal(y) / y.budget) * 100;
}

/* ============ Graduates donut ============ */
const segColors = ['#20234e', '#1d63c9', '#6238d1', '#b8860b', '#381593'];

function GraduatesDonut({ f }: { f: StaffFilters }) {
  const segs = schoolYears.filter((y) => y.graduates !== null).map((y, i) => ({ id: y.id, label: y.label, value: y.graduates as number, color: segColors[i % segColors.length] }));
  const total = segs.reduce((s, x) => s + x.value, 0);
  const [focus, setFocus] = useState<string | null>(null);
  const shown = segs.find((s) => s.id === focus);
  const top = segs.reduce((a, b) => (b.value > a.value ? b : a), segs[0]);
  const pending = schoolYears.filter((y) => y.graduates === null);

  const table = (
    <TableWrap caption="Graduates by school year">
      <thead className="bg-canvas"><tr><th scope="col" className={cx(th, 'text-left')}>School year</th><th scope="col" className={cx(th, num)}>Graduates</th><th scope="col" className={cx(th, num)}>Share</th></tr></thead>
      <tbody className="divide-y divide-line">
        {segs.map((s) => (
          <tr key={s.id} className={cx(s.id === f.year.id && 'bg-brand-50')}><th scope="row" className={cx(td, 'text-left font-medium text-ink')}>{s.label}</th><td className={cx(td, num)}>{fmtInt(s.value)}</td><td className={cx(td, num)}>{pct((s.value / total) * 100)}</td></tr>
        ))}
        {pending.map((y) => <tr key={y.id}><th scope="row" className={cx(td, 'text-left font-medium text-ink')}>{y.label}</th><td className={cx(td, num, 'text-ink-soft')} colSpan={2}>Pending</td></tr>)}
      </tbody>
      <tfoot><tr className="border-t border-line bg-canvas font-semibold"><th scope="row" className={cx(td, 'text-left')}>Total</th><td className={cx(td, num)}>{fmtInt(total)}</td><td className={cx(td, num)}>100.0%</td></tr></tfoot>
    </TableWrap>
  );

  return (
    <Panel id="grad-donut" title="Graduates by school year" description="Select a segment or legend item to filter the dashboard." table={table} f={f} className="md:col-span-2 xl:col-span-5">
      <div className="grid items-center gap-5 sm:grid-cols-[minmax(0,220px)_1fr] xl:grid-cols-1 2xl:grid-cols-[minmax(0,220px)_1fr]">
        <figure aria-label={`Donut chart of ${fmtInt(total)} graduates across ${segs.length} school years`} className="relative mx-auto h-[220px] w-full max-w-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart accessibilityLayer={false}>
              <Pie
                data={segs} dataKey="value" nameKey="label" innerRadius="64%" outerRadius="96%" paddingAngle={1.5} startAngle={90} endAngle={-270}
                onClick={(_, i) => f.select(segs[i].id)} onMouseEnter={(_, i) => setFocus(segs[i].id)} onMouseLeave={() => setFocus(null)}
                isAnimationActive={false}
              >
                {segs.map((s) => (
                  <Cell key={s.id} fill={s.color} stroke={s.id === f.year.id ? '#d4a017' : '#ffffff'} strokeWidth={s.id === f.year.id ? 4 : 2} style={{ cursor: 'pointer', outline: 'none' }} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <figcaption className="pointer-events-none absolute inset-0 grid place-items-center text-center">
            <div>
              <p className="font-display text-3xl font-bold tabular-nums text-ink">{fmtInt(shown ? shown.value : total)}</p>
              <p className="text-xs font-medium text-ink-soft">{shown ? `${shown.label} · ${pct((shown.value / total) * 100)}` : 'Total graduates'}</p>
            </div>
          </figcaption>
        </figure>

        <ul className="space-y-1.5" aria-label="Graduates legend">
          {segs.map((s) => {
            const on = s.id === f.year.id;
            return (
              <li key={s.id}>
                <button
                  type="button" aria-pressed={on} onClick={() => f.select(s.id)}
                  onFocus={() => setFocus(s.id)} onBlur={() => setFocus(null)} onMouseEnter={() => setFocus(s.id)} onMouseLeave={() => setFocus(null)}
                  aria-label={`S.Y. ${s.label}: ${s.value} graduates, ${pct((s.value / total) * 100)} of total. Filter dashboard to this year.`}
                  className={cx('flex min-h-10 w-full items-center gap-3 rounded-lg border px-3 py-1.5 text-left text-sm transition-colors', on ? 'border-brand-700 bg-brand-50' : 'border-transparent hover:bg-canvas')}
                >
                  <span className="h-3 w-3 shrink-0 rounded-sm" style={{ background: s.color }} aria-hidden />
                  <span className={cx('flex-1 font-medium', on ? 'text-brand-700' : 'text-ink')}>{s.label}</span>
                  <span className="tabular-nums font-semibold text-ink">{fmtInt(s.value)}</span>
                  <span className="w-14 text-right tabular-nums text-ink-soft">{pct((s.value / total) * 100)}</span>
                </button>
              </li>
            );
          })}
          {pending.map((y) => (
            <li key={y.id} className="flex min-h-10 items-center gap-3 px-3 text-sm text-ink-soft">
              <span className="h-3 w-3 shrink-0 rounded-sm border border-dashed border-ink-soft" aria-hidden />
              <span className="flex-1">{y.label}</span><span className="font-medium">Pending</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-xl bg-gold-50 p-4 ring-1 ring-gold-300">
        <Lightbulb size={18} className="mt-0.5 shrink-0 text-gold-600" aria-hidden />
        <p className="text-sm text-brand-900">
          <span className="font-semibold">Insight:</span> S.Y. {top.label} produced the most graduates — {fmtInt(top.value)} of {fmtInt(total)} ({pct((top.value / total) * 100)} of all graduates).
        </p>
      </div>
    </Panel>
  );
}

/* ============ Disbursement summary ============ */
function SemesterTile({ label, amount, students, unit }: { label: string; amount: number; students: number; unit: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-line p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{label}</p>
      <dl className="mt-2 grid grid-cols-2 gap-3">
        <div className="min-w-0"><dt className="text-xs text-ink-soft">Amount</dt><dd className="font-display text-xl font-bold text-ink"><Money value={amount} /></dd></div>
        <div className="min-w-0 text-right"><dt className="text-xs text-ink-soft">{unit}</dt><dd className="font-display text-xl font-bold tabular-nums text-ink">{fmtInt(students)}</dd></div>
      </dl>
    </div>
  );
}

function DisbursementSummary({ f }: { f: StaffFilters }) {
  const y = f.year;
  const total = disbursedTotal(y);
  const releases = (y.sem1?.students ?? 0) + (y.sem2?.students ?? 0);
  return (
    <Panel id="disb-summary" title={`Disbursement summary · ${syLabel(y)}`} description="Scholarship releases per semester." f={f} className="md:col-span-2 xl:col-span-7">
      <div className="grid gap-3 sm:grid-cols-2">
        {y.sem1 ? <SemesterTile label="1st semester" amount={y.sem1.amount} students={y.sem1.students} unit="Students" /> : <PendingBlock title="1st semester" body="Not yet released." />}
        {y.sem2 ? <SemesterTile label="2nd semester" amount={y.sem2.amount} students={y.sem2.students} unit="Students" /> : <PendingBlock title="2nd semester" body={`2nd semester disbursement for ${syLabel(y)} has not been released yet.`} />}
      </div>
      <dl className="mt-4 grid gap-3 rounded-xl bg-canvas p-4 sm:grid-cols-3">
        <div><dt className="text-xs text-ink-soft">{f.isCurrent ? 'Disbursed to date' : 'Total disbursed'}</dt><dd className="text-sm font-semibold tabular-nums text-ink">{fmtFull(total)}</dd></div>
        <div><dt className="text-xs text-ink-soft">Avg. per release</dt><dd className="text-sm font-semibold tabular-nums text-ink">{fmtFull(releases ? total / releases : 0)}</dd></div>
        <div>
          <dt className="text-xs text-ink-soft">Budget utilization</dt>
          <dd className="flex items-center gap-2 text-sm font-semibold tabular-nums text-ink"><span>{pct(utilization(y))}</span><Progress value={utilization(y)} className="flex-1" /></dd>
        </div>
      </dl>
    </Panel>
  );
}

/* ============ Incentives ============ */
function Incentives({ f }: { f: StaffFilters }) {
  const y = f.year;
  return (
    <Panel id="incentives" title="Incentives" description="Academic incentive amounts and student recipients per semester." f={f} className="md:col-span-2 xl:col-span-12">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="grid content-start gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
          {y.incentives.sem1 ? <SemesterTile label={`1st semester · ${y.label}`} amount={y.incentives.sem1.amount} students={y.incentives.sem1.recipients} unit="Recipients" /> : <PendingBlock title="1st semester" body="Incentives not yet released." />}
          {y.incentives.sem2 ? <SemesterTile label={`2nd semester · ${y.label}`} amount={y.incentives.sem2.amount} students={y.incentives.sem2.recipients} unit="Recipients" /> : <PendingBlock title="2nd semester" body={`Incentives for the 2nd semester of ${syLabel(y)} are not yet released.`} />}
        </div>
        <TableWrap caption="Incentives by school year and semester">
          <thead className="bg-canvas">
            <tr>
              <th scope="col" className={cx(th, 'text-left')}>School year</th>
              <th scope="col" className={cx(th, num)}>1st sem amount</th><th scope="col" className={cx(th, num)}>Recipients</th>
              <th scope="col" className={cx(th, num)}>2nd sem amount</th><th scope="col" className={cx(th, num)}>Recipients</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {schoolYears.map((r) => (
              <tr key={r.id} className={cx(r.id === y.id && 'bg-brand-50')} aria-current={r.id === y.id ? 'true' : undefined}>
                <th scope="row" className={cx(td, 'text-left font-medium', r.id === y.id ? 'text-brand-700' : 'text-ink')}>{r.label}</th>
                <td className={cx(td, num)}>{r.incentives.sem1 ? fmtFull(r.incentives.sem1.amount) : 'Pending'}</td>
                <td className={cx(td, num)}>{r.incentives.sem1 ? fmtInt(r.incentives.sem1.recipients) : '—'}</td>
                <td className={cx(td, num, !r.incentives.sem2 && 'text-ink-soft')}>{r.incentives.sem2 ? fmtFull(r.incentives.sem2.amount) : 'Pending'}</td>
                <td className={cx(td, num, !r.incentives.sem2 && 'text-ink-soft')}>{r.incentives.sem2 ? fmtInt(r.incentives.sem2.recipients) : '—'}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </div>
    </Panel>
  );
}

/* ============ VIEW: Executive ============ */
export function ExecutiveView({ f }: { f: StaffFilters }) {
  const y = f.year;
  const { change, basis } = scholarChange(y, f.prev);
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12 xl:gap-5">
      <Kpi f={f} icon={<PiggyBank size={16} />} label="Yearly budget" className="xl:col-span-3" foot={syLabel(y)}><Money value={y.budget} /></Kpi>
      <Kpi f={f} icon={<Wallet size={16} />} label={f.isCurrent ? 'Disbursed to date' : 'Total disbursed'} className="xl:col-span-3" foot={<span className="tabular-nums">{pct(utilization(y))} of budget</span>}><Money value={disbursedTotal(y)} /></Kpi>
      <Kpi f={f} icon={<Users size={16} />} label="Current scholars" className="xl:col-span-3" foot={<Delta value={change} basis={basis} />}><span className="tabular-nums">{fmtInt(currentScholars(y))}</span></Kpi>
      <Kpi f={f} icon={<GraduationCap size={16} />} label="Graduates" className="xl:col-span-3" foot={y.graduates === null ? 'Reported after 2nd semester' : syLabel(y)}>
        {y.graduates === null ? <span className="text-xl text-gold-600">Pending</span> : <span className="tabular-nums">{fmtInt(y.graduates)}</span>}
      </Kpi>
      <GraduatesDonut f={f} />
      <DisbursementSummary f={f} />
      <Incentives f={f} />
    </div>
  );
}

/* ============ Recharts helpers ============ */
const axisTick = { fontSize: 12, fill: '#4b5263' };
function YearTick({ x, y, payload, selected, toDate }: { x?: number | string; y?: number | string; payload?: { value: string }; selected: string; toDate?: string }) {
  const on = payload?.value === selected;
  return (
    <text x={x} y={Number(y ?? 0) + 14} textAnchor="middle" fontSize={12} fontWeight={on ? 700 : 500} fill={on ? '#381593' : '#4b5263'}>
      {payload?.value}
      {toDate && payload?.value === toDate && <tspan x={x} dy={14} fontSize={11} fontWeight={600} fill="#4b5263">to date</tspan>}
    </text>
  );
}
function StripeDefs() {
  return (
    <defs>
      <pattern id="stripe-sem2" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
        <rect width="6" height="6" fill="#6238d1" />
        <line x1="0" y1="0" x2="0" y2="6" stroke="#ffffff" strokeWidth="2" />
      </pattern>
    </defs>
  );
}
function LegendItem({ kind, label }: { kind: 'solid' | 'stripe' | 'outline'; label: string }) {
  const style: React.CSSProperties =
    kind === 'solid' ? { background: '#381593' } :
    kind === 'stripe' ? { background: 'repeating-linear-gradient(45deg,#6238d1 0 3px,#fff 3px 5px)' } :
    { background: '#eee9fc', boxShadow: 'inset 0 0 0 1.5px #20234e' };
  return <li className="flex items-center gap-2 text-xs font-medium text-ink"><span className="h-3 w-4 rounded-sm" style={style} aria-hidden />{label}</li>;
}

/* ============ VIEW: NTSP ============ */
export function NtspView({ f }: { f: StaffFilters }) {
  const data = schoolYears.map((y) => ({ id: y.id, label: y.label, sem1: y.sem1?.amount ?? null, sem2: y.sem2?.amount ?? null, s1: y.sem1?.students ?? null, s2: y.sem2?.students ?? null }));
  const y = f.year;
  const avg = (s: { amount: number; students: number } | null) => (s ? s.amount / s.students : null);

  const table = (
    <TableWrap caption="NTSP disbursement by school year and semester">
      <thead className="bg-canvas">
        <tr>
          <th scope="col" className={cx(th, 'text-left')}>School year</th>
          <th scope="col" className={cx(th, num)}>1st sem amount</th><th scope="col" className={cx(th, num)}>Students</th>
          <th scope="col" className={cx(th, num)}>2nd sem amount</th><th scope="col" className={cx(th, num)}>Students</th>
          <th scope="col" className={cx(th, num)}>Total</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-line">
        {schoolYears.map((r) => (
          <tr key={r.id} className={cx(r.id === y.id && 'bg-brand-50')} aria-current={r.id === y.id ? 'true' : undefined}>
            <th scope="row" className={cx(td, 'text-left font-medium', r.id === y.id ? 'text-brand-700' : 'text-ink')}>{r.label}</th>
            <td className={cx(td, num)}>{r.sem1 ? fmtFull(r.sem1.amount) : 'Pending'}</td>
            <td className={cx(td, num)}>{r.sem1 ? fmtInt(r.sem1.students) : '—'}</td>
            <td className={cx(td, num, !r.sem2 && 'text-ink-soft')}>{r.sem2 ? fmtFull(r.sem2.amount) : 'Pending'}</td>
            <td className={cx(td, num, !r.sem2 && 'text-ink-soft')}>{r.sem2 ? fmtInt(r.sem2.students) : '—'}</td>
            <td className={cx(td, num, 'font-semibold')}>{fmtFull(disbursedTotal(r))}{r.id === currentSchoolYearId && <span className="ml-1 text-xs font-normal text-ink-soft">to date</span>}</td>
          </tr>
        ))}
      </tbody>
    </TableWrap>
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12 xl:gap-5">
      <Panel id="ntsp-chart" title="Naga Tertiary Scholarship Program (NTSP) · releases by semester" description="Select a bar to filter by school year. Use arrow keys on the chart for values." table={table} f={f} className="md:col-span-2 xl:col-span-8">
        <ul className="mb-3 flex flex-wrap gap-4" aria-label="Chart legend"><LegendItem kind="solid" label="1st semester" /><LegendItem kind="stripe" label="2nd semester" /></ul>
        <figure aria-label="Grouped bar chart of NTSP 1st and 2nd semester disbursement per school year" className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, left: 4, bottom: 4 }} barGap={4}>
              <StripeDefs />
              <ReferenceArea x1={y.label} x2={y.label} fill="#f6f3fe" ifOverflow="visible" />
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e7ef" vertical={false} />
              <XAxis dataKey="label" tick={(p) => <YearTick {...p} selected={y.label} />} axisLine={false} tickLine={false} interval={0} />
              <YAxis tickFormatter={(v: number) => `₱${v / 1_000_000}M`} tick={axisTick} axisLine={false} tickLine={false} width={52} />
              <Tooltip cursor={{ fill: 'rgba(56,21,147,0.06)' }} content={({ active, payload, label }) => active && payload?.length ? (
                <div className={tooltipBox}>
                  <p className="mb-1 font-semibold text-ink">S.Y. {label}</p>
                  {(() => { const r = payload[0].payload as (typeof data)[number]; return (<>
                    <p className="tabular-nums text-ink">1st sem: {r.sem1 !== null ? `${fmtFull(r.sem1)} · ${r.s1} students` : 'Pending'}</p>
                    <p className="tabular-nums text-ink">2nd sem: {r.sem2 !== null ? `${fmtFull(r.sem2)} · ${r.s2} students` : 'Pending'}</p>
                  </>); })()}
                </div>
              ) : null} />
              <Bar dataKey="sem1" name="1st semester" fill="#381593" radius={[6, 6, 0, 0]} onClick={(_, i) => f.select(data[i].id)} style={{ cursor: 'pointer' }} />
              <Bar dataKey="sem2" name="2nd semester" fill="url(#stripe-sem2)" stroke="#381593" strokeWidth={1} radius={[6, 6, 0, 0]} onClick={(_, i) => f.select(data[i].id)} style={{ cursor: 'pointer' }} />
            </BarChart>
          </ResponsiveContainer>
        </figure>
        {data.some((d) => d.sem2 === null) && <p className="mt-2 text-xs text-ink-soft">2nd semester for S.Y. {data.filter((d) => d.sem2 === null).map((d) => d.label).join(', ')} is pending release.</p>}
      </Panel>

      <Panel id="ntsp-avg" title={`Average grant per scholar · ${syLabel(y)}`} f={f} className="md:col-span-2 xl:col-span-4">
        <div className="space-y-3">
          {([['1st semester', y.sem1], ['2nd semester', y.sem2]] as const).map(([l, s]) => s ? (
            <div key={l} className="rounded-xl border border-line p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{l}</p>
              <p className="mt-1 font-display text-2xl font-bold tabular-nums text-ink">{fmtFull(avg(s) ?? 0)}</p>
              <p className="text-sm text-ink-soft tabular-nums">{fmtFull(s.amount)} ÷ {fmtInt(s.students)} students</p>
            </div>
          ) : <PendingBlock key={l} title={l} body={`Not yet released for ${syLabel(y)}.`} />)}
        </div>
      </Panel>
    </div>
  );
}

/* ============ VIEW: Insights ============ */
export function InsightsView({ f }: { f: StaffFilters }) {
  const y = f.year;
  const graded = schoolYears.filter((r) => r.graduates !== null);
  const gradTotal = graded.reduce((s, r) => s + (r.graduates ?? 0), 0);
  const topGrad = graded.reduce((a, b) => ((b.graduates ?? 0) > (a.graduates ?? 0) ? b : a));
  const complete = schoolYears.filter((r) => r.sem1 && r.sem2);
  const topUtil = complete.reduce((a, b) => (utilization(b) > utilization(a) ? b : a));
  const { change, basis } = scholarChange(y, f.prev);
  const inc = (r: SchoolYearRecord) => (r.incentives.sem1?.recipients ?? 0) + (r.incentives.sem2?.recipients ?? 0);
  const budgetGrowth = ((schoolYears[schoolYears.length - 1].budget - schoolYears[0].budget) / schoolYears[0].budget) * 100;

  const items = [
    { icon: <GraduationCap size={18} />, title: 'Most graduates', body: `S.Y. ${topGrad.label} produced the most graduates — ${fmtInt(topGrad.graduates ?? 0)} of ${fmtInt(gradTotal)} (${pct(((topGrad.graduates ?? 0) / gradTotal) * 100)}).` },
    { icon: <Wallet size={18} />, title: 'Highest budget utilization', body: `S.Y. ${topUtil.label} used ${pct(utilization(topUtil))} of its ${fmtFull(topUtil.budget)} budget across both semesters.` },
    { icon: <Users size={18} />, title: `Scholars in ${syLabel(y)}`, body: change === null ? `${fmtInt(currentScholars(y))} scholars; no earlier year to compare.` : `${fmtInt(currentScholars(y))} scholars, ${change >= 0 ? 'up' : 'down'} ${pct(Math.abs(change))} ${basis}.` },
    { icon: <PiggyBank size={18} />, title: 'Budget growth', body: `The yearly budget grew ${pct(budgetGrowth)}, from ${fmtFull(schoolYears[0].budget)} in S.Y. ${schoolYears[0].label} to ${fmtFull(schoolYears[schoolYears.length - 1].budget)} in S.Y. ${schoolYears[schoolYears.length - 1].label}.` },
    { icon: <Award size={18} />, title: `Incentive recipients · ${syLabel(y)}`, body: y.incentives.sem2 ? `${fmtInt(inc(y))} incentive releases totalling ${fmtFull((y.incentives.sem1?.amount ?? 0) + (y.incentives.sem2?.amount ?? 0))}.` : `${fmtInt(inc(y))} recipients so far (1st semester only); 2nd semester pending.` },
    { icon: <BarChart3 size={18} />, title: `Semester mix · ${syLabel(y)}`, body: y.sem1 && y.sem2 ? `The 2nd semester accounted for ${pct((y.sem2.amount / disbursedTotal(y)) * 100)} of disbursement, reaching ${fmtInt(y.sem2.students - y.sem1.students)} more students than the 1st.` : `Only the 1st semester has been released (${fmtFull(y.sem1?.amount ?? 0)}); the mix will update when the 2nd semester is released.` },
  ];

  return (
    <Panel id="insights" title="Generated insights" description="Computed from the recorded data; they update with the school-year filter." f={f}>
      <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {items.map((it) => (
          <li key={it.title} className="flex gap-3 rounded-xl border border-line p-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700" aria-hidden>{it.icon}</span>
            <div className="min-w-0"><h4 className="text-sm font-semibold text-ink">{it.title}</h4><p className="mt-1 text-sm text-ink-soft">{it.body}</p></div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* ============ REPORT A: Budget per year ============ */
export function ReportBudget({ f }: { f: StaffFilters }) {
  const y = f.year;
  const data = schoolYears.map((r) => ({
    id: r.id, label: r.label, budget: r.budget, sem1: r.sem1?.amount ?? 0, sem2: r.sem2?.amount ?? 0,
    util: pct(utilization(r)),
  }));
  const exportCsv = () => downloadCsv('esso-budget-per-year.csv', [
    ['School year', 'Yearly budget', '1st sem disbursed', '2nd sem disbursed', 'Total disbursed', 'Remaining', 'Utilization %'],
    ...schoolYears.map((r) => [r.label + (r.id === currentSchoolYearId ? ' (to date)' : ''), r.budget.toFixed(2), (r.sem1?.amount ?? 0).toFixed(2), r.sem2 ? r.sem2.amount.toFixed(2) : 'Pending', disbursedTotal(r).toFixed(2), (r.budget - disbursedTotal(r)).toFixed(2), utilization(r).toFixed(1)]),
  ]);

  const detail = (
    <TableWrap caption="Yearly budget, disbursement and utilization by school year">
      <thead className="bg-canvas">
        <tr>
          <th scope="col" className={cx(th, 'text-left')}>School year</th>
          <th scope="col" className={cx(th, num)}>Yearly budget</th>
          <th scope="col" className={cx(th, num)}>1st sem</th>
          <th scope="col" className={cx(th, num)}>2nd sem</th>
          <th scope="col" className={cx(th, num)}>Disbursed</th>
          <th scope="col" className={cx(th, num)}>Utilization</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-line">
        {schoolYears.map((r) => {
          const on = r.id === y.id;
          return (
            <tr key={r.id} className={cx(on && 'bg-brand-50')} aria-current={on ? 'true' : undefined}>
              <th scope="row" className={cx(td, 'text-left font-medium', on ? 'text-brand-700' : 'text-ink')}>
                {r.label}{r.id === currentSchoolYearId && <span className="ml-1.5 rounded-full bg-gold-100 px-1.5 py-0.5 text-[11px] font-semibold text-brand-900">to date</span>}
              </th>
              <td className={cx(td, num)}>{fmtFull(r.budget)}</td>
              <td className={cx(td, num)}>{r.sem1 ? fmtFull(r.sem1.amount) : 'Pending'}</td>
              <td className={cx(td, num, !r.sem2 && 'text-ink-soft')}>{r.sem2 ? fmtFull(r.sem2.amount) : 'Pending'}</td>
              <td className={cx(td, num, 'font-semibold')}>{fmtFull(disbursedTotal(r))}</td>
              <td className={cx(td, num)}><span className="inline-flex items-center gap-2"><span className="hidden w-16 sm:block"><Progress value={utilization(r)} /></span>{pct(utilization(r))}</span></td>
            </tr>
          );
        })}
      </tbody>
    </TableWrap>
  );

  return (
    <Panel id="rep-budget" title="Budget per year" description="Yearly budget vs. scholarship disbursed (1st + 2nd semester). Labels show utilization." table={detail} f={f} actions={<CsvButton onClick={exportCsv} />} className="md:col-span-2 xl:col-span-8">
      <ul className="mb-3 flex flex-wrap gap-4" aria-label="Chart legend"><LegendItem kind="outline" label="Yearly budget" /><LegendItem kind="solid" label="1st semester disbursed" /><LegendItem kind="stripe" label="2nd semester disbursed" /></ul>
      <figure aria-label={`Bar chart comparing yearly budget with disbursement. ${syLabel(y)}: ${fmtFull(disbursedTotal(y))} of ${fmtFull(y.budget)}, ${pct(utilization(y))} utilized.`} className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 24, right: 8, left: 4, bottom: 4 }} barGap={4}>
            <StripeDefs />
            <ReferenceArea x1={y.label} x2={y.label} fill="#f6f3fe" ifOverflow="visible" />
            <CartesianGrid strokeDasharray="3 3" stroke="#e7e7ef" vertical={false} />
            <XAxis dataKey="label" tick={(p) => <YearTick {...p} selected={y.label} toDate={schoolYears.find((r) => r.id === currentSchoolYearId)?.label} />} axisLine={false} tickLine={false} interval={0} height={44} />
            <YAxis tickFormatter={(v: number) => `₱${v / 1_000_000}M`} tick={axisTick} axisLine={false} tickLine={false} width={52} />
            <Tooltip cursor={{ fill: 'rgba(56,21,147,0.06)' }} content={({ active, payload, label }) => active && payload?.length ? (() => {
              const r = schoolYears.find((s) => s.label === label)!;
              return (
                <div className={tooltipBox}>
                  <p className="mb-1 font-semibold text-ink">S.Y. {label}{r.id === currentSchoolYearId ? ' (to date)' : ''}</p>
                  <p className="tabular-nums text-ink">Budget: {fmtFull(r.budget)}</p>
                  <p className="tabular-nums text-ink">Disbursed: {fmtFull(disbursedTotal(r))}</p>
                  <p className="tabular-nums font-semibold text-brand-700">Utilization: {pct(utilization(r))}</p>
                </div>
              );
            })() : null} />
            <Bar isAnimationActive={false} dataKey="budget" name="Yearly budget" fill="#eee9fc" stroke="#20234e" strokeWidth={1.5} radius={[6, 6, 0, 0]} onClick={(_, i) => f.select(data[i].id)} style={{ cursor: 'pointer' }}>
              {data.map((d) => <Cell key={d.id} strokeWidth={d.id === y.id ? 2.5 : 1.5} />)}
              <LabelList dataKey="util" position="top" fontSize={11} fontWeight={600} fill="#20234e" />
            </Bar>
            <Bar isAnimationActive={false} dataKey="sem1" stackId="d" name="1st semester" fill="#381593" onClick={(_, i) => f.select(data[i].id)} style={{ cursor: 'pointer' }} />
            <Bar isAnimationActive={false} dataKey="sem2" stackId="d" name="2nd semester" fill="url(#stripe-sem2)" stroke="#381593" strokeWidth={1} radius={[6, 6, 0, 0]} onClick={(_, i) => f.select(data[i].id)} style={{ cursor: 'pointer' }} />
          </BarChart>
        </ResponsiveContainer>
      </figure>
    </Panel>
  );
}

export function ReportBudgetTable({ f }: { f: StaffFilters }) {
  const y = f.year;
  const remaining = y.budget - disbursedTotal(y);
  return (
    <Panel id="rep-budget-sel" title={`Budget position · ${syLabel(y)}`} description={f.isCurrent ? 'To date — only the 1st semester has been released.' : 'Full school year.'} f={f} className="md:col-span-2 xl:col-span-4">
      <dl className="space-y-3">
        {[
          ['Yearly budget', fmtFull(y.budget)],
          ['1st semester disbursed', y.sem1 ? fmtFull(y.sem1.amount) : 'Pending'],
          ['2nd semester disbursed', y.sem2 ? fmtFull(y.sem2.amount) : 'Pending'],
          [f.isCurrent ? 'Disbursed to date' : 'Total disbursed', fmtFull(disbursedTotal(y))],
          ['Remaining balance', fmtFull(remaining)],
        ].map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-3 border-b border-line pb-2 last:border-0">
            <dt className="text-sm text-ink-soft">{k}</dt>
            <dd className={cx('text-right text-sm font-semibold tabular-nums', v === 'Pending' ? 'text-gold-600' : 'text-ink')}>{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4">
        <div className="mb-1.5 flex justify-between text-sm"><span className="font-medium text-ink">Utilization{f.isCurrent ? ' to date' : ''}</span><span className="font-semibold tabular-nums text-brand-700">{pct(utilization(y))}</span></div>
        <Progress value={utilization(y)} />
      </div>
    </Panel>
  );
}

/* ============ REPORT B: Current number of scholars ============ */
export function ReportScholars({ f }: { f: StaffFilters }) {
  const y = f.year;
  const { change, basis } = scholarChange(y, f.prev);
  const trend = schoolYears.map((r) => ({ id: r.id, label: r.label, value: currentScholars(r) }));
  const exportCsv = () => downloadCsv('esso-current-scholars.csv', [
    ['School year', '1st sem scholars', '2nd sem scholars', 'Current scholars'],
    ...schoolYears.map((r) => [r.label, r.sem1?.students ?? '', r.sem2?.students ?? 'Pending', currentScholars(r)]),
  ]);
  const table = (
    <TableWrap caption="Current scholars by school year">
      <thead className="bg-canvas"><tr><th scope="col" className={cx(th, 'text-left')}>School year</th><th scope="col" className={cx(th, num)}>1st sem</th><th scope="col" className={cx(th, num)}>2nd sem</th><th scope="col" className={cx(th, num)}>Current</th></tr></thead>
      <tbody className="divide-y divide-line">
        {schoolYears.map((r) => (
          <tr key={r.id} className={cx(r.id === y.id && 'bg-brand-50')}>
            <th scope="row" className={cx(td, 'text-left font-medium text-ink')}>{r.label}</th>
            <td className={cx(td, num)}>{r.sem1 ? fmtInt(r.sem1.students) : '—'}</td>
            <td className={cx(td, num, !r.sem2 && 'text-ink-soft')}>{r.sem2 ? fmtInt(r.sem2.students) : 'Pending'}</td>
            <td className={cx(td, num, 'font-semibold')}>{fmtInt(currentScholars(r))}</td>
          </tr>
        ))}
      </tbody>
    </TableWrap>
  );

  return (
    <Panel id="rep-scholars" title="Current number of scholars" description={`${syLabel(y)} · latest released semester`} table={table} f={f} actions={<CsvButton onClick={exportCsv} />} className="md:col-span-2 xl:col-span-12">
      <div className="grid items-center gap-5 md:grid-cols-[auto_1fr] xl:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.3fr)]">
        <div>
          <p className="font-display text-5xl font-bold tabular-nums text-ink">{fmtInt(currentScholars(y))}</p>
          <p className="mt-1 text-sm text-ink-soft"><Delta value={change} basis={basis} /></p>
        </div>
        <dl className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-line p-3"><dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">1st semester</dt><dd className="mt-1 font-display text-xl font-bold tabular-nums text-ink">{y.sem1 ? fmtInt(y.sem1.students) : '—'}</dd></div>
          <div className={cx('rounded-xl border p-3', y.sem2 ? 'border-line' : 'border-dashed border-gold-500 bg-gold-50')}>
            <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">2nd semester</dt>
            <dd className={cx('mt-1 font-display text-xl font-bold tabular-nums', y.sem2 ? 'text-ink' : 'text-gold-600')}>{y.sem2 ? fmtInt(y.sem2.students) : 'Pending'}</dd>
          </div>
        </dl>
        <figure aria-label={`Trend of current scholars across school years: ${trend.map((t) => `${t.label} ${t.value}`).join(', ')}`} className="md:col-span-2 xl:col-span-1">
          <div className="h-[72px]" aria-hidden>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend} margin={{ top: 8, right: 10, left: 10, bottom: 4 }} accessibilityLayer={false}>
                <Line type="monotone" dataKey="value" stroke="#381593" strokeWidth={2} isAnimationActive={false}
                  dot={(p: { cx?: number; cy?: number; index?: number }) => {
                    const on = trend[p.index ?? 0]?.id === y.id;
                    return <circle key={p.index} cx={p.cx} cy={p.cy} r={on ? 5.5 : 3} fill={on ? '#d4a017' : '#381593'} stroke={on ? '#20234e' : '#fff'} strokeWidth={on ? 2 : 1} />;
                  }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <figcaption className="mt-1 flex justify-between text-xs tabular-nums text-ink-soft"><span>{trend[0].label}: {fmtInt(trend[0].value)}</span><span>{trend[trend.length - 1].label}: {fmtInt(trend[trend.length - 1].value)}</span></figcaption>
        </figure>
      </div>
    </Panel>
  );
}

/* ============ REPORT C: Scholars per school ============ */
type SortKey = 'name' | 'count';
export function ReportSchools({ f }: { f: StaffFilters }) {
  const total = currentScholars(f.year);
  const rows = useMemo(() => scholarsBySchool(total), [total]);
  const ranked = [...rows].sort((a, b) => b.count - a.count);
  const max = ranked[0]?.count || 1;
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' }>({ key: 'count', dir: 'desc' });
  const visible = rows
    .filter((r) => r.name.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => {
      const d = sort.key === 'name' ? a.name.localeCompare(b.name) : a.count - b.count;
      return sort.dir === 'asc' ? d : -d;
    });
  const toggle = (key: SortKey) => setSort((s) => ({ key, dir: s.key === key && s.dir === 'desc' ? 'asc' : 'desc' }));
  const SortIcon = ({ k }: { k: SortKey }) => (sort.key !== k ? <ArrowUpDown size={13} aria-hidden /> : sort.dir === 'asc' ? <ArrowUp size={13} aria-hidden /> : <ArrowDown size={13} aria-hidden />);
  const ariaSort = (k: SortKey) => (sort.key === k ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none');
  const exportCsv = () => downloadCsv(`esso-scholars-per-school-${f.year.id}.csv`, [
    ['School', 'Scholars', 'Share %'], ...ranked.map((r) => [r.name, r.count, r.share.toFixed(1)]), ['Total', total, '100.0'],
  ]);

  const rankTable = (
    <TableWrap caption={`Scholars per school, ${syLabel(f.year)}`}>
      <thead className="bg-canvas"><tr><th scope="col" className={cx(th, 'text-left')}>Rank</th><th scope="col" className={cx(th, 'text-left')}>School</th><th scope="col" className={cx(th, num)}>Scholars</th></tr></thead>
      <tbody className="divide-y divide-line">{ranked.map((r, i) => <tr key={r.name}><td className={cx(td, 'tabular-nums')}>{i + 1}</td><th scope="row" className={cx(td, 'text-left font-medium text-ink')}>{r.name}</th><td className={cx(td, num)}>{fmtInt(r.count)}</td></tr>)}</tbody>
    </TableWrap>
  );

  return (
    <>
      <Panel id="rep-schools-chart" title="Scholars per school" description={`Ranked · ${syLabel(f.year)} · ${fmtInt(total)} scholars`} table={rankTable} f={f} className="md:col-span-2 xl:col-span-5">
        <ol className="space-y-3" aria-label={`Ranked bar chart of scholars per school, ${syLabel(f.year)}`}>
          {ranked.map((r, i) => (
            <li key={r.name}>
              <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
                <span className="min-w-0 font-medium text-ink"><span className="mr-1.5 tabular-nums text-ink-soft">{i + 1}.</span>{r.name}</span>
                <span className="shrink-0 tabular-nums font-semibold text-ink">{fmtInt(r.count)} <span className="font-normal text-ink-soft">· {pct(r.share)}</span></span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-brand-50 ring-1 ring-inset ring-brand-100" aria-hidden>
                <div className={cx('h-full rounded-full', i === 0 ? 'bg-brand-900' : 'bg-brand-700')} style={{ width: `${(r.count / max) * 100}%` }} />
              </div>
            </li>
          ))}
        </ol>
      </Panel>

      <Panel id="rep-schools-table" title="School breakdown" description="Search and sort. Counts sum to the current number of scholars." f={f} actions={<CsvButton onClick={exportCsv} />} className="md:col-span-2 xl:col-span-7">
        <div className="relative mb-3">
          <label htmlFor="school-search" className="sr-only">Search schools</label>
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" aria-hidden />
          <input id="school-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search school…" className="w-full rounded-xl border border-line bg-white py-2.5 pl-9 pr-4 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200" />
        </div>
        <TableWrap caption={`Scholars per school, ${syLabel(f.year)}, sortable`}>
          <thead className="bg-canvas">
            <tr>
              <th scope="col" aria-sort={ariaSort('name')} className={cx(th, 'text-left')}>
                <button type="button" onClick={() => toggle('name')} className="inline-flex min-h-6 items-center gap-1 uppercase hover:text-brand-700">School <SortIcon k="name" /></button>
              </th>
              <th scope="col" aria-sort={ariaSort('count')} className={cx(th, num)}>
                <button type="button" onClick={() => toggle('count')} className="inline-flex min-h-6 items-center gap-1 uppercase hover:text-brand-700">Scholars <SortIcon k="count" /></button>
              </th>
              <th scope="col" className={cx(th, num)}>Share</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {visible.map((r) => (
              <tr key={r.name} className="hover:bg-brand-50/40">
                <th scope="row" className={cx(td, 'text-left font-medium text-ink')}>{r.name}</th>
                <td className={cx(td, num)}>{fmtInt(r.count)}</td>
                <td className={cx(td, num, 'text-ink-soft')}>{pct(r.share)}</td>
              </tr>
            ))}
            {visible.length === 0 && <tr><td colSpan={3} className="px-3 py-8 text-center text-sm text-ink-soft">No schools match “{q}”.</td></tr>}
          </tbody>
          <tfoot>
            <tr className="border-t border-line bg-canvas font-semibold">
              <th scope="row" className={cx(td, 'text-left')}>Total{q && ' (all schools)'}</th>
              <td className={cx(td, num)}>{fmtInt(rows.reduce((s, r) => s + r.count, 0))}</td>
              <td className={cx(td, num)}>100.0%</td>
            </tr>
          </tfoot>
        </TableWrap>
      </Panel>
    </>
  );
}
