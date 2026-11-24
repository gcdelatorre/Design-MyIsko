// Fictional demo data for the MyIsko scholarship management prototype.

export type DocStatus = "verified" | "ai-checked" | "needs-attention" | "submitted" | "missing" | "staff-review"

export type AppStatus = "submitted" | "pre-verification" | "staff-review" | "compliance" | "examination" | "completed"

export interface RequirementDoc {
  id: string
  name: string
  file?: string
  status: DocStatus
  uploadedAt?: string
  note?: string
}

export interface Applicant {
  id: string
  name: string
  scholarship: string
  status: AppStatus
  docCheck: string
  updated: string
  school: string
  completion: number
}

export const applicantProfile = {
  name: "Maria Santos",
  refNo: "NTSP-2026-004821",
  scholarship: "Naga Tertiary Scholarship Program (NTSP)",
  school: "University of Nueva Caceres",
  course: "BS Information Technology",
  year: "2nd Year",
  email: "maria.santos@example.com",
  phone: "+63 917 555 0142",
  address: "Zone 4, Barangay Concepcion Pequeña, Naga City",
  completion: 78,
  submitted: 7,
  required: 9,
}

export const requirements: RequirementDoc[] = [
  {
    id: "birth",
    name: "Birth Certificate (PSA)",
    file: "PSA_Birth_Certificate.pdf",
    status: "verified",
    uploadedAt: "Sep 22, 2026 · 9:14 AM",
  },
  {
    id: "enroll",
    name: "Certificate of Enrollment",
    file: "Certificate_of_Enrollment.pdf",
    status: "ai-checked",
    uploadedAt: "Sep 24, 2026 · 10:42 AM",
    note: "Ready for staff review — 1 potential discrepancy",
  },
  {
    id: "income",
    name: "Income Document / ITR",
    file: "Income_Certificate.pdf",
    status: "needs-attention",
    uploadedAt: "Sep 23, 2026 · 3:20 PM",
    note: "Amount field is difficult to read",
  },
  {
    id: "grades",
    name: "Grades / Transcript of Records",
    file: "Transcript_of_Records.pdf",
    status: "submitted",
    uploadedAt: "Sep 23, 2026 · 3:25 PM",
  },
  { id: "residency", name: "Residency Certificate", status: "missing" },
  {
    id: "goodmoral",
    name: "Certificate of Good Moral",
    file: "Good_Moral.pdf",
    status: "verified",
    uploadedAt: "Sep 22, 2026 · 9:20 AM",
  },
  {
    id: "photo",
    name: "2x2 ID Photo",
    file: "ID_Photo.jpg",
    status: "verified",
    uploadedAt: "Sep 22, 2026 · 9:05 AM",
  },
  {
    id: "brgy",
    name: "Barangay Certification",
    file: "Barangay_Cert.pdf",
    status: "staff-review",
    uploadedAt: "Sep 23, 2026 · 4:02 PM",
  },
  { id: "appform", name: "Signed Application Form", status: "missing" },
]

export const timeline: {
  label: string
  state: "done" | "current" | "todo"
  date?: string
}[] = [
  { label: "Application Started", state: "done", date: "Sep 20, 2026" },
  { label: "Documents Submitted", state: "done", date: "Sep 23, 2026" },
  { label: "AI Pre-Verification", state: "current", date: "In progress" },
  { label: "Staff Review", state: "todo" },
  { label: "Examination", state: "todo" },
  { label: "Evaluation", state: "todo" },
  { label: "Final Status", state: "todo" },
]

