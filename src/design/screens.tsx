import {
  CheckCircle2, Clock, FileText, Users, AlertTriangle, CalendarDays, UserCheck, XCircle, RefreshCw,
  ScanLine, ShieldCheck, ArrowRight, Upload, MapPin, Plus, Flag, Download, Search, FolderOpen,
  GraduationCap, HelpCircle, Megaphone, Eye, ZoomIn, Filter, BookOpen, Wallet, Sparkles, Info,
} from "lucide-react"
import {
  Desktop, Mobile, Card, H, Txt, Cap, Big, Btn, Badge, Ic, Stat, Progress, Stacked, Bars, Table,
  Person, Timeline, Field, Checkbox, Img, Mark, useFi, cx, ink, soft, line, Pin, Dim, type Note, type StatusKey, type Role,
} from "./kit"

const HERO = "https://images.unsplash.com/photo-1756973229525-53fbc1303a61?w=900&h=1100&fit=crop&auto=format"

/* Small helpers */
function Head({ eyebrow, title, sub, action }: { eyebrow?: string; title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-7 flex items-end justify-between gap-6">
      <div>{eyebrow && <Cap up>{eyebrow}</Cap>}<H l={1} className="mt-1">{title}</H>{sub && <Txt className="mt-2">{sub}</Txt>}</div>
      {action}
    </div>
  )
}
function AiNote({ compact }: { compact?: boolean }) {
  const fi = useFi()
  return (
    <div className={cx("flex items-start gap-3 px-5 py-4", fi === "hi" ? "rounded-xl border border-[#F4D477] bg-[#FDF9EC]" : "border-2 border-dashed border-zinc-400", compact && "px-4 py-3")}>
      <Ic i={Info} tone="warn" size={28} />
      <p className={cx("text-[14px] leading-snug", ink(fi))}><b>AI results are preliminary.</b> Final validation is performed by authorized ESSO personnel.</p>
    </div>
  )
}
const STEPS7 = [
  { t: "Application Started", d: "Aug 4" }, { t: "Documents Submitted", d: "Aug 9" }, { t: "AI Pre-Verification", d: "Aug 9" },
  { t: "Staff Review", d: "In progress" }, { t: "Examination", d: "Oct 18" }, { t: "Evaluation" }, { t: "Final Status" },
]
const DOCS: [string, StatusKey, string][] = [
  ["Certificate of Grades (2nd Sem)", "verified", "PDF · 1.2 MB"], ["Certificate of Enrollment", "verified", "PDF · 860 KB"],
  ["Barangay Certificate of Residency", "attention", "JPG · 2.1 MB"], ["Income Tax Return / Certificate of Indigency", "staff", "PDF · 1.6 MB"],
  ["Birth Certificate (PSA)", "submitted", "PDF · 940 KB"], ["2×2 ID Photo", "missing", "Not uploaded"],
]

/* Faux scanned document for hi preview */
function Paper({ big }: { big?: boolean }) {
  return (
    <div className="flex h-full items-center justify-center bg-[#2a2c46] p-8">
      <div className={cx("relative w-full max-w-[520px] rotate-[-0.6deg] bg-[#fdfcf8] p-9 shadow-2xl", big ? "aspect-[8.5/11]" : "aspect-[8.5/10]")}>
        <div className="text-center"><p className="text-[10px] tracking-[0.2em] text-zinc-500">REPUBLIC OF THE PHILIPPINES</p><p className="mt-1 font-display text-[15px] font-bold text-zinc-800">ATENEO DE NAGA UNIVERSITY</p><p className="text-[11px] text-zinc-500">Office of the University Registrar</p></div>
        <p className="mt-6 text-center font-display text-[18px] font-semibold tracking-wide text-zinc-800">CERTIFICATE OF GRADES</p>
        <div className="mt-5 grid grid-cols-2 gap-y-1 text-[11px] text-zinc-700">
          <span className="rounded bg-[#8a67e6]/20 px-1 outline outline-1 outline-[#6238d1]">Name: SANTOS, MARIA L.</span><span>ID: 2023-04412</span>
          <span>Program: BS Computer Science</span><span className="rounded bg-[#8a67e6]/20 px-1 outline outline-1 outline-[#6238d1]">2nd Sem · A.Y. 2025–2026</span>
        </div>
        <div className="mt-4 space-y-1.5 border-t border-zinc-300 pt-3 text-[11px] text-zinc-700">
          {[["CS 221 Data Structures", "1.25"], ["CS 223 Discrete Math", "1.50"], ["MATH 201 Calculus II", "1.75"], ["ENG 102 Purposive Comm.", "1.25"], ["PE 4 Team Sports", "1.00"]].map(([a, b]) => (
            <div key={a} className="flex justify-between"><span>{a}</span><span>{b}</span></div>
          ))}
          <div className="flex justify-between border-t border-zinc-300 pt-1.5 font-semibold"><span>General Weighted Average</span><span className="rounded bg-[#8a67e6]/20 px-1 outline outline-1 outline-[#6238d1]">1.38</span></div>
        </div>
        <div className="absolute bottom-8 right-9 grid h-16 w-16 place-items-center rounded-full border-2 border-[#381593]/40 text-[8px] font-bold text-[#381593]/60">SEAL</div>
      </div>
    </div>
  )
}

/* ============================== APPLICANT ============================== */
export function Landing() {
  const fi = useFi()
  const hi = fi === "hi"
  return (
    <div className="h-full bg-white">
      <header className={cx("flex h-[80px] items-center gap-10 border-b px-20", line(fi))}>
        <Mark />
        <nav className={cx("flex gap-8 text-[15px] font-medium", soft(fi))}>{["Scholarships", "Requirements", "Announcements", "FAQs"].map((n) => <span key={n}>{n}</span>)}</nav>
        <div className="ml-auto flex gap-3"><Btn v="outline">Track Application</Btn><Btn>Login</Btn></div>
      </header>
      <section className={cx("relative grid grid-cols-[1.1fr_1fr] items-center gap-16 px-20 py-16", hi && "bg-[#20234E]")}>
        <Pin n={1} />
        <div>
          {hi ? <span className="inline-flex items-center gap-2 rounded-full border border-[#D4A017]/40 bg-[#D4A017]/10 px-3 py-1 text-[13px] font-semibold text-[#EAB63A]"><GraduationCap size={15} />Naga City ESSO · A.Y. 2026–2027 now open</span> : <Cap up>Announcement tag</Cap>}
          <div className={cx("mt-5 text-[56px] font-bold leading-[1.05] tracking-[-0.02em]", hi ? "font-display text-white" : ink(fi))}>Open Opportunities<br />for Future <span className={hi ? "text-[#EAB63A]" : ""}>Scholars.</span></div>
          <p className={cx("mt-5 max-w-[520px] text-[18px] leading-relaxed", hi ? "text-[#DDD3FA]" : soft(fi))}>{fi === "lo" ? <Txt lines={2}>x</Txt> : "Apply for the Naga City scholarship, upload requirements online, and follow every step — with decisions made by people, not machines."}</p>
          <div className="mt-8 flex gap-3"><Btn lg v={hi ? "gold" : "primary"} icon={ArrowRight}>Apply for Scholarship</Btn><Btn lg v="outline" icon={Search} className={hi ? "!border-white/30 !bg-transparent !text-white" : ""}>Track Application</Btn></div>
        </div>
        <Img h={420} label="Hero image" className="rounded-3xl"><img src={HERO} alt="" className="h-full w-full rounded-3xl object-cover object-top" /></Img>
      </section>
      <section className="relative -mt-8 px-20">
        <Pin n={2} />
        <div className="grid grid-cols-4 gap-5">
          {([["Apply Online", FileText], ["Track Application", Search], ["Requirements", FolderOpen], ["Help & FAQs", HelpCircle]] as const).map(([t, I]) => (
            <Card key={t} className="flex items-center gap-4 !p-5"><Ic i={I} /><div><p className={cx("text-[16px] font-semibold", ink(fi), hi && "font-display")}>{t}</p><Txt size={13}>Service shortcut</Txt></div></Card>
          ))}
        </div>
      </section>
      <section className="relative px-20 pt-12">
        <div className="mb-5 flex items-center gap-3"><Ic i={Megaphone} tone="warn" size={36} /><H l={2}>Announcements</H></div>
        <div className="grid grid-cols-3 gap-5">
          {[["Application period: Aug 1 – Sep 15", "Deadline"], ["Qualifying exam set for October 18", "Examination"], ["Orientation for new scholars", "Event"]].map(([t, c]) => (
            <Card key={t}><Cap up>{c}</Cap><p className={cx("mt-2 text-[17px] font-semibold", ink(fi))}>{fi === "lo" ? <Txt>{t}</Txt> : t}</p><Txt lines={2} className="mt-2">Short summary of the announcement for applicants and scholars.</Txt></Card>
          ))}
        </div>
      </section>
    </div>
  )
}

