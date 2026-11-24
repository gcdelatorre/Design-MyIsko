import { createContext, useContext, useEffect, useRef, useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
  CheckCircle2, XCircle, AlertTriangle, Clock, Info, Loader2, FileX, ChevronDown, CalendarDays,
  Upload, Search, ScanLine, Bell, LayoutDashboard, FileText, FolderOpen, Activity, User, Users,
  FileCheck2, BarChart3, History, ClipboardCheck, UserCheck, Home, MoreHorizontal, LogOut, Check,
} from "lucide-react"
import { Logo } from "../components/ui"

/* ============ FIDELITY CONTEXT ============
 * Every screen is authored once. The same primitives render as
 * lo (grayscale blocks), mid (structured: real copy, grid, dimensions) or hi (MyIsko UI). */
export type Fi = "lo" | "mid" | "hi"
const FiCtx = createContext<Fi>("hi")
export const FiProvider = FiCtx.Provider
export const useFi = () => useContext(FiCtx)
export const cx = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(" ")
const pick = <T,>(fi: Fi, lo: T, mid: T, hi: T) => (fi === "lo" ? lo : fi === "mid" ? mid : hi)

export const ink = (fi: Fi) => pick(fi, "text-zinc-600", "text-zinc-800", "text-[#1F2330]")
export const soft = (fi: Fi) => pick(fi, "text-zinc-400", "text-zinc-500", "text-[#667085]")
export const line = (fi: Fi) => pick(fi, "border-zinc-400", "border-zinc-300", "border-[#E4E7EC]")

/* ============ FRAME (artboard) ============ */
export interface Note { n: number; t: string; d: string }
export const fiLabel: Record<Fi, string> = { lo: "Low-Fidelity", mid: "Structured", hi: "High-Fidelity" }

