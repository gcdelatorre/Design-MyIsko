import { useState } from "react"
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Activity,
  Bell,
  User,
  ScanLine,
  Home,
  LogOut,
  FileCheck2,
  BarChart3,
  History,
  Menu,
  X,
} from "lucide-react"
import { Logo, Button, cx } from "./components/ui"
import { Landing, Auth } from "./screens/Public"
import {
  ApplicantDashboard,
  ApplicationForm,
  Documents,
  AppStatus,
  Notifications,
  Profile,
} from "./screens/Applicant"
import { AiVerification } from "./screens/AiVerification"
import {
  StaffDashboard,
  StaffApplications,
  StaffReview,
  AuditTrailScreen,
  Reports,
} from "./screens/Staff"
import { Modals, type ModalState } from "./components/Modals"
import { notifications } from "./lib/data"
import { NcsgApp } from "./screens/Ncsg"

export type Role = "applicant" | "staff" | "ncsg"
export type Screen = "landing" | "login" | "register" | "app-dashboard" | "app-form" | "app-documents" | "app-ai" | "app-status" | "app-notifications" | "app-profile" | "staff-dashboard" | "staff-applications" | "staff-review" | "staff-audit" | "staff-reports" | "ncsg-dashboard"

export interface Ctx {
  go: (s: Screen) => void
  openModal: (m: ModalState) => void
}

const applicantNav: { screen: Screen; label: string; icon: React.ReactNode }[] = [
  {
    screen: "app-dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={19} />,
  },
  { screen: "app-form", label: "My Application", icon: <FileText size={19} /> },
  {
    screen: "app-documents",
    label: "Documents",
    icon: <FolderOpen size={19} />,
  },
  { screen: "app-ai", label: "Smart Check", icon: <ScanLine size={19} /> },
  { screen: "app-status", label: "Status", icon: <Activity size={19} /> },
  {
    screen: "app-notifications",
    label: "Notifications",
    icon: <Bell size={19} />,
  },
  { screen: "app-profile", label: "Profile", icon: <User size={19} /> },
]

const staffNav: { screen: Screen; label: string; icon: React.ReactNode }[] = [
  {
    screen: "staff-dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={19} />,
  },
  {
    screen: "staff-applications",
    label: "Applications",
    icon: <FolderOpen size={19} />,
  },
  {
    screen: "staff-review",
    label: "Document Verification",
    icon: <FileCheck2 size={19} />,
  },
  { screen: "staff-reports", label: "Reports", icon: <BarChart3 size={19} /> },
  { screen: "staff-audit", label: "Audit Trail", icon: <History size={19} /> },
]

const mobileNav: { screen: Screen; label: string; icon: React.ReactNode }[] = [
  { screen: "app-dashboard", label: "Home", icon: <Home size={20} /> },
  { screen: "app-form", label: "Application", icon: <FileText size={20} /> },
  {
    screen: "app-documents",
    label: "Documents",
    icon: <FolderOpen size={20} />,
  },
  { screen: "app-status", label: "Status", icon: <Activity size={20} /> },
  {
    screen: "app-notifications",
    label: "Alerts",
    icon: <Bell size={20} />,
  },
]