export function AppDashboard() {
  const fi = useFi()
  return (
    <Desktop role="applicant" active="Dashboard">
      <Head eyebrow="Applicant Portal" title="Good day, Maria" sub="Naga City Tertiary Scholarship · Reference NSP-2026-04412" />
      <div className="grid grid-cols-[1.5fr_1fr] gap-6">
        <Card pin={1} className={fi === "hi" ? "!border-0 !bg-[#20234E]" : ""}>
          <div className="flex items-start justify-between">
            <div><Cap up className={fi === "hi" ? "!text-[#EAB63A]" : ""}>Application Status</Cap><div className={cx("mt-2 text-[30px] font-semibold", fi === "hi" ? "font-display text-white" : ink(fi))}>Under Staff Review</div></div>
            <Badge s="staff" lg />
          </div>
          <div className="mt-6"><Progress v={57} tone="warn" h={12} /></div>
          <p className={cx("mt-3 text-[14px]", fi === "hi" ? "text-[#DDD3FA]" : soft(fi))}>Step 4 of 7 · Last updated Sep 28, 2026</p>
        </Card>
        <Card pin={2}>
          <Cap up>Next Action</Cap>
          <p className={cx("mt-2 text-[19px] font-semibold", ink(fi))}>Upload your 2×2 ID Photo</p>
          <Txt lines={2} className="mt-1">One requirement is still missing before staff can complete review.</Txt>
          <Btn className="mt-5" icon={Upload}>Upload now</Btn>
        </Card>
      </div>
      <div className="mt-6 grid grid-cols-[1fr_1.5fr] gap-6">
        <Card pin={3}>
          <div className="flex items-center justify-between"><H l={3}>Requirements</H><Cap>5 of 6</Cap></div>
          <div className="mt-4"><Progress v={83} tone="ok" /></div>
          <div className="mt-5 space-y-3">{DOCS.slice(0, 4).map(([d, s]) => <div key={d} className="flex items-center justify-between gap-3"><span className={cx("truncate text-[14px]", ink(fi))}>{d}</span><Badge s={s} /></div>)}</div>
        </Card>
        <Card pin={4}>
          <H l={3}>Status Timeline</H>
          <div className="mt-8"><Timeline steps={STEPS7} current={3} /></div>
        </Card>
      </div>
    </Desktop>
  )
}

export function AppForm() {
  return (
    <Desktop role="applicant" active="My Application">
      <Head eyebrow="My Application" title="Scholarship Application Form" sub="Your progress is saved automatically." />
      <Card pin={1} className="mb-6"><Timeline steps={[{ t: "Personal Information" }, { t: "Educational Information" }, { t: "Financial Information" }, { t: "Review & Submit" }]} current={1} /></Card>
      <Card pin={2}>
        <div className="mb-6 flex items-center gap-3"><Ic i={BookOpen} /><div><H l={3}>Educational Information</H><Cap>Step 2 of 4</Cap></div></div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          <Field label="School / University" value="Ateneo de Naga University" kind="select" req />
          <Field label="Course / Program" value="BS Computer Science" req />
          <Field label="Year Level" value="3rd Year" kind="select" req />
          <Field label="Student ID Number" value="2023-04412" req />
          <Field label="General Weighted Average" value="1.38" req />
          <Field label="Expected Graduation" value="May 2028" kind="date" />
        </div>
        <div className="mt-6"><Checkbox on label="I certify that the information provided is true and correct." /></div>
      </Card>
      <div className="relative mt-6 flex justify-between"><Pin n={3} /><Btn v="outline">Back</Btn><div className="flex gap-3"><Btn v="secondary">Save Draft</Btn><Btn icon={ArrowRight}>Next: Financial Information</Btn></div></div>
    </Desktop>
  )
}

export function Documents() {
  const fi = useFi()
  return (
    <Desktop role="applicant" active="Documents">
      <Head eyebrow="Documents" title="Document Requirements" sub="Upload each requirement. AI pre-checks readability before staff review." action={<Btn icon={ScanLine}>Run AI Pre-Verification</Btn>} />
      <div className="grid grid-cols-3 gap-6">
        <Stat label="Uploaded" value="5 / 6" icon={FolderOpen} pin={1} />
        <Stat label="Verified by ESSO" value="2" icon={CheckCircle2} tone="ok" />
        <Stat label="Needs your attention" value="1" icon={AlertTriangle} tone="warn" />
      </div>
      <Card pad={false} pin={2} className="mt-6">
        {DOCS.map(([d, s, m], i) => (
          <div key={d} className={cx("flex items-center gap-4 px-6 py-[18px]", i > 0 && "border-t", line(fi))}>
            <Ic i={FileText} tone={s === "missing" ? "err" : s === "attention" ? "warn" : "brand"} size={42} />
            <div className="min-w-0 flex-1"><p className={cx("text-[15px] font-medium", ink(fi))}>{d}</p><Cap className="text-[12px]">{m}</Cap></div>
            <Badge s={s} />
            <Btn v={s === "missing" ? "primary" : s === "attention" ? "secondary" : "outline"} sm icon={s === "missing" || s === "attention" ? Upload : Eye}>{s === "missing" ? "Upload" : s === "attention" ? "Re-upload" : "View"}</Btn>
          </div>
        ))}
      </Card>
    </Desktop>
  )
}

const CHECKS: [string, string, StatusKey, string][] = [
  ["Document Classification", "Identified as Certificate of Grades", "passed", "98%"],
  ["Readability", "Text is clear; no blur or glare detected", "passed", "96%"],
  ["Information Extraction", "Name, term, and GWA extracted", "passed", "94%"],
  ["Cross-Reference", "Middle initial differs from application form", "review", "—"],
]
export function AiVerify() {
  const fi = useFi()
  return (
    <Desktop role="applicant" active="AI Pre-Verification">
      <Head eyebrow="Hero feature · Decision support" title="AI-Assisted Document Pre-Verification" sub="Certificate of Grades (2nd Sem) · uploaded Aug 9, 2026" />
      <div className="relative grid grid-cols-[1.1fr_1fr] gap-6">
        <Card pad={false} pin={1} className="overflow-hidden">
          <div className={cx("flex h-[52px] items-center justify-between border-b px-5", line(fi))}><span className={cx("text-[14px] font-medium", ink(fi))}>Document Preview</span><span className={cx("flex gap-3", soft(fi))}><ZoomIn size={18} /><Eye size={18} /></span></div>
          <Img h={520} label="PDF / Image preview"><Paper /></Img>
        </Card>
        <Card pin={2}>
          <div className="flex items-center gap-3"><Ic i={Sparkles} /><div><H l={3}>AI Analysis</H><Cap>Completed in 4.2 s · model v2.1</Cap></div></div>
          <div className="mt-5 space-y-3">
            {CHECKS.map(([t, d, s, c]) => (
              <div key={t} className={cx("flex items-center gap-4 border p-4", fi === "lo" ? "border-zinc-300" : "rounded-xl", fi === "hi" ? (s === "review" ? "border-[#F4D477] bg-[#FDF9EC]" : "border-[#E4E7EC]") : fi === "mid" ? "border-zinc-300" : "")}>
                <div className="min-w-0 flex-1"><p className={cx("text-[15px] font-semibold", ink(fi))}>{t}</p><Txt size={13}>{d}</Txt></div>
                <span className={cx("font-mono text-[13px]", soft(fi))}>{c}</span>
                <Badge s={s} label={s === "passed" ? "Passed" : "Review"} />
              </div>
            ))}
          </div>
          <div className="mt-5"><AiNote compact /></div>
        </Card>
      </div>
      <div className={cx("relative mt-6 flex items-center gap-5 px-6 py-5", fi === "hi" ? "rounded-2xl bg-[#20234E]" : "border-2 border-zinc-400")}>
        <Pin n={3} />
        <Ic i={ShieldCheck} tone="info" size={44} />
        <div className="flex-1"><p className={cx("text-[13px] font-semibold uppercase tracking-[0.1em]", fi === "hi" ? "text-[#B8A2F2]" : soft(fi))}>Preliminary Result</p><p className={cx("text-[22px] font-semibold", fi === "hi" ? "font-display text-white" : ink(fi))}>READY FOR STAFF REVIEW</p></div>
        <Btn v={fi === "hi" ? "gold" : "primary"} icon={ArrowRight}>Submit for ESSO Validation</Btn>
      </div>
    </Desktop>
  )
}

