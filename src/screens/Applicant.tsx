import { useState } from 'react';
import {
  ArrowRight, ArrowLeft, CheckCircle2, Clock, FileText, UploadCloud, Eye, Wrench,
  ChevronRight, AlertTriangle, Search, Calendar, ScanLine, FolderOpen, Bell, Sparkles, CircleDot,
} from 'lucide-react';
import { Button, Card, DocBadge, AppBadge, Progress, SectionHeader, AiNotice, cx } from '../components/ui';
import { applicantProfile, requirements, timeline, notifications } from '../lib/data';
import type { Ctx } from '../App';

/* ============ DASHBOARD ============ */
export function ApplicantDashboard({ ctx }: { ctx: Ctx }) {
  return (
    <div className="space-y-6">
      <div className="animate-fade-up">
        <p className="text-sm text-ink-soft">Good day,</p>
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">{applicantProfile.name}</h1>
        <p className="mt-1 text-sm text-ink-soft">Here's the current status of your scholarship application.</p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Application Status" value="Under Pre-Verification" badge={<AppBadge status="pre-verification" />} tone="brand" />
        <StatCard label="Requirements" value={`${applicantProfile.submitted} / ${applicantProfile.required}`} hint="documents submitted" tone="info" />
        <StatCard label="Completion" value={`${applicantProfile.completion}%`} progress={applicantProfile.completion} tone="gold" />
        <StatCard label="Next Action" value="Submit missing document" hint="Residency Certificate" tone="warning" />
      </div>

      {/* Continue CTA */}
      <Card className="flex flex-col items-start justify-between gap-4 bg-gradient-to-r from-brand-900 to-brand-700 p-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-brand-200">Reference No. {applicantProfile.refNo}</p>
          <h2 className="mt-1 text-lg font-semibold text-white">Continue your {applicantProfile.scholarship.split('(')[0].trim()} application</h2>
          <p className="mt-1 text-sm text-brand-100">You have 2 missing documents and 1 item awaiting staff review.</p>
        </div>
        <Button variant="gold" size="lg" icon={<ArrowRight size={18} />} onClick={() => ctx.go('app-form')}>Continue Application</Button>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Timeline */}
        <Card className="p-6">
          <SectionHeader title="My Application" subtitle="Track every stage of your scholarship." />
          <ol className="relative space-y-1">
            {timeline.map((t, i) => (
              <li key={t.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className={cx('grid h-8 w-8 place-items-center rounded-full border-2 text-xs font-bold',
                    t.state === 'done' && 'border-success-500 bg-success-500 text-white',
                    t.state === 'current' && 'border-brand-600 bg-brand-100 text-brand-700',
                    t.state === 'todo' && 'border-line bg-white text-ink-soft')}>
                    {t.state === 'done' ? <CheckCircle2 size={16} /> : i + 1}
                  </span>
                  {i < timeline.length - 1 && <span className={cx('my-1 w-0.5 flex-1', t.state === 'done' ? 'bg-success-500' : 'bg-line')} />}
                </div>
                <div className="pb-4">
                  <p className={cx('text-sm font-semibold', t.state === 'todo' ? 'text-ink-soft' : 'text-ink')}>{t.label}</p>
                  {t.date && <p className="text-xs text-ink-soft">{t.state === 'current' ? <span className="inline-flex items-center gap-1 text-brand-600"><Clock size={12} />{t.date}</span> : t.date}</p>}
                </div>
              </li>
            ))}
          </ol>
        </Card>

        {/* Quick actions + hero teaser */}
        <div className="space-y-4">
          <Card className="p-5">
            <p className="mb-3 text-sm font-semibold text-ink">Quick Actions</p>
            <div className="space-y-2">
              {[
                { icon: <FolderOpen size={18} />, t: 'Manage Documents', s: 'app-documents' as const },
                { icon: <ScanLine size={18} />, t: 'AI Smart Document Check', s: 'app-ai' as const },
                { icon: <Bell size={18} />, t: 'View Notifications', s: 'app-notifications' as const },
              ].map((a) => (
                <button key={a.t} onClick={() => ctx.go(a.s)} className="flex w-full items-center gap-3 rounded-xl border border-line p-3 text-left transition-colors hover:border-brand-300 hover:bg-brand-50">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-100 text-brand-700">{a.icon}</span>
                  <span className="flex-1 text-sm font-medium text-ink">{a.t}</span>
                  <ChevronRight size={16} className="text-ink-soft" />
                </button>
              ))}
            </div>
          </Card>
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-br from-brand-700 to-brand-600 p-5 text-white">
              <Sparkles size={22} className="text-gold-400" />
              <p className="mt-2 text-sm font-semibold">Smart Document Check</p>
              <p className="mt-1 text-xs text-brand-100">1 document is ready for staff review. See what our preliminary check found.</p>
              <Button variant="gold" size="sm" className="mt-3" onClick={() => ctx.go('app-ai')} icon={<ArrowRight size={14} />}>Open Result</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, hint, badge, progress, tone }: { label: string; value: string; hint?: string; badge?: React.ReactNode; progress?: number; tone: 'brand' | 'info' | 'gold' | 'warning' }) {
  const bar = { brand: 'bg-brand-500', info: 'bg-info-500', gold: 'bg-gold-500', warning: 'bg-warning-500' }[tone] as string;
  return (
    <Card className="p-5 animate-fade-up">
      <div className="flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{label}</p><span className={cx('h-2 w-2 rounded-full', bar)} /></div>
      <p className="mt-2 text-lg font-bold leading-snug text-ink">{value}</p>
      {badge && <div className="mt-2">{badge}</div>}
      {hint && <p className="mt-1 text-xs text-ink-soft">{hint}</p>}
      {progress !== undefined && <Progress value={progress} tone="gold" className="mt-3" />}
    </Card>
  );
}

