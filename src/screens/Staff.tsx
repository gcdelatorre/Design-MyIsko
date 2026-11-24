import { useState } from 'react';
import {
  Search, FileText, CheckCircle2, AlertTriangle, ShieldCheck, ArrowLeft, ZoomIn, ZoomOut,
  Sparkles, Upload, Clock, User, History, Download, ChevronRight,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { Button, Card, AppBadge, CheckPill, AiNotice, Progress, SectionHeader, cx } from '../components/ui';
import { applicants, auditTrail, extractedFields } from '../lib/data';
import type { AppStatus } from '../lib/data';
import type { Ctx } from '../App';
import {
  ExecutiveHeader, YearFilterBar, ViewTabs, ExecutiveView, NtspView, InsightsView, useStaffFilters,
  ReportBudget, ReportBudgetTable, ReportScholars, ReportSchools, downloadCsv,
} from './StaffAnalytics';
import type { ExecView } from './StaffAnalytics';

/* ============ STAFF DASHBOARD ============ */
export function StaffDashboard({ ctx }: { ctx: Ctx }) {
  const cards = [
    { label: 'Total Applications', value: '1,248', tone: 'brand' },
    { label: 'For Pre-Verification', value: '86', tone: 'info' },
    { label: 'For Staff Review', value: '43', tone: 'gold' },
    { label: 'For Compliance', value: '27', tone: 'warning' },
    { label: 'Completed', value: '1,092', tone: 'success' },
  ] as const;
  const toneMap: Record<string, string> = { brand: 'bg-brand-600', info: 'bg-info-500', gold: 'bg-gold-500', warning: 'bg-warning-500', success: 'bg-success-500' };
  const f = useStaffFilters();
  const [view, setView] = useState<ExecView>('executive');
  return (
    <div className="space-y-6">
      <ExecutiveHeader />
      <YearFilterBar f={f} />

      <section aria-label="Executive views" className="space-y-4">
        <ViewTabs value={view} onChange={setView} />
        <div role="tabpanel" id={`panel-${view}`} aria-labelledby={`tab-${view}`}>
          {view === 'executive' && <ExecutiveView f={f} />}
          {view === 'ntsp' && <NtspView f={f} />}
          {view === 'insights' && <InsightsView f={f} />}
        </div>
      </section>

      <section aria-labelledby="pipeline-heading" className="space-y-4 border-t border-line pt-6">
      <div><h2 id="pipeline-heading" className="text-xl font-semibold text-ink">Application pipeline</h2><p className="mt-1 text-sm text-ink-soft">Naga Tertiary Scholarship Program · A.Y. 2026–2027</p></div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {cards.map((c) => (
          <Card key={c.label} className="p-5 animate-fade-up">
            <div className="mb-2 flex items-center justify-between"><span className={cx('h-2 w-2 rounded-full', toneMap[c.tone])} /></div>
            <p className="text-2xl font-bold text-ink">{c.value}</p>
            <p className="mt-1 text-xs font-medium text-ink-soft">{c.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card className="p-6">
          <SectionHeader title="Application Status Overview" subtitle="Distribution across the review pipeline." />
          <StatusOverviewChart />
        </Card>
        <Card className="p-6">
          <p className="mb-1 text-sm font-semibold text-ink">Priority Queue</p>
          <p className="mb-4 text-xs text-ink-soft">Applications awaiting your validation.</p>
          <div className="space-y-2">
            {applicants.filter((a) => a.status === 'staff-review' || a.status === 'pre-verification').slice(0, 4).map((a) => (
              <button key={a.id} onClick={() => ctx.go('staff-review')} className="flex w-full items-center gap-3 rounded-xl border border-line p-3 text-left hover:border-brand-300 hover:bg-brand-50">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">{a.name.split(' ').map((n) => n[0]).join('')}</span>
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-ink">{a.name}</p><p className="text-xs text-ink-soft">{a.docCheck}</p></div>
                <AppBadge status={a.status} />
              </button>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="mt-3 w-full" onClick={() => ctx.go('staff-applications')}>View all applications</Button>
        </Card>
      </div>
      </section>
    </div>
  );
}

function StatusOverviewChart() {
  const data = [
    { name: 'Submitted', value: 210 }, { name: 'Pre-Verify', value: 86 }, { name: 'Staff Review', value: 43 }, { name: 'Compliance', value: 27 }, { name: 'Completed', value: 1092 },
  ];
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e7e7ef" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#667085' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#667085' }} axisLine={false} tickLine={false} />
        <Tooltip cursor={{ fill: '#f6f3fe' }} contentStyle={{ borderRadius: 12, border: '1px solid #e7e7ef', fontSize: 12 }} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#4c25b0" />
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ============ APPLICATIONS TABLE ============ */
const filters: { key: 'all' | AppStatus; label: string }[] = [
  { key: 'all', label: 'All' }, { key: 'submitted', label: 'Submitted' }, { key: 'pre-verification', label: 'Under Pre-Verification' },
  { key: 'compliance', label: 'For Compliance' }, { key: 'staff-review', label: 'For Staff Review' }, { key: 'completed', label: 'Completed' },
];

export function StaffApplications({ ctx }: { ctx: Ctx }) {
  const [filter, setFilter] = useState<'all' | AppStatus>('all');
  const [q, setQ] = useState('');
  const rows = applicants.filter((a) => (filter === 'all' || a.status === filter) && a.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-5">
      <SectionHeader title="Applications" subtitle="Search, filter, and open applicant records for review." />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search applicant name…" className="w-full rounded-xl border border-line bg-white py-2.5 pl-10 pr-4 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button key={f.key} onClick={() => setFilter(f.key)} className={cx('rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors', filter === f.key ? 'bg-brand-700 text-white' : 'border border-line bg-white text-ink-soft hover:border-brand-300')}>{f.label}</button>
        ))}
      </div>

      {/* Desktop table */}
      <Card className="hidden overflow-hidden lg:block">
        <table className="w-full text-sm">
          <thead className="border-b border-line bg-canvas text-left text-xs uppercase tracking-wide text-ink-soft">
            <tr><th className="px-5 py-3 font-semibold">Applicant</th><th className="px-5 py-3 font-semibold">Scholarship</th><th className="px-5 py-3 font-semibold">Status</th><th className="px-5 py-3 font-semibold">Document Check</th><th className="px-5 py-3 font-semibold">Last Updated</th><th className="px-5 py-3 font-semibold text-right">Action</th></tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((a) => (
              <tr key={a.id} className="hover:bg-brand-50/40">
                <td className="px-5 py-3.5"><div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">{a.name.split(' ').map((n) => n[0]).join('')}</span><div><p className="font-medium text-ink">{a.name}</p><p className="text-xs text-ink-soft">{a.school}</p></div></div></td>
                <td className="px-5 py-3.5 text-ink-soft">{a.scholarship}</td>
                <td className="px-5 py-3.5"><AppBadge status={a.status} /></td>
                <td className="px-5 py-3.5 text-ink-soft">{a.docCheck}</td>
                <td className="px-5 py-3.5 text-ink-soft">{a.updated}</td>
                <td className="px-5 py-3.5 text-right"><Button size="sm" variant="outline" onClick={() => ctx.go('staff-review')} icon={<ChevronRight size={14} />}>Open</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="p-10 text-center text-sm text-ink-soft">No applications match your search.</p>}
      </Card>

      {/* Mobile cards */}
      <div className="space-y-3 lg:hidden">
        {rows.map((a) => (
          <Card key={a.id} className="p-4" onClick={() => ctx.go('staff-review')}>
            <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">{a.name.split(' ').map((n) => n[0]).join('')}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-ink">{a.name}</p><p className="truncate text-xs text-ink-soft">{a.school}</p></div><ChevronRight size={16} className="text-ink-soft" /></div>
            <div className="mt-3 flex items-center justify-between"><AppBadge status={a.status} /><span className="text-xs text-ink-soft">{a.docCheck}</span></div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ============ STAFF DOCUMENT REVIEW + VALIDATION ============ */
export function StaffReview({ ctx }: { ctx: Ctx }) {
  const [zoom, setZoom] = useState(100);
  const applicant = 'Maria Santos';

  return (
    <div className="space-y-5">
      <button onClick={() => ctx.go('staff-applications')} className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline"><ArrowLeft size={16} /> Back to applications</button>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-100 font-bold text-brand-700">MS</span>
          <div><h1 className="text-xl font-bold text-ink">{applicant}</h1><p className="text-sm text-ink-soft">NTSP-2026-004821 · University of Nueva Caceres</p></div>
        </div>
        <AppBadge status="staff-review" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        {/* LEFT — document preview */}
        <Card className="flex flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <p className="truncate text-sm font-semibold text-ink">Certificate_of_Enrollment.pdf</p>
            <div className="flex items-center gap-1">
              <button onClick={() => setZoom((z) => Math.max(60, z - 20))} className="rounded-lg p-1.5 text-ink-soft hover:bg-brand-50" aria-label="Zoom out"><ZoomOut size={16} /></button>
              <span className="w-11 text-center text-xs text-ink-soft">{zoom}%</span>
              <button onClick={() => setZoom((z) => Math.min(160, z + 20))} className="rounded-lg p-1.5 text-ink-soft hover:bg-brand-50" aria-label="Zoom in"><ZoomIn size={16} /></button>
            </div>
          </div>
          <div className="flex-1 overflow-auto scrollbar-slim bg-canvas p-6">
            <div className="mx-auto max-w-md origin-top bg-white p-8 shadow-lg ring-1 ring-line transition-transform" style={{ transform: `scale(${zoom / 100})` }}>
              <p className="text-center text-[13px] font-bold text-ink">University of Nueva Caceres</p>
              <p className="text-center text-[10px] text-ink-soft">Office of the Registrar</p>
              <p className="mt-5 text-center text-sm font-bold uppercase text-ink">Certificate of Enrollment</p>
              <div className="mt-5 space-y-2 text-[11px] text-ink">
                <p>This certifies that <span className="bg-gold-100 font-semibold">MARIA C. SANTOS</span> is enrolled in</p>
                <p><span className="bg-brand-100 font-semibold">BS Information Technology</span>, 2nd Year, A.Y. 2026–2027.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* RIGHT — verification info + staff controls */}
        <div className="space-y-4">
          <AiNotice />
          {/* AI findings — clearly labeled as AI */}
          <Card className="overflow-hidden">
            <div className="flex items-center gap-2 border-b border-line bg-brand-50 px-4 py-3"><Sparkles size={16} className="text-brand-600" /><p className="text-sm font-semibold text-brand-700">AI Pre-Verification</p><span className="ml-auto text-xs text-ink-soft">Preliminary · not a decision</span></div>
            <div className="divide-y divide-line">
              {[
                { l: 'Readability', v: 'Passed', ok: true },
                { l: 'Classification', v: 'Matched', ok: true },
                { l: 'Required Information', v: 'Detected', ok: true },
                { l: 'Cross-reference', v: 'Needs Review', ok: false },
              ].map((r) => (
                <div key={r.l} className="flex items-center justify-between px-4 py-3">
                  <span className="flex items-center gap-2 text-sm text-ink">{r.ok ? <CheckCircle2 size={16} className="text-success-500" /> : <AlertTriangle size={16} className="text-warning-600" />}{r.l}</span>
                  {r.ok ? <CheckPill tone="passed">{r.v}</CheckPill> : <CheckPill tone="review">{r.v}</CheckPill>}
                </div>
              ))}
            </div>
            <div className="px-4 py-3">
              <p className="rounded-lg bg-warning-100 px-3 py-2 text-xs text-ink"><span className="font-semibold">Flag:</span> School name differs from profile (“Univ. of Nueva Caceres” vs. “University of Nueva Caceres”).</p>
              <button onClick={() => ctx.openModal({ type: 'ai-details' })} className="mt-2 text-xs font-medium text-brand-700 hover:underline">View extracted information →</button>
            </div>
          </Card>

          {/* HUMAN STAFF ACTIONS — clearly distinguished */}
          <Card className="border-brand-300 p-4">
            <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-brand-700" /><p className="text-sm font-semibold text-ink">Official Staff Actions</p></div>
            <p className="mt-1 text-xs text-ink-soft">Only authorized ESSO personnel may validate documents. Actions are attributed to you and logged.</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <Button variant="primary" icon={<ShieldCheck size={16} />} onClick={() => ctx.openModal({ type: 'validate', applicant })}>Validate Document</Button>
              <Button variant="outline" className="!border-warning-500/50 !text-warning-600 hover:!bg-warning-100" icon={<AlertTriangle size={16} />} onClick={() => ctx.openModal({ type: 'compliance', applicant })}>Request Compliance</Button>
              <Button variant="ghost" className="sm:col-span-2" icon={<CheckCircle2 size={16} />} onClick={() => ctx.go('staff-audit')}>Mark as Reviewed</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ============ AUDIT TRAIL ============ */
export function AuditTrailScreen() {
  const iconMap: Record<string, { icon: React.ReactNode; cls: string }> = {
    upload: { icon: <Upload size={15} />, cls: 'bg-info-100 text-info-600' },
    ai: { icon: <Sparkles size={15} />, cls: 'bg-brand-100 text-brand-700' },
    reviewed: { icon: <User size={15} />, cls: 'bg-gold-100 text-gold-600' },
    compliance: { icon: <AlertTriangle size={15} />, cls: 'bg-warning-100 text-warning-600' },
  };
  return (
    <div className="space-y-5">
      <SectionHeader title="Audit Trail" subtitle="Every action is recorded for accountability and traceability."
        action={<Button variant="outline" size="sm" icon={<Download size={15} />} onClick={() => downloadCsv('esso-audit-trail.csv', [['Date', 'Time', 'User', 'Action', 'Record'], ...auditTrail.map((e) => [e.date, e.time, e.user, e.action, e.record])])}>Export Log</Button>} />

      {/* Desktop table */}
      <Card className="hidden overflow-hidden md:block">
        <table className="w-full text-sm">
          <thead className="border-b border-line bg-canvas text-left text-xs uppercase tracking-wide text-ink-soft">
            <tr><th className="px-5 py-3 font-semibold">Date &amp; Time</th><th className="px-5 py-3 font-semibold">User</th><th className="px-5 py-3 font-semibold">Action</th><th className="px-5 py-3 font-semibold">Record</th></tr>
          </thead>
          <tbody className="divide-y divide-line">
            {auditTrail.map((e, i) => (
              <tr key={i} className="hover:bg-brand-50/40">
                <td className="px-5 py-3.5 whitespace-nowrap"><p className="font-medium text-ink">{e.date}</p><p className="text-xs text-ink-soft">{e.time}</p></td>
                <td className="px-5 py-3.5"><span className={cx('inline-flex items-center gap-2', e.user.includes('System') ? 'text-brand-700' : 'text-ink')}>{e.user.includes('System') && <Sparkles size={13} className="text-brand-500" />}{e.user}</span></td>
                <td className="px-5 py-3.5"><span className={cx('inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium', (iconMap[e.status] || iconMap.upload).cls)}>{(iconMap[e.status] || iconMap.upload).icon}{e.action}</span></td>
                <td className="px-5 py-3.5 text-ink-soft">{e.record}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Mobile timeline */}
      <div className="space-y-3 md:hidden">
        {auditTrail.map((e, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-start gap-3">
              <span className={cx('grid h-9 w-9 shrink-0 place-items-center rounded-xl', (iconMap[e.status] || iconMap.upload).cls)}>{(iconMap[e.status] || iconMap.upload).icon}</span>
              <div className="flex-1"><p className="text-sm font-medium text-ink">{e.action}</p><p className="text-xs text-ink-soft">{e.record}</p><p className="mt-1 flex items-center gap-1.5 text-xs text-ink-soft"><Clock size={12} />{e.date} · {e.time} · {e.user}</p></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ============ REPORTS ============ */
export function Reports() {
  const byStatus = [
    { name: 'Submitted', value: 210, color: '#2b7be4' },
    { name: 'Pre-Verification', value: 86, color: '#6238d1' },
    { name: 'Staff Review', value: 43, color: '#d4a017' },
    { name: 'Compliance', value: 27, color: '#d97706' },
    { name: 'Completed', value: 1092, color: '#16a35c' },
  ];
  const monthly = [
    { m: 'May', received: 120, completed: 90 }, { m: 'Jun', received: 210, completed: 160 },
    { m: 'Jul', received: 320, completed: 250 }, { m: 'Aug', received: 280, completed: 240 },
    { m: 'Sep', received: 318, completed: 352 },
  ];
  const stats = [
    { l: 'Applications Received', v: '1,248', d: '+18% vs last cycle' },
    { l: 'Documents for Compliance', v: '27', d: 'Across 24 applicants' },
    { l: 'Pre-Verification Activity', v: '3,914', d: 'Preliminary checks run' },
    { l: 'Completed Reviews', v: '1,092', d: 'Validated by staff' },
  ];
  const f = useStaffFilters();
  return (
    <div className="space-y-6">
      <SectionHeader title="Reports" subtitle="Administrative monitoring for the current scholarship cycle."
        action={<Button variant="outline" size="sm" className="print:hidden" icon={<Download size={15} />} onClick={() => window.print()}>Export PDF</Button>} />

      <YearFilterBar f={f} />

      <section aria-labelledby="sy-reports-heading" className="space-y-4">
        <h2 id="sy-reports-heading" className="text-lg font-semibold text-ink">School-year reports</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12 xl:gap-5">
          <ReportScholars f={f} />
          <ReportBudget f={f} />
          <ReportBudgetTable f={f} />
          <ReportSchools f={f} />
        </div>
      </section>

      <h2 className="border-t border-line pt-6 text-lg font-semibold text-ink">Application cycle · A.Y. 2026–2027</h2>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.l} className="p-5"><p className="text-2xl font-bold text-ink">{s.v}</p><p className="mt-1 text-sm font-medium text-ink">{s.l}</p><p className="mt-0.5 text-xs text-ink-soft">{s.d}</p></Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <p className="mb-4 text-sm font-semibold text-ink">Applications Received vs. Completed</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthly} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e7ef" vertical={false} />
              <XAxis dataKey="m" tick={{ fontSize: 11, fill: '#667085' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#667085' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e7e7ef', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="received" name="Received" radius={[6, 6, 0, 0]} fill="#4c25b0" />
              <Bar dataKey="completed" name="Completed" radius={[6, 6, 0, 0]} fill="#d4a017" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <p className="mb-4 text-sm font-semibold text-ink">Applications by Status</p>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={byStatus} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                {byStatus.map((d) => <Cell key={d.name} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e7e7ef', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6">
        <p className="mb-4 text-sm font-semibold text-ink">Examination Statistics</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { l: 'Scheduled to take exam', v: 312, pct: 100, tone: 'brand' as const },
            { l: 'Completed examination', v: 268, pct: 86, tone: 'success' as const },
            { l: 'Passed qualifying score', v: 194, pct: 62, tone: 'gold' as const },
          ].map((e) => (
            <div key={e.l} className="rounded-xl border border-line p-4">
              <p className="text-2xl font-bold text-ink">{e.v}</p><p className="mb-2 text-sm text-ink-soft">{e.l}</p><Progress value={e.pct} tone={e.tone} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