export default function App() {
  const [screen, setScreen] = useState<Screen>("landing")
  const [role, setRole] = useState<Role>("applicant")
  const [modal, setModal] = useState<ModalState>(null)
  const [mobileMenu, setMobileMenu] = useState(false)

  const go = (s: Screen) => {
    setScreen(s)
    setMobileMenu(false)
    window.scrollTo({ top: 0 })
  }
  const ctx: Ctx = { go, openModal: setModal }
  const unread = notifications.filter((n) => n.unread).length

  // Public screens (no shell)
  if (screen === "landing")
    return (
      <>
        <Landing go={go} />
        <Modals modal={modal} onClose={() => setModal(null)} ctx={ctx} />
      </>
    )
  if (screen === "login" || screen === "register")
    return (
      <>
        <Auth go={go} mode={screen} onAuth={setRole} />
        <Modals modal={modal} onClose={() => setModal(null)} ctx={ctx} />
      </>
    )

  /* ---------------- NCSG SHELL (separate role, own state) ---------------- */
  if (role === "ncsg")
    return (
      <NcsgApp
        onSignOut={() => {
          setRole("applicant")
          go("landing")
        }}
      />
    )

  const isStaff = role === "staff"

  /* ---------------- STAFF SHELL (sidebar) ---------------- */
  if (isStaff) {
    return (
      <div className="min-h-screen bg-canvas">
        {/* Sidebar (desktop) */}
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-line bg-brand-950 lg:flex">
          <div className="border-b border-white/10 px-5 py-5">
            <Logo light />
          </div>
          <p className="px-6 pb-2 pt-5 text-[11px] font-semibold uppercase tracking-wider text-brand-300">
            ESSO Management
          </p>
          <nav className="flex-1 space-y-1 px-3">
            {staffNav.map((n, i) => {
              const active = screen === n.screen
              return (
                <button
                  key={i}
                  onClick={() => go(n.screen)}
                  className={cx(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-brand-700 text-white"
                      : "text-brand-200 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {n.icon}
                  {n.label}
                </button>
              )
            })}
          </nav>
          <div className="border-t border-white/10 p-3">
            <button
              onClick={() => {
                setRole("applicant")
                go("landing")
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-brand-200 hover:bg-white/5 hover:text-white"
            >
              <LogOut size={19} />
              Sign out
            </button>
          </div>
        </aside>

        <div className="lg:pl-64">
          <StaffTopbar
            ctx={ctx}
            unread={unread}
            onMenu={() => setMobileMenu(true)}
          />
          <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
            {screen === "staff-dashboard" && <StaffDashboard ctx={ctx} />}
            {screen === "staff-applications" && <StaffApplications ctx={ctx} />}
            {screen === "staff-review" && <StaffReview ctx={ctx} />}
            {screen === "staff-audit" && <AuditTrailScreen />}
            {screen === "staff-reports" && <Reports />}
          </main>
        </div>

        {mobileMenu && (
          <MobileDrawer
            items={staffNav}
            screen={screen}
            go={go}
            onClose={() => setMobileMenu(false)}
            onSignOut={() => {
              setRole("applicant")
              go("landing")
            }}
            dark
          />
        )}
        <Modals modal={modal} onClose={() => setModal(null)} ctx={ctx} />
      </div>
    )
  }

  /* ---------------- APPLICANT SHELL (top nav + mobile bottom nav) ---------------- */
  return (
    <div className="min-h-screen bg-canvas pb-20 lg:pb-0">
      <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <button onClick={() => go("app-dashboard")}>
            <Logo />
          </button>
          <nav className="hidden items-center gap-0.5 lg:flex">
            {applicantNav.slice(0, 6).map((n) => (
              <button
                key={n.screen}
                onClick={() => go(n.screen)}
                className={cx(
                  "relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  screen === n.screen
                    ? "bg-brand-50 text-brand-700"
                    : "text-ink-soft hover:bg-brand-50 hover:text-brand-700",
                )}
              >
                {n.label}
                {n.screen === "app-notifications" && unread > 0 && (
                  <span className="grid h-4 min-w-4 place-items-center rounded-full bg-danger-500 px-1 text-[10px] font-bold text-white">
                    {unread}
                  </span>
                )}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => go("app-notifications")}
              className="relative rounded-lg p-2 text-ink-soft hover:bg-brand-50 hover:text-brand-700 lg:hidden"
            >
              <Bell size={20} />
              {unread > 0 && (
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-danger-500" />
              )}
            </button>
            <button
              onClick={() => go("app-profile")}
              className="hidden items-center gap-2 rounded-full border border-line py-1 pl-1 pr-3 hover:border-brand-300 sm:flex"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-600 text-xs font-bold text-white">
                MS
              </span>
              <span className="text-sm font-medium text-ink">Maria</span>
            </button>
            <button
              onClick={() => setMobileMenu(true)}
              className="rounded-lg p-2 text-ink-soft hover:bg-brand-50 lg:hidden"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
        {screen === "app-dashboard" && <ApplicantDashboard ctx={ctx} />}
        {screen === "app-form" && <ApplicationForm ctx={ctx} />}
        {screen === "app-documents" && <Documents ctx={ctx} />}
        {screen === "app-ai" && <AiVerification ctx={ctx} />}
        {screen === "app-status" && <AppStatus ctx={ctx} />}
        {screen === "app-notifications" && <Notifications />}
        {screen === "app-profile" && (
          <Profile ctx={ctx} onSignOut={() => go("landing")} />
        )}
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white lg:hidden">
        <div className="mx-auto flex max-w-md items-stretch justify-between px-2">
          {mobileNav.map((n) => {
            const active =
              screen === n.screen ||
              (n.label === "Alerts" && screen === "app-notifications")
            return (
              <button
                key={n.label}
                onClick={() => go(n.screen)}
                className={cx(
                  "relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium",
                  active ? "text-brand-700" : "text-ink-soft",
                )}
              >
                {n.icon}
                {n.label}
                {n.label === "Alerts" && unread > 0 && (
                  <span className="absolute right-3 top-1.5 h-2 w-2 rounded-full bg-danger-500" />
                )}
                {active && (
                  <span className="absolute -top-px h-0.5 w-8 rounded-full bg-brand-700" />
                )}
              </button>
            )
          })}
        </div>
      </nav>

      {mobileMenu && (
        <MobileDrawer
          items={applicantNav}
          screen={screen}
          go={go}
          onClose={() => setMobileMenu(false)}
          onSignOut={() => go("landing")}
        />
      )}
      <Modals modal={modal} onClose={() => setModal(null)} ctx={ctx} />
    </div>
  )
}

function StaffTopbar({
  ctx,
  unread,
  onMenu,
}: {
  ctx: Ctx
  unread: number
  onMenu: () => void
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/90 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
        <button
          onClick={onMenu}
          className="rounded-lg p-2 text-ink-soft hover:bg-brand-50 lg:hidden"
        >
          <Menu size={22} />
        </button>
        <div className="lg:hidden">
          <Logo />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => ctx.openModal({ type: "notifications" })}
            className="relative rounded-lg p-2 text-ink-soft hover:bg-brand-50 hover:text-brand-700"
          >
            <Bell size={20} />
            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger-500" />
            )}
          </button>
          <div className="flex items-center gap-2 rounded-full border border-line py-1 pl-1 pr-3">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-gold-500 text-xs font-bold text-brand-950">
              AB
            </span>
            <div className="hidden leading-tight sm:block">
              <p className="text-xs font-semibold text-ink">Spiderman</p>
              <p className="text-[10px] text-ink-soft">
                ESSO Staff · Validator
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function MobileDrawer({
  items,
  screen,
  go,
  onClose,
  onSignOut,
  dark,
}: {
  items: { screen: Screen; label: string; icon: React.ReactNode }[]
  screen: Screen
  go: (s: Screen) => void
  onClose: () => void
  onSignOut: () => void
  dark?: boolean
}) {
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-brand-950/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cx(
          "absolute inset-y-0 right-0 w-72 p-4 animate-fade-up",
          dark ? "bg-brand-950" : "bg-white",
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <Logo light={dark} />
          <button
            onClick={onClose}
            className={cx(
              "rounded-lg p-1.5",
              dark
                ? "text-brand-200 hover:bg-white/10"
                : "text-ink-soft hover:bg-brand-50",
            )}
          >
            <X size={20} />
          </button>
        </div>
        <nav className="space-y-1">
          {items.map((n, i) => (
            <button
              key={i}
              onClick={() => go(n.screen)}
              className={cx(
                "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium",
                screen === n.screen
                  ? dark
                    ? "bg-brand-700 text-white"
                    : "bg-brand-50 text-brand-700"
                  : dark
                    ? "text-brand-200 hover:bg-white/5"
                    : "text-ink-soft hover:bg-brand-50",
              )}
            >
              {n.icon}
              {n.label}
            </button>
          ))}
          <button
            onClick={onSignOut}
            className={cx(
              "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium",
              dark
                ? "text-brand-200 hover:bg-white/5"
                : "text-ink-soft hover:bg-brand-50",
            )}
          >
            <LogOut size={19} />
            Sign out
          </button>
        </nav>
      </div>
    </div>
  )
}