export function AppStatus() {
  const fi = useFi()
  return (
    <Desktop role="applicant" active="Status">
      <Head eyebrow="Status" title="Application Status" sub="Reference NSP-2026-04412 · Naga City Tertiary Scholarship" action={<Badge s="staff" lg />} />
      <div className="grid grid-cols-[1.3fr_1fr] gap-6">
        <Card pin={1}><H l={3} className="mb-6">Progress Timeline</H><Timeline vertical steps={STEPS7} current={3} /></Card>
        <div className="space-y-6">
          <Card pin={2}><Cap up>Current Step</Cap><p className={cx("mt-2 text-[20px] font-semibold", ink(fi))}>Staff Review</p><Txt lines={3} className="mt-2">An authorized ESSO validator is reviewing your documents. You will be notified of any compliance requirement.</Txt></Card>
          <Card><Cap up>Recent Updates</Cap>
            <div className="mt-4 space-y-4">{[["Barangay certificate needs attention", "Sep 28", "attention"], ["Documents passed AI pre-check", "Aug 9", "passed"], ["Application submitted", "Aug 9", "submitted"]].map(([t, d, s]) => (
              <div key={t} className="flex items-center gap-3"><Badge s={s as StatusKey} label={d} /><span className={cx("text-[14px]", ink(fi))}>{t}</span></div>))}
            </div>
          </Card>
        </div>
      </div>
    </Desktop>
  )
}

/* ============================== ESSO ============================== */
const APPS: [string, string, StatusKey, string][] = [
  ["Maria Santos", "Ateneo de Naga University", "staff", "4 / 4 passed"], ["Juan Dela Cruz", "Bicol University", "compliance", "1 flag"],
  ["Andrea Reyes", "Universidad de Sta. Isabel", "processing", "Running"], ["Paolo Villanueva", "Naga College Foundation", "verified", "4 / 4 passed"],
  ["Kristine Bautista", "CSPC", "missing", "2 missing"],
]
export function EssoDashboard() {
  return (
    <Desktop role="esso" active="Dashboard" search="Search applicants, reference no…">
      <Head eyebrow="ESSO Scholarship Management" title="Dashboard" sub="Naga Tertiary Scholarship Program · A.Y. 2026–2027" />
      <div className="relative grid grid-cols-5 gap-5"><Pin n={1} />
        <Stat label="Total Applications" value="1,248" icon={FolderOpen} />
        <Stat label="AI Pre-Verification" value="86" icon={ScanLine} tone="info" />
        <Stat label="For Staff Review" value="43" icon={Clock} tone="warn" />
        <Stat label="For Compliance" value="27" icon={AlertTriangle} tone="err" />
        <Stat label="Completed" value="1,092" icon={CheckCircle2} tone="ok" />
      </div>
      <div className="mt-6 grid grid-cols-[1fr_2fr] gap-6">
        <Card pin={2}><H l={3}>Status Overview</H><Cap>Applications per stage</Cap><div className="mt-5"><Bars hl={2} h={230} data={[{ l: "Subm.", v: 64 }, { l: "AI", v: 86 }, { l: "Review", v: 43 }, { l: "Comp.", v: 27 }, { l: "Exam", v: 112 }]} /></div></Card>
        <Card pad={false} pin={3}>
          <div className="flex items-center justify-between p-5"><H l={3}>Applications</H><div className="flex gap-3"><Field kind="search" value="Search applicant" className="w-[260px]" /><Btn v="outline" icon={Filter}>Filter</Btn></div></div>
          <Table tpl="1.6fr 1.2fr 1fr 110px" cols={["Applicant", "AI Pre-check", "Status", "Action"]} rows={APPS.map(([n, sch, s, ai]) => [<Person n={n} sub={sch} />, <Cap>{ai}</Cap>, <Badge s={s} />, <Btn sm v="outline">Review</Btn>])} />
        </Card>
      </div>
    </Desktop>
  )
}

export function EssoReview() {
  const fi = useFi()
  return (
    <Desktop role="esso" active="Applications">
      <Head eyebrow="Applications › NSP-2026-04412" title="Application Review" action={<Badge s="staff" lg />} />
      <div className="grid grid-cols-[1fr_1.4fr] gap-6">
        <div className="space-y-6">
          <Card pin={1}>
            <div className="flex items-center gap-4"><Ic i={Users} size={56} /><div><H l={3}>Maria L. Santos</H><Cap>BS Computer Science · 3rd Year</Cap></div></div>
            <div className="mt-5 grid grid-cols-2 gap-4">{[["School", "Ateneo de Naga Univ."], ["Barangay", "Concepcion Pequeña"], ["GWA", "1.38"], ["Household income", "₱ 14,500 / mo"]].map(([k, v]) => <div key={k}><Cap className="text-[12px]">{k}</Cap><p className={cx("text-[15px] font-medium", ink(fi))}>{v}</p></div>)}</div>
          </Card>
          <Card pin={3}>
            <div className="flex items-center gap-3"><Ic i={Sparkles} tone="info" size={36} /><H l={3}>AI Findings</H></div>
            <div className="mt-4 space-y-2.5">{CHECKS.map(([t, , s]) => <div key={t} className="flex items-center justify-between"><span className={cx("text-[14px]", ink(fi))}>{t}</span><Badge s={s} label={s === "passed" ? "Passed" : "Review"} /></div>)}</div>
            <p className={cx("mt-4 text-[12px]", soft(fi))}>Preliminary only — not an approval or rejection.</p>
          </Card>
        </div>
        <div className="space-y-6">
          <Card pad={false} pin={2}>
            <div className="p-5"><H l={3}>Submitted Documents</H></div>
            {DOCS.slice(0, 5).map(([d, s], i) => <div key={d} className={cx("flex items-center gap-4 border-t px-5 py-3.5", line(fi))}><Ic i={FileText} size={34} /><span className={cx("flex-1 text-[14px]", ink(fi))}>{d}</span><Badge s={s} /><Btn sm v="outline">{i === 2 ? "Review" : "Open"}</Btn></div>)}
          </Card>
          <Card pin={4} className={fi === "hi" ? "!border-[#B8A2F2] !bg-[#F6F3FE]" : ""}>
            <div className="flex items-center gap-3"><Ic i={ShieldCheck} size={36} /><div><H l={3}>Staff Validation</H><Cap>Official decision · authorized ESSO personnel only</Cap></div></div>
            <Field label="Validation remarks" value="All documents consistent; middle initial confirmed via PSA." className="mt-5" />
            <div className="mt-5 flex gap-3"><Btn v="success" icon={CheckCircle2}>Validate Application</Btn><Btn v="outline" icon={AlertTriangle}>Request Compliance</Btn></div>
          </Card>
        </div>
      </div>
    </Desktop>
  )
}

