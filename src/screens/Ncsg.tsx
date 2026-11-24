import { useMemo, useState } from "react"
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  CalendarDays,
  UserCheck,
  BarChart3,
  Bell,
  History,
  User,
  LogOut,
  Menu,
  X,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  ArrowLeft,
  Flag,
  MapPin,
  Plus,
  ChevronRight,
  ShieldCheck,
  Download,
  Home,
  MoreHorizontal,
  RefreshCw,
} from "lucide-react"
import { Button, Card, Logo, Modal, SectionHeader, cx } from "../components/ui"

/* ================= TYPES & DEMO DATA ================= */
type ScholarStatus = "active" | "inactive"
type Compliance = "compliant" | "pending" | "attention" | "inactive"
type Attend = "present" | "absent" | "pending"
type View =
  | "dashboard"
  | "scholars"
  | "profile"
  | "compliance"
  | "events"
  | "event"
  | "attendance"
  | "reports"
  | "notifications"
  | "audit"
  | "account"

interface Scholar {
  id: string
  name: string
  school: string
  course: string
  year: string
  status: ScholarStatus
  compliance: Compliance
  updated: string
  flagged?: boolean
  checklist: { label: string; ok: boolean }[]
}

interface NcsgEvent {
  id: string
  name: string
  date: string
  time: string
  location: string
  desc: string
  expected: number
  /** demo offsets representing scholars beyond the listed roster */
  base: Record<Attend, number>
  roster: Record<string, Attend>
}

interface AuditEntry {
  when: string
  user: string
  action: string
  target: string
  prev?: string
  next?: string
  reason?: string
}

const req = (a: boolean, b: boolean, c: boolean) => [
  { label: "Renewal requirement submitted", ok: a },
  { label: "Academic requirement recorded", ok: b },
  { label: "Community / NCSG participation recorded", ok: c },
]

const initialScholars: Scholar[] = [
  { id: "S-0142", name: "Maria Santos", school: "Ateneo de Naga University", course: "BS Computer Science", year: "3rd Year", status: "active", compliance: "compliant", updated: "Oct 1, 2026", checklist: req(true, true, true) },
  { id: "S-0158", name: "Juan Dela Cruz", school: "Bicol University", course: "BS Civil Engineering", year: "2nd Year", status: "active", compliance: "attention", updated: "Sep 29, 2026", checklist: req(true, false, true) },
  { id: "S-0163", name: "Andrea Reyes", school: "Universidad de Sta. Isabel", course: "BS Nursing", year: "4th Year", status: "active", compliance: "pending", updated: "Sep 28, 2026", checklist: req(false, true, true) },
  { id: "S-0177", name: "Paolo Villanueva", school: "Naga College Foundation", course: "BS Accountancy", year: "1st Year", status: "active", compliance: "compliant", updated: "Sep 27, 2026", checklist: req(true, true, true) },
  { id: "S-0181", name: "Kristine Bautista", school: "Camarines Sur Polytechnic Colleges", course: "BS Information Technology", year: "3rd Year", status: "inactive", compliance: "inactive", updated: "Sep 20, 2026", checklist: req(false, false, false) },
  { id: "S-0194", name: "Miguel Ramos", school: "Ateneo de Naga University", course: "AB Political Science", year: "2nd Year", status: "active", compliance: "attention", updated: "Sep 26, 2026", checklist: req(true, true, false) },
  { id: "S-0203", name: "Leah Fernandez", school: "Bicol University", course: "BSEd English", year: "4th Year", status: "active", compliance: "compliant", updated: "Sep 25, 2026", checklist: req(true, true, true) },
  { id: "S-0215", name: "Carlo Mendoza", school: "Universidad de Sta. Isabel", course: "BS Psychology", year: "1st Year", status: "active", compliance: "pending", updated: "Sep 24, 2026", checklist: req(false, false, true) },
  { id: "S-0228", name: "Janelle Cruz", school: "Naga College Foundation", course: "BS Criminology", year: "3rd Year", status: "inactive", compliance: "inactive", updated: "Sep 18, 2026", checklist: req(false, true, false) },
  { id: "S-0236", name: "Rafael Aquino", school: "Camarines Sur Polytechnic Colleges", course: "BS Electrical Engineering", year: "2nd Year", status: "active", compliance: "compliant", updated: "Sep 23, 2026", checklist: req(true, true, true) },
  { id: "S-0241", name: "Bea Navarro", school: "Ateneo de Naga University", course: "BS Biology", year: "4th Year", status: "active", compliance: "compliant", updated: "Sep 22, 2026", checklist: req(true, true, true) },
  { id: "S-0257", name: "Enzo Castillo", school: "Bicol University", course: "BS Architecture", year: "1st Year", status: "active", compliance: "pending", updated: "Sep 21, 2026", checklist: req(true, false, true) },
]

const initialEvents: NcsgEvent[] = [
  {
    id: "E-01",
    name: "Naga City Civic Parade",
    date: "2026-10-25",
    time: "07:00",
    location: "Naga City",
    desc: "Scholar participation monitoring for an upcoming civic activity.",
    expected: 250,
    base: { present: 212, absent: 18, pending: 8 },
    roster: {
      "S-0142": "present", "S-0158": "absent", "S-0163": "pending", "S-0177": "present",
      "S-0194": "present", "S-0203": "present", "S-0215": "pending", "S-0236": "absent",
      "S-0241": "present", "S-0257": "pending", "S-0181": "absent", "S-0228": "present",
    },
  },
  {
    id: "E-02",
    name: "Scholars' General Assembly",
    date: "2026-11-08",
    time: "13:00",
    location: "Naga City Civic Center",
    desc: "Semestral assembly with renewal orientation for all city scholars.",
    expected: 878,
    base: { present: 0, absent: 0, pending: 866 },
    roster: Object.fromEntries(initialScholars.map((s) => [s.id, "pending" as Attend])),
  },
  {
    id: "E-03",
    name: "Coastal Clean-up Drive",
    date: "2026-11-22",
    time: "06:00",
    location: "Brgy. Sabang Riverbank",
    desc: "Community service activity organized with the City Environment Office.",
    expected: 120,
    base: { present: 0, absent: 0, pending: 108 },
    roster: Object.fromEntries(initialScholars.map((s) => [s.id, "pending" as Attend])),
  },
  {
    id: "E-00",
    name: "Peñafrancia Volunteer Corps",
    date: "2026-09-12",
    time: "05:30",
    location: "Naga Metropolitan Cathedral",
    desc: "Crowd assistance volunteers during the Peñafrancia festival.",
    expected: 180,
    base: { present: 156, absent: 12, pending: 0 },
    roster: Object.fromEntries(initialScholars.map((s, i) => [s.id, (i % 6 === 1 ? "absent" : "present") as Attend])),
  },
]

