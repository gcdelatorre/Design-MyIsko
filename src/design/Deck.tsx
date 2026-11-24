import { useState } from "react"
import {
  ArrowRight, ArrowDown, CheckCircle2, XCircle, Accessibility, Eye, Keyboard, Type, MousePointerClick, Smartphone, Contrast,
  LayoutDashboard, Search, Upload, ScanLine, Bell,
} from "lucide-react"
import {
  Frame, FiProvider, Btn, Badge, STATUS, Card, Stat, Field, Checkbox, Progress, Stacked, Timeline, Person, cx, type Fi, type StatusKey,
} from "./kit"
import { SCREENS, MOBILE, byCode, type ScreenDef } from "./screens"
import { FolderOpen, Users } from "lucide-react"

const PAGES = [
  "Design System", "User Flow", "Low-Fi Wireframes", "Structured Wireframes", "Hi-Fi · Applicant", "Hi-Fi · ESSO", "Hi-Fi · NCSG", "Responsive / Mobile", "Prototype Flow", "Showcase",
]

function Show({ s, fi, compact }: { s: ScreenDef; fi: Fi; compact?: boolean }) {
  return (
    <FiProvider value={fi}>
      <Frame code={fi === "hi" ? s.code.replace("LF", "HF") : fi === "mid" ? s.code.replace("LF", "WF") : s.code} title={s.title} device={s.device} fi={fi} notes={s.notes} compact={compact}>
        <s.C />
      </Frame>
    </FiProvider>
  )
}

function Section({ k, title, sub, children }: { k: string; title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <div className="mb-6 flex items-baseline gap-4 border-b border-line pb-4">
        <span className="font-mono text-[13px] text-brand-700">{k}</span>
        <h2 className="font-display text-[26px] font-semibold text-ink">{title}</h2>
        {sub && <p className="text-[14px] text-ink-soft">{sub}</p>}
      </div>
      {children}
    </section>
  )
}