export function EssoDocReview() {
  const fi = useFi()
  return (
    <Desktop role="esso" active="Document Review">
      <Head eyebrow="Document Review · Maria L. Santos" title="Certificate of Grades" action={<div className="flex gap-3"><Btn v="outline">Previous</Btn><Btn v="outline">Next document</Btn></div>} />
      <div className="grid grid-cols-[1.2fr_1fr] gap-6">
        <Card pad={false} pin={1} className="overflow-hidden"><Img h={700} label="Document preview"><Paper big /></Img></Card>
        <div className="space-y-5">
          <Card pin={2}>
            <H l={3}>Extracted vs. Application</H>
            <div className="mt-4">
              <Table tpl="1fr 1.2fr 90px" cols={["Field", "Extracted", "Match"]} rows={[["Name", "Santos, Maria L.", <Badge s="passed" label="Match" />], ["Term", "2nd Sem 2025–26", <Badge s="passed" label="Match" />], ["GWA", "1.38", <Badge s="passed" label="Match" />], ["Middle initial", "L. (form: M.)", <Badge s="review" label="Check" />]].map((r) => r.map((c) => typeof c === "string" ? <span className="text-[14px]">{c}</span> : c))} />
            </div>
          </Card>
          <Card pin={3}>
            <H l={3}>Verification Checklist</H>
            <div className="mt-4 space-y-3"><Checkbox on label="Document is authentic and complete" /><Checkbox on label="Registrar seal / signature present" /><Checkbox label="Details consistent with application" /></div>
          </Card>
          <Card>
            <Cap up>Staff decision</Cap>
            <div className="mt-3 grid grid-cols-2 gap-3"><Btn v="success" icon={CheckCircle2}>Mark Verified</Btn><Btn v="outline" icon={AlertTriangle}>Needs Compliance</Btn></div>
            <p className={cx("mt-3 text-[12px]", soft(fi))}>Recorded in the audit trail with your name and timestamp.</p>
          </Card>
        </div>
      </div>
    </Desktop>
  )
}

const AUDIT: [string, string, string, string, string][] = [
  ["Ana Bernal", "Validated application", "Oct 1, 2026", "10:42 AM", "NSP-2026-04412"],
  ["AI Service", "Pre-verification completed", "Sep 30, 2026", "4:15 PM", "NSP-2026-04430"],
  ["ncsg.officer", "Status Inactive → Active", "Sep 30, 2026", "2:08 PM", "Scholar S-0142"],
  ["Ana Bernal", "Requested compliance", "Sep 29, 2026", "9:03 AM", "NSP-2026-04418"],
  ["Maria Santos", "Uploaded document", "Sep 28, 2026", "8:51 PM", "Barangay Certificate"],
  ["ncsg.officer", "Marked attendance · Present", "Sep 12, 2026", "11:20 AM", "Peñafrancia Corps"],
]
export function EssoAudit() {
  return (
    <Desktop role="esso" active="Audit Trail">
      <Head eyebrow="Traceability" title="Audit Trail" sub="Every action by people and the AI service is recorded and cannot be edited." action={<Btn v="outline" icon={Download}>Export log</Btn>} />
      <Card pad={false} pin={1}>
        <div className="flex gap-3 p-5"><Field kind="search" value="Search user, action or record" className="w-[360px]" /><Field kind="select" value="All roles" className="w-[180px]" /><Field kind="date" value="Sep 1 – Oct 1, 2026" className="w-[240px]" /></div>
        <Table tpl="1.3fr 1.6fr 1fr 0.8fr 1.2fr" cols={["User", "Action", "Date", "Time", "Record"]} rows={AUDIT.map(([u, a, d, t, r]) => [<Person n={u} />, <span>{a}</span>, <span>{d}</span>, <span className="font-mono text-[13px]">{t}</span>, <span className="font-mono text-[13px]">{r}</span>])} />
      </Card>
    </Desktop>
  )
}

export function EssoReports() {
  return (
    <Desktop role="esso" active="Reports">
      <Head eyebrow="Reports" title="Scholarship Reports" action={<Btn icon={Download}>Generate PDF</Btn>} />
      <Card pin={1} className="mb-6 flex gap-4 !p-5"><Field kind="select" value="A.Y. 2026–2027" className="w-[220px]" /><Field kind="select" value="All schools" className="w-[220px]" /><Field kind="select" value="All barangays" className="w-[220px]" /><Btn v="secondary" icon={Filter} className="ml-auto self-center">Apply filters</Btn></Card>
      <div className="grid grid-cols-4 gap-5"><Stat label="Applications" value="1,248" icon={FolderOpen} /><Stat label="Avg. processing" value="6.4 d" icon={Clock} tone="info" /><Stat label="AI pre-check pass rate" value="91%" icon={ScanLine} tone="ok" /><Stat label="Compliance requests" value="27" icon={AlertTriangle} tone="warn" /></div>
      <div className="mt-6 grid grid-cols-2 gap-6">
        <Card pin={2}><H l={3}>Applications by School</H><div className="mt-5"><Bars h={220} hl={0} data={[{ l: "AdNU", v: 312 }, { l: "BU", v: 268 }, { l: "USI", v: 201 }, { l: "NCF", v: 188 }, { l: "CSPC", v: 164 }, { l: "Others", v: 115 }]} /></div></Card>
        <Card><H l={3}>Pipeline Distribution</H><div className="mt-8"><Stacked h={18} parts={[{ v: 1092, tone: "ok", l: "Completed" }, { v: 86, tone: "info", l: "AI Pre-check" }, { v: 43, tone: "warn", l: "Staff Review" }, { v: 27, tone: "err", l: "Compliance" }]} /></div></Card>
      </div>
    </Desktop>
  )
}

/* ============================== NCSG ============================== */
const SCH: [string, string, string, StatusKey, StatusKey, string][] = [
  ["Maria Santos", "Ateneo de Naga University", "3rd Year", "active", "compliant", "Oct 1, 2026"],
  ["Juan Dela Cruz", "Bicol University", "2nd Year", "active", "attention", "Sep 29, 2026"],
  ["Andrea Reyes", "Universidad de Sta. Isabel", "4th Year", "active", "pending", "Sep 28, 2026"],
  ["Paolo Villanueva", "Naga College Foundation", "1st Year", "active", "compliant", "Sep 27, 2026"],
  ["Kristine Bautista", "CSPC", "3rd Year", "inactive", "inactive", "Sep 20, 2026"],
  ["Miguel Ramos", "Ateneo de Naga University", "2nd Year", "active", "attention", "Sep 26, 2026"],
]

export function NcsgLogin() {
  const fi = useFi()
  return (
    <div className="grid h-full grid-cols-2">
      <div className={cx("relative flex flex-col justify-between p-16", fi === "hi" ? "bg-[#20234E]" : "border-r-2 border-zinc-300 bg-zinc-100")}>
        <Mark light />
        <div>
          <Cap up className={fi === "hi" ? "!text-[#EAB63A]" : ""}>Naga City Scholarship Guild</Cap>
          <div className={cx("mt-3 text-[44px] font-bold leading-tight", fi === "hi" ? "font-display text-white" : ink(fi))}>Scholar Monitoring<br />for NCSG Officers</div>
          <p className={cx("mt-4 max-w-[440px] text-[17px]", fi === "hi" ? "text-[#DDD3FA]" : soft(fi))}>{fi === "lo" ? <Txt lines={2}>x</Txt> : "Monitor scholar status, renewal compliance, and attendance in important city events."}</p>
        </div>
        <Cap className={fi === "hi" ? "!text-[#B8A2F2]" : ""}>Accounts are provisioned by the Scholarship Coordinator.</Cap>
      </div>
      <div className="flex items-center justify-center bg-white">
        <div className="relative w-[420px]"><Pin n={1} />
          <H l={1}>NCSG Officer Login</H>
          <Txt className="mt-2">Sign in with the credentials provided by ESSO.</Txt>
          <div className="mt-8 space-y-5"><Field label="Username" value="ncsg.officer" req /><Field label="Password" value="x" kind="password" req /></div>
          <Btn lg className="mt-7 w-full" icon={ArrowRight}>Login</Btn>
          <div className={cx("mt-6 flex items-center gap-2 text-[13px]", soft(fi))}><ShieldCheck size={16} />Role-restricted access · monitoring only</div>
        </div>
      </div>
    </div>
  )
}