/* ============ MULTI-STEP APPLICATION FORM ============ */
const steps = ['Personal Information', 'Educational Information', 'Financial Information', 'Scholarship Information', 'Documentary Requirements'];

export function ApplicationForm({ ctx }: { ctx: Ctx }) {
  const [step, setStep] = useState(0);
  const pct = Math.round(((step + 1) / steps.length) * 100);

  return (
    <div className="mx-auto max-w-3xl">
      <SectionHeader eyebrow={`Step ${step + 1} of ${steps.length}`} title="Scholarship Application" subtitle="Complete each step. Your progress is saved automatically." />

      {/* Stepper */}
      <div className="mb-6 flex items-center gap-2 overflow-x-auto scrollbar-slim pb-1">
        {steps.map((s, i) => (
          <div key={s} className="flex shrink-0 items-center gap-2">
            <button onClick={() => setStep(i)} className={cx('flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors', i === step ? 'bg-brand-700 text-white' : i < step ? 'bg-success-100 text-success-600' : 'bg-white text-ink-soft border border-line')}>
              <span className={cx('grid h-5 w-5 place-items-center rounded-full text-[10px]', i === step ? 'bg-white/20' : i < step ? 'bg-success-500 text-white' : 'bg-brand-100 text-brand-700')}>{i < step ? '✓' : i + 1}</span>
              <span className="hidden sm:inline">{s}</span>
            </button>
            {i < steps.length - 1 && <ChevronRight size={14} className="text-ink-soft" />}
          </div>
        ))}
      </div>
      <Progress value={pct} className="mb-6" />

      <Card className="p-6">
        {step === 0 && <FormGrid fields={[
          { l: 'Full Name', ph: 'Maria C. Santos', req: true, v: 'Maria C. Santos' },
          { l: 'Birthdate', ph: '', type: 'date', req: true, v: '2005-03-14' },
          { l: 'Contact Number', ph: '+63 917 000 0000', req: true, v: '+63 917 555 0142' },
          { l: 'Email Address', ph: 'you@example.com', type: 'email', req: true, v: 'maria.santos@example.com' },
          { l: 'Complete Address', ph: 'House no., street, barangay, city', req: true, full: true, v: 'Zone 4, Barangay Concepcion Pequeña, Naga City' },
        ]} />}
        {step === 1 && <FormGrid fields={[
          { l: 'School / University', ph: '', req: true, v: 'University of Nueva Caceres' },
          { l: 'Year Level', ph: '', req: true, select: ['1st Year', '2nd Year', '3rd Year', '4th Year'], v: '2nd Year' },
          { l: 'Course / Program', ph: '', req: true, full: true, v: 'BS Information Technology' },
          { l: 'General Weighted Average (last term)', ph: 'e.g. 1.75 / 90%', req: true, v: '1.68' },
        ]} />}
        {step === 2 && <FormGrid fields={[
          { l: 'Estimated Yearly Tuition', ph: '₱', req: true, v: '₱ 68,000' },
          { l: 'Civil Status', ph: '', req: true, select: ['Single', 'Married', 'Widowed'], v: 'Single' },
          { l: 'Number of Family Members', ph: '', req: true, v: '5' },
          { l: 'Estimated Monthly Family Income', ph: '₱', req: true, v: '₱ 14,000' },
          { l: 'Parent / Guardian Occupation', ph: '', req: false, full: true, v: 'Public utility driver' },
        ]} />}
        {step === 3 && <FormGrid fields={[
          { l: 'Scholarship Category', ph: '', req: true, select: ['Naga Tertiary Scholarship Program (NTSP)', 'City College Grant', 'Academic Excellence Grant'], v: 'Naga Tertiary Scholarship Program (NTSP)' },
          { l: 'Application Type', ph: '', req: true, select: ['New Applicant', 'Renewal'], v: 'New Applicant' },
          { l: 'Why are you applying? (short answer)', ph: 'Tell us briefly…', req: false, full: true, textarea: true, v: 'To continue my studies and ease my family’s financial burden while I finish my IT degree.' },
        ]} />}
        {step === 4 && (
          <div className="space-y-3">
            <AiNotice className="mb-2" />
            {requirements.slice(0, 5).map((d) => (
              <div key={d.id} className="flex items-center gap-3 rounded-xl border border-line p-3">
                <FileText size={20} className="shrink-0 text-brand-600" />
                <div className="flex-1 min-w-0"><p className="truncate text-sm font-medium text-ink">{d.name}</p><DocBadge status={d.status} className="mt-1" /></div>
                <Button size="sm" variant={d.status === 'missing' ? 'primary' : 'outline'} onClick={() => ctx.openModal({ type: 'upload', docName: d.name })}>{d.status === 'missing' ? 'Upload' : 'Replace'}</Button>
              </div>
            ))}
            <button onClick={() => ctx.go('app-documents')} className="text-sm font-medium text-brand-700 hover:underline">View all documentary requirements →</button>
          </div>
        )}
      </Card>

      <div className="mt-5 flex items-center justify-between">
        <Button variant="outline" icon={<ArrowLeft size={16} />} disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>Back</Button>
        {step < steps.length - 1 ? (
          <Button variant="primary" icon={<ArrowRight size={16} />} onClick={() => setStep((s) => s + 1)}>Save &amp; Continue</Button>
        ) : (
          <Button variant="gold" icon={<CheckCircle2 size={16} />} onClick={() => ctx.go('app-status')}>Submit Application</Button>
        )}
      </div>
    </div>
  );
}