export const applicants: Applicant[] = [
  {
    id: "a1",
    name: "Maria Santos",
    scholarship: "NTSP",
    status: "pre-verification",
    docCheck: "7/9 · 1 flag",
    updated: "2 min ago",
    school: "University of Nueva Caceres",
    completion: 78,
  },
  {
    id: "a2",
    name: "Juan Dela Cruz",
    scholarship: "NTSP",
    status: "staff-review",
    docCheck: "9/9 · ready",
    updated: "18 min ago",
    school: "Naga College Foundation",
    completion: 100,
  },
  {
    id: "a3",
    name: "Andrea Reyes",
    scholarship: "City College Grant",
    status: "compliance",
    docCheck: "8/9 · 1 issue",
    updated: "1 hr ago",
    school: "Universidad de Sta. Isabel",
    completion: 88,
  },
  {
    id: "a4",
    name: "Carlo Mendoza",
    scholarship: "NTSP",
    status: "submitted",
    docCheck: "6/9",
    updated: "3 hrs ago",
    school: "Ateneo de Naga University",
    completion: 66,
  },
  {
    id: "a5",
    name: "Bianca Villafuerte",
    scholarship: "City College Grant",
    status: "completed",
    docCheck: "9/9 · verified",
    updated: "Yesterday",
    school: "University of Nueva Caceres",
    completion: 100,
  },
  {
    id: "a6",
    name: "Miguel Torres",
    scholarship: "NTSP",
    status: "pre-verification",
    docCheck: "7/9",
    updated: "Yesterday",
    school: "Naga College Foundation",
    completion: 78,
  },
  {
    id: "a7",
    name: "Sofia Alcantara",
    scholarship: "NTSP",
    status: "staff-review",
    docCheck: "9/9 · ready",
    updated: "2 days ago",
    school: "Ateneo de Naga University",
    completion: 100,
  },
]

export const notifications = [
  {
    id: "n1",
    icon: "alert",
    title: "Your Income Document requires attention",
    body: "The amount field is difficult to read. Please upload a clearer copy.",
    time: "5 min ago",
    unread: true,
  },
  {
    id: "n2",
    icon: "search",
    title: "Your Certificate of Enrollment is ready for staff review",
    body: "Preliminary check complete. One item needs ESSO validation.",
    time: "12 min ago",
    unread: true,
  },
  {
    id: "n3",
    icon: "calendar",
    title: "Scholarship examination schedule has been posted",
    body: "October 5, 2026 · 8:00 AM · UNC Gymnasium.",
    time: "1 day ago",
    unread: false,
  },
  {
    id: "n4",
    icon: "doc",
    title: "A document has been requested for compliance",
    body: "Residency Certificate is still missing from your application.",
    time: "2 days ago",
    unread: false,
  },
]

export const auditTrail = [
  {
    date: "Sep 24, 2026",
    time: "10:47 AM",
    user: "Spiderman (ESSO Staff)",
    action: "Marked document for compliance",
    record: "Income Document",
    status: "compliance",
  },
  {
    date: "Sep 24, 2026",
    time: "10:45 AM",
    user: "Spiderman (ESSO Staff)",
    action: "Reviewed submitted document",
    record: "Certificate of Enrollment",
    status: "reviewed",
  },
  {
    date: "Sep 24, 2026",
    time: "10:43 AM",
    user: "MyIsko System",
    action: "AI pre-verification completed",
    record: "Certificate of Enrollment",
    status: "ai",
  },
  {
    date: "Sep 24, 2026",
    time: "10:42 AM",
    user: "Maria Santos (Applicant)",
    action: "Uploaded document",
    record: "Certificate of Enrollment",
    status: "upload",
  },
  {
    date: "Sep 23, 2026",
    time: "4:02 PM",
    user: "Maria Santos (Applicant)",
    action: "Uploaded document",
    record: "Barangay Certification",
    status: "upload",
  },
  {
    date: "Sep 23, 2026",
    time: "3:25 PM",
    user: "MyIsko System",
    action: "AI pre-verification completed",
    record: "Transcript of Records",
    status: "ai",
  },
  {
    date: "Sep 20, 2026",
    time: "9:00 AM",
    user: "Maria Santos (Applicant)",
    action: "Started scholarship application",
    record: "NTSP-2026-004821",
    status: "upload",
  },
]