/* 01 */
function DesignSystem() {
  const sw: [string, string, string][] = [["Deep Indigo", "#20234E", "Primary surfaces, sidebar"], ["Royal Purple", "#381593", "Primary actions, links"], ["Civic Gold", "#D4A017", "Highlights, NCSG accent"], ["Background", "#F7F7FA", "Canvas"], ["Text", "#1F2330", "Headings, body"], ["Muted", "#667085", "Captions"], ["Border", "#E4E7EC", "1px hairlines"], ["Success", "#0F8A4D", "Verified, present"], ["Warning", "#B7791F", "Pending, attention"], ["Danger", "#C42B2B", "Missing, absent"], ["Info", "#2563EB", "Processing, AI"]]
  return (
    <FiProvider value="hi">
      <Section k="1.1" title="Color" sub="Every status pairs color + icon + text.">
        <div className="grid grid-cols-6 gap-4">{sw.map(([n, h, u]) => (
          <div key={h} className="overflow-hidden rounded-xl border border-line bg-white"><div className="h-20" style={{ background: h }} /><div className="p-3"><p className="text-[14px] font-semibold text-ink">{n}</p><p className="font-mono text-[12px] text-ink-soft">{h}</p><p className="mt-1 text-[12px] text-ink-soft">{u}</p></div></div>))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">{(Object.keys(STATUS) as StatusKey[]).map((k) => <Badge key={k} s={k} />)}</div>
      </Section>
      <Section k="1.2" title="Typography" sub="Poppins for display, Inter for UI text.">
        <div className="space-y-4 rounded-2xl border border-line bg-white p-8">
          {[["H1 · 36/44 · 700", "text-[36px] font-bold font-display", "Open Opportunities for Future Scholars"], ["H2 · 26/34 · 600", "text-[26px] font-semibold font-display", "Document Requirements"], ["H3 · 20/28 · 600", "text-[20px] font-semibold font-display", "Renewal Compliance"], ["Body · 15/24 · 400", "text-[15px]", "Upload each requirement. AI pre-checks readability before staff review."], ["Caption · 12/16 · 500", "text-[12px] font-medium text-ink-soft", "Last updated Sep 28, 2026"]].map(([l, c, t]) => (
            <div key={l} className="grid grid-cols-[200px_1fr] items-baseline gap-6 border-b border-line pb-4 last:border-0"><span className="font-mono text-[12px] text-ink-soft">{l}</span><span className={cx("text-ink", c)}>{t}</span></div>))}
        </div>
      </Section>
      <Section k="1.3" title="Spacing & Radius" sub="4-point base; cards 1px border, 12–16 radius.">
        <div className="flex items-end gap-6 rounded-2xl border border-line bg-white p-8">
          {[4, 8, 12, 16, 24, 32, 48].map((s) => <div key={s} className="text-center"><div className="bg-brand-200" style={{ width: s, height: s }} /><p className="mt-2 font-mono text-[12px] text-ink-soft">{s}</p></div>)}
          <div className="ml-auto flex gap-4">{[8, 12, 16].map((r) => <div key={r} className="grid h-20 w-20 place-items-center border border-line bg-canvas font-mono text-[12px] text-ink-soft" style={{ borderRadius: r }}>r{r}</div>)}</div>
        </div>
      </Section>
      <Section k="1.4" title="Components">
        <div className="grid grid-cols-2 gap-6">
          <Card><p className="mb-4 font-mono text-[12px] text-ink-soft">BUTTONS</p><div className="flex flex-wrap gap-3"><Btn>Primary</Btn><Btn v="secondary">Secondary</Btn><Btn v="outline">Outline</Btn><Btn v="gold">Gold</Btn><Btn v="success">Success</Btn><Btn v="danger">Danger</Btn><Btn v="disabled">Disabled</Btn></div></Card>
          <Card><p className="mb-4 font-mono text-[12px] text-ink-soft">FORMS</p><div className="grid grid-cols-2 gap-4"><Field label="Full name" value="Maria L. Santos" req /><Field label="School" value="Ateneo de Naga" kind="select" /><Field kind="search" value="Search scholar" /><Field label="Upload" value="Drop file" kind="upload" /></div><div className="mt-4"><Checkbox on label="I certify the information is correct." /></div></Card>
          <div className="grid grid-cols-2 gap-4"><Stat label="Active Scholars" value="842" icon={CheckCircle2} tone="ok" /><Stat label="Applications" value="1,248" icon={FolderOpen} /></div>
          <Card><p className="mb-4 font-mono text-[12px] text-ink-soft">DATA</p><Progress v={83} tone="ok" /><div className="mt-5"><Stacked parts={[{ v: 218, tone: "ok", l: "Present" }, { v: 21, tone: "err", l: "Absent" }, { v: 11, tone: "warn", l: "Pending" }]} /></div><div className="mt-5"><Person n="Juan Dela Cruz" sub="Bicol University" /></div></Card>
          <Card className="col-span-2"><p className="mb-6 font-mono text-[12px] text-ink-soft">TIMELINE</p><Timeline current={3} steps={[{ t: "Started" }, { t: "Submitted" }, { t: "AI Pre-check" }, { t: "Staff Review" }, { t: "Exam" }, { t: "Evaluation" }, { t: "Final" }]} /></Card>
        </div>
      </Section>
    </FiProvider>
  )
}

/* 02 */
const FLOWS: [string, string, string[]][] = [
  ["Applicant", "bg-brand-700", ["Landing", "Register / Login", "Dashboard", "Application Form", "Upload Documents", "AI Pre-Verification", "Submit", "Track Status", "Notifications"]],
  ["ESSO Staff", "bg-brand-950", ["Login", "Dashboard", "View Applications", "Review Application", "Review Documents", "Validate / Request Compliance", "Audit Trail", "Reports"]],
  ["NCSG Officer", "bg-gold-600", ["Login", "Dashboard", "Scholar Monitoring", "Scholar Profile", "Renewal Compliance", "Events", "Attendance", "Summary", "Reports"]],
]
function UserFlow() {
  const perms: [string, boolean, boolean, boolean][] = [["Submit application & documents", true, false, false], ["View AI pre-verification", true, true, false], ["Validate / request compliance", false, true, false], ["Monitor scholar status", false, true, true], ["Update Active / Inactive (audited)", false, false, true], ["Create events & mark attendance", false, false, true], ["View audit trail", false, true, true], ["Ranking / approval", false, true, false]]
  return (
    <>
      <Section k="2.1" title="User Flow Map" sub="Three role lanes; arrows show the primary path.">
        <div className="space-y-5">{FLOWS.map(([r, c, steps]) => (
          <div key={r} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5">
            <div className={cx("grid h-20 w-36 shrink-0 place-items-center rounded-xl font-display text-[15px] font-semibold text-white", c)}>{r}</div>
            <div className="flex flex-wrap items-center gap-2">{steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2"><span className="rounded-lg border border-line bg-canvas px-3 py-2 text-[13px] font-medium text-ink">{s}</span>{i < steps.length - 1 && <ArrowRight size={16} className="text-brand-500" />}</div>))}
            </div>
          </div>))}
        </div>
      </Section>
      <Section k="2.2" title="Role-Based Access" sub="NCSG never sees AI, applications, ranking or approval.">
        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] bg-canvas px-6 py-3 text-[12px] font-semibold uppercase tracking-wider text-ink-soft"><span>Capability</span><span>Applicant</span><span>ESSO</span><span>NCSG</span></div>
          {perms.map(([p, ...v]) => <div key={p} className="grid grid-cols-[2fr_1fr_1fr_1fr] border-t border-line px-6 py-3 text-[14px] text-ink"><span>{p}</span>{v.map((x, i) => <span key={i} className={cx("flex items-center gap-1.5", x ? "text-success-600" : "text-ink-soft")}>{x ? <CheckCircle2 size={16} /> : <XCircle size={16} />}{x ? "Yes" : "No"}</span>)}</div>)}
        </div>
      </Section>
    </>
  )
}

function Grid({ fi, list, cols = 2 }: { fi: Fi; list: ScreenDef[]; cols?: number }) {
  return <div className={cx("grid gap-10", cols === 2 ? "grid-cols-2" : cols === 5 ? "grid-cols-5" : "grid-cols-1")}>{list.map((s) => <Show key={s.code} s={s} fi={fi} />)}</div>
}

function Mobiles() {
  return (
    <>
      <Section k="8.1" title="High-Fidelity Mobile" sub="390 × 844 · bottom nav · 44px touch targets"><Grid fi="hi" list={MOBILE} cols={5} /></Section>
      <Section k="8.2" title="Low-Fidelity Mobile"><Grid fi="lo" list={MOBILE} cols={5} /></Section>
    </>
  )
}

/* 09 */
const CHAINS: [string, [string, string][]][] = [
  ["Applicant", [["LF-01", "Apply for Scholarship"], ["LF-02", "Upload now"], ["LF-04", "Run AI Pre-Verification"], ["LF-05", "Submit for ESSO Validation"], ["LF-06", ""]]],
  ["ESSO", [["LF-07", "Review"], ["LF-08", "Open document"], ["LF-09", "Mark Verified"], ["LF-10", ""]]],
  ["NCSG", [["LF-12", "Login"], ["LF-13", "Scholars"], ["LF-15", "Events → Open attendance"], ["LF-17", "Mark Present"], ["LF-18", ""]]],
]
function Prototype() {
  return <>{CHAINS.map(([r, steps], k) => (
    <Section key={r} k={`9.${k + 1}`} title={`${r} prototype path`}>
      <div className="flex items-start gap-3">{steps.map(([c, hot], i) => (
        <div key={c} className="flex flex-1 items-start gap-3">
          <div className="flex-1"><Show s={byCode(c)} fi="hi" compact />{hot && <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-gold-100 px-3 py-1 text-[12px] font-semibold text-gold-600"><MousePointerClick size={13} />{hot}</p>}</div>
          {i < steps.length - 1 && <ArrowRight className="mt-24 shrink-0 text-brand-600" size={22} />}
        </div>))}
      </div>
    </Section>))}</>
}

/* 10 */
const SHOW = ["LF-01", "LF-02", "LF-04", "LF-05", "LF-08", "LF-14", "LF-17", "LF-10"]
function Showcase() {
  const a11y: [React.ElementType, string, string][] = [[Contrast, "Contrast", "Body text ≥ 4.5:1; Indigo on white 14.6:1."], [Eye, "Not color alone", "Status = color + icon + label."], [Type, "Readable type", "Body 14–16px, 1.5 line height."], [MousePointerClick, "Touch targets", "Attendance buttons 44px+."], [Keyboard, "Keyboard", "Visible focus rings on all controls."], [Smartphone, "Responsive", "Bottom nav on mobile; 4-col grid."]]
  return (
    <>
      <Section k="10.1" title="Lo-Fi → Structured → Hi-Fi" sub="Same layout, increasing fidelity.">
        {["LF-05", "LF-13"].map((c) => <div key={c} className="mb-10 grid grid-cols-3 gap-6">{(["lo", "mid", "hi"] as Fi[]).map((f) => <Show key={f} s={byCode(c)} fi={f} compact />)}</div>)}
      </Section>
      <Section k="10.2" title="Priority Screens"><Grid fi="hi" list={SHOW.map(byCode)} /></Section>
      <Section k="10.3" title="Accessibility">
        <div className="grid grid-cols-3 gap-5">{a11y.map(([I, t, d]) => <div key={t} className="flex gap-4 rounded-2xl border border-line bg-white p-5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700"><I size={20} /></span><div><p className="font-display font-semibold text-ink">{t}</p><p className="text-[14px] text-ink-soft">{d}</p></div></div>)}</div>
      </Section>
    </>
  )
}

function SpecSheet() {
  return (
    <div className="mb-10 grid grid-cols-4 gap-4">{[["Desktop", "1440 × 1024 · 12-col · 256 sidebar · 32 gutter"], ["Mobile", "390 × 844 · 4-col · 16 margin · 76 bottom nav"], ["Header", "72px desktop · 56px mobile"], ["Annotations", "Red pins ↔ numbered notes below each frame"]].map(([k, v]) => (
      <div key={k} className="rounded-xl border border-dashed border-zinc-400 bg-white p-4"><p className="font-mono text-[12px] text-red-600">{k}</p><p className="mt-1 text-[14px] text-zinc-700">{v}</p></div>))}</div>
  )
}

export function Deck() {
  const [p, setP] = useState(0)
  const by = (r: string) => SCREENS.filter((s) => s.role === r)
  const body = [
    <DesignSystem />, <UserFlow />,
    <Grid fi="lo" list={SCREENS} />, <><SpecSheet /><Grid fi="mid" list={SCREENS} /></>,
    <Grid fi="hi" list={by("applicant")} />, <Grid fi="hi" list={by("esso")} />, <Grid fi="hi" list={by("ncsg")} />,
    <Mobiles />, <Prototype />, <Showcase />,
  ][p]
  return (
    <div className="min-h-screen bg-canvas font-sans text-ink">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-brand-950 text-white">
        <div className="flex items-center gap-6 px-10 py-5">
          <div><p className="font-mono text-[11px] tracking-[0.2em] text-gold-400">MYISKO · UI/UX DESIGN DECK</p><p className="font-display text-[22px] font-semibold">Low-Fi → Structured Wireframe → High-Fi</p></div>
          <a href="/" className="ml-auto inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-[13px] font-medium hover:bg-white/10">Open live prototype <ArrowRight size={14} /></a>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-8 pb-3">{PAGES.map((n, i) => (
          <button key={n} onClick={() => { setP(i); scrollTo(0, 0) }} className={cx("shrink-0 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors", p === i ? "bg-white text-brand-950" : "text-white/70 hover:bg-white/10 hover:text-white")}>
            <span className="mr-1.5 font-mono text-[11px] opacity-60">{String(i + 1).padStart(2, "0")}</span>{n}
          </button>))}
        </nav>
      </header>
      <main className="mx-auto max-w-[1680px] px-10 py-12">
        <h1 className="mb-10 font-display text-[40px] font-bold tracking-tight text-ink"><span className="mr-3 font-mono text-[18px] text-brand-600">{String(p + 1).padStart(2, "0")}</span>{PAGES[p]}</h1>
        {body}
      </main>
    </div>
  )
}

void ArrowDown; void Accessibility; void LayoutDashboard; void Search; void Upload; void ScanLine; void Bell; void Users