type FieldDef = { l: string; ph: string; req?: boolean; type?: string; full?: boolean; select?: string[]; textarea?: boolean; v?: string };
function FormGrid({ fields }: { fields: FieldDef[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map((f) => (
        <label key={f.l} className={cx('block', f.full && 'sm:col-span-2')}>
          <span className="mb-1.5 block text-sm font-medium text-ink">{f.l}{f.req && <span className="text-danger-500"> *</span>}</span>
          {f.select ? (
            <select defaultValue={f.v} className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200">{f.select.map((o) => <option key={o}>{o}</option>)}</select>
          ) : f.textarea ? (
            <textarea rows={3} defaultValue={f.v} placeholder={f.ph} className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm placeholder:text-ink-soft/60 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200" />
          ) : (
            <input type={f.type || 'text'} defaultValue={f.v} placeholder={f.ph} className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm placeholder:text-ink-soft/60 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200" />
          )}
        </label>
      ))}
    </div>
  );
}

/* ============ DOCUMENTS ============ */
export function Documents({ ctx }: { ctx: Ctx }) {
  const actionFor = (s: string) => s === 'missing' ? { label: 'Upload', v: 'primary' as const } : s === 'needs-attention' ? { label: 'Fix', v: 'danger' as const } : s === 'ai-checked' ? { label: 'Review', v: 'outline' as const } : { label: 'View', v: 'outline' as const };
  const done = requirements.filter((r) => r.status !== 'missing').length;
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Document Requirements" title="Required Documents" subtitle={`${done} of ${requirements.length} submitted · upload the rest to continue your application.`}
        action={<Button variant="primary" icon={<UploadCloud size={16} />} onClick={() => ctx.openModal({ type: 'upload' })}>Upload Document</Button>} />
      <AiNotice />

      {/* Desktop table */}
      <Card className="hidden overflow-hidden md:block">
        <table className="w-full text-sm">
          <thead className="border-b border-line bg-canvas text-left text-xs uppercase tracking-wide text-ink-soft">
            <tr><th className="px-5 py-3 font-semibold">Document</th><th className="px-5 py-3 font-semibold">Status</th><th className="px-5 py-3 font-semibold">Uploaded</th><th className="px-5 py-3 font-semibold text-right">Action</th></tr>
          </thead>
          <tbody className="divide-y divide-line">
            {requirements.map((d) => {
              const a = actionFor(d.status);
              return (
                <tr key={d.id} className="hover:bg-brand-50/40">
                  <td className="px-5 py-3.5"><div className="flex items-center gap-3"><FileText size={18} className="text-brand-600" /><div><p className="font-medium text-ink">{d.name}</p>{d.note && <p className="text-xs text-warning-600">{d.note}</p>}</div></div></td>
                  <td className="px-5 py-3.5"><DocBadge status={d.status} /></td>
                  <td className="px-5 py-3.5 text-ink-soft">{d.uploadedAt || '—'}</td>
                  <td className="px-5 py-3.5 text-right">
                    <Button size="sm" variant={a.v} onClick={() => d.status === 'ai-checked' ? ctx.go('app-ai') : ctx.openModal({ type: 'upload', docName: d.name })} icon={d.status === 'missing' ? <UploadCloud size={14} /> : d.status === 'needs-attention' ? <Wrench size={14} /> : <Eye size={14} />}>{a.label}</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {requirements.map((d) => {
          const a = actionFor(d.status);
          return (
            <Card key={d.id} className="p-4">
              <div className="flex items-start gap-3">
                <FileText size={20} className="mt-0.5 shrink-0 text-brand-600" />
                <div className="flex-1 min-w-0"><p className="text-sm font-medium text-ink">{d.name}</p><DocBadge status={d.status} className="mt-1.5" />{d.uploadedAt && <p className="mt-1 text-xs text-ink-soft">{d.uploadedAt}</p>}{d.note && <p className="mt-1 text-xs text-warning-600">{d.note}</p>}</div>
              </div>
              <Button size="sm" variant={a.v} className="mt-3 w-full" onClick={() => d.status === 'ai-checked' ? ctx.go('app-ai') : ctx.openModal({ type: 'upload', docName: d.name })}>{a.label}</Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ============ STATUS ============ */
export function AppStatus({ ctx }: { ctx: Ctx }) {
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Application Status" title="Track Your Application" subtitle={`Reference No. ${applicantProfile.refNo}`} />
      <Card className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-100 text-brand-700"><Sparkles size={24} /></div>
          <div><p className="text-sm text-ink-soft">Current stage</p><h2 className="text-lg font-semibold text-ink">Under Pre-Verification</h2><AppBadge status="pre-verification" className="mt-1" /></div>
        </div>
        <div className="text-left sm:text-right"><p className="text-sm text-ink-soft">Overall completion</p><p className="text-2xl font-bold text-ink">{applicantProfile.completion}%</p><Progress value={applicantProfile.completion} tone="gold" className="mt-1 w-40" /></div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card className="p-6">
          <p className="mb-4 text-sm font-semibold text-ink">Detailed Timeline</p>
          <ol className="space-y-1">
            {timeline.map((t, i) => (
              <li key={t.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className={cx('grid h-8 w-8 place-items-center rounded-full border-2', t.state === 'done' && 'border-success-500 bg-success-500 text-white', t.state === 'current' && 'border-brand-600 bg-brand-100 text-brand-700 animate-pulse-soft', t.state === 'todo' && 'border-line bg-white text-ink-soft')}>
                    {t.state === 'done' ? <CheckCircle2 size={16} /> : t.state === 'current' ? <CircleDot size={16} /> : i + 1}
                  </span>
                  {i < timeline.length - 1 && <span className={cx('my-1 w-0.5 flex-1', t.state === 'done' ? 'bg-success-500' : 'bg-line')} />}
                </div>
                <div className="pb-4"><p className={cx('text-sm font-semibold', t.state === 'todo' ? 'text-ink-soft' : 'text-ink')}>{t.label}</p>{t.date && <p className="text-xs text-ink-soft">{t.date}</p>}</div>
              </li>
            ))}
          </ol>
        </Card>
        <div className="space-y-4">
          <Card className="p-5">
            <p className="mb-2 text-sm font-semibold text-ink">Examination</p>
            <div className="flex items-center gap-3 rounded-xl bg-info-100 p-3.5"><Calendar size={20} className="text-info-600" /><div><p className="text-sm font-semibold text-ink">Oct 5, 2026 · 8:00 AM</p><p className="text-xs text-ink-soft">UNC Gymnasium · Qualifying Exam</p></div></div>
            <p className="mt-2 text-xs text-ink-soft">Status: <span className="font-semibold text-info-600">Scheduled (pending shortlist)</span></p>
          </Card>
          <Card className="p-5">
            <p className="mb-3 text-sm font-semibold text-ink">Need to do</p>
            <div className="space-y-2">
              <ToDoRow icon={<UploadCloud size={16} />} text="Upload Residency Certificate" onClick={() => ctx.openModal({ type: 'upload', docName: 'Residency Certificate' })} />
              <ToDoRow icon={<Wrench size={16} />} text="Fix Income Document" tone="warning" onClick={() => ctx.openModal({ type: 'upload', docName: 'Income Document' })} />
              <ToDoRow icon={<ScanLine size={16} />} text="Review AI check result" onClick={() => ctx.go('app-ai')} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ToDoRow({ icon, text, onClick, tone }: { icon: React.ReactNode; text: string; onClick: () => void; tone?: 'warning' }) {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-3 rounded-xl border border-line p-3 text-left hover:border-brand-300 hover:bg-brand-50">
      <span className={cx('grid h-8 w-8 place-items-center rounded-lg', tone === 'warning' ? 'bg-warning-100 text-warning-600' : 'bg-brand-100 text-brand-700')}>{icon}</span>
      <span className="flex-1 text-sm font-medium text-ink">{text}</span><ChevronRight size={16} className="text-ink-soft" />
    </button>
  );
}

/* ============ NOTIFICATIONS ============ */
export function Notifications() {
  const [items, setItems] = useState(notifications);
  const iconMap: Record<string, React.ReactNode> = {
    alert: <AlertTriangle size={18} className="text-warning-600" />,
    search: <Search size={18} className="text-brand-600" />,
    calendar: <Calendar size={18} className="text-info-600" />,
    doc: <FileText size={18} className="text-gold-600" />,
  };
  const empty = items.length === 0;
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <SectionHeader title="Notifications" subtitle="Updates about your documents and application." action={!empty && <Button variant="ghost" size="sm" onClick={() => setItems([])}>Mark all read</Button>} />
      {empty ? (
        <Card className="p-12 text-center"><div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-success-100 text-success-600"><CheckCircle2 size={26} /></div><p className="font-semibold text-ink">You're all caught up</p><p className="mt-1 text-sm text-ink-soft">New updates will appear here.</p></Card>
      ) : (
        <Card className="divide-y divide-line">
          {items.map((n) => (
            <div key={n.id} className={cx('flex gap-3 p-4', n.unread && 'bg-brand-50/50')}>
              <div className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-canvas">{iconMap[n.icon]}</div>
              <div className="flex-1"><p className="text-sm font-semibold text-ink">{n.title}</p><p className="text-sm text-ink-soft">{n.body}</p><p className="mt-1 text-xs text-ink-soft/70">{n.time}</p></div>
              {n.unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-600" />}
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

/* ============ PROFILE ============ */
export function Profile({ ctx, onSignOut }: { ctx: Ctx; onSignOut: () => void }) {
  const p = applicantProfile;
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <SectionHeader title="My Profile" subtitle="Keep your information accurate — the AI cross-references it with your documents." />
      <Card className="overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-brand-800 to-brand-600" />
        <div className="px-6 pb-6">
          <div className="-mt-10 flex items-end gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-2xl border-4 border-white bg-brand-600 text-2xl font-bold text-white">MS</div>
            <div className="pb-1"><h2 className="text-lg font-semibold text-ink">{p.name}</h2><p className="text-sm text-ink-soft">{p.scholarship}</p></div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              ['Reference No.', p.refNo], ['Email', p.email], ['Contact', p.phone], ['Address', p.address],
              ['School', p.school], ['Course', p.course], ['Year Level', p.year], ['Civil Status', 'Single'],
            ].map(([l, v]) => (
              <div key={l} className="rounded-xl border border-line p-3.5"><p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{l}</p><p className="mt-0.5 text-sm font-medium text-ink">{v}</p></div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button variant="primary" onClick={() => ctx.go('app-form')}>Edit Application</Button>
            <Button variant="outline" onClick={() => ctx.go('app-documents')}>Manage Documents</Button>
            <Button variant="ghost" className="ml-auto !text-danger-600 hover:!bg-danger-100" onClick={onSignOut}>Sign out</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