// AI pre-verification checks for the hero document
export const aiChecks = [
  {
    id: "read",
    label: "Readability",
    value: "Readable",
    status: "passed",
    detail:
      "Document scanned at sufficient resolution. All text layers are legible.",
  },
  {
    id: "class",
    label: "Document Classification",
    value: "Certificate of Enrollment",
    status: "passed",
    detail: "Matched to the expected document type with high confidence.",
  },
  {
    id: "required",
    label: "Required Information",
    value: "Detected",
    status: "passed",
    detail:
      "Student name, school, program, and academic year were all located.",
  },
  {
    id: "match",
    label: "Applicant Information Match",
    value: "Potential Match",
    status: "review",
    detail: "School name on the document differs from the profile information.",
  },
]

export const extractedFields = [
  {
    field: "Student Name",
    extracted: "Maria C. Santos",
    profile: "Maria Santos",
    match: "near",
  },
  {
    field: "School",
    extracted: "Univ. of Nueva Caceres",
    profile: "University of Nueva Caceres",
    match: "near",
  },
  {
    field: "Program",
    extracted: "BS Information Technology",
    profile: "BS Information Technology",
    match: "exact",
  },
  {
    field: "Academic Year",
    extracted: "A.Y. 2026–2027",
    profile: "—",
    match: "info",
  },
  {
    field: "Year Level",
    extracted: "2nd Year",
    profile: "2nd Year",
    match: "exact",
  },
]

export const smartCheckSteps = [
  { key: "upload", label: "Upload", desc: "Applicant submits document" },
  {
    key: "read",
    label: "Readability Check",
    desc: "Confirm the file can be read",
  },
  { key: "class", label: "Classification", desc: "Identify the document type" },
  { key: "extract", label: "Information Extraction", desc: "Pull key fields" },
  {
    key: "cross",
    label: "Cross-Reference",
    desc: "Compare with the applicant profile",
  },
  {
    key: "issues",
    label: "Potential Issues",
    desc: "Flag items to double-check",
  },
  { key: "staff", label: "Staff Review", desc: "ESSO personnel decide" },
]

export const announcements = [
  {
    tag: "Open Now",
    title: "NTSP A.Y. 2026–2027 Applications",
    body: "The Naga Tertiary Scholarship Program is now accepting new and renewal applicants.",
    deadline: "Deadline: Oct 15, 2026",
  },
  {
    tag: "Schedule",
    title: "Scholarship Qualifying Examination",
    body: "Qualifying exam for shortlisted applicants at the UNC Gymnasium.",
    deadline: "Oct 5, 2026 · 8:00 AM",
  },
  {
    tag: "Reminder",
    title: "Complete Your Documentary Requirements",
    body: "Applications with incomplete documents will not proceed to staff review.",
    deadline: "Ongoing",
  },
]

export const faqs = [
  {
    q: "Who can apply for the NTSP?",
    a: "Bona fide residents of Naga City enrolled in a recognized tertiary institution may apply, subject to ESSO qualification standards.",
  },
  {
    q: "Does the AI decide if I am approved?",
    a: "No. The AI only performs preliminary checks such as readability and classification. Final validation and scholarship decisions are made by authorized ESSO personnel.",
  },
  {
    q: "What documents do I need to submit?",
    a: "Birth Certificate, Certificate of Enrollment, Income Document, Transcript of Records, Residency Certificate, and other supporting requirements.",
  },
  {
    q: "How do I track my application?",
    a: 'Use the Application Status timeline on your dashboard, or the "Track Application" shortcut on the landing page.',
  },
]

/* ============ ESSO EXECUTIVE DASHBOARD (school-year analytics) ============ */
// Disbursement figures are NTSP scholarship releases. 2024–2025 uses the
// legible values from the ESSO Power BI reference; other years are illustrative.

export interface SemesterRelease {
  amount: number
  students: number
}
export interface IncentiveRelease {
  amount: number
  recipients: number
}
export interface SchoolYearRecord {
  id: string
  label: string
  budget: number
  /** Graduates are reported after the 2nd semester; null = not yet reported. */
  graduates: number | null
  sem1: SemesterRelease | null
  sem2: SemesterRelease | null
  incentives: { sem1: IncentiveRelease | null; sem2: IncentiveRelease | null }
}