const initialAudit: AuditEntry[] = [
  { when: "Oct 1, 2026 — 10:42 AM", user: "ncsg.officer", action: "Updated scholar status", target: "Maria Santos", prev: "Inactive", next: "Active", reason: "Renewal compliance completed." },
  { when: "Sep 30, 2026 — 4:15 PM", user: "ncsg.officer", action: "Flagged for follow-up", target: "Juan Dela Cruz", reason: "Academic requirement not yet recorded." },
  { when: "Sep 29, 2026 — 9:03 AM", user: "ncsg.officer", action: "Created event", target: "Naga City Civic Parade", next: "250 expected" },
  { when: "Sep 12, 2026 — 11:20 AM", user: "ncsg.officer", action: "Marked attendance", target: "Peñafrancia Volunteer Corps · Miguel Ramos", prev: "Pending", next: "Present" },
]

/* demo totals for the full scholar population */
const TOTAL = { active: 842, inactive: 36, renewal: 124, attention: 28 }

const fmtDate = (d: string) =>
  new Date(d + "T00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
const fmtTime = (t: string) => {
  const [h, m] = t.split(":").map(Number)
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`
}
const nowStamp = () => {
  const d = new Date()
  return `${d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} — ${d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`
}
const initials = (n: string) => n.split(" ").map((p) => p[0]).slice(0, 2).join("")
const tally = (e: NcsgEvent) => {
  const t = { ...e.base }
  Object.values(e.roster).forEach((a) => t[a]++)
  return t
}
const isUpcoming = (e: NcsgEvent) => e.date >= "2026-10-01"

/* ================= BADGES ================= */
function StatusBadge({ status, lg }: { status: ScholarStatus; lg?: boolean }) {
  const active = status === "active"
  return (
    <span className={cx("inline-flex items-center gap-1.5 rounded-full font-semibold uppercase tracking-wide", lg ? "px-3.5 py-1.5 text-sm" : "px-2.5 py-1 text-[11px]", active ? "bg-success-100 text-success-600" : "bg-danger-100 text-danger-600")}>
      {active ? <CheckCircle2 size={lg ? 16 : 13} aria-hidden /> : <XCircle size={lg ? 16 : 13} aria-hidden />}
      {active ? "Active" : "Inactive"}
    </span>
  )
}

const compMap: Record<Compliance, { label: string; cls: string; icon: React.ReactNode }> = {
  compliant: { label: "Compliant", cls: "bg-success-100 text-success-600", icon: <CheckCircle2 size={13} aria-hidden /> },
  pending: { label: "Pending", cls: "bg-info-100 text-info-600", icon: <Clock size={13} aria-hidden /> },
  attention: { label: "Needs Attention", cls: "bg-warning-100 text-warning-600", icon: <AlertTriangle size={13} aria-hidden /> },
  inactive: { label: "Inactive", cls: "bg-slate-100 text-slate-600", icon: <XCircle size={13} aria-hidden /> },
}
function CompBadge({ c }: { c: Compliance }) {
  const m = compMap[c]
  return (
    <span className={cx("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold", m.cls)}>
      {m.icon}
      {m.label}
    </span>
  )
}

const attMap: Record<Attend, { label: string; cls: string; icon: React.ReactNode }> = {
  present: { label: "Present", cls: "bg-success-100 text-success-600", icon: <CheckCircle2 size={13} aria-hidden /> },
  absent: { label: "Absent", cls: "bg-danger-100 text-danger-600", icon: <XCircle size={13} aria-hidden /> },
  pending: { label: "Pending", cls: "bg-gold-100 text-gold-600", icon: <Clock size={13} aria-hidden /> },
}
function AttBadge({ a }: { a: Attend }) {
  const m = attMap[a]
  return (
    <span className={cx("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", m.cls)}>
      {m.icon}
      {m.label}
    </span>
  )
}

/* Stacked bar used for attendance / status visualisation */
function Stacked({ parts, label }: { parts: { v: number; cls: string; name: string }[]; label: string }) {
  const total = parts.reduce((a, p) => a + p.v, 0) || 1
  return (
    <div>
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-brand-100" role="img" aria-label={label}>
        {parts.map((p) => (
          <div key={p.name} className={cx("h-full transition-all duration-700", p.cls)} style={{ width: `${(p.v / total) * 100}%` }} />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-soft">
        {parts.map((p) => (
          <span key={p.name} className="flex items-center gap-1.5">
            <span className={cx("h-2 w-2 rounded-full", p.cls)} aria-hidden />
            {p.name} <b className="font-semibold text-ink">{p.v.toLocaleString()}</b>
          </span>
        ))}
      </div>
    </div>
  )
}

const field = "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"

/* ================= APP SHELL ================= */
const nav: { view: View; label: string; icon: React.ReactNode }[] = [
  { view: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={19} /> },
  { view: "scholars", label: "Scholars", icon: <Users size={19} /> },
  { view: "compliance", label: "Renewal Compliance", icon: <ClipboardCheck size={19} /> },
  { view: "events", label: "Events", icon: <CalendarDays size={19} /> },
  { view: "attendance", label: "Attendance", icon: <UserCheck size={19} /> },
  { view: "reports", label: "Reports", icon: <BarChart3 size={19} /> },
  { view: "notifications", label: "Notifications", icon: <Bell size={19} /> },
  { view: "audit", label: "Audit Trail", icon: <History size={19} /> },
  { view: "account", label: "Account", icon: <User size={19} /> },
]
const bottomNav: { view: View; label: string; icon: React.ReactNode }[] = [
  { view: "dashboard", label: "Home", icon: <Home size={20} /> },
  { view: "scholars", label: "Scholars", icon: <Users size={20} /> },
  { view: "events", label: "Events", icon: <CalendarDays size={20} /> },
  { view: "attendance", label: "Attendance", icon: <UserCheck size={20} /> },
]

export function NcsgApp({ onSignOut }: { onSignOut?: () => void }) {
  const [view, setView] = useState<View>("dashboard")
  const [scholars, setScholars] = useState(initialScholars)
  const [events, setEvents] = useState(initialEvents)
  const [audit, setAudit] = useState(initialAudit)
  const [selScholar, setSelScholar] = useState("S-0142")
  const [selEvent, setSelEvent] = useState("E-01")
  const [drawer, setDrawer] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const go = (v: View) => {
    setView(v)
    setDrawer(false)
    window.scrollTo({ top: 0 })
  }
  const log = (e: Omit<AuditEntry, "when" | "user">) => setAudit((a) => [{ when: nowStamp(), user: "ncsg.officer", ...e }, ...a])
  const notify = (m: string) => {
    setToast(m)
    setTimeout(() => setToast(null), 2600)
  }
  const openScholar = (id: string) => {
    setSelScholar(id)
    go("profile")
  }
  const openEvent = (id: string) => {
    setSelEvent(id)
    go("event")
  }

  const updateStatus = (id: string, next: ScholarStatus, reason: string) => {
    const s = scholars.find((x) => x.id === id)!
    if (s.status === next) return
    setScholars((all) => all.map((x) => (x.id === id ? { ...x, status: next, compliance: next === "inactive" ? "inactive" : x.compliance === "inactive" ? "pending" : x.compliance, updated: "Oct 1, 2026" } : x)))
    log({ action: "Updated scholar status", target: s.name, prev: s.status === "active" ? "Active" : "Inactive", next: next === "active" ? "Active" : "Inactive", reason })
    notify(`Status updated for ${s.name} · recorded in audit trail`)
  }
  const flag = (id: string, reason: string) => {
    const s = scholars.find((x) => x.id === id)!
    setScholars((all) => all.map((x) => (x.id === id ? { ...x, flagged: true } : x)))
    log({ action: "Flagged for follow-up", target: s.name, reason })
    notify(`${s.name} flagged for follow-up`)
  }
  const mark = (eid: string, sid: string, a: Attend) => {
    const ev = events.find((e) => e.id === eid)!
    const prev = ev.roster[sid]
    if (prev === a) return
    setEvents((all) => all.map((e) => (e.id === eid ? { ...e, roster: { ...e.roster, [sid]: a } } : e)))
    log({ action: "Marked attendance", target: `${ev.name} · ${scholars.find((s) => s.id === sid)?.name}`, prev: attMap[prev].label, next: attMap[a].label })
  }
  const createEvent = (e: Omit<NcsgEvent, "id" | "base" | "roster">) => {
    const id = `E-${Date.now()}`
    const roster = Object.fromEntries(scholars.filter((s) => s.status === "active").map((s) => [s.id, "pending" as Attend]))
    setEvents((all) => [{ ...e, id, roster, base: { present: 0, absent: 0, pending: Math.max(0, e.expected - Object.keys(roster).length) } }, ...all])
    log({ action: "Created event", target: e.name, next: `${e.expected} expected` })
    notify(`"${e.name}" created`)
    setSelEvent(id)
    go("event")
  }

  const navActive = (v: View) => view === v || (v === "scholars" && view === "profile") || (v === "events" && view === "event")
  const scholar = scholars.find((s) => s.id === selScholar)!
  const event = events.find((e) => e.id === selEvent)!

  return (
    <div className="min-h-screen bg-canvas pb-20 lg:pb-0">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-brand-950 lg:flex">
        <div className="border-b border-white/10 px-5 py-5">
          <Logo light />
        </div>
        <div className="mx-4 mt-5 rounded-xl border border-gold-500/30 bg-gold-500/10 px-3 py-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-400">Naga City Scholarship Guild</p>
          <p className="font-display text-sm font-semibold text-white">NCSG Scholar Monitoring</p>
        </div>
        <nav className="mt-4 flex-1 space-y-0.5 overflow-y-auto px-3 scrollbar-slim">
          {nav.map((n) => (
            <button key={n.view} onClick={() => go(n.view)} aria-current={navActive(n.view) ? "page" : undefined} className={cx("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors", navActive(n.view) ? "bg-brand-700 text-white" : "text-brand-200 hover:bg-white/5 hover:text-white")}>
              {n.icon}
              {n.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-white/10 p-3">
          <button onClick={onSignOut} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-brand-200 hover:bg-white/5 hover:text-white">
            <LogOut size={19} />
            Sign out
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 border-b border-line bg-white/90 backdrop-blur">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <div className="lg:hidden">
              <Logo />
            </div>
            <span className="hidden rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-600 sm:inline lg:inline">NCSG · Monitoring access only</span>
            <div className="ml-auto flex items-center gap-2">
              <button onClick={() => go("notifications")} aria-label="Notifications" className="relative rounded-lg p-2 text-ink-soft hover:bg-brand-50 hover:text-brand-700">
                <Bell size={20} />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger-500" />
              </button>
              <button onClick={() => go("account")} className="flex items-center gap-2 rounded-full border border-line py-1 pl-1 pr-3 hover:border-brand-300">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gold-500 text-xs font-bold text-brand-950">NC</span>
                <span className="hidden text-left leading-tight sm:block">
                  <span className="block text-xs font-semibold text-ink">ncsg.officer</span>
                  <span className="block text-[10px] text-ink-soft">NCSG Officer</span>
                </span>
              </button>
              <button onClick={() => setDrawer(true)} aria-label="Open menu" className="rounded-lg p-2 text-ink-soft hover:bg-brand-50 lg:hidden">
                <Menu size={22} />
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
          {view === "dashboard" && <Dashboard scholars={scholars} events={events} go={go} openScholar={openScholar} openEvent={openEvent} />}
          {view === "scholars" && <ScholarsView scholars={scholars} openScholar={openScholar} />}
          {view === "profile" && <Profile s={scholar} audit={audit} back={() => go("scholars")} onStatus={updateStatus} onFlag={flag} />}
          {view === "compliance" && <ComplianceView scholars={scholars} openScholar={openScholar} />}
          {view === "events" && <EventsView events={events} openEvent={openEvent} onCreate={createEvent} />}
          {view === "event" && <EventDetail e={event} scholars={scholars} mark={mark} back={() => go("events")} />}
          {view === "attendance" && <AttendanceHub events={events} scholars={scholars} mark={mark} />}
          {view === "reports" && <ReportsView events={events} scholars={scholars} />}
          {view === "notifications" && <NotificationsView go={go} />}
          {view === "audit" && <AuditView audit={audit} />}
          {view === "account" && <AccountView onSignOut={onSignOut} />}
        </main>
      </div>

      {/* Mobile bottom nav — attendance is one tap away during events */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white lg:hidden">
        <div className="mx-auto flex max-w-md">
          {[...bottomNav, { view: "notifications" as View, label: "More", icon: <MoreHorizontal size={20} /> }].map((n) => {
            const active = n.label === "More" ? ["notifications", "reports", "audit", "account", "compliance"].includes(view) : navActive(n.view)
            return (
              <button key={n.label} onClick={() => (n.label === "More" ? setDrawer(true) : go(n.view))} className={cx("relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium", active ? "text-brand-700" : "text-ink-soft")}>
                {n.icon}
                {n.label}
                {active && <span className="absolute -top-px h-0.5 w-8 rounded-full bg-brand-700" />}
              </button>
            )
          })}
        </div>
      </nav>

      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-brand-950/50 backdrop-blur-sm" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 right-0 w-72 overflow-y-auto bg-brand-950 p-4 animate-fade-up">
            <div className="mb-4 flex items-center justify-between">
              <Logo light />
              <button onClick={() => setDrawer(false)} aria-label="Close menu" className="rounded-lg p-1.5 text-brand-200 hover:bg-white/10">
                <X size={20} />
              </button>
            </div>
            <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-gold-400">NCSG Scholar Monitoring</p>
            {nav.map((n) => (
              <button key={n.view} onClick={() => go(n.view)} className={cx("flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium", navActive(n.view) ? "bg-brand-700 text-white" : "text-brand-200 hover:bg-white/5")}>
                {n.icon}
                {n.label}
              </button>
            ))}
            <button onClick={onSignOut} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-brand-200 hover:bg-white/5">
              <LogOut size={19} />
              Sign out
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div role="status" className="fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-brand-950 px-4 py-3 text-sm text-white shadow-xl animate-fade-up lg:bottom-6">
          <ShieldCheck size={16} className="text-gold-400" />
          {toast}
        </div>
      )}
    </div>
  )
}

/* ================= DASHBOARD ================= */
function Dashboard({ scholars, events, go, openScholar, openEvent }: { scholars: Scholar[]; events: NcsgEvent[]; go: (v: View) => void; openScholar: (id: string) => void; openEvent: (id: string) => void }) {
  const upcoming = events.filter(isUpcoming).sort((a, b) => a.date.localeCompare(b.date))
  const next = upcoming[0]
  const t = next ? tally(next) : null
  const attention = scholars.filter((s) => s.compliance === "attention" || s.compliance === "pending" || s.flagged)
  const pendingAtt = events.find((e) => e.id === "E-01")
  const cards = [
    { label: "Active Scholars", value: TOTAL.active, icon: <CheckCircle2 size={18} />, cls: "text-success-600 bg-success-100", to: "scholars" },
    { label: "Inactive Scholars", value: TOTAL.inactive, icon: <XCircle size={18} />, cls: "text-danger-600 bg-danger-100", to: "scholars" },
    { label: "For Renewal", value: TOTAL.renewal, icon: <RefreshCw size={18} />, cls: "text-info-600 bg-info-100", to: "compliance" },
    { label: "Compliance Attention", value: TOTAL.attention, icon: <AlertTriangle size={18} />, cls: "text-warning-600 bg-warning-100", to: "compliance" },
    { label: "Upcoming Events", value: upcoming.length, icon: <CalendarDays size={18} />, cls: "text-brand-700 bg-brand-100", to: "events" },
    { label: "Attendance to Review", value: pendingAtt ? tally(pendingAtt).pending + 6 : 17, icon: <UserCheck size={18} />, cls: "text-gold-600 bg-gold-100", to: "attendance" },
  ] as const

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">NCSG Scholar Monitoring</p>
        <h1 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">Good day, NCSG Officer</h1>
        <p className="mt-1 text-sm text-ink-soft">Monitor scholar status, renewal compliance, and participation in important events.</p>
      </div>

      {/* Hero: scholar health at a glance */}
      <Card className="overflow-hidden">
        <div className="grid lg:grid-cols-[1.3fr_1fr]">
          <div className="bg-gradient-to-br from-brand-900 to-brand-700 p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">1 · Scholar Status</p>
            <div className="mt-3 flex items-end gap-3">
              <p className="font-display text-5xl font-bold">{(TOTAL.active / (TOTAL.active + TOTAL.inactive) * 100).toFixed(1)}%</p>
              <p className="pb-2 text-sm text-brand-100">of {(TOTAL.active + TOTAL.inactive).toLocaleString()} city scholars are active</p>
            </div>
            <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-white/10" role="img" aria-label={`${TOTAL.active} active, ${TOTAL.inactive} inactive`}>
              <div className="bg-gold-400" style={{ width: `${(TOTAL.active / (TOTAL.active + TOTAL.inactive)) * 100}%` }} />
              <div className="flex-1 bg-danger-500/80" />
            </div>
            <div className="mt-2 flex gap-4 text-xs text-brand-100">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-gold-400" />Active {TOTAL.active}</span>
              <span className="flex items-center gap-1.5"><XCircle size={13} className="text-danger-100" />Inactive {TOTAL.inactive}</span>
            </div>
          </div>
          <div className="p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">2 · Renewal Compliance</p>
            <p className="mt-2 text-sm text-ink-soft">A.Y. 2026–2027, 1st Semester renewal cycle</p>
            <div className="mt-4">
              <Stacked label="Renewal compliance breakdown" parts={[
                { v: 726, cls: "bg-success-500", name: "Compliant" },
                { v: 88, cls: "bg-info-500", name: "Pending" },
                { v: TOTAL.attention, cls: "bg-warning-500", name: "Needs Attention" },
              ]} />
            </div>
            <Button variant="outline" size="sm" className="mt-5" onClick={() => go("compliance")} icon={<ClipboardCheck size={15} />}>Review compliance</Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {cards.map((c) => (
          <button key={c.label} onClick={() => go(c.to)} className="rounded-2xl border border-line bg-white p-4 text-left transition-colors hover:border-brand-300">
            <span className={cx("grid h-8 w-8 place-items-center rounded-lg", c.cls)}>{c.icon}</span>
            <p className="mt-3 font-display text-2xl font-bold text-ink">{c.value.toLocaleString()}</p>
            <p className="text-xs font-medium text-ink-soft">{c.label}</p>
          </button>
        ))}
      </div>
      <p className="-mt-3 text-[11px] text-ink-soft">Figures are demonstration data.</p>

      <div className="grid gap-6 lg:grid-cols-2">
        {next && t && (
          <Card className="p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">3 · Next Event</p>
            <h3 className="mt-2 text-lg font-semibold text-ink">{next.name}</h3>
            <p className="mt-1 flex flex-wrap gap-x-4 text-sm text-ink-soft">
              <span className="flex items-center gap-1.5"><CalendarDays size={14} />{fmtDate(next.date)}</span>
              <span className="flex items-center gap-1.5"><MapPin size={14} />{next.location}</span>
            </p>
            <p className="mt-5 text-sm text-ink"><b className="font-display text-2xl">{t.present}</b> / {next.expected} scholars attended</p>
            <div className="mt-2">
              <Stacked label="Attendance" parts={[
                { v: t.present, cls: "bg-success-500", name: "Present" },
                { v: t.absent, cls: "bg-danger-500", name: "Absent" },
                { v: t.pending, cls: "bg-gold-400", name: "Pending" },
              ]} />
            </div>
            <Button size="sm" className="mt-5" onClick={() => openEvent(next.id)} icon={<UserCheck size={15} />}>Open attendance</Button>
          </Card>
        )}
        <Card className="p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">Needs attention</p>
          <p className="mb-4 mt-1 text-sm text-ink-soft">Scholars with pending or incomplete renewal requirements.</p>
          <div className="space-y-2">
            {attention.slice(0, 5).map((s) => (
              <button key={s.id} onClick={() => openScholar(s.id)} className="flex w-full items-center gap-3 rounded-xl border border-line p-3 text-left hover:border-brand-300 hover:bg-brand-50">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">{initials(s.name)}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-ink">{s.name}{s.flagged && <Flag size={12} className="ml-1.5 inline text-warning-600" aria-label="Flagged" />}</span>
                  <span className="block truncate text-xs text-ink-soft">{s.school}</span>
                </span>
                <CompBadge c={s.compliance} />
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

/* ================= SCHOLARS ================= */
function ScholarsView({ scholars, openScholar }: { scholars: Scholar[]; openScholar: (id: string) => void }) {
  const [q, setQ] = useState("")
  const [f, setF] = useState<"all" | ScholarStatus>("all")
  const rows = scholars.filter((s) => (f === "all" || s.status === f) && (s.name + s.school + s.id).toLowerCase().includes(q.toLowerCase()))
  return (
    <div>
      <SectionHeader eyebrow="Monitoring" title="Scholar Monitoring" subtitle="Search a scholar to view status and renewal compliance." />
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search scholars</span>
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, school, or scholar ID" className={cx(field, "pl-10")} />
          </label>
          <div className="flex gap-1 rounded-xl bg-brand-50 p-1">
            {(["all", "active", "inactive"] as const).map((k) => (
              <button key={k} onClick={() => setF(k)} className={cx("rounded-lg px-3.5 py-2 text-sm font-semibold capitalize", f === k ? "bg-white text-brand-700 shadow-sm" : "text-brand-600")}>{k}</button>
            ))}
          </div>
        </div>
        {/* Table (md+) */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-canvas text-xs uppercase tracking-wide text-ink-soft">
              <tr>{["Scholar", "School", "Year Level", "Status", "Renewal Compliance", "Last Updated", "Action"].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((s) => (
                <tr key={s.id} className="hover:bg-brand-50/50">
                  <td className="px-4 py-3"><p className="font-medium text-ink">{s.name}</p><p className="text-xs text-ink-soft">{s.id}</p></td>
                  <td className="px-4 py-3 text-ink-soft">{s.school}</td>
                  <td className="px-4 py-3 text-ink-soft">{s.year}</td>
                  <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                  <td className="px-4 py-3"><CompBadge c={s.compliance} /></td>
                  <td className="px-4 py-3 text-ink-soft">{s.updated}</td>
                  <td className="px-4 py-3"><Button variant="ghost" size="sm" onClick={() => openScholar(s.id)}>View <ChevronRight size={14} /></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Cards (mobile) */}
        <div className="divide-y divide-line md:hidden">
          {rows.map((s) => (
            <button key={s.id} onClick={() => openScholar(s.id)} className="flex w-full items-start gap-3 p-4 text-left">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">{initials(s.name)}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-ink">{s.name}</span>
                <span className="block truncate text-xs text-ink-soft">{s.school} · {s.year}</span>
                <span className="mt-2 flex flex-wrap gap-1.5"><StatusBadge status={s.status} /><CompBadge c={s.compliance} /></span>
              </span>
              <ChevronRight size={18} className="mt-2 text-ink-soft" />
            </button>
          ))}
        </div>
        {rows.length === 0 && <p className="p-8 text-center text-sm text-ink-soft">No scholars match your search.</p>}
      </Card>
    </div>
  )
}

/* ================= PROFILE ================= */
function Profile({ s, audit, back, onStatus, onFlag }: { s: Scholar; audit: AuditEntry[]; back: () => void; onStatus: (id: string, n: ScholarStatus, r: string) => void; onFlag: (id: string, r: string) => void }) {
  const [statusModal, setStatusModal] = useState(false)
  const [flagModal, setFlagModal] = useState(false)
  const [next, setNext] = useState<ScholarStatus>(s.status === "active" ? "inactive" : "active")
  const [reason, setReason] = useState("")
  const history = audit.filter((a) => a.target.includes(s.name))
  const info = [
    ["Scholar Name", s.name], ["School", s.school], ["Course / Program", s.course],
    ["Year Level", s.year], ["Current Academic Year", "2026–2027"], ["Scholar ID", s.id],
  ]
  return (
    <div className="space-y-6">
      <button onClick={back} className="flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline"><ArrowLeft size={16} />Back to scholars</button>
      <div className="flex flex-wrap items-center gap-4">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-700 font-display text-lg font-bold text-white">{initials(s.name)}</span>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">Scholar Monitoring Profile</p>
          <h1 className="text-2xl font-bold text-ink">{s.name}</h1>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <Card className="p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Current Scholar Status</p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <StatusBadge status={s.status} lg />
              <Button variant="outline" size="sm" icon={<RefreshCw size={15} />} onClick={() => { setNext(s.status === "active" ? "inactive" : "active"); setReason(""); setStatusModal(true) }}>Update status</Button>
            </div>
            <p className="mt-3 text-xs text-ink-soft">Monitoring status only. Official scholarship decisions remain with the ESSO Scholarship Coordinator.</p>
          </Card>
          <Card className="p-6">
            <p className="mb-4 text-sm font-semibold text-ink">Scholar Information</p>
            <dl className="grid gap-4 sm:grid-cols-2">
              {info.map(([k, v]) => (
                <div key={k}><dt className="text-xs text-ink-soft">{k}</dt><dd className="text-sm font-medium text-ink">{v}</dd></div>
              ))}
            </dl>
            <p className="mt-5 flex items-center gap-2 rounded-lg bg-canvas px-3 py-2 text-xs text-ink-soft"><ShieldCheck size={14} className="text-brand-500" />Financial documents and application records are not visible to NCSG.</p>
          </Card>
        </div>

        <Card className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-ink">Renewal Compliance</h2>
            <CompBadge c={s.compliance} />
          </div>
          <ul className="mt-5 space-y-2">
            {s.checklist.map((c) => (
              <li key={c.label} className={cx("flex items-center gap-3 rounded-xl border px-4 py-3 text-sm", c.ok ? "border-success-100 bg-success-100/40" : "border-warning-100 bg-warning-100/50")}>
                {c.ok ? <CheckCircle2 size={18} className="shrink-0 text-success-600" /> : <AlertTriangle size={18} className="shrink-0 text-warning-600" />}
                <span className="flex-1 text-ink">{c.label}</span>
                <span className={cx("text-xs font-semibold", c.ok ? "text-success-600" : "text-warning-600")}>{c.ok ? "Recorded" : "Needs attention"}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-5">
            <div><dt className="text-xs text-ink-soft">Last Compliance Update</dt><dd className="text-sm font-medium text-ink">{s.updated}</dd></div>
            <div><dt className="text-xs text-ink-soft">Next Renewal Period</dt><dd className="text-sm font-medium text-ink">Jan 5 – Feb 6, 2027</dd></div>
          </dl>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button variant="gold" icon={<Flag size={16} />} disabled={s.flagged} onClick={() => { setReason(""); setFlagModal(true) }}>{s.flagged ? "Flagged for follow-up" : "Flag for Follow-up"}</Button>
          </div>
          {history.length > 0 && (
            <div className="mt-6 border-t border-line pt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-soft">Monitoring history</p>
              <ul className="space-y-3">
                {history.slice(0, 4).map((h, i) => (
                  <li key={i} className="text-sm"><p className="text-ink">{h.action}{h.prev && h.next && <> · <b>{h.prev} → {h.next}</b></>}</p><p className="text-xs text-ink-soft">{h.when} · {h.user}</p></li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      </div>

      <Modal open={statusModal} onClose={() => setStatusModal(false)} title="Update Scholar Status">
        <form className="space-y-4 p-6" onSubmit={(e) => { e.preventDefault(); onStatus(s.id, next, reason); setStatusModal(false) }}>
          <p className="text-sm text-ink-soft">Are you sure you want to change this scholar's monitoring status?</p>
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-ink">New Status</legend>
            <div className="grid grid-cols-2 gap-2">
              {(["active", "inactive"] as const).map((k) => (
                <label key={k} className={cx("flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-semibold capitalize", next === k ? "border-brand-600 bg-brand-50 text-brand-700" : "border-line text-ink-soft")}>
                  <input type="radio" name="status" className="sr-only" checked={next === k} onChange={() => setNext(k)} />
                  {k === "active" ? <CheckCircle2 size={16} /> : <XCircle size={16} />}{k}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Reason / Notes <span className="text-danger-500">*</span></span>
            <textarea required rows={3} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Renewal compliance completed." className={field} />
          </label>
          <p className="text-xs text-ink-soft">This change will be recorded in the audit trail.</p>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setStatusModal(false)}>Cancel</Button>
            <Button type="submit" disabled={next === s.status}>Confirm Update</Button>
          </div>
        </form>
      </Modal>

      <Modal open={flagModal} onClose={() => setFlagModal(false)} title="Flag for Follow-up">
        <form className="space-y-4 p-6" onSubmit={(e) => { e.preventDefault(); onFlag(s.id, reason); setFlagModal(false) }}>
          <p className="text-sm text-ink-soft">Flagging notifies the Scholarship Coordinator for follow-up. It does not change the scholar's scholarship standing.</p>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Notes <span className="text-danger-500">*</span></span>
            <textarea required rows={3} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Describe what needs follow-up" className={field} />
          </label>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setFlagModal(false)}>Cancel</Button>
            <Button type="submit" variant="gold" icon={<Flag size={15} />}>Flag scholar</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

/* ================= COMPLIANCE ================= */
function ComplianceView({ scholars, openScholar }: { scholars: Scholar[]; openScholar: (id: string) => void }) {
  const [f, setF] = useState<"all" | Compliance>("all")
  const counts = (c: Compliance) => scholars.filter((s) => s.compliance === c).length
  const rows = scholars.filter((s) => f === "all" || s.compliance === f)
  return (
    <div>
      <SectionHeader eyebrow="Renewal" title="Renewal Compliance" subtitle="Monitor requirements ahead of the next renewal period (Jan 5 – Feb 6, 2027)." />
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(Object.keys(compMap) as Compliance[]).map((c) => (
          <button key={c} onClick={() => setF(f === c ? "all" : c)} aria-pressed={f === c} className={cx("rounded-2xl border bg-white p-4 text-left transition-colors", f === c ? "border-brand-500 ring-2 ring-brand-200" : "border-line hover:border-brand-300")}>
            <CompBadge c={c} />
            <p className="mt-3 font-display text-2xl font-bold text-ink">{counts(c)}</p>
            <p className="text-xs text-ink-soft">in this list</p>
          </button>
        ))}
      </div>
      <Card className="divide-y divide-line">
        {rows.map((s) => {
          const done = s.checklist.filter((c) => c.ok).length
          return (
            <button key={s.id} onClick={() => openScholar(s.id)} className="flex w-full flex-wrap items-center gap-3 p-4 text-left hover:bg-brand-50/50 sm:flex-nowrap">
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-ink">{s.name}{s.flagged && <Flag size={12} className="ml-1.5 inline text-warning-600" aria-label="Flagged" />}</span>
                <span className="block truncate text-xs text-ink-soft">{s.school}</span>
              </span>
              <span className="flex items-center gap-2 text-xs text-ink-soft">
                <span className="flex gap-1" aria-hidden>{s.checklist.map((c, i) => <span key={i} className={cx("h-2 w-5 rounded-full", c.ok ? "bg-success-500" : "bg-warning-500")} />)}</span>
                {done}/{s.checklist.length} requirements
              </span>
              <CompBadge c={s.compliance} />
              <ChevronRight size={16} className="text-ink-soft" />
            </button>
          )
        })}
      </Card>
    </div>
  )
}

/* ================= EVENTS ================= */
function EventsView({ events, openEvent, onCreate }: { events: NcsgEvent[]; openEvent: (id: string) => void; onCreate: (e: Omit<NcsgEvent, "id" | "base" | "roster">) => void }) {
  const [open, setOpen] = useState(false)
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date))
  return (
    <div>
      <SectionHeader eyebrow="Events & Attendance" title="Events" subtitle="Organize and monitor scholar participation in important activities." action={<Button icon={<Plus size={16} />} onClick={() => setOpen(true)}>Create Event</Button>} />
      <div className="grid gap-4 md:grid-cols-2">
        {sorted.map((e) => {
          const t = tally(e)
          const up = isUpcoming(e)
          const d = new Date(e.date + "T00:00")
          return (
            <Card key={e.id} className="flex flex-col p-5">
              <div className="flex gap-4">
                <div className={cx("grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-center", up ? "bg-brand-700 text-white" : "bg-canvas text-ink-soft")}>
                  <span className="leading-none"><span className="block text-[11px] font-semibold uppercase">{d.toLocaleString("en-US", { month: "short" })}</span><span className="font-display text-2xl font-bold">{d.getDate()}</span></span>
                </div>
                <div className="min-w-0 flex-1">
                  <span className={cx("text-[11px] font-semibold uppercase tracking-wider", up ? "text-gold-600" : "text-ink-soft")}>{up ? "Upcoming Event" : "Completed"}</span>
                  <h3 className="font-semibold text-ink">{e.name}</h3>
                  <p className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-ink-soft"><span className="flex items-center gap-1"><Clock size={12} />{fmtTime(e.time)}</span><span className="flex items-center gap-1"><MapPin size={12} />{e.location}</span></p>
                </div>
              </div>
              <p className="mt-3 text-sm text-ink-soft">{e.desc}</p>
              <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                {([["Expected", e.expected, "text-ink"], ["Present", t.present, "text-success-600"], ["Absent", t.absent, "text-danger-600"], ["Pending", t.pending, "text-gold-600"]] as const).map(([k, v, c]) => (
                  <div key={k} className="rounded-xl bg-canvas py-2"><p className={cx("font-display text-lg font-bold", c)}>{v}</p><p className="text-[11px] text-ink-soft">{k}</p></div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="mt-4 self-start" onClick={() => openEvent(e.id)} icon={<UserCheck size={15} />}>Open attendance</Button>
            </Card>
          )
        })}
      </div>
      <CreateEventModal open={open} onClose={() => setOpen(false)} onCreate={(e) => { onCreate(e); setOpen(false) }} />
    </div>
  )
}

function CreateEventModal({ open, onClose, onCreate }: { open: boolean; onClose: () => void; onCreate: (e: Omit<NcsgEvent, "id" | "base" | "roster">) => void }) {
  return (
    <Modal open={open} onClose={onClose} title="Create Event">
      <form
        className="grid gap-4 p-6 sm:grid-cols-2"
        onSubmit={(ev) => {
          ev.preventDefault()
          const d = new FormData(ev.currentTarget)
          onCreate({ name: String(d.get("name")), date: String(d.get("date")), time: String(d.get("time")), location: String(d.get("location")), desc: String(d.get("desc")), expected: Number(d.get("expected")) })
        }}
      >
        {[
          { n: "name", l: "Event Name", t: "text", span: true, p: "e.g. Scholars' Tree Planting" },
          { n: "date", l: "Date", t: "date", v: "2026-12-05" },
          { n: "time", l: "Time", t: "time", v: "08:00" },
          { n: "location", l: "Location", t: "text", p: "e.g. Naga City Plaza Rizal" },
          { n: "expected", l: "Expected Participants", t: "number", p: "e.g. 150" },
        ].map((f) => (
          <label key={f.n} className={cx("block", f.span && "sm:col-span-2")}>
            <span className="mb-1.5 block text-sm font-medium text-ink">{f.l} <span className="text-danger-500">*</span></span>
            <input name={f.n} type={f.t} required min={f.t === "number" ? 1 : undefined} defaultValue={f.v} placeholder={f.p} className={field} />
          </label>
        ))}
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-ink">Description</span>
          <textarea name="desc" rows={3} placeholder="Short purpose of the event" className={field} />
        </label>
        <div className="flex justify-end gap-2 sm:col-span-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" icon={<Plus size={16} />}>Create Event</Button>
        </div>
      </form>
    </Modal>
  )
}

/* ================= ATTENDANCE ================= */
function AttendancePanel({ e, scholars, mark }: { e: NcsgEvent; scholars: Scholar[]; mark: (eid: string, sid: string, a: Attend) => void }) {
  const [q, setQ] = useState("")
  const [f, setF] = useState<"all" | Attend>("all")
  const t = tally(e)
  const pct = Math.round((t.present / e.expected) * 100)
  const rows = useMemo(() => scholars.filter((s) => e.roster[s.id] && (f === "all" || e.roster[s.id] === f) && s.name.toLowerCase().includes(q.toLowerCase())), [scholars, e, q, f])
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {([["Total Expected", e.expected, "bg-brand-100 text-brand-700", <Users size={18} key="u" />], ["Present", t.present, "bg-success-100 text-success-600", <CheckCircle2 size={18} key="p" />], ["Absent", t.absent, "bg-danger-100 text-danger-600", <XCircle size={18} key="a" />], ["Pending", t.pending, "bg-gold-100 text-gold-600", <Clock size={18} key="c" />]] as const).map(([k, v, c, i]) => (
          <Card key={k} className="p-4"><span className={cx("grid h-8 w-8 place-items-center rounded-lg", c)}>{i}</span><p className="mt-3 font-display text-2xl font-bold text-ink">{v}</p><p className="text-xs text-ink-soft">{k}</p></Card>
        ))}
      </div>
      <Card className="p-5">
        <div className="flex items-end justify-between gap-3">
          <p className="text-sm text-ink"><b className="font-display text-xl">{t.present} / {e.expected}</b> scholars attended</p>
          <p className="font-display text-xl font-bold text-success-600">{pct}%</p>
        </div>
        <div className="mt-3">
          <Stacked label={`${t.present} present, ${t.absent} absent, ${t.pending} pending`} parts={[
            { v: t.present, cls: "bg-success-500", name: "Present" },
            { v: t.absent, cls: "bg-danger-500", name: "Absent" },
            { v: t.pending, cls: "bg-gold-400", name: "Pending" },
          ]} />
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Search scholar name</span>
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
            <input value={q} onChange={(ev) => setQ(ev.target.value)} placeholder="Search scholar name" className={cx(field, "pl-10")} />
          </label>
          <div className="flex gap-1 overflow-x-auto rounded-xl bg-brand-50 p-1">
            {(["all", "pending", "present", "absent"] as const).map((k) => (
              <button key={k} onClick={() => setF(k)} className={cx("rounded-lg px-3 py-2 text-sm font-semibold capitalize", f === k ? "bg-white text-brand-700 shadow-sm" : "text-brand-600")}>{k}</button>
            ))}
          </div>
        </div>
        <div className="hidden grid-cols-[1.5fr_1fr_1fr_auto] gap-3 bg-canvas px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-ink-soft sm:grid">
          <span>Scholar</span><span>Status</span><span>Attendance</span><span className="w-[232px]">Update</span>
        </div>
        <ul className="divide-y divide-line">
          {rows.map((s) => {
            const a = e.roster[s.id]
            return (
              <li key={s.id} className="grid gap-3 p-4 sm:grid-cols-[1.5fr_1fr_1fr_auto] sm:items-center">
                <div className="flex items-center justify-between gap-2 sm:block">
                  <p className="font-medium text-ink">{s.name}</p>
                  <span className="sm:hidden"><AttBadge a={a} /></span>
                </div>
                <div className="hidden sm:block"><StatusBadge status={s.status} /></div>
                <div className="hidden sm:block"><AttBadge a={a} /></div>
                <div className="grid grid-cols-2 gap-2 sm:w-[232px]">
                  <button onClick={() => mark(e.id, s.id, "present")} aria-pressed={a === "present"} className={cx("flex min-h-11 items-center justify-center gap-1.5 rounded-xl border-2 text-sm font-semibold transition-colors", a === "present" ? "border-success-500 bg-success-500 text-white" : "border-success-100 text-success-600 hover:bg-success-100")}>
                    <CheckCircle2 size={16} />Mark Present
                  </button>
                  <button onClick={() => mark(e.id, s.id, "absent")} aria-pressed={a === "absent"} className={cx("flex min-h-11 items-center justify-center gap-1.5 rounded-xl border-2 text-sm font-semibold transition-colors", a === "absent" ? "border-danger-500 bg-danger-500 text-white" : "border-danger-100 text-danger-600 hover:bg-danger-100")}>
                    <XCircle size={16} />Mark Absent
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
        {rows.length === 0 && <p className="p-8 text-center text-sm text-ink-soft">No scholars found.</p>}
        <p className="border-t border-line bg-canvas px-4 py-2.5 text-xs text-ink-soft">Showing roster sample · every update is recorded in the audit trail.</p>
      </Card>
    </div>
  )
}

function EventDetail({ e, scholars, mark, back }: { e: NcsgEvent; scholars: Scholar[]; mark: (eid: string, sid: string, a: Attend) => void; back: () => void }) {
  return (
    <div className="space-y-5">
      <button onClick={back} className="flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline"><ArrowLeft size={16} />Back to events</button>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">{isUpcoming(e) ? "Upcoming Event" : "Completed Event"}</p>
        <h1 className="text-2xl font-bold text-ink">{e.name}</h1>
        <p className="mt-1 flex flex-wrap gap-x-4 text-sm text-ink-soft">
          <span className="flex items-center gap-1.5"><CalendarDays size={14} />{fmtDate(e.date)}</span>
          <span className="flex items-center gap-1.5"><Clock size={14} />{fmtTime(e.time)}</span>
          <span className="flex items-center gap-1.5"><MapPin size={14} />{e.location}</span>
        </p>
        <p className="mt-2 text-sm text-ink-soft">{e.desc}</p>
      </div>
      <AttendancePanel e={e} scholars={scholars} mark={mark} />
    </div>
  )
}

function AttendanceHub({ events, scholars, mark }: { events: NcsgEvent[]; scholars: Scholar[]; mark: (eid: string, sid: string, a: Attend) => void }) {
  const [id, setId] = useState(events.find((e) => e.id === "E-01")?.id ?? events[0].id)
  const e = events.find((x) => x.id === id)!
  return (
    <div>
      <SectionHeader eyebrow="Events & Attendance" title="Attendance" subtitle="Quick attendance marking — built for use on-site." />
      <label className="mb-5 block max-w-md">
        <span className="mb-1.5 block text-sm font-medium text-ink">Event</span>
        <select value={id} onChange={(ev) => setId(ev.target.value)} className={field}>
          {events.map((x) => <option key={x.id} value={x.id}>{x.name} — {fmtDate(x.date)}</option>)}
        </select>
      </label>
      <AttendancePanel e={e} scholars={scholars} mark={mark} />
    </div>
  )
}

/* ================= REPORTS ================= */
function ReportsView({ events, scholars }: { events: NcsgEvent[]; scholars: Scholar[] }) {
  void scholars
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Restricted · NCSG" title="Monitoring Reports" subtitle="For monitoring and administrative reference." action={<Button variant="outline" icon={<Download size={16} />} onClick={() => window.print()}>Export</Button>} />
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <p className="font-semibold text-ink">Scholar Status Report</p>
          <p className="mb-4 text-xs text-ink-soft">A.Y. 2026–2027 · as of Oct 1, 2026</p>
          <Stacked label="Scholar status" parts={[{ v: TOTAL.active, cls: "bg-success-500", name: "Active" }, { v: TOTAL.inactive, cls: "bg-danger-500", name: "Inactive" }]} />
        </Card>
        <Card className="p-6">
          <p className="font-semibold text-ink">Renewal Compliance Report</p>
          <p className="mb-4 text-xs text-ink-soft">1st Semester renewal cycle</p>
          <Stacked label="Renewal compliance" parts={[{ v: 726, cls: "bg-success-500", name: "Compliant" }, { v: 88, cls: "bg-info-500", name: "Pending" }, { v: TOTAL.attention, cls: "bg-warning-500", name: "Needs Attention" }]} />
        </Card>
      </div>
      <Card className="overflow-hidden">
        <p className="border-b border-line px-6 py-4 font-semibold text-ink">Event Attendance Report</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-canvas text-xs uppercase tracking-wide text-ink-soft">
              <tr>{["Event", "Date", "Expected", "Present", "Absent", "Pending"].map((h) => <th key={h} className="px-5 py-3 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[...events].sort((a, b) => a.date.localeCompare(b.date)).map((e) => {
                const t = tally(e)
                return (
                  <tr key={e.id}>
                    <td className="px-5 py-3 font-medium text-ink">{e.name}</td>
                    <td className="px-5 py-3 text-ink-soft">{fmtDate(e.date)}</td>
                    <td className="px-5 py-3">{e.expected}</td>
                    <td className="px-5 py-3 font-semibold text-success-600">{t.present}</td>
                    <td className="px-5 py-3 font-semibold text-danger-600">{t.absent}</td>
                    <td className="px-5 py-3 font-semibold text-gold-600">{t.pending}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

/* ================= NOTIFICATIONS ================= */
function NotificationsView({ go }: { go: (v: View) => void }) {
  const items = [
    { t: "Renewal monitoring reminder", d: "28 scholars require compliance follow-up.", when: "Today, 8:00 AM", to: "compliance" as View, icon: <ClipboardCheck size={18} />, cls: "bg-warning-100 text-warning-600" },
    { t: "Upcoming event", d: "Naga City Civic Parade is scheduled for October 25.", when: "Yesterday", to: "events" as View, icon: <CalendarDays size={18} />, cls: "bg-brand-100 text-brand-700" },
    { t: "Attendance update", d: "17 scholar attendance records are still pending.", when: "Sep 29", to: "attendance" as View, icon: <UserCheck size={18} />, cls: "bg-gold-100 text-gold-600" },
  ]
  return (
    <div>
      <SectionHeader eyebrow="NCSG" title="Notifications" subtitle="Only alerts related to scholar monitoring and events." />
      <Card className="divide-y divide-line">
        {items.map((n) => (
          <button key={n.t} onClick={() => go(n.to)} className="flex w-full items-start gap-4 p-5 text-left hover:bg-brand-50/50">
            <span className={cx("grid h-10 w-10 shrink-0 place-items-center rounded-xl", n.cls)}>{n.icon}</span>
            <span className="flex-1"><span className="block font-semibold text-ink">{n.t}</span><span className="block text-sm text-ink-soft">{n.d}</span></span>
            <span className="shrink-0 text-xs text-ink-soft">{n.when}</span>
          </button>
        ))}
      </Card>
    </div>
  )
}

/* ================= AUDIT ================= */
function AuditView({ audit }: { audit: AuditEntry[] }) {
  return (
    <div>
      <SectionHeader eyebrow="Traceability" title="NCSG Audit Trail" subtitle="Every status change, flag, event, and attendance update is recorded." />
      <Card className="p-6">
        <ol className="relative space-y-6 border-l-2 border-brand-100 pl-6">
          {audit.map((a, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-white bg-brand-600 ring-2 ring-brand-100" />
              <p className="text-xs font-semibold text-brand-500">{a.when}</p>
              <p className="mt-1 text-sm text-ink"><span className="font-mono text-xs text-ink-soft">{a.user}</span> · {a.action}</p>
              <p className="font-semibold text-ink">{a.target}</p>
              {a.prev && a.next && <p className="mt-1 text-sm">Status: <b>{a.prev} → {a.next}</b></p>}
              {!a.prev && a.next && <p className="mt-1 text-sm text-ink-soft">{a.next}</p>}
              {a.reason && <p className="mt-1 text-sm italic text-ink-soft">Reason: “{a.reason}”</p>}
            </li>
          ))}
        </ol>
      </Card>
    </div>
  )
}

/* ================= ACCOUNT ================= */
function AccountView({ onSignOut }: { onSignOut?: () => void }) {
  const perms = ["Monitor scholar status (Active / Inactive)", "Monitor renewal compliance & flag for follow-up", "Create events and record attendance", "View monitoring reports & NCSG audit trail"]
  const denied = ["AI Document Verification", "Applicant Applications", "Scholarship Ranking", "Application Approval", "ESSO Staff Management"]
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Account" title="NCSG Officer Account" />
      <Card className="flex flex-wrap items-center gap-4 p-6">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-500 font-display text-lg font-bold text-brand-950">NC</span>
        <div className="flex-1"><p className="font-semibold text-ink">ncsg.officer</p><p className="text-sm text-ink-soft">Naga City Scholarship Guild · Provisioned by the Scholarship Coordinator</p></div>
        <Button variant="outline" icon={<LogOut size={16} />} onClick={onSignOut}>Sign out</Button>
      </Card>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <p className="mb-3 font-semibold text-ink">Role permissions</p>
          <ul className="space-y-2">{perms.map((p) => <li key={p} className="flex items-start gap-2 text-sm text-ink"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-success-600" />{p}</li>)}</ul>
        </Card>
        <Card className="p-6">
          <p className="mb-3 font-semibold text-ink">Not available to this role</p>
          <ul className="space-y-2">{denied.map((p) => <li key={p} className="flex items-start gap-2 text-sm text-ink-soft"><XCircle size={17} className="mt-0.5 shrink-0 text-slate-400" />{p}</li>)}</ul>
          <p className="mt-4 text-xs text-ink-soft">Handled by ESSO / Scholarship Coordinator under role-based access control.</p>
        </Card>
      </div>
    </div>
  )
}
