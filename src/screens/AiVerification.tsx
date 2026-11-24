import { useState } from 'react';
import {
  Sparkles, ZoomIn, ZoomOut, FileText, CheckCircle2, AlertTriangle, ChevronDown,
  ShieldCheck, ArrowRight, RefreshCw, Play, Info, ClipboardList,
} from 'lucide-react';
import { Button, Card, AiNotice, CheckPill, cx } from '../components/ui';
import { aiChecks, extractedFields, smartCheckSteps } from '../lib/data';
import type { Ctx } from '../App';

export function AiVerification({ ctx }: { ctx: Ctx }) {
  const [zoom, setZoom] = useState(100);
  const [openHow, setOpenHow] = useState(true);
  const [running, setRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(smartCheckSteps.length - 1);

  const runAgain = () => {
    setRunning(true);
    setActiveStep(-1);
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setActiveStep(i);
      if (i >= smartCheckSteps.length - 1) {
        clearInterval(t);
        setTimeout(() => setRunning(false), 400);
      }
    }, 420);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 p-6 text-white sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand-100"><Sparkles size={14} className="text-gold-400" /> Signature Feature</span>
            <h1 className="mt-3 text-2xl font-bold sm:text-3xl">AI-Assisted Document Pre-Verification</h1>
            <p className="mt-1.5 max-w-xl text-sm text-brand-100">Preliminary automated checking to assist ESSO personnel — readability, classification, information extraction, and cross-referencing.</p>
          </div>
          <Button variant="gold" icon={running ? <RefreshCw size={16} className="animate-spin" /> : <Play size={16} />} onClick={runAgain} disabled={running}>{running ? 'Analyzing…' : 'Run Check Again'}</Button>
        </div>
      </div>

      <AiNotice />

      {/* Smart check pipeline */}
      <Card className="p-5">
        <div className="mb-4 flex items-center gap-2"><ClipboardList size={18} className="text-brand-600" /><p className="text-sm font-semibold text-ink">Smart Document Check Pipeline</p></div>
        <div className="flex gap-2 overflow-x-auto scrollbar-slim pb-1">
          {smartCheckSteps.map((s, i) => {
            const state = running ? (i <= activeStep ? 'done' : i === activeStep + 1 ? 'active' : 'todo') : (i < smartCheckSteps.length - 1 ? 'done' : 'active');
            return (
              <div key={s.key} className="flex flex-1 shrink-0 items-center gap-2 min-w-[140px]">
                <div className={cx('flex-1 rounded-xl border p-3 transition-all', state === 'active' ? 'border-gold-400 bg-gold-50' : state === 'done' ? 'border-success-500/30 bg-success-100/60' : 'border-line bg-white')}>
                  <div className="flex items-center gap-2">
                    <span className={cx('grid h-6 w-6 place-items-center rounded-lg text-[11px] font-bold', state === 'active' ? 'bg-gold-500 text-brand-950' : state === 'done' ? 'bg-success-500 text-white' : 'bg-brand-100 text-brand-700')}>{state === 'done' ? '✓' : i + 1}</span>
                    <p className="text-xs font-semibold text-ink">{s.label}</p>
                  </div>
                  <p className="mt-1 text-[11px] text-ink-soft">{s.desc}</p>
                </div>
                {i < smartCheckSteps.length - 1 && <ArrowRight size={14} className="shrink-0 text-brand-300" />}
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
        {/* LEFT — Document preview */}
        <Card className="flex flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div className="min-w-0"><p className="truncate text-sm font-semibold text-ink">Certificate_of_Enrollment.pdf</p><p className="text-xs text-ink-soft">Uploaded Sep 24, 2026 · 10:42 AM · Page 1 of 1</p></div>
            <div className="flex items-center gap-1">
              <button onClick={() => setZoom((z) => Math.max(60, z - 20))} className="rounded-lg p-1.5 text-ink-soft hover:bg-brand-50" aria-label="Zoom out"><ZoomOut size={16} /></button>
              <span className="w-11 text-center text-xs font-medium text-ink-soft">{zoom}%</span>
              <button onClick={() => setZoom((z) => Math.min(160, z + 20))} className="rounded-lg p-1.5 text-ink-soft hover:bg-brand-50" aria-label="Zoom in"><ZoomIn size={16} /></button>
            </div>
          </div>
          <div className="relative flex-1 overflow-auto scrollbar-slim bg-canvas p-6">
            {running && <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-brand-500/40 to-transparent animate-scan" />}
            {/* Faux document */}
            <div className="mx-auto max-w-md origin-top bg-white p-8 shadow-lg ring-1 ring-line transition-transform" style={{ transform: `scale(${zoom / 100})` }}>
              <div className="mb-5 flex items-center gap-3 border-b border-line pb-4">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-brand-100 text-brand-700"><FileText size={20} /></div>
                <div><p className="text-[13px] font-bold text-ink">University of Nueva Caceres</p><p className="text-[10px] text-ink-soft">Office of the Registrar · Naga City</p></div>
              </div>
              <p className="text-center text-sm font-bold uppercase tracking-wide text-ink">Certificate of Enrollment</p>
              <div className="mt-5 space-y-2.5 text-[11px] leading-relaxed text-ink">
                <p>This is to certify that <span className="bg-gold-100 font-semibold">MARIA C. SANTOS</span> is officially enrolled in the</p>
                <p><span className="bg-brand-100 font-semibold">BS Information Technology</span> program, <span className="bg-brand-100 font-semibold">2nd Year</span>, for</p>
                <p><span className="bg-brand-100 font-semibold">A.Y. 2026–2027</span>, First Semester.</p>
                <p className="pt-3">Issued this 24th day of September 2026 upon the request of the above-named student for scholarship purposes.</p>
              </div>
              <div className="mt-8 flex items-end justify-between">
                <div className="h-10 w-24 rounded bg-canvas" />
                <div className="text-center"><div className="mb-1 h-8 w-28 border-b border-ink" /><p className="text-[9px] text-ink-soft">Registrar</p></div>
              </div>
            </div>
          </div>
        </Card>

        {/* RIGHT — Analysis panel */}
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {aiChecks.map((c) => (
              <Card key={c.id} className={cx('p-4', c.status === 'review' && 'border-warning-500/40')}>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{c.label}</p>
                  {c.status === 'passed' ? <CheckPill tone="passed"><CheckCircle2 size={12} /> Passed</CheckPill> : <CheckPill tone="review"><AlertTriangle size={12} /> Review</CheckPill>}
                </div>
                <p className="mt-2 text-sm font-semibold text-ink">{c.value}</p>
                <p className="mt-1 text-xs text-ink-soft">{c.detail}</p>
              </Card>
            ))}
          </div>

          {/* Possible issues */}
          <Card className="border-warning-500/40 p-4">
            <div className="flex items-center gap-2"><AlertTriangle size={18} className="text-warning-600" /><p className="text-sm font-semibold text-ink">Possible Issues — 1 item detected</p></div>
            <div className="mt-3 flex items-start gap-3 rounded-xl bg-warning-100 p-3.5">
              <Info size={16} className="mt-0.5 shrink-0 text-warning-600" />
              <p className="text-sm text-ink"><span className="font-semibold">School name differs from the profile information.</span> Extracted “Univ. of Nueva Caceres” vs. profile “University of Nueva Caceres”. This may simply be an abbreviation — staff review recommended.</p>
            </div>
          </Card>

          {/* Extracted fields */}
          <Card className="overflow-hidden">
            <p className="border-b border-line px-4 py-3 text-sm font-semibold text-ink">Information Extraction &amp; Cross-Reference</p>
            <table className="w-full text-sm">
              <thead className="bg-canvas text-left text-xs text-ink-soft"><tr><th className="px-4 py-2 font-semibold">Field</th><th className="px-4 py-2 font-semibold">Extracted</th><th className="px-4 py-2 font-semibold">Match</th></tr></thead>
              <tbody className="divide-y divide-line">
                {extractedFields.map((f) => (
                  <tr key={f.field}>
                    <td className="px-4 py-2.5 font-medium text-ink">{f.field}</td>
                    <td className="px-4 py-2.5 text-ink-soft">{f.extracted}</td>
                    <td className="px-4 py-2.5">
                      {f.match === 'exact' && <CheckPill tone="passed">Exact</CheckPill>}
                      {f.match === 'near' && <CheckPill tone="review">Near</CheckPill>}
                      {f.match === 'info' && <CheckPill tone="info">Info</CheckPill>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>

      {/* Preliminary result summary */}
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-4 border-l-4 border-gold-500 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gold-100 text-gold-600"><ShieldCheck size={24} /></div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Preliminary Result</p>
              <h2 className="text-xl font-bold text-ink">Ready for Staff Review</h2>
              <p className="mt-1 max-w-xl text-sm text-ink-soft">The document passed preliminary readability and classification checks. One potential information discrepancy requires staff validation.</p>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outline" onClick={() => ctx.openModal({ type: 'ai-details' })}>View Details</Button>
            <Button variant="primary" icon={<ArrowRight size={16} />} onClick={() => ctx.go('app-status')}>Submit for Staff Review</Button>
          </div>
        </div>
      </Card>

      {/* Transparency panel */}
      <Card className="overflow-hidden">
        <button onClick={() => setOpenHow((o) => !o)} className="flex w-full items-center justify-between px-6 py-4" aria-expanded={openHow}>
          <span className="flex items-center gap-2 text-sm font-semibold text-ink"><Info size={18} className="text-brand-600" /> How was this checked?</span>
          <ChevronDown size={18} className={cx('text-brand-500 transition-transform', openHow && 'rotate-180')} />
        </button>
        {openHow && (
          <div className="space-y-2 border-t border-line px-6 py-5 animate-fade-in">
            {[
              { ok: true, t: 'Document can be read' },
              { ok: true, t: 'Document type identified' },
              { ok: true, t: 'Required information detected' },
              { ok: true, t: 'Applicant information compared' },
              { ok: false, t: 'Potential discrepancy detected' },
            ].map((r) => (
              <p key={r.t} className="flex items-center gap-3 text-sm text-ink">
                {r.ok ? <CheckCircle2 size={18} className="text-success-500" /> : <AlertTriangle size={18} className="text-warning-600" />}{r.t}
              </p>
            ))}
            <p className="mt-3 rounded-xl bg-brand-50 px-4 py-3 text-center text-sm font-semibold text-brand-700">AI does not determine final eligibility or approval. This demonstrates a responsible human-in-the-loop workflow.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