export const currentSchoolYearId = "2026-2027"

export const schoolYears: SchoolYearRecord[] = [
  {
    id: "2022-2023",
    label: "2022–2023",
    budget: 20_000_000,
    graduates: 148,
    sem1: { amount: 6_215_400.0, students: 598 },
    sem2: { amount: 8_940_250.0, students: 655 },
    incentives: { sem1: { amount: 386_000, recipients: 154 }, sem2: { amount: 421_500, recipients: 168 } },
  },
  {
    id: "2023-2024",
    label: "2023–2024",
    budget: 21_250_000,
    graduates: 162,
    sem1: { amount: 6_884_730.5, students: 631 },
    sem2: { amount: 9_812_600.0, students: 712 },
    incentives: { sem1: { amount: 428_000, recipients: 171 }, sem2: { amount: 465_000, recipients: 186 } },
  },
  {
    id: "2024-2025",
    label: "2024–2025",
    budget: 22_500_000,
    graduates: 184,
    sem1: { amount: 7_802_179.64, students: 684 },
    sem2: { amount: 11_710_000.0, students: 806 },
    incentives: { sem1: { amount: 497_500, recipients: 199 }, sem2: { amount: 540_000, recipients: 216 } },
  },
  {
    id: "2025-2026",
    label: "2025–2026",
    budget: 23_750_000,
    graduates: 195,
    sem1: { amount: 9_236_815.2, students: 671 },
    sem2: { amount: 12_486_300.0, students: 748 },
    incentives: { sem1: { amount: 553_000, recipients: 221 }, sem2: { amount: 601_500, recipients: 240 } },
  },
  {
    id: "2026-2027",
    label: "2026–2027",
    budget: 25_000_000,
    graduates: null,
    sem1: { amount: 10_486_250.0, students: 692 },
    sem2: null,
    incentives: { sem1: { amount: 612_000, recipients: 244 }, sem2: null },
  },
]

/** Scholarship disbursed in a school year (1st + 2nd semester, incentives excluded). */
export function disbursedTotal(y: SchoolYearRecord) {
  return (y.sem1?.amount ?? 0) + (y.sem2?.amount ?? 0)
}

/** Current scholars = enrolled count of the latest released semester. */
export function currentScholars(y: SchoolYearRecord) {
  return y.sem2?.students ?? y.sem1?.students ?? 0
}

// Partner schools: the first four already appear in applicant records; the rest are
// realistic Naga City placeholders. Weights set each school's share of scholars.
export const partnerSchools: { name: string; weight: number }[] = [
  { name: "University of Nueva Caceres", weight: 24.5 },
  { name: "Ateneo de Naga University", weight: 18.2 },
  { name: "Naga College Foundation", weight: 16.4 },
  { name: "Universidad de Sta. Isabel", weight: 12.1 },
  { name: "Bicol State College of Applied Sciences and Technology", weight: 11.3 },
  { name: "Mariners' Polytechnic Colleges Foundation", weight: 7.6 },
  { name: "STI College Naga", weight: 5.4 },
  { name: "Naga View Adventist College", weight: 4.5 },
]

/** Splits a scholar total across partner schools; counts always sum exactly to `total`. */
export function scholarsBySchool(total: number) {
  const sum = partnerSchools.reduce((s, p) => s + p.weight, 0)
  const raw = partnerSchools.map((p) => ({ name: p.name, exact: (p.weight / sum) * total }))
  const rows = raw.map((r) => ({ name: r.name, count: Math.floor(r.exact), rem: r.exact - Math.floor(r.exact) }))
  let left = total - rows.reduce((s, r) => s + r.count, 0)
  ;[...rows].sort((a, b) => b.rem - a.rem).forEach((r) => {
    if (left > 0) {
      r.count += 1
      left -= 1
    }
  })
  return rows.map(({ name, count }) => ({ name, count, share: total ? (count / total) * 100 : 0 }))
}