export function NcsgDashboard() {
  const fi = useFi()
  const hi = fi === "hi"
  return (
    <Desktop role="ncsg" active="Dashboard" search="Find a scholar by name or ID">
      <Head eyebrow="NCSG Scholar Monitoring" title="Good day, NCSG Officer" sub="Monitor scholar status, renewal compliance, and participation in important events." />
      <Card pad={false} pin={1} className="grid grid-cols-[1.3fr_1fr] overflow-hidden">
        <div className={cx("p-7", hi ? "bg-[#20234E]" : fi === "mid" ? "border-r border-zinc-300" : "border-r-2 border-zinc-300")}>
          <Cap up className={hi ? "!text-[#EAB63A]" : ""}>01 · Scholar Status</Cap>
          <div className="mt-3 flex items-end gap-4"><span className={cx("text-[56px] font-bold leading-none", hi ? "font-display text-white" : ink(fi))}>95.9%</span><span className={cx("pb-2 text-[15px]", hi ? "text-[#DDD3FA]" : soft(fi))}>of 878 city scholars are active</span></div>
          <div className={cx("mt-6 flex h-[14px] overflow-hidden rounded-full", hi ? "bg-white/10" : "border border-zinc-400")}><div className={hi ? "bg-[#EAB63A]" : "bg-zinc-400"} style={{ width: "95.9%" }} /><div className={cx("flex-1", hi ? "bg-[#DC2B2B]" : "bg-zinc-100")} /></div>
          <div className={cx("mt-3 flex gap-5 text-[14px]", hi ? "text-[#DDD3FA]" : soft(fi))}><span className="flex items-center gap-1.5"><CheckCircle2 size={15} />Active 842</span><span className="flex items-center gap-1.5"><XCircle size={15} />Inactive 36</span></div>
        </div>
        <div className="p-7">
          <Cap up>02 · Renewal Compliance</Cap>
          <Txt className="mt-2" size={14}>A.Y. 2026–2027 · 1st Semester cycle</Txt>
          <div className="mt-5"><Stacked parts={[{ v: 726, tone: "ok", l: "Compliant" }, { v: 88, tone: "warn", l: "Pending" }, { v: 28, tone: "err", l: "Attention" }]} /></div>
        </div>
      </Card>
      <div className="relative mt-6 grid grid-cols-6 gap-4"><Pin n={2} />
        <Stat label="Active Scholars" value="842" icon={CheckCircle2} tone="ok" />
        <Stat label="Inactive Scholars" value="36" icon={XCircle} tone="err" />
        <Stat label="For Renewal" value="124" icon={RefreshCw} tone="info" />
        <Stat label="Compliance Attention" value="28" icon={AlertTriangle} tone="warn" />
        <Stat label="Upcoming Events" value="3" icon={CalendarDays} />
        <Stat label="Attendance to Review" value="17" icon={UserCheck} tone="warn" />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-6">
        <Card pin={3}>
          <Cap up>03 · Next Event</Cap>
          <H l={3} className="mt-2">Naga City Civic Parade</H>
          <div className={cx("mt-1 flex gap-5 text-[14px]", soft(fi))}><span className="flex items-center gap-1.5"><CalendarDays size={15} />October 25, 2026</span><span className="flex items-center gap-1.5"><MapPin size={15} />Naga City</span></div>
          <p className={cx("mt-5 text-[15px]", ink(fi))}><b className="text-[26px]">218</b> / 250 scholars attended</p>
          <div className="mt-3"><Stacked parts={[{ v: 218, tone: "ok", l: "Present" }, { v: 21, tone: "err", l: "Absent" }, { v: 11, tone: "warn", l: "Pending" }]} /></div>
        </Card>
        <Card pin={4}>
          <Cap up>04 · Needs attention</Cap>
          <div className="mt-4 space-y-3">{SCH.filter((s) => s[4] !== "compliant").slice(0, 4).map(([n, sc, , , c]) => <div key={n} className="flex items-center justify-between gap-3"><Person n={n} sub={sc} /><Badge s={c} /></div>)}</div>
        </Card>
      </div>
    </Desktop>
  )
}

export function NcsgScholars() {
  return (
    <Desktop role="ncsg" active="Scholars">
      <Head eyebrow="Monitoring" title="Scholar Monitoring" sub="Search a scholar to view status and renewal compliance." />
      <Card pad={false} pin={1}>
        <div className="flex items-center gap-3 p-5"><Field kind="search" value="Search by name, school, or scholar ID" className="flex-1" /><Field kind="select" value="Status: All" className="w-[180px]" /><Field kind="select" value="Compliance: All" className="w-[220px]" /></div>
        <Table tpl="1.5fr 1.4fr 0.8fr 0.9fr 1.1fr 0.9fr 90px" cols={["Scholar", "School", "Year Level", "Status", "Renewal Compliance", "Last Updated", "Action"]}
          rows={SCH.map(([n, s, y, st, c, u]) => [<Person n={n} />, <span className="truncate">{s}</span>, <span>{y}</span>, <Badge s={st} />, <Badge s={c} />, <span className="text-[13px]">{u}</span>, <Btn sm v="outline">View</Btn>])} />
      </Card>
    </Desktop>
  )
}

export function NcsgProfile() {
  const fi = useFi()
  return (
    <Desktop role="ncsg" active="Scholars">
      <Head eyebrow="Scholar Monitoring Profile" title="Juan Dela Cruz" action={<Btn v="gold" icon={Flag}>Flag for Follow-up</Btn>} />
      <div className="grid grid-cols-[1fr_1.15fr] gap-6">
        <div className="space-y-6">
          <Card pin={1}>
            <Cap up>Current Scholar Status</Cap>
            <div className="mt-3 flex items-center justify-between"><Badge s="active" lg /><Btn v="outline" sm icon={RefreshCw}>Update status</Btn></div>
            <Txt size={13} className="mt-3">Monitoring status only — official decisions remain with ESSO.</Txt>
          </Card>
          <Card pin={2}>
            <H l={3}>Scholar Information</H>
            <div className="mt-4 grid grid-cols-2 gap-4">{[["School", "Bicol University"], ["Course / Program", "BS Civil Engineering"], ["Year Level", "2nd Year"], ["Academic Year", "2026–2027"], ["Scholar ID", "S-0158"], ["Status", "Active"]].map(([k, v]) => <div key={k}><Cap className="text-[12px]">{k}</Cap><p className={cx("text-[15px] font-medium", ink(fi))}>{v}</p></div>)}</div>
          </Card>
          <Card><H l={3}>Monitoring Notes</H><Field value="Coordinate with BU registrar for grade release." className="mt-3" /></Card>
        </div>
        <div className="space-y-6">
          <Card pin={3}>
            <div className="flex items-center justify-between"><H l={3}>Renewal Compliance</H><Badge s="attention" /></div>
            <div className="mt-5 space-y-3">{([["Renewal requirement submitted", true], ["Academic requirement recorded", false], ["NCSG participation recorded", true]] as const).map(([t, ok]) => (
              <div key={t} className={cx("flex items-center gap-3 border px-4 py-3", fi !== "lo" && "rounded-xl", fi === "hi" ? (ok ? "border-[#DCF5E7] bg-[#DCF5E7]/50" : "border-[#FDEECD] bg-[#FDEECD]/60") : "border-zinc-300")}>
                {fi === "lo" ? <span className="h-4 w-4 rounded-full border border-zinc-400" /> : ok ? <CheckCircle2 size={19} className={fi === "hi" ? "text-[#0B7A43]" : ""} /> : <AlertTriangle size={19} className={fi === "hi" ? "text-[#93470A]" : ""} />}
                <span className={cx("flex-1 text-[15px]", ink(fi))}>{t}</span><Cap>{ok ? "Recorded" : "Needs attention"}</Cap>
              </div>))}
            </div>
            <div className={cx("mt-5 grid grid-cols-2 gap-4 border-t pt-5", line(fi))}><div><Cap className="text-[12px]">Last Compliance Update</Cap><p className={cx("font-medium", ink(fi))}>Sep 29, 2026</p></div><div><Cap className="text-[12px]">Next Renewal Period</Cap><p className={cx("font-medium", ink(fi))}>Jan 5 – Feb 6, 2027</p></div></div>
          </Card>
          <Card pin={4}><H l={3}>Compliance History</H><div className="mt-4"><Timeline vertical current={2} steps={[{ t: "Renewal requirement submitted", d: "Sep 10, 2026" }, { t: "NCSG participation recorded", d: "Sep 12, 2026" }, { t: "Academic requirement pending", d: "Awaiting grades" }]} /></div></Card>
        </div>
      </div>
    </Desktop>
  )
}