export function Frame({ code, title, device = "desktop", fi, children, notes, compact }: {
  code: string; title: string; device?: "desktop" | "mobile"; fi: Fi; children: React.ReactNode; notes?: Note[]; compact?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [w, setW] = useState(0)
  useEffect(() => {
    const el = ref.current!
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const W = device === "desktop" ? 1440 : 390
  const H = device === "desktop" ? 1024 : 844
  const s = w / W
  return (
    <figure className="min-w-0">
      {!compact && (
        <figcaption className="mb-2 flex items-baseline justify-between gap-3 font-mono text-[11px] tracking-tight">
          <span className="truncate text-[#1F2330]"><b className="mr-1.5 text-gold-600">{code}</b>{title}</span>
          <span className="shrink-0 text-[#667085]">{W}×{H}</span>
        </figcaption>
      )}
      <div
        ref={ref}
        className={cx("relative w-full overflow-hidden bg-white ring-1 ring-black/10 shadow-[0_8px_24px_-12px_rgba(20,22,47,0.25)]", device === "mobile" ? "rounded-[18px]" : "rounded-md")}
        style={{ height: H * s || (device === "mobile" ? 400 : 300) }}
        role="img"
        aria-label={`${code} ${title} — ${fiLabel[fi]} ${device} frame`}
      >
        {w > 0 && (
          <div
            className={cx("absolute left-0 top-0 overflow-hidden font-sans", fi === "hi" ? "bg-[#F7F7FA]" : "bg-white")}
            style={{ width: W, height: H, transform: `scale(${s})`, transformOrigin: "0 0" }}
          >
            <FiProvider value={fi}>{children}</FiProvider>
          </div>
        )}
      </div>
      {notes && fi !== "hi" && (
        <ol className="mt-3 space-y-1.5">
          {notes.map((n) => (
            <li key={n.n} className="flex gap-2 text-[12px] leading-snug text-[#667085]">
              <span className="grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-[#E5484D] font-mono text-[10px] font-bold text-white">{n.n}</span>
              <span><b className="font-semibold text-[#1F2330]">{n.t}</b> — {n.d}</span>
            </li>
          ))}
        </ol>
      )}
    </figure>
  )
}

/* Annotation pin (wireframes only) */
export function Pin({ n }: { n: number }) {
  const fi = useFi()
  if (fi === "hi") return null
  return <span className="absolute -left-3 -top-3 z-10 grid h-7 w-7 place-items-center rounded-full bg-[#E5484D] font-mono text-[13px] font-bold text-white shadow">{n}</span>
}

/* Measurement tag (structured only) */
export function Dim({ children, className }: { children: React.ReactNode; className?: string }) {
  const fi = useFi()
  if (fi !== "mid") return null
  return <span className={cx("pointer-events-none absolute z-20 rounded bg-[#E5484D] px-1.5 py-0.5 font-mono text-[12px] font-semibold text-white", className)}>{children}</span>
}

/* 12-column overlay (structured only) */
function GridOverlay({ cols = 12, pad = 32, gap = 24 }: { cols?: number; pad?: number; gap?: number }) {
  const fi = useFi()
  if (fi !== "mid") return null
  return (
    <div className="pointer-events-none absolute inset-0 z-0 grid" style={{ gridTemplateColumns: `repeat(${cols},1fr)`, gap, paddingLeft: pad, paddingRight: pad }}>
      {Array.from({ length: cols }).map((_, i) => <div key={i} className="bg-[#E5484D]/[0.05]" />)}
    </div>
  )
}

/* ============ TYPE ============ */
export function H({ l = 2, children, className }: { l?: 1 | 2 | 3; children: React.ReactNode; className?: string }) {
  const fi = useFi()
  const size = { 1: "text-[36px]", 2: "text-[26px]", 3: "text-[19px]" }[l]
  return <div className={cx(size, "leading-tight tracking-[-0.01em]", pick(fi, "font-semibold text-zinc-600", "font-semibold text-zinc-800", "font-display font-semibold text-[#1F2330]"), className)}>{children}</div>
}

export function Txt({ children, lines = 1, className, size = 15, w }: { children: React.ReactNode; lines?: number; className?: string; size?: number; w?: number }) {
  const fi = useFi()
  if (fi === "lo") {
    const est = w ?? Math.min(String(children).length * size * 0.48, 900)
    return (
      <div className={cx("space-y-2 py-1", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-[10px] max-w-full rounded-sm bg-zinc-200" style={{ width: lines > 1 ? (i === lines - 1 ? "64%" : "100%") : est }} />
        ))}
      </div>
    )
  }
  return <p className={cx("leading-relaxed", soft(fi), className)} style={{ fontSize: size }}>{children}</p>
}

export function Cap({ children, className, up }: { children: React.ReactNode; className?: string; up?: boolean }) {
  const fi = useFi()
  return <span className={cx("text-[13px]", up && "font-semibold uppercase tracking-[0.08em] text-[12px]", up && fi === "hi" ? "text-[#4c25b0]" : soft(fi), className)}>{children}</span>
}

export function Big({ children, className }: { children: React.ReactNode; className?: string }) {
  const fi = useFi()
  return <div className={cx("text-[32px] font-semibold leading-none tracking-tight", fi === "hi" ? "font-display text-[#1F2330]" : ink(fi), className)}>{children}</div>
}

/* ============ BUTTON ============ */
type BtnV = "primary" | "secondary" | "outline" | "danger" | "disabled" | "gold" | "success"
export function Btn({ children, v = "primary", icon: I, className, lg, sm }: { children: React.ReactNode; v?: BtnV; icon?: LucideIcon; className?: string; lg?: boolean; sm?: boolean }) {
  const fi = useFi()
  const size = lg ? "h-[52px] px-6 text-[16px]" : sm ? "h-[36px] px-3.5 text-[13px]" : "h-[44px] px-5 text-[15px]"
  const lo: Record<BtnV, string> = {
    primary: "bg-zinc-600 text-white", secondary: "bg-zinc-200 text-zinc-700", outline: "border-2 border-zinc-400 text-zinc-600",
    danger: "border-2 border-zinc-600 text-zinc-700", disabled: "bg-zinc-100 text-zinc-300", gold: "bg-zinc-300 text-zinc-700", success: "bg-zinc-500 text-white",
  }
  const mid: Record<BtnV, string> = {
    primary: "rounded-[10px] bg-zinc-800 text-white", secondary: "rounded-[10px] bg-zinc-200 text-zinc-800", outline: "rounded-[10px] border border-zinc-400 bg-white text-zinc-800",
    danger: "rounded-[10px] border border-zinc-800 text-zinc-800", disabled: "rounded-[10px] bg-zinc-100 text-zinc-400", gold: "rounded-[10px] bg-zinc-300 text-zinc-800", success: "rounded-[10px] bg-zinc-700 text-white",
  }
  const hi: Record<BtnV, string> = {
    primary: "rounded-xl bg-[#381593] text-white shadow-sm shadow-[#381593]/25", secondary: "rounded-xl bg-[#EEE9FC] text-[#381593]",
    outline: "rounded-xl border border-[#D0D5DD] bg-white text-[#1F2330]", danger: "rounded-xl bg-[#C42B2B] text-white",
    disabled: "rounded-xl bg-[#EAECF0] text-[#98A2B3]", gold: "rounded-xl bg-[#D4A017] text-[#14162F]", success: "rounded-xl bg-[#0F8A4D] text-white",
  }
  return (
    <span className={cx("inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-medium", fi === "hi" && "font-display", size, pick(fi, lo, mid, hi)[v], className)}>
      {I && fi !== "lo" && <I size={lg ? 19 : 17} />}
      {children}
    </span>
  )
}

/* ============ STATUS BADGE (color + icon + text) ============ */
type Tone = "ok" | "warn" | "err" | "info" | "brand"
export const STATUS = {
  active: ["Active", "ok", CheckCircle2], inactive: ["Inactive", "err", XCircle], verified: ["Verified", "ok", CheckCircle2],
  compliant: ["Compliant", "ok", CheckCircle2], present: ["Present", "ok", CheckCircle2], completed: ["Completed", "ok", CheckCircle2],
  passed: ["Passed", "ok", CheckCircle2], pending: ["Pending", "warn", Clock], attention: ["Needs Attention", "warn", AlertTriangle],
  compliance: ["For Compliance", "warn", AlertTriangle], review: ["Review Required", "warn", AlertTriangle], staff: ["For Staff Review", "warn", Clock],
  missing: ["Missing", "err", FileX], absent: ["Absent", "err", XCircle], failed: ["Failed Upload", "err", XCircle],
  processing: ["Processing", "info", Loader2], submitted: ["Submitted", "info", Info], info: ["Information", "info", Info],
  ready: ["Ready for Staff Review", "info", ScanLine],
} as const satisfies Record<string, readonly [string, Tone, LucideIcon]>
export type StatusKey = keyof typeof STATUS
const toneHi: Record<Tone, string> = {
  ok: "bg-[#DCF5E7] text-[#0B7A43]", warn: "bg-[#FDEECD] text-[#93470A]", err: "bg-[#FBE0E0] text-[#B32222]",
  info: "bg-[#DCEBFC] text-[#1A56B0]", brand: "bg-[#EEE9FC] text-[#381593]",
}
export function Badge({ s, label, lg }: { s: StatusKey; label?: string; lg?: boolean }) {
  const fi = useFi()
  const [l, tone, I] = STATUS[s]
  return (
    <span className={cx("inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full font-semibold", lg ? "h-[36px] px-4 text-[15px]" : "h-[28px] px-3 text-[13px]",
      pick(fi, "border border-zinc-400 bg-white text-zinc-500", "border border-zinc-400 bg-white text-zinc-700", toneHi[tone]))}>
      {fi === "lo" ? <span className="h-3 w-3 rounded-full border border-zinc-400" /> : <I size={lg ? 17 : 15} aria-hidden />}
      {label ?? l}
    </span>
  )
}

/* ============ ICON TILE ============ */
const tileHi: Record<Tone, string> = { ...toneHi }
export function Ic({ i: I, tone = "brand", size = 44 }: { i: LucideIcon; tone?: Tone; size?: number }) {
  const fi = useFi()
  return (
    <span className={cx("grid shrink-0 place-items-center rounded-xl", pick(fi, "border border-zinc-400 bg-zinc-100", "bg-zinc-100 text-zinc-500", tileHi[tone]))} style={{ width: size, height: size }}>
      {fi !== "lo" && <I size={size * 0.46} />}
    </span>
  )
}

/* ============ CARD ============ */
export function Card({ children, className, pin, pad = true, style }: { children: React.ReactNode; className?: string; pin?: number; pad?: boolean; style?: React.CSSProperties }) {
  const fi = useFi()
  return (
    <div style={style} className={cx("relative", pad && "p-6", pick(fi, "border-2 border-zinc-300 bg-white", "rounded-[12px] border border-zinc-300 bg-white", "rounded-2xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]"), className)}>
      {pin && <Pin n={pin} />}
      {children}
    </div>
  )
}

export function Stat({ label, value, icon, tone = "brand", pin, sub }: { label: string; value: string; icon: LucideIcon; tone?: Tone; pin?: number; sub?: string }) {
  return (
    <Card pin={pin} className="flex flex-col gap-4 !p-5">
      <Ic i={icon} tone={tone} size={40} />
      <div><Big>{value}</Big><Cap className="mt-2 block font-medium">{label}</Cap>{sub && <Cap className="block text-[12px]">{sub}</Cap>}</div>
    </Card>
  )
}

/* ============ DATA ============ */
const barHi: Record<Tone, string> = { ok: "bg-[#16A35C]", warn: "bg-[#E8A317]", err: "bg-[#DC2B2B]", info: "bg-[#2B7BE4]", brand: "bg-[#381593]" }
export function Progress({ v, tone = "brand", h = 10 }: { v: number; tone?: Tone; h?: number }) {
  const fi = useFi()
  return (
    <div className={cx("w-full overflow-hidden rounded-full", pick(fi, "border border-zinc-400 bg-white", "bg-zinc-200", "bg-[#EEE9FC]"))} style={{ height: h }}>
      <div className={cx("h-full rounded-full", pick(fi, "bg-zinc-400", "bg-zinc-600", barHi[tone]))} style={{ width: `${v}%` }} />
    </div>
  )
}

export function Stacked({ parts, h = 14 }: { parts: { v: number; tone: Tone; l: string }[]; h?: number }) {
  const fi = useFi()
  const total = parts.reduce((a, p) => a + p.v, 0)
  const loShade = ["bg-zinc-500", "bg-zinc-300", "bg-zinc-200", "bg-zinc-100"]
  return (
    <div>
      <div className={cx("flex w-full gap-[3px] overflow-hidden rounded-full", fi === "lo" && "border border-zinc-400")} style={{ height: h }}>
        {parts.map((p, i) => <div key={p.l} className={fi === "hi" ? barHi[p.tone] : loShade[i]} style={{ width: `${(p.v / total) * 100}%` }} />)}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
        {parts.map((p, i) => (
          <span key={p.l} className={cx("flex items-center gap-2 text-[13px]", soft(fi))}>
            <span className={cx("h-2.5 w-2.5 rounded-full", fi === "hi" ? barHi[p.tone] : loShade[i])} />
            {p.l} <b className={cx("font-semibold", ink(fi))}>{p.v.toLocaleString()}</b>
          </span>
        ))}
      </div>
    </div>
  )
}

export function Bars({ data, h = 180, hl }: { data: { l: string; v: number }[]; h?: number; hl?: number }) {
  const fi = useFi()
  const max = Math.max(...data.map((d) => d.v))
  return (
    <div className="flex items-end gap-4" style={{ height: h }}>
      {data.map((d, i) => (
        <div key={d.l} className="flex flex-1 flex-col items-center gap-2">
          {fi !== "lo" && <span className={cx("text-[12px] font-semibold", ink(fi))}>{d.v}</span>}
          <div className={cx("w-full rounded-t-md", pick(fi, "border-2 border-zinc-300 bg-zinc-100", i === hl ? "bg-zinc-600" : "bg-zinc-300", i === hl ? "bg-[#D4A017]" : "bg-[#4c25b0]"))} style={{ height: (d.v / max) * (h - 44) }} />
          <span className={cx("text-[12px]", soft(fi))}>{d.l}</span>
        </div>
      ))}
    </div>
  )
}

export function Table({ cols, rows, tpl }: { cols: string[]; rows: React.ReactNode[][]; tpl: string }) {
  const fi = useFi()
  return (
    <div className="overflow-hidden">
      <div className={cx("grid items-center gap-4 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.06em]", pick(fi, "bg-zinc-100 text-zinc-500", "bg-zinc-100 text-zinc-600", "bg-[#F7F7FA] text-[#667085]"))} style={{ gridTemplateColumns: tpl }}>
        {cols.map((c) => <span key={c}>{c}</span>)}
      </div>
      {rows.map((r, i) => (
        <div key={i} className={cx("grid min-h-[64px] items-center gap-4 border-t px-6 text-[14px]", line(fi), ink(fi))} style={{ gridTemplateColumns: tpl }}>
          {r.map((c, j) => <div key={j} className="min-w-0">{c}</div>)}
        </div>
      ))}
    </div>
  )
}

export function Person({ n, sub }: { n: string; sub?: string }) {
  const fi = useFi()
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Av n={n} />
      <div className="min-w-0">
        {fi === "lo" ? <Txt w={n.length * 8}>{n}</Txt> : <p className={cx("truncate font-medium", ink(fi))}>{n}</p>}
        {sub && <Cap className="block truncate text-[12px]">{sub}</Cap>}
      </div>
    </div>
  )
}

export function Av({ n, size = 38, gold }: { n: string; size?: number; gold?: boolean }) {
  const fi = useFi()
  return (
    <span className={cx("grid shrink-0 place-items-center rounded-full text-[13px] font-bold", pick(fi, "border border-zinc-400 bg-zinc-100", "bg-zinc-200 text-zinc-600", gold ? "bg-[#D4A017] text-[#14162F]" : "bg-[#EEE9FC] text-[#381593]"))} style={{ width: size, height: size }}>
      {fi !== "lo" && n.split(" ").map((p) => p[0]).slice(0, 2).join("")}
    </span>
  )
}

export function Timeline({ steps, current, vertical }: { steps: { t: string; d?: string }[]; current: number; vertical?: boolean }) {
  const fi = useFi()
  const dot = (i: number) => {
    const state = i < current ? "done" : i === current ? "now" : "todo"
    const cls = pick(fi,
      { done: "bg-zinc-500 border-zinc-500", now: "bg-white border-zinc-600 border-[3px]", todo: "bg-white border-zinc-300" },
      { done: "bg-zinc-700 border-zinc-700 text-white", now: "bg-white border-zinc-800 border-[3px]", todo: "bg-white border-zinc-300" },
      { done: "bg-[#16A35C] border-[#16A35C] text-white", now: "bg-white border-[#381593] border-[3px] ring-4 ring-[#EEE9FC]", todo: "bg-white border-[#D0D5DD]" })[state]
    return <span className={cx("relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full border-2", cls)}>{state === "done" && fi !== "lo" && <Check size={15} strokeWidth={3} />}</span>
  }
  const bar = (i: number) => cx(i < current ? pick(fi, "bg-zinc-500", "bg-zinc-700", "bg-[#16A35C]") : pick(fi, "bg-zinc-200", "bg-zinc-200", "bg-[#E4E7EC]"))
  if (vertical)
    return (
      <ol>
        {steps.map((s, i) => (
          <li key={s.t} className="relative flex gap-4 pb-7 last:pb-0">
            {i < steps.length - 1 && <span className={cx("absolute left-[13px] top-7 h-full w-[2px]", bar(i))} />}
            {dot(i)}
            <div className="pt-0.5">
              <p className={cx("text-[15px] font-semibold", i > current ? soft(fi) : ink(fi))}>{s.t}</p>
              {s.d && <Cap>{s.d}</Cap>}
              {i === current && fi === "hi" && <span className="ml-2 rounded-full bg-[#EEE9FC] px-2 py-0.5 text-[11px] font-semibold text-[#381593]">Current</span>}
            </div>
          </li>
        ))}
      </ol>
    )
  return (
    <ol className="flex">
      {steps.map((s, i) => (
        <li key={s.t} className="relative flex flex-1 flex-col items-center text-center">
          {i < steps.length - 1 && <span className={cx("absolute left-1/2 top-[13px] h-[2px] w-full", bar(i))} />}
          {dot(i)}
          <p className={cx("mt-2.5 px-1 text-[13px] font-medium leading-tight", i > current ? soft(fi) : ink(fi))}>{s.t}</p>
          {s.d && <Cap className="text-[12px]">{s.d}</Cap>}
        </li>
      ))}
    </ol>
  )
}

/* ============ FORMS ============ */
export function Field({ label, value, kind = "text", req, className }: { label?: string; value?: string; kind?: "text" | "select" | "date" | "search" | "upload" | "password"; req?: boolean; className?: string }) {
  const fi = useFi()
  const box = pick(fi, "border-2 border-zinc-300 bg-white", "rounded-[10px] border border-zinc-400 bg-white", "rounded-xl border border-[#D0D5DD] bg-white")
  if (kind === "upload")
    return (
      <div className={cx("flex flex-col items-center justify-center gap-2 border-2 border-dashed py-6 text-center", fi === "hi" ? "rounded-xl border-[#B8A2F2] bg-[#F6F3FE]" : fi === "mid" ? "rounded-[10px] border-zinc-400" : "border-zinc-300", className)}>
        <Ic i={Upload} tone="brand" size={40} />
        <span className={cx("text-[14px] font-medium", ink(fi))}>Drag & drop or <u>browse</u></span>
        <Cap className="text-[12px]">PDF, JPG or PNG · max 5 MB</Cap>
      </div>
    )
  const I = { select: ChevronDown, date: CalendarDays, search: Search, text: null, password: null, upload: null }[kind]
  return (
    <label className={cx("block", className)}>
      {label && <span className={cx("mb-2 block text-[14px] font-medium", ink(fi))}>{label}{req && <span className={fi === "hi" ? "text-[#C42B2B]" : ""}> *</span>}</span>}
      <span className={cx("flex h-[48px] items-center gap-3 px-4 text-[15px]", box)}>
        {kind === "search" && fi !== "lo" && <Search size={18} className={soft(fi)} />}
        {fi === "lo" ? <span className="h-[8px] w-1/3 rounded-sm bg-zinc-200" /> : <span className={cx("flex-1 truncate", value && kind !== "search" ? ink(fi) : soft(fi))}>{kind === "password" && value ? "••••••••" : value}</span>}
        {I && kind !== "search" && fi !== "lo" && <I size={18} className={cx("ml-auto", soft(fi))} />}
      </span>
    </label>
  )
}

export function Checkbox({ label, on }: { label: string; on?: boolean }) {
  const fi = useFi()
  return (
    <span className={cx("flex items-center gap-3 text-[14px]", ink(fi))}>
      <span className={cx("grid h-5 w-5 place-items-center rounded-[5px] border-2", on ? pick(fi, "border-zinc-500 bg-zinc-400", "border-zinc-800 bg-zinc-800 text-white", "border-[#381593] bg-[#381593] text-white") : pick(fi, "border-zinc-400", "border-zinc-400", "border-[#D0D5DD]"))}>
        {on && fi !== "lo" && <Check size={13} strokeWidth={3} />}
      </span>
      {label}
    </span>
  )
}

/* Image placeholder → real content in hi */
export function Img({ h, label, children, className }: { h: number | string; label: string; children?: React.ReactNode; className?: string }) {
  const fi = useFi()
  if (fi === "hi" && children) return <div className={cx("overflow-hidden", className)} style={{ height: h }}>{children}</div>
  return (
    <div className={cx("relative grid place-items-center overflow-hidden border-2", fi === "mid" ? "rounded-[12px] border-zinc-300 bg-zinc-50" : "border-zinc-300 bg-zinc-100", className)} style={{ height: h }}>
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden><line x1="0" y1="0" x2="100%" y2="100%" stroke="#d4d4d8" strokeWidth="2" /><line x1="100%" y1="0" x2="0" y2="100%" stroke="#d4d4d8" strokeWidth="2" /></svg>
      <span className="relative bg-white px-3 py-1 font-mono text-[13px] text-zinc-500">{label}</span>
    </div>
  )
}

/* ============ BRAND MARK ============ */
export function Mark({ light }: { light?: boolean }) {
  const fi = useFi()
  if (fi === "hi") return <Logo light={light} />
  return (
    <span className="flex items-center gap-2.5">
      <span className={cx("h-9 w-9", fi === "lo" ? "border-2 border-zinc-400 bg-zinc-100" : "rounded-lg bg-zinc-700")} />
      <span className={cx("text-[20px] font-bold", fi === "lo" ? "text-zinc-500" : "text-zinc-800")}>{fi === "lo" ? "LOGO" : "MyIsko"}</span>
    </span>
  )
}

/* ============ NAVIGATION / SHELLS ============ */
export type Role = "applicant" | "esso" | "ncsg"
type NavItem = { l: string; i: LucideIcon }
export const NAV: Record<Role, { title: string; items: NavItem[] }> = {
  applicant: { title: "Applicant Portal", items: [
    { l: "Dashboard", i: LayoutDashboard }, { l: "My Application", i: FileText }, { l: "Documents", i: FolderOpen },
    { l: "AI Pre-Verification", i: ScanLine }, { l: "Status", i: Activity }, { l: "Notifications", i: Bell }, { l: "Profile", i: User },
  ] },
  esso: { title: "ESSO Management", items: [
    { l: "Dashboard", i: LayoutDashboard }, { l: "Applications", i: FolderOpen }, { l: "Document Review", i: FileCheck2 },
    { l: "Reports", i: BarChart3 }, { l: "Audit Trail", i: History },
  ] },
  ncsg: { title: "NCSG Scholar Monitoring", items: [
    { l: "Dashboard", i: LayoutDashboard }, { l: "Scholars", i: Users }, { l: "Renewal Compliance", i: ClipboardCheck },
    { l: "Events", i: CalendarDays }, { l: "Attendance", i: UserCheck }, { l: "Reports", i: BarChart3 },
    { l: "Notifications", i: Bell }, { l: "Audit Trail", i: History }, { l: "Account", i: User },
  ] },
}
const USER: Record<Role, [string, string]> = { applicant: ["Maria Santos", "Applicant"], esso: ["Ana Bernal", "ESSO · Validator"], ncsg: ["ncsg.officer", "NCSG Officer"] }

export function Desktop({ role, active, children, search }: { role: Role; active: string; children: React.ReactNode; search?: string }) {
  const fi = useFi()
  const nav = NAV[role]
  return (
    <div className="relative flex h-full">
      <aside className={cx("relative flex w-[256px] shrink-0 flex-col", pick(fi, "border-r-2 border-zinc-300 bg-zinc-50", "border-r border-zinc-300 bg-zinc-100", "bg-[#20234E]"))}>
        <div className={cx("flex h-[72px] items-center border-b px-6", pick(fi, "border-zinc-300", "border-zinc-300", "border-white/10"))}><Mark light /></div>
        {role === "ncsg" && fi === "hi" ? (
          <div className="mx-4 mt-5 rounded-xl border border-[#D4A017]/30 bg-[#D4A017]/10 px-3 py-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#EAB63A]">Naga City Scholarship Guild</p>
            <p className="font-display text-[14px] font-semibold text-white">Scholar Monitoring</p>
          </div>
        ) : (
          <p className={cx("px-7 pb-2 pt-6 text-[11px] font-semibold uppercase tracking-[0.1em]", pick(fi, "text-zinc-400", "text-zinc-500", "text-[#B8A2F2]"))}>{nav.title}</p>
        )}
        <nav className="mt-3 space-y-1 px-3">
          {nav.items.map((n) => {
            const on = n.l === active
            return (
              <div key={n.l} className={cx("flex h-[44px] items-center gap-3 px-4 text-[15px] font-medium", fi !== "lo" && "rounded-xl",
                on ? pick(fi, "bg-zinc-300 text-zinc-700", "bg-zinc-800 text-white", "bg-[#381593] text-white") : pick(fi, "text-zinc-500", "text-zinc-600", "text-[#DDD3FA]"))}>
                {fi === "lo" ? <span className="h-4 w-4 border border-zinc-400" /> : <n.i size={19} />}
                {n.l}
                {on && fi === "hi" && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#EAB63A]" />}
              </div>
            )
          })}
        </nav>
        <div className={cx("mt-auto flex h-[64px] items-center gap-3 border-t px-7 text-[15px]", pick(fi, "border-zinc-300 text-zinc-500", "border-zinc-300 text-zinc-600", "border-white/10 text-[#DDD3FA]"))}>
          {fi === "lo" ? <span className="h-4 w-4 border border-zinc-400" /> : <LogOut size={19} />}Sign out
        </div>
        <Dim className="bottom-20 left-1/2 -translate-x-1/2">W 256</Dim>
      </aside>
      <div className="relative flex min-w-0 flex-1 flex-col">
        <header className={cx("relative z-10 flex h-[72px] shrink-0 items-center gap-4 border-b px-8", line(fi), fi === "hi" ? "bg-white" : "bg-white")}>
          <Field kind="search" value={search ?? "Search…"} className="w-[420px]" />
          <div className="ml-auto flex items-center gap-4">
            <span className={cx("relative grid h-10 w-10 place-items-center rounded-xl", pick(fi, "border border-zinc-400", "border border-zinc-300 text-zinc-600", "text-[#667085]"))}>
              {fi !== "lo" && <Bell size={20} />}{fi === "hi" && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#DC2B2B]" />}
            </span>
            <span className={cx("flex items-center gap-3 rounded-full border py-1 pl-1 pr-4", line(fi))}>
              <Av n={USER[role][0]} size={34} gold={role !== "applicant"} />
              <span className="leading-tight"><b className={cx("block text-[13px] font-semibold", ink(fi))}>{USER[role][0]}</b><span className={cx("text-[11px]", soft(fi))}>{USER[role][1]}</span></span>
            </span>
          </div>
          <Dim className="right-2 top-1/2 -translate-y-1/2 translate-x-full">H 72</Dim>
        </header>
        <main className="relative flex-1 overflow-hidden">
          <GridOverlay />
          <div className="relative z-[1] mx-auto max-w-[1184px] p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

const MNAV: Record<"applicant" | "ncsg", NavItem[]> = {
  applicant: [{ l: "Home", i: Home }, { l: "Application", i: FileText }, { l: "Documents", i: FolderOpen }, { l: "Status", i: Activity }, { l: "More", i: MoreHorizontal }],
  ncsg: [{ l: "Home", i: Home }, { l: "Scholars", i: Users }, { l: "Events", i: CalendarDays }, { l: "Attendance", i: UserCheck }, { l: "More", i: MoreHorizontal }],
}
export function Mobile({ role, active, title, children }: { role: "applicant" | "ncsg"; active: string; title?: string; children: React.ReactNode }) {
  const fi = useFi()
  return (
    <div className="relative flex h-full flex-col">
      <div className={cx("flex h-[44px] shrink-0 items-center justify-between px-7 text-[14px] font-semibold", fi === "hi" ? "bg-white text-[#1F2330]" : "text-zinc-500")}><span>9:41</span><span className="tracking-widest">•••</span></div>
      <header className={cx("relative flex h-[56px] shrink-0 items-center justify-between border-b bg-white px-4", line(fi))}>
        {title ? <span className={cx("text-[18px] font-semibold", fi === "hi" ? "font-display text-[#1F2330]" : ink(fi))}>{title}</span> : <Mark />}
        <span className={cx("grid h-10 w-10 place-items-center rounded-xl", fi === "lo" ? "border border-zinc-400" : soft(fi))}>{fi !== "lo" && <Bell size={21} />}</span>
        <Dim className="right-14 top-1/2 -translate-y-1/2">H 56</Dim>
      </header>
      <div className="relative flex-1 overflow-hidden">
        <GridOverlay cols={4} pad={16} gap={12} />
        <div className="relative z-[1] space-y-4 p-4">{children}</div>
      </div>
      <nav className={cx("relative flex h-[76px] shrink-0 border-t bg-white pb-3", line(fi))}>
        {MNAV[role].map((n) => {
          const on = n.l === active
          return (
            <span key={n.l} className={cx("relative flex flex-1 flex-col items-center justify-center gap-1 text-[11px] font-medium", on ? pick(fi, "text-zinc-700", "text-zinc-900", "text-[#381593]") : soft(fi))}>
              {on && <span className={cx("absolute top-0 h-[3px] w-9 rounded-full", fi === "hi" ? "bg-[#381593]" : "bg-zinc-600")} />}
              {fi === "lo" ? <span className={cx("h-5 w-5 border", on ? "border-zinc-600 bg-zinc-300" : "border-zinc-400")} /> : <n.i size={22} />}
              {n.l}
            </span>
          )
        })}
        <Dim className="-top-3 left-1/2 -translate-x-1/2">H 76 · 5 tabs</Dim>
      </nav>
    </div>
  )
}
