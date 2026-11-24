import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import type { DocStatus, AppStatus } from '../lib/data';

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(' ');
}

/* ---------------- Button ---------------- */
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'gold' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
};
export function Button({ variant = 'primary', size = 'md', icon, className, children, ...rest }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl font-medium font-display transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] whitespace-nowrap';
  const sizes = {
    sm: 'text-sm px-3.5 py-2',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-6 py-3.5',
  };
  const variants = {
    primary: 'bg-brand-700 text-white hover:bg-brand-600 shadow-sm shadow-brand-900/20',
    secondary: 'bg-brand-100 text-brand-700 hover:bg-brand-200',
    gold: 'bg-gold-500 text-brand-950 hover:bg-gold-400 shadow-sm shadow-gold-500/30',
    ghost: 'text-brand-700 hover:bg-brand-50',
    outline: 'border border-line bg-white text-ink hover:border-brand-300 hover:bg-brand-50',
    danger: 'bg-danger-500 text-white hover:bg-danger-600',
  };
  return (
    <button className={cx(base, sizes[size], variants[variant], className)} {...rest}>
      {icon}
      {children}
    </button>
  );
}

/* ---------------- Card ---------------- */
export function Card({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx('rounded-2xl border border-line bg-white shadow-sm shadow-brand-900/[0.03]', className)}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ---------------- Status config ---------------- */
const docStatusMap: Record<DocStatus, { label: string; cls: string; dot: string }> = {
  verified: { label: 'Verified', cls: 'bg-success-100 text-success-600', dot: 'bg-success-500' },
  'ai-checked': { label: 'AI Checked', cls: 'bg-brand-100 text-brand-700', dot: 'bg-brand-500' },
  'needs-attention': { label: 'Needs Attention', cls: 'bg-warning-100 text-warning-600', dot: 'bg-warning-500' },
  submitted: { label: 'Submitted', cls: 'bg-info-100 text-info-600', dot: 'bg-info-500' },
  missing: { label: 'Missing', cls: 'bg-slate-100 text-slate-500', dot: 'bg-slate-400' },
  'staff-review': { label: 'For Staff Review', cls: 'bg-gold-100 text-gold-600', dot: 'bg-gold-500' },
};

const appStatusMap: Record<AppStatus, { label: string; cls: string; dot: string }> = {
  submitted: { label: 'Submitted', cls: 'bg-info-100 text-info-600', dot: 'bg-info-500' },
  'pre-verification': { label: 'Under Pre-Verification', cls: 'bg-brand-100 text-brand-700', dot: 'bg-brand-500' },
  'staff-review': { label: 'For Staff Review', cls: 'bg-gold-100 text-gold-600', dot: 'bg-gold-500' },
  compliance: { label: 'For Compliance', cls: 'bg-warning-100 text-warning-600', dot: 'bg-warning-500' },
  examination: { label: 'Examination', cls: 'bg-info-100 text-info-600', dot: 'bg-info-500' },
  completed: { label: 'Completed', cls: 'bg-success-100 text-success-600', dot: 'bg-success-500' },
};

export function DocBadge({ status, className }: { status: DocStatus; className?: string }) {
  const s = docStatusMap[status];
  return (
    <span className={cx('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold', s.cls, className)}>
      <span className={cx('h-1.5 w-1.5 rounded-full', s.dot)} aria-hidden />
      {s.label}
    </span>
  );
}

export function AppBadge({ status, className }: { status: AppStatus; className?: string }) {
  const s = appStatusMap[status];
  return (
    <span className={cx('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold', s.cls, className)}>
      <span className={cx('h-1.5 w-1.5 rounded-full', s.dot)} aria-hidden />
      {s.label}
    </span>
  );
}

/* Generic pill for check statuses */
export function CheckPill({ tone, children }: { tone: 'passed' | 'review' | 'fail' | 'info'; children: React.ReactNode }) {
  const map = {
    passed: 'bg-success-100 text-success-600',
    review: 'bg-warning-100 text-warning-600',
    fail: 'bg-danger-100 text-danger-600',
    info: 'bg-info-100 text-info-600',
  };
  return (
    <span className={cx('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold', map[tone])}>
      {children}
    </span>
  );
}

/* ---------------- Progress ---------------- */
export function Progress({ value, className, tone = 'brand' }: { value: number; className?: string; tone?: 'brand' | 'gold' | 'success' }) {
  const bar = { brand: 'bg-brand-600', gold: 'bg-gold-500', success: 'bg-success-500' }[tone];
  return (
    <div className={cx('h-2 w-full overflow-hidden rounded-full bg-brand-100', className)} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <div className={cx('h-full rounded-full transition-all duration-700', bar)} style={{ width: `${value}%` }} />
    </div>
  );
}

/* ---------------- Modal ---------------- */
export function Modal({ open, onClose, title, children, maxWidth = 'max-w-lg' }: { open: boolean; onClose: () => void; title?: string; children: React.ReactNode; maxWidth?: string }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-brand-950/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className={cx('relative w-full rounded-t-3xl bg-white shadow-2xl sm:rounded-2xl animate-fade-up', maxWidth)}>
        {title && (
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <h3 className="text-lg font-semibold text-ink">{title}</h3>
            <button onClick={onClose} aria-label="Close dialog" className="rounded-lg p-1.5 text-ink-soft hover:bg-brand-50 hover:text-ink">
              <X size={20} />
            </button>
          </div>
        )}
        <div className="max-h-[75vh] overflow-y-auto scrollbar-slim">{children}</div>
      </div>
    </div>
  );
}

/* ---------------- Section header ---------------- */
export function SectionHeader({ eyebrow, title, subtitle, action }: { eyebrow?: string; title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        {eyebrow && <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-500">{eyebrow}</p>}
        <h2 className="text-xl font-semibold text-ink sm:text-2xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-ink-soft">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/* Brand mark */
export function Logo({ light = false, size = 'md' }: { light?: boolean; size?: 'sm' | 'md' | 'lg' }) {
  const dim = { sm: 'h-8 w-8', md: 'h-9 w-9', lg: 'h-11 w-11' }[size];
  const text = { sm: 'text-lg', md: 'text-xl', lg: 'text-2xl' }[size];
  return (
    <div className="flex items-center gap-2.5">
      <div className={cx('relative grid place-items-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-600 shadow-sm shadow-brand-900/30', dim)}>
        {/* graduation-cap monogram */}
        <svg viewBox="0 0 24 24" className="h-[58%] w-[58%]" fill="none" aria-hidden>
          <path d="M12 4 22 9l-10 5L2 9l10-5Z" fill="#eab63a" />
          <path d="M6 11v4.2c0 1 2.7 2.3 6 2.3s6-1.3 6-2.3V11" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="leading-none">
        <span className={cx('font-display font-bold tracking-tight', text, light ? 'text-white' : 'text-brand-900')}>
          My<span className="text-gold-500">Isko</span>
        </span>
      </div>
    </div>
  );
}

/* AI disclaimer banner — reused across AI screens */
export function AiNotice({ className }: { className?: string }) {
  return (
    <div className={cx('flex items-start gap-3 rounded-xl border border-gold-300 bg-gold-50 px-4 py-3', className)}>
      <div className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-500 text-[11px] font-bold text-brand-950">i</div>
      <p className="text-sm text-brand-900">
        <span className="font-semibold">AI results are preliminary.</span> Final validation and the scholarship decision are performed by authorized ESSO personnel. The AI does not determine eligibility or approval.
      </p>
    </div>
  );
}