const EVENTS: [string, string, string, number, number][] = [
  ["Naga City Civic Parade", "Oct 25, 2026 · 7:00 AM", "Naga City", 250, 218],
  ["Scholars' General Assembly", "Nov 8, 2026 · 1:00 PM", "Naga City Civic Center", 878, 0],
  ["Coastal Clean-up Drive", "Nov 22, 2026 · 6:00 AM", "Brgy. Sabang Riverbank", 120, 0],
]
export function NcsgEvents() {
  const fi = useFi()
  return (
    <Desktop role="ncsg" active="Events">
      <Head eyebrow="Events & Attendance" title="Events" sub="Organize and monitor scholar participation in important activities." action={<Btn icon={Plus}>Create Event</Btn>} />
      <div className="grid grid-cols-[1fr_380px] gap-6">
        <div className="relative space-y-5"><Pin n={1} />
          {EVENTS.map(([n, d, l, e, p], i) => (
            <Card key={n} className="flex gap-6">
              <div className={cx("grid h-[84px] w-[84px] shrink-0 place-items-center text-center", fi === "hi" ? (i === 0 ? "rounded-2xl bg-[#381593] text-white" : "rounded-2xl bg-[#EEE9FC] text-[#381593]") : "border-2 border-zinc-300")}>
                <span><span className="block text-[13px] font-semibold uppercase">{d.slice(0, 3)}</span><span className="text-[30px] font-bold leading-none">{d.split(" ")[1].replace(",", "")}</span></span>
              </div>
              <div className="flex-1">
                <Cap up>{i === 0 ? "Upcoming · this month" : "Upcoming"}</Cap>
                <H l={3} className="mt-1">{n}</H>
                <div className={cx("mt-1 flex gap-5 text-[14px]", soft(fi))}><span className="flex items-center gap-1.5"><Clock size={14} />{d.split("· ")[1]}</span><span className="flex items-center gap-1.5"><MapPin size={14} />{l}</span></div>
                <div className="mt-4 flex items-center gap-6"><Cap>Expected <b className={ink(fi)}>{e}</b></Cap>{p > 0 && <Cap>Present <b className={ink(fi)}>{p}</b></Cap>}<Btn sm v="outline" className="ml-auto" icon={UserCheck}>Open attendance</Btn></div>
              </div>
            </Card>
          ))}
        </div>
        <Card pin={2}>
          <H l={3}>Create Event</H>
          <div className="mt-5 space-y-4">
            <Field label="Event Name" value="e.g. Scholars' Tree Planting" req />
            <div className="grid grid-cols-2 gap-3"><Field label="Date" value="Dec 5, 2026" kind="date" req /><Field label="Time" value="8:00 AM" kind="select" req /></div>
            <Field label="Location" value="Plaza Rizal" req />
            <Field label="Description" value="Short purpose of the event" />
            <Field label="Expected Participants" value="150" req />
          </div>
          <Btn className="mt-6 w-full" icon={Plus}>Create Event</Btn>
        </Card>
      </div>
    </Desktop>
  )
}

const ATT: [string, StatusKey, StatusKey][] = [["Maria Santos", "active", "present"], ["Juan Dela Cruz", "active", "absent"], ["Andrea Reyes", "active", "pending"], ["Paolo Villanueva", "active", "present"], ["Miguel Ramos", "active", "pending"], ["Leah Fernandez", "active", "present"]]
function AttRow({ n, st, a, mobile }: { n: string; st: StatusKey; a: StatusKey; mobile?: boolean }) {
  const fi = useFi()
  const sel = (on: boolean, ok: boolean) => on && fi === "hi" ? (ok ? "!bg-[#0F8A4D] !text-white !border-[#0F8A4D]" : "!bg-[#C42B2B] !text-white !border-[#C42B2B]") : ""
  return (
    <div className={cx("border-t", line(fi), mobile ? "space-y-3 px-4 py-4" : "grid min-h-[72px] grid-cols-[1.5fr_1fr_1fr_300px] items-center gap-4 px-6")}>
      <div className="flex items-center justify-between"><Person n={n} />{mobile && <Badge s={a} />}</div>
      {!mobile && <><Badge s={st} /><Badge s={a} /></>}
      <div className="grid grid-cols-2 gap-2">
        <Btn v="outline" className={cx("w-full", sel(a === "present", true))} icon={CheckCircle2} lg={mobile}>Mark Present</Btn>
        <Btn v="outline" className={cx("w-full", sel(a === "absent", false))} icon={XCircle} lg={mobile}>Mark Absent</Btn>
      </div>
    </div>
  )
}
export function NcsgAttendance() {
  return (
    <Desktop role="ncsg" active="Attendance">
      <Head eyebrow="Naga City Civic Parade · Oct 25, 2026" title="Attendance" sub="Quick attendance marking — built for use on-site." />
      <Card pad={false} pin={1}>
        <div className="flex gap-3 p-5"><Field kind="search" value="Search scholar name" className="flex-1" /><Field kind="select" value="Show: All" className="w-[200px]" /></div>
        <div className="grid grid-cols-[1.5fr_1fr_1fr_300px] gap-4 bg-black/[0.03] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#667085]"><span>Scholar</span><span>Status</span><span>Attendance</span><span>Update</span></div>
        <div className="relative"><Pin n={2} />{ATT.map(([n, s, a]) => <AttRow key={n} n={n} st={s} a={a} />)}</div>
      </Card>
    </Desktop>
  )
}

