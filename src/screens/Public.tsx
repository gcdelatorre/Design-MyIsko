import { useState } from "react"
import logo1 from "@/assets/logo1.png"
import logo2 from "@/assets/logo2.png"
import {
  ArrowRight,
  ShieldCheck,
  FileSearch,
  Bell,
  ScanLine,
  UsersRound,
  ClipboardList,
  CalendarClock,
  ChevronDown,
  GraduationCap,
  Sparkles,
  Lock,
} from "lucide-react"
import { Button, Card, Logo, AiNotice } from "../components/ui"
import { announcements, faqs, smartCheckSteps } from "../lib/data"
import type { Screen, Role } from "../App"

export function Landing({ go }: { go: (s: Screen) => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  return (
    <div className="min-h-screen bg-canvas">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-line bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {["Announcements", "Deadlines", "Help / FAQ"].map((l, i) => (
              <a
                key={l}
                href={["#announcements", "#deadlines", "#faq"][i]}
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft hover:bg-brand-50 hover:text-brand-700"
              >
                {l}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => go("login")}>
              Login
            </Button>
            <Button variant="primary" size="sm" onClick={() => go("register")}>
              Register
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-600/40 blur-3xl" />
        <div className="absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-brand-100">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" /> Naga
              City Education, Scholarship &amp; Sports Office (ESSO)
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
              Open Opportunities for{" "}
              <span className="text-gold-400">Future Scholars.</span>
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-brand-100">
              A centralized scholarship application and management platform for
              Naga City scholars — apply, submit documents, and track your
              application in one trustworthy place.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                variant="gold"
                size="lg"
                icon={<GraduationCap size={18} />}
                onClick={() => go("register")}
              >
                Apply for Scholarship
              </Button>
              <Button
                size="lg"
                onClick={() => go("login")}
                className="!bg-white/10 !text-white ring-1 ring-white/25 hover:!bg-white/20"
                icon={<FileSearch size={18} />}
              >
                Track Application
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-brand-200">
              {[
                { icon: <ShieldCheck size={16} />, t: "Role-based & secure" },
                {
                  icon: <UsersRound size={16} />,
                  t: "Human-validated decisions",
                },
                {
                  icon: <Sparkles size={16} />,
                  t: "AI-assisted document checks",
                },
              ].map((f) => (
                <span key={f.t} className="inline-flex items-center gap-2">
                  {f.icon}
                  {f.t}
                </span>
              ))}
            </div>
          </div>

          {/* Hero card: quick service shortcuts (MyNaga-style "services in one place") */}
          <div
            className="animate-fade-up self-center"
            style={{ animationDelay: "80ms" }}
          >
            <Card className="p-5">
              <p className="text-sm font-semibold text-ink">
                Scholarship Services
              </p>
              <p className="mb-4 text-xs text-ink-soft">
                Everything you need, in one place.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: <ClipboardList size={20} />,
                    t: "Apply Online",
                    d: "Guided form",
                  },
                  {
                    icon: <FileSearch size={20} />,
                    t: "Upload Documents",
                    d: "Requirements",
                  },
                  {
                    icon: <ScanLine size={20} />,
                    t: "Smart Doc Check",
                    d: "Preliminary AI",
                  },
                  {
                    icon: <Bell size={20} />,
                    t: "Track & Notify",
                    d: "Live status",
                  },
                ].map((s) => (
                  <button
                    key={s.t}
                    onClick={() => go("login")}
                    className="group rounded-xl border border-line bg-canvas p-3.5 text-left transition-all hover:border-brand-300 hover:bg-brand-50"
                  >
                    <div className="mb-2 grid h-9 w-9 place-items-center rounded-lg bg-brand-100 text-brand-700 group-hover:bg-brand-600 group-hover:text-white">
                      {s.icon}
                    </div>
                    <p className="text-sm font-semibold text-ink">{s.t}</p>
                    <p className="text-xs text-ink-soft">{s.d}</p>
                  </button>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-brand-900 px-4 py-3">
                <div>
                  <p className="text-xs text-brand-200">ESSO Personnel</p>
                  <p className="text-sm font-semibold text-white">
                    Staff Portal
                  </p>
                </div>
                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => go("login")}
                  icon={<Lock size={14} />}
                >
                  Staff Login
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Smart Document Check — signature feature strip */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">
            The signature feature
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
            Smart Document Check
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-ink-soft">
            A document-processing assistant that performs preliminary checks so
            ESSO staff can focus on validation — never on manual sorting.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-2 overflow-x-auto scrollbar-slim pb-2 lg:flex-row lg:items-stretch">
          {smartCheckSteps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2 lg:flex-1">
              <div
                className={`flex-1 rounded-xl border p-4 ${
                  i === smartCheckSteps.length - 1
                    ? "border-gold-300 bg-gold-50"
                    : "border-line bg-white"
                }`}
              >
                <div
                  className={`mb-2 grid h-7 w-7 place-items-center rounded-lg text-xs font-bold ${
                    i === smartCheckSteps.length - 1
                      ? "bg-gold-500 text-brand-950"
                      : "bg-brand-100 text-brand-700"
                  }`}
                >
                  {i + 1}
                </div>
                <p className="text-sm font-semibold text-ink">{s.label}</p>
                <p className="text-xs text-ink-soft">{s.desc}</p>
              </div>
              {i < smartCheckSteps.length - 1 && (
                <ArrowRight
                  size={16}
                  className="hidden shrink-0 text-brand-300 lg:block"
                />
              )}
            </div>
          ))}
        </div>
        <AiNotice className="mt-6" />
      </section>

      {/* Announcements + Deadlines */}
      <section id="announcements" className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <h2 className="text-xl font-semibold text-ink">
                Scholarship Announcements
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {announcements.map((a) => (
                  <Card
                    key={a.title}
                    className="p-5 transition-shadow hover:shadow-md"
                  >
                    <span className="inline-block rounded-full bg-brand-100 px-2.5 py-1 text-xs font-semibold text-brand-700">
                      {a.tag}
                    </span>
                    <h3 className="mt-3 text-base font-semibold text-ink">
                      {a.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-ink-soft">{a.body}</p>
                    <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-gold-600">
                      <CalendarClock size={15} />
                      {a.deadline}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
            <div id="deadlines">
              <h2 className="text-xl font-semibold text-ink">
                Important Deadlines
              </h2>
              <Card className="mt-5 divide-y divide-line">
                {[
                  {
                    d: "Oct 15",
                    m: "2026",
                    t: "NTSP application closes",
                    tone: "text-danger-600",
                  },
                  {
                    d: "Oct 05",
                    m: "2026",
                    t: "Qualifying examination",
                    tone: "text-gold-600",
                  },
                  {
                    d: "Nov 03",
                    m: "2026",
                    t: "Results & ranking release",
                    tone: "text-brand-700",
                  },
                ].map((x) => (
                  <div key={x.t} className="flex items-center gap-4 p-4">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-brand-50 text-center">
                      <span
                        className={`text-sm font-bold leading-none ${x.tone}`}
                      >
                        {x.d}
                      </span>
                      <span className="text-[10px] text-ink-soft">{x.m}</span>
                    </div>
                    <p className="text-sm font-medium text-ink">{x.t}</p>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h2 className="text-center text-xl font-semibold text-ink sm:text-2xl">
          Help &amp; Frequently Asked Questions
        </h2>
        <div className="mt-6 space-y-3">
          {faqs.map((f, i) => (
            <Card key={f.q} className="overflow-hidden">
              <button
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                <span className="text-sm font-semibold text-ink">{f.q}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-brand-500 transition-transform ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === i && (
                <p className="px-5 pb-4 text-sm leading-relaxed text-ink-soft animate-fade-in">
                  {f.a}
                </p>
              )}
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t border-line bg-brand-950 py-10">
        <div className="mx-auto max-w-4xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left column: text */}
          <div className="text-center sm:text-left">
            <p className="text-sm text-brand-200 max-w-sm">
              MyIsko — A proposed Web-Based Scholarship Management System for the
              Naga City Education, Scholarship, and Sports Office.
            </p>
            <p className="mt-3 text-xs text-brand-300">
              Prototype for academic demonstration · Not affiliated with MyNaga · ©
              2026
            </p>
          </div>
          {/* Right column: logos */}
          <div className="flex items-center gap-6 shrink-0">
            <img src={logo1} alt="Partner logo" className="h-14 w-auto object-contain" />
            <img src={logo2} alt="Partner logo" className="h-14 w-auto object-contain" />
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ---------------- Login / Register ---------------- */
export function Auth({
  go,
  mode,
  onAuth,
}: {
  go: (s: Screen) => void
  mode: "login" | "register"
  onAuth: (r: Role) => void
}) {
  const [role, setRole] = useState<Role>("applicant")
  const isLogin = mode === "login"

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    onAuth(role)
    go(
      role === "applicant"
        ? "app-dashboard"
        : role === "staff"
          ? "staff-dashboard"
          : "ncsg-dashboard",
    )
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 p-12 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-brand-600/40 blur-3xl" />
        <div className="absolute bottom-10 -left-16 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" />
        <button onClick={() => go("landing")} className="relative w-fit">
          <Logo light size="lg" />
        </button>
        <div className="relative">
          <h2 className="max-w-sm text-3xl font-bold leading-tight text-white">
            Open Opportunities for Future Scholars.
          </h2>
          <p className="mt-4 max-w-sm text-brand-100">
            Apply, submit your documents, and follow every step of your
            scholarship — with human-validated decisions you can trust.
          </p>
          <div className="mt-8 space-y-3">
            {[
              "Centralized application & document upload",
              "AI-assisted preliminary document checks",
              "Transparent status tracking & audit trail",
            ].map((t) => (
              <p
                key={t}
                className="flex items-center gap-3 text-sm text-brand-100"
              >
                <ShieldCheck size={18} className="text-gold-400" />
                {t}
              </p>
            ))}
          </div>
        </div>
        <p className="relative text-xs text-brand-300">
          Naga City ESSO · Academic prototype
        </p>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center bg-canvas p-6">
        <div className="w-full max-w-md animate-fade-up">
          <div className="mb-6 lg:hidden">
            <button onClick={() => go("landing")}>
              <Logo size="lg" />
            </button>
          </div>
          <h1 className="text-2xl font-bold text-ink">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            {isLogin
              ? "Sign in to continue your scholarship application."
              : "Register to start your scholarship application."}
          </p>

          {/* Role toggle — RBAC */}
          <div className="mt-6 grid grid-cols-3 gap-1.5 rounded-xl bg-brand-100 p-1">
            {(["applicant", "staff", "ncsg"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`rounded-lg px-1 py-2.5 text-xs font-semibold leading-tight transition-all sm:text-sm ${
                  role === r
                    ? "bg-white text-brand-700 shadow-sm"
                    : "text-brand-600 hover:text-brand-700"
                }`}
              >
                {r === "applicant"
                  ? "Applicant / Scholar"
                  : r === "staff"
                    ? "ESSO Staff"
                    : "NCSG Officer"}
              </button>
            ))}
          </div>

          {role === "ncsg" ? (
            <form onSubmit={submit} className="mt-5 space-y-4">
              <div className="rounded-xl border border-gold-300 bg-gold-50 px-4 py-3 text-xs text-brand-900">
                <span className="font-semibold">Naga City Scholarship Guild.</span>{" "}
                NCSG accounts are provisioned by the Scholarship Coordinator —
                no self-registration. Access is limited to scholar monitoring
                and event attendance.
              </div>
              <Field label="Username" required defaultValue="ncsg.officer" autoComplete="username" />
              <Field label="Password" type="password" required defaultValue="demo1234" autoComplete="current-password" />
              <Button type="submit" variant="primary" size="lg" className="w-full" icon={<ArrowRight size={18} />}>
                Login
              </Button>
            </form>
          ) : (
          <form onSubmit={submit} className="mt-5 space-y-4">
            {!isLogin && (
              <Field label="Full Name" placeholder="Juan Dela Cruz" required />
            )}
            <Field
              label={role === "staff" ? "Staff Email" : "Email Address"}
              type="email"
              placeholder={
                role === "staff"
                  ? "name@esso.nagacity.gov.ph"
                  : "you@example.com"
              }
              required
              defaultValue={
                isLogin
                  ? role === "staff"
                    ? "spiderman@esso.nagacity.gov.ph"
                    : "maria.santos@example.com"
                  : ""
              }
            />
            <Field
              label="Password"
              type="password"
              placeholder="••••••••"
              required
              defaultValue={isLogin ? "demo1234" : ""}
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              icon={<ArrowRight size={18} />}
            >
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>
          )}

          <div className="mt-4 rounded-xl border border-line bg-white px-4 py-3 text-xs text-ink-soft">
            <span className="font-semibold text-ink">Demo:</span> credentials
            are pre-filled. Pick a role above and continue to explore that
            experience.
          </div>

          <p className="mt-6 text-center text-sm text-ink-soft">
            {isLogin ? "Don't have an account? " : "Already registered? "}
            <button
              onClick={() => go(isLogin ? "register" : "login")}
              className="font-semibold text-brand-700 hover:underline"
            >
              {isLogin ? "Register" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  required,
  ...rest
}: {
  label: string
  required?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-danger-500"> *</span>}
      </span>
      <input
        className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        {...rest}
      />
    </label>
  )
}