export function NcsgAttSummary() {
  const fi = useFi()
  return (
    <Desktop role="ncsg" active="Attendance">
      <Head eyebrow="Event Attendance Summary" title="Naga City Civic Parade" sub="October 25, 2026 · 7:00 AM · Naga City" />
      <div className="relative grid grid-cols-4 gap-5"><Pin n={1} />
        <Stat label="Total Expected" value="250" icon={Users} /><Stat label="Present" value="218" icon={CheckCircle2} tone="ok" /><Stat label="Absent" value="21" icon={XCircle} tone="err" /><Stat label="Pending" value="11" icon={Clock} tone="warn" />
      </div>
      <Card pin={2} className="mt-6">
        <div className="flex items-end justify-between"><p className={cx("text-[17px]", ink(fi))}><b className="text-[34px]">218 / 250</b> scholars attended</p><span className={cx("text-[30px] font-bold", fi === "hi" ? "font-display text-[#0B7A43]" : ink(fi))}>87%</span></div>
        <div className="mt-4"><Stacked h={20} parts={[{ v: 218, tone: "ok", l: "Present" }, { v: 21, tone: "err", l: "Absent" }, { v: 11, tone: "warn", l: "Pending" }]} /></div>
      </Card>
      <Card className="mt-6"><H l={3}>Attendance by School</H>
        <div className="mt-5 space-y-4">{[["Ateneo de Naga University", 92], ["Bicol University", 88], ["Universidad de Sta. Isabel", 85], ["Naga College Foundation", 81], ["CSPC", 79]].map(([s, v]) => (
          <div key={s} className="grid grid-cols-[260px_1fr_48px] items-center gap-4"><span className={cx("text-[14px]", ink(fi))}>{s}</span><Progress v={v as number} tone="ok" /><span className={cx("text-right text-[14px] font-semibold", ink(fi))}>{v}%</span></div>))}
        </div>
      </Card>
    </Desktop>
  )
}

export function NcsgReports() {
  const fi = useFi()
  return (
    <Desktop role="ncsg" active="Reports">
      <Head eyebrow="Restricted · NCSG" title="Monitoring Reports" sub="For monitoring and administrative reference." action={<Btn v="outline" icon={Download}>Export</Btn>} />
      <div className="grid grid-cols-2 gap-6">
        <Card pin={1}><H l={3}>Scholar Status Report</H><Cap>As of Oct 1, 2026</Cap><div className="mt-6"><Stacked h={18} parts={[{ v: 842, tone: "ok", l: "Active" }, { v: 36, tone: "err", l: "Inactive" }]} /></div></Card>
        <Card pin={2}><H l={3}>Renewal Compliance Report</H><Cap>1st Semester renewal cycle</Cap><div className="mt-6"><Stacked h={18} parts={[{ v: 726, tone: "ok", l: "Compliant" }, { v: 88, tone: "warn", l: "Pending" }, { v: 28, tone: "err", l: "Needs Attention" }]} /></div></Card>
      </div>
      <Card pad={false} pin={3} className="mt-6">
        <div className="p-5"><H l={3}>Event Attendance Report</H></div>
        <Table tpl="1.6fr 1fr 0.7fr 0.7fr 0.7fr 0.7fr" cols={["Event", "Date", "Expected", "Present", "Absent", "Pending"]} rows={[["Peñafrancia Volunteer Corps", "Sep 12, 2026", 180, 156, 12, 12], ["Naga City Civic Parade", "Oct 25, 2026", 250, 218, 21, 11], ["Scholars' General Assembly", "Nov 8, 2026", 878, 0, 0, 878]].map((r) => r.map((c, i) => <span className={cx(i > 2 && fi === "hi" && ["", "", "", "text-[#0B7A43]", "text-[#B32222]", "text-[#93470A]"][i], i > 1 && "font-semibold")}>{c}</span>))} />
      </Card>
    </Desktop>
  )
}

/* ============================== MOBILE ============================== */
export function MApplicantHome() {
  const fi = useFi()
  return (
    <Mobile role="applicant" active="Home">
      <div><Cap>Good day,</Cap><H l={2}>Maria Santos</H></div>
      <Card className={cx("!p-5", fi === "hi" && "!border-0 !bg-[#20234E]")}>
        <div className="flex items-center justify-between"><Cap up className={fi === "hi" ? "!text-[#EAB63A]" : ""}>Status</Cap><Badge s="staff" /></div>
        <p className={cx("mt-2 text-[22px] font-semibold", fi === "hi" ? "font-display text-white" : ink(fi))}>Under Staff Review</p>
        <div className="mt-4"><Progress v={57} tone="warn" /></div>
        <p className={cx("mt-2 text-[13px]", fi === "hi" ? "text-[#DDD3FA]" : soft(fi))}>Step 4 of 7</p>
      </Card>
      <div className="grid grid-cols-2 gap-3">
        {([["Apply", FileText], ["Documents", FolderOpen], ["AI Check", ScanLine], ["Track", Search]] as const).map(([t, I]) => <Card key={t} className="flex flex-col gap-3 !p-4"><Ic i={I} size={40} /><span className={cx("text-[15px] font-semibold", ink(fi))}>{t}</span></Card>)}
      </div>
      <Card className="!p-5"><Cap up>Next Action</Cap><p className={cx("mt-1 text-[16px] font-semibold", ink(fi))}>Upload your 2×2 ID Photo</p><Btn className="mt-4 w-full" lg icon={Upload}>Upload now</Btn></Card>
    </Mobile>
  )
}
export function MDocuments() {
  const fi = useFi()
  return (
    <Mobile role="applicant" active="Documents" title="Documents">
      <Card className="!p-4"><div className="flex items-center justify-between"><span className={cx("text-[15px] font-semibold", ink(fi))}>5 of 6 uploaded</span><Cap>83%</Cap></div><div className="mt-3"><Progress v={83} tone="ok" /></div></Card>
      <Card pad={false}>{DOCS.map(([d, s], i) => <div key={d} className={cx("flex items-center gap-3 px-4 py-3.5", i > 0 && "border-t", line(fi))}><Ic i={FileText} size={36} tone={s === "missing" ? "err" : "brand"} /><div className="min-w-0 flex-1"><p className={cx("truncate text-[14px] font-medium", ink(fi))}>{d}</p><div className="mt-1"><Badge s={s} /></div></div></div>)}</Card>
      <Btn lg className="w-full" icon={ScanLine}>Run AI Pre-Verification</Btn>
    </Mobile>
  )
}
export function MAi() {
  return (
    <Mobile role="applicant" active="More" title="AI Pre-Verification">
      <Card pad={false} className="overflow-hidden"><Img h={250} label="Document preview"><Paper /></Img></Card>
      <Card className="!p-4 space-y-3">{CHECKS.map(([t, , s]) => <div key={t} className="flex items-center justify-between"><span className="text-[14px] font-medium">{t}</span><Badge s={s} label={s === "passed" ? "Passed" : "Review"} /></div>)}</Card>
      <AiNote compact />
    </Mobile>
  )
}
export function MNcsgHome() {
  const fi = useFi()
  return (
    <Mobile role="ncsg" active="Home">
      <div><Cap>NCSG Scholar Monitoring</Cap><H l={2}>Good day, Officer</H></div>
      <Card className={cx("!p-5", fi === "hi" && "!border-0 !bg-[#20234E]")}>
        <Cap up className={fi === "hi" ? "!text-[#EAB63A]" : ""}>Scholar Status</Cap>
        <p className={cx("mt-1 text-[40px] font-bold", fi === "hi" ? "font-display text-white" : ink(fi))}>842 <span className="text-[16px] font-medium opacity-70">active · 36 inactive</span></p>
      </Card>
      <div className="grid grid-cols-2 gap-3"><Stat label="For Renewal" value="124" icon={RefreshCw} tone="info" /><Stat label="Needs Attention" value="28" icon={AlertTriangle} tone="warn" /></div>
      <Card className="!p-4"><Cap up>Next Event · Oct 25</Cap><p className={cx("mt-1 text-[16px] font-semibold", ink(fi))}>Naga City Civic Parade</p><div className="mt-3"><Progress v={87} tone="ok" /></div><Cap className="mt-2 block">218 / 250 attended</Cap></Card>
    </Mobile>
  )
}
export function MNcsgAttendance() {
  const fi = useFi()
  return (
    <Mobile role="ncsg" active="Attendance" title="Attendance">
      <div className="grid grid-cols-3 gap-2">{([["Present", "218", "ok"], ["Absent", "21", "err"], ["Pending", "11", "warn"]] as const).map(([l, v, t]) => <Card key={l} className="!p-3 text-center"><Big className="!text-[24px]">{v}</Big><div className="mt-2"><Badge s={t === "ok" ? "present" : t === "err" ? "absent" : "pending"} label={l} /></div></Card>)}</div>
      <Field kind="search" value="Search scholar name" />
      <Card pad={false} className={cx("overflow-hidden", fi === "lo" && "[&>div:first-child]:border-t-0")}>{ATT.slice(0, 3).map(([n, s, a]) => <AttRow key={n} n={n} st={s} a={a} mobile />)}</Card>
    </Mobile>
  )
}

/* ============================== REGISTRY ============================== */
export interface ScreenDef { code: string; title: string; role: Role; device: "desktop" | "mobile"; C: () => React.ReactElement; notes?: Note[]; hiCode?: string }
export const SCREENS: ScreenDef[] = [
  { code: "LF-01", title: "Landing Page", role: "applicant", device: "desktop", C: Landing, notes: [{ n: 1, t: "Hero + dual CTA", d: "Apply and Track are equal-weight entry points for new and returning applicants." }, { n: 2, t: "Service shortcuts", d: "MyNagaApp-style tiles give one-tap access to common services." }] },
  { code: "LF-02", title: "Applicant Dashboard", role: "applicant", device: "desktop", C: AppDashboard, notes: [{ n: 1, t: "Status Card", d: "Provides immediate visibility of application progress." }, { n: 2, t: "Next Action", d: "One clear task reduces uncertainty about what to do next." }, { n: 3, t: "Requirement progress", d: "Shows completeness at a glance." }, { n: 4, t: "Timeline", d: "Mirrors the official 7-step process." }] },
  { code: "LF-03", title: "Application Form", role: "applicant", device: "desktop", C: AppForm, notes: [{ n: 1, t: "Step indicator", d: "Breaks a long form into 4 manageable steps." }, { n: 2, t: "2-column fields", d: "Labels above inputs; required fields marked." }, { n: 3, t: "Navigation", d: "Back, Save Draft and Next keep progress safe." }] },
  { code: "LF-04", title: "Document Requirements", role: "applicant", device: "desktop", C: Documents, notes: [{ n: 1, t: "Summary", d: "Counts what is uploaded, verified, or needs attention." }, { n: 2, t: "Document Checklist", d: "Centralizes documentary requirements and reduces confusion." }] },
  { code: "LF-05", title: "AI Pre-Verification", role: "applicant", device: "desktop", C: AiVerify, notes: [{ n: 1, t: "Document preview", d: "The applicant sees exactly what the AI analysed." }, { n: 2, t: "AI Pre-Verification", d: "Provides preliminary document analysis while retaining human validation." }, { n: 3, t: "Preliminary result", d: "Never 'approved' or 'rejected' — only routed to staff." }] },
  { code: "LF-06", title: "Application Status", role: "applicant", device: "desktop", C: AppStatus, notes: [{ n: 1, t: "Vertical timeline", d: "Seven official stages with dates." }, { n: 2, t: "Current step", d: "Plain-language explanation of what is happening now." }] },
  { code: "LF-07", title: "ESSO Dashboard", role: "esso", device: "desktop", C: EssoDashboard, notes: [{ n: 1, t: "Pipeline stats", d: "One card per workflow stage." }, { n: 2, t: "Status overview", d: "Highlights the bottleneck stage." }, { n: 3, t: "Application table", d: "Search and review from one place." }] },
  { code: "LF-08", title: "Application Review", role: "esso", device: "desktop", C: EssoReview, notes: [{ n: 1, t: "Applicant info", d: "Only data needed for validation." }, { n: 2, t: "Documents", d: "Per-document status and access." }, { n: 3, t: "AI findings", d: "Labelled as preliminary decision support." }, { n: 4, t: "Staff validation", d: "The only place an official decision is made." }] },
  { code: "LF-09", title: "Document Review", role: "esso", device: "desktop", C: EssoDocReview, notes: [{ n: 1, t: "Preview", d: "Large, zoomable document." }, { n: 2, t: "Extracted vs. application", d: "Mismatches are flagged for human judgment." }, { n: 3, t: "Checklist", d: "Standardizes manual verification." }] },
  { code: "LF-10", title: "Audit Trail", role: "esso", device: "desktop", C: EssoAudit, notes: [{ n: 1, t: "Immutable log", d: "User, action, date, time and record for every event — including AI and NCSG." }] },
  { code: "LF-11", title: "Reports", role: "esso", device: "desktop", C: EssoReports, notes: [{ n: 1, t: "Filters", d: "Year, school and barangay scoping." }, { n: 2, t: "Charts", d: "Simple bars for administrative reference." }] },
  { code: "LF-12", title: "NCSG Login", role: "ncsg", device: "desktop", C: NcsgLogin, notes: [{ n: 1, t: "Simple login", d: "Username + password only; accounts provisioned by the Coordinator." }] },
  { code: "LF-13", title: "NCSG Dashboard", role: "ncsg", device: "desktop", C: NcsgDashboard, notes: [{ n: 1, t: "Status + compliance first", d: "Priority 01 and 02 occupy the top band." }, { n: 2, t: "Six monitoring cards", d: "Answers 'how are scholars doing?'" }, { n: 3, t: "Next event", d: "Priority 03 — attendance progress." }, { n: 4, t: "Needs attention", d: "Who to follow up with." }] },
  { code: "LF-14", title: "Scholar Monitoring", role: "ncsg", device: "desktop", C: NcsgScholars, notes: [{ n: 1, t: "NCSG Scholar Monitoring", d: "Allows NCSG to monitor scholar status and renewal compliance without accessing unrelated ESSO functions." }] },
  { code: "LF-15", title: "Scholar Profile", role: "ncsg", device: "desktop", C: NcsgProfile, notes: [{ n: 1, t: "Current status", d: "Update requires confirmation + reason (audited)." }, { n: 2, t: "Limited info", d: "No financial documents or AI results." }, { n: 3, t: "Renewal checklist", d: "Flag for Follow-up — never 'Reject'." }, { n: 4, t: "History", d: "Compliance events over time." }] },
  { code: "LF-16", title: "Events", role: "ncsg", device: "desktop", C: NcsgEvents, notes: [{ n: 1, t: "Event list", d: "Date block, location and expected participants." }, { n: 2, t: "Create Event", d: "Six fields only — kept intentionally simple." }] },
  { code: "LF-17", title: "Attendance", role: "ncsg", device: "desktop", C: NcsgAttendance, notes: [{ n: 1, t: "Search", d: "Find a scholar in seconds on-site." }, { n: 2, t: "Attendance", d: "Provides a simple event-based attendance workflow for scholar participation." }] },
  { code: "LF-18", title: "Attendance Summary", role: "ncsg", device: "desktop", C: NcsgAttSummary, notes: [{ n: 1, t: "Four counts", d: "Expected, Present, Absent, Pending." }, { n: 2, t: "Progress", d: "218 / 250 — one readable sentence plus a bar." }] },
  { code: "LF-19", title: "NCSG Reports", role: "ncsg", device: "desktop", C: NcsgReports, notes: [{ n: 1, t: "Status report", d: "Active vs. Inactive." }, { n: 2, t: "Compliance report", d: "Compliant / Pending / Needs Attention." }, { n: 3, t: "Attendance report", d: "Per-event table." }] },
]
export const MOBILE: ScreenDef[] = [
  { code: "M-01", title: "Applicant Home", role: "applicant", device: "mobile", C: MApplicantHome },
  { code: "M-02", title: "Documents", role: "applicant", device: "mobile", C: MDocuments },
  { code: "M-03", title: "AI Pre-Verification", role: "applicant", device: "mobile", C: MAi },
  { code: "M-04", title: "NCSG Home", role: "ncsg", device: "mobile", C: MNcsgHome },
  { code: "M-05", title: "NCSG Attendance", role: "ncsg", device: "mobile", C: MNcsgAttendance },
]
export const byCode = (c: string) => [...SCREENS, ...MOBILE].find((s) => s.code === c)!

/* silence unused-import lint for icons only used in some fidelities */
void Wallet; void Dim
