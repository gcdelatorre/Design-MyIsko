# DESIGN AND PROTOTYPE BRIEF

Create a polished, high-fidelity responsive web application prototype called **MyIsko** with the tagline:

**“Open Opportunities for Future Scholars.”**

MyIsko is a proposed **Web-Based Scholarship Management System** for the Naga City Education, Scholarship, and Sports Office (ESSO).

The design should be **inspired by the usability philosophy and visual experience of the official MyNaga App**: centralized public services, simple navigation, accessible information, clear service shortcuts, status visibility, and a modern Naga City government-service feel.

**IMPORTANT:** Do NOT copy MyNaga's exact UI, logo, illustrations, screens, icons, or proprietary visual assets. Use it only as design inspiration. Create an original scholarship-management identity for MyIsko.

---

# 1. PRIMARY DESIGN GOAL

The prototype must communicate one central idea:

> **MyIsko makes scholarship application, document submission, pre-verification, monitoring, and administrative review easier, clearer, and more transparent.**

The most important showcase feature is:

## AI-ASSISTED DOCUMENT PRE-VERIFICATION

This must be the visual centerpiece of the prototype.

The AI does NOT approve or reject applicants.

The system only performs **preliminary document analysis** such as:

* Document readability
* Document classification
* Information extraction
* Required-information checking
* Cross-referencing information
* Identifying possible inconsistencies
* Flagging documents that require staff attention

The final validation and scholarship decision remain with authorized ESSO personnel.

Never display language suggesting that the AI makes the final scholarship decision.

Do NOT use:

* “AI Approved”
* “AI Rejected”
* “Automatically Qualified”
* “AI Decision”

Instead use:

* “AI Pre-Verification Result”
* “Preliminary Check”
* “Potential Issue Detected”
* “Ready for Staff Review”
* “For ESSO Staff Validation”

---

# 2. TARGET USERS

Design TWO clearly separated experiences.

## A. APPLICANT / SCHOLAR

Applicant should be able to:

* Create/login to an account
* Complete profile
* Apply for a scholarship
* Complete the online application
* Upload documentary requirements
* See document status
* Receive preliminary document feedback
* Monitor application progress
* Receive notifications
* View examination schedule/status
* View application history

## B. ESSO STAFF

ESSO personnel should be able to:

* View applications
* Monitor application statuses
* Review submitted documents
* View AI pre-verification results
* Validate documents manually
* Mark documents as compliant / for compliance
* Track applicants
* View examination information
* View reports
* Review audit trail
* Monitor system activities

Use **role-based access control**.

Applicants must only see their own records.

Staff interfaces should expose administrative functions according to their responsibilities.

---

# 3. CORE SHOWCASE FLOW

Build the prototype around this complete user journey:

### APPLICANT FLOW

LOGIN
↓
APPLICANT DASHBOARD
↓
PROFILE
↓
START SCHOLARSHIP APPLICATION
↓
APPLICATION FORM
↓
DOCUMENT REQUIREMENTS
↓
UPLOAD DOCUMENT
↓
AI PRE-VERIFICATION
↓
PRELIMINARY RESULT
↓
SUBMIT APPLICATION
↓
APPLICATION STATUS TRACKING
↓
NOTIFICATIONS

Then demonstrate the staff workflow:

### ESSO STAFF FLOW

STAFF LOGIN
↓
ESSO DASHBOARD
↓
APPLICATIONS
↓
SELECT APPLICANT
↓
DOCUMENT REVIEW
↓
AI PRE-VERIFICATION RESULTS
↓
STAFF VALIDATION
↓
APPLICATION STATUS UPDATE
↓
AUDIT TRAIL
↓
REPORTING

The prototype must make this flow visually obvious.

---

# 4. REQUIRED SCREENS

Create these screens as a coherent prototype.

## SCREEN 01 — LANDING PAGE

Purpose:
Introduce MyIsko as a trustworthy public scholarship service.

Include:

* MyIsko logo/wordmark
* “Open Opportunities for Future Scholars.”
* Short explanation:
  “A centralized scholarship application and management platform for Naga City scholars.”
* Primary CTA:
  **Apply for Scholarship**
* Secondary CTA:
  **Track Application**
* Login
* Register
* Scholarship announcements
* Important deadlines
* Help / FAQ

Hero section should be clean and government-service oriented.

Avoid excessive marketing.

The interface should feel trustworthy, accessible, and community-oriented.

---

# 5. APPLICANT DASHBOARD

Create a modern dashboard inspired by the centralized-service philosophy of MyNaga.

Top section:

**Good day, [Applicant Name]**

Subtext:

“Here’s the current status of your scholarship application.”

Create large summary cards:

### Application Status

Example:
**Under Pre-Verification**

### Requirements

**7 / 9 Submitted**

### Completion

**78%**

### Next Action

**Submit missing document**

Add a prominent:

**Continue Application**

button.

Below that create:

### My Application

A visual status timeline:

1. Application Started
2. Documents Submitted
3. AI Pre-Verification
4. Staff Review
5. Examination
6. Evaluation
7. Final Status

Do not imply that all stages are automatically completed.

Use status colors consistently.

---

# 6. APPLICATION FORM

Create a multi-step form.

Steps:

### 01 Personal Information

* Full Name
* Birthdate
* Contact Information
* Address

### 02 Educational Information

* School
* Year Level
* Course / Program

### 03 Financial Information

* Yearly Tuition
* Civil Status
* Relevant financial information

### 04 Scholarship Information

* Scholarship category
* Application details

### 05 Documentary Requirements

Show progress:

**Step 4 of 5**

Include:

Back / Save & Continue buttons.

The design should minimize cognitive overload.

Use:

* Clear labels
* Helper text
* Required indicators
* Inline validation
* Large touch targets
* Simple language

---

# 7. DOCUMENT REQUIREMENTS SCREEN

This is one of the MOST IMPORTANT screens.

Create a requirement checklist.

Example:

### Required Documents

| Document                  | Status          | Action |
| ------------------------- | --------------- | ------ |
| Birth Certificate         | Verified        | View   |
| Certificate of Enrollment | AI Checked      | Review |
| Income Document           | Needs Attention | Fix    |
| Grades / Transcript       | Submitted       | View   |
| Residency Certificate     | Missing         | Upload |

Use visual status badges:

**Verified**
**AI Checked**
**Needs Attention**
**Missing**
**For Staff Review**

Include:

**Upload Document**

Make the document workflow extremely easy to understand.

---

# 8. AI-ASSISTED DOCUMENT PRE-VERIFICATION SCREEN

This is the PRIMARY FEATURE SHOWCASE.

Design this screen with a sophisticated but understandable layout.

### Header

**AI-Assisted Document Pre-Verification**

Subtext:

“Preliminary automated checking to assist ESSO personnel.”

Include a clear notice:

> **AI results are preliminary. Final validation is performed by authorized ESSO personnel.**

---

## LEFT SIDE — DOCUMENT PREVIEW

Display a realistic scholarship document preview.

Include:

* Document thumbnail
* Zoom controls
* Page count
* Document name
* Upload timestamp

Example:

**Certificate_of_Enrollment.pdf**

---

## RIGHT SIDE — AI ANALYSIS PANEL

Create analysis cards:

### Document Classification

**Certificate of Enrollment**

Status:
**Matched**

### Readability

**Readable**

Status:
**Passed**

### Required Information

**Detected**

Status:
**Passed**

### Applicant Information Match

**Potential Match**

Status:
**Review Recommended**

### Possible Issues

**1 item detected**

Show:

“School name differs from the profile information.”

Do not automatically declare it fraudulent.

---

# 9. AI RESULT SUMMARY

At the bottom of the AI panel create:

### Preliminary Result

**READY FOR STAFF REVIEW**

Description:

“The document passed preliminary readability and classification checks. One potential information discrepancy requires staff validation.”

Buttons:

**View Details**

**Submit for Staff Review**

Do NOT create an “Approve” button for AI.

---

# 10. AI EXPLANATION / TRANSPARENCY PANEL

Create an expandable section:

### How was this checked?

Show simple explanations:

✓ Document can be read
✓ Document type identified
✓ Required information detected
✓ Applicant information compared
⚠ Potential discrepancy detected

Add:

**AI does not determine final eligibility or approval.**

This demonstrates responsible human-in-the-loop AI.

---

# 11. STAFF DASHBOARD

Create a professional administrative dashboard.

Header:

**ESSO Scholarship Management**

Dashboard cards:

### Total Applications

**1,248**

### For Pre-Verification

**86**

### For Staff Review

**43**

### For Compliance

**27**

### Completed

**1,092**

Add an application status overview.

Create a searchable table:

| Applicant | Scholarship | Status | Document Check | Last Updated |
| --------- | ----------- | ------ | -------------- | ------------ |

Include filters:

* All
* Submitted
* Under Pre-Verification
* For Compliance
* For Staff Review
* Completed

Add search.

---

# 12. STAFF DOCUMENT REVIEW

When an ESSO staff member opens an applicant:

Create a two-column review interface.

LEFT:
Document preview

RIGHT:
Verification information

Show:

**AI Pre-Verification**

✓ Readability — Passed
✓ Classification — Matched
✓ Required Information — Detected
⚠ Cross-reference — Needs Review

Then provide HUMAN STAFF controls:

**Validate Document**

**Request Compliance**

**Mark as Reviewed**

The system must clearly distinguish AI-generated findings from official staff actions.

---

# 13. AUDIT TRAIL

Create an Audit Trail screen.

Show chronological activity:

**September 24, 2026 — 10:42 AM**
Applicant uploaded Certificate of Enrollment.

**September 24, 2026 — 10:43 AM**
AI pre-verification completed.

**September 24, 2026 — 10:45 AM**
ESSO Staff reviewed document.

**September 24, 2026 — 10:47 AM**
Document marked for compliance.

Include:

* User
* Action
* Date
* Time
* Record
* Status

The audit trail should visually communicate accountability and traceability.

---

# 14. NOTIFICATIONS

Create notification center.

Examples:

🔔 “Your Certificate of Enrollment requires attention.”

🔔 “Your application is now under ESSO staff review.”

🔔 “Your scholarship examination schedule has been posted.”

🔔 “A document has been requested for compliance.”

Keep notifications concise.

---

# 15. REPORTS

Create an ESSO reporting screen.

Include:

* Applications received
* Applications by status
* Documents requiring compliance
* Pre-verification activity
* Completed reviews
* Examination statistics

Use simple charts.

Avoid excessive dashboards.

The reports should support administrative monitoring and decision-making.

---

# 16. NAVIGATION DESIGN

## Applicant Navigation

Use a simple navigation structure inspired by modern government service apps.

Desktop:

* Dashboard
* My Application
* Documents
* Application Status
* Notifications
* Profile

Mobile:

Use a bottom navigation bar with:

**Home | Application | Documents | Status | More**

---

## ESSO Navigation

Desktop sidebar:

* Dashboard
* Applications
* Document Verification
* Applicants
* Examination
* Reports
* Audit Trail
* Settings

Use icons with labels.

Never rely on icons alone.

---

# 17. VISUAL DESIGN SYSTEM

Create a completely original MyIsko visual identity.

## Color Direction

Use a professional Naga City public-service-inspired palette.

Primary:
**Deep Purple / Indigo**

Suggested:
#20234E

Secondary:
**Royal Purple**

Suggested:
#381593

Accent:
**Warm Gold**

Use gold sparingly for:

* highlights
* scholarship-related emphasis
* important calls to action

Background:
**#F7F7FA**

Surface:
**#FFFFFF**

Text:
**#1F2330**

Secondary Text:
**#667085**

Success:
**Green**

Warning:
**Amber**

Error:
**Red**

Information:
**Blue**

IMPORTANT:

Do not make the interface overwhelmingly purple.

Use purple primarily for:

* primary navigation
* major buttons
* active states
* important headings
* branding

Use neutral white/gray surfaces to create a clean government-service interface.

---

# 18. TYPOGRAPHY

Use a modern sans-serif typeface such as:

**Poppins**

or another highly readable modern sans-serif.

Typography hierarchy:

H1:
32–40 px

H2:
24–30 px

H3:
18–22 px

Body:
14–16 px

Small:
12–13 px

Use generous line spacing.

Avoid overly decorative typography.

---

# 19. COMPONENT STYLE

Use:

* Rounded cards
* Soft borders
* Subtle shadows
* Large readable buttons
* Clean tables
* Status badges
* Progress indicators
* Timeline components
* Upload dropzones
* Document cards
* Notification cards
* Search/filter controls

Border radius:
approximately 10–16 px.

Avoid excessive glassmorphism.

Avoid excessive gradients.

Avoid overly futuristic AI visuals.

The system is a **public-service scholarship platform**, not a commercial AI startup.

---

# 20. MYNAGA-INSPIRED UX PRINCIPLES

Take inspiration from MyNaga's centralized public-service approach:

### Principle 1 — SERVICES IN ONE PLACE

Users should immediately understand where to:

* apply
* upload documents
* track status
* get notifications
* access information

### Principle 2 — SIMPLE NAVIGATION

The user should never wonder:

“Where do I click next?”

### Principle 3 — STATUS VISIBILITY

Application progress should always be visible.

### Principle 4 — COMMUNITY ACCESSIBILITY

Design for ordinary applicants, not only technologically experienced users.

### Principle 5 — TRUST AND TRANSPARENCY

Make AI activity, staff validation, and status changes understandable.

### Principle 6 — MOBILE-FIRST THINKING

The experience should work naturally on mobile devices because applicants may primarily access services through smartphones.

---

# 21. ACCESSIBILITY REQUIREMENTS

Design according to practical accessibility principles.

Ensure:

* Strong text/background contrast
* Readable font sizes
* Clear focus states
* Large clickable areas
* Icons paired with text
* Error messages written clearly
* Status never communicated by color alone
* Forms have visible labels
* Upload controls are obvious
* Tables remain readable
* Responsive layouts
* Keyboard-friendly interaction where applicable

Example:

Do not show only:

🔴

Instead show:

🔴 **Needs Attention**

---

# 22. RESPONSIVE DESIGN

Create desktop and mobile layouts.

Desktop:
1440px width reference.

Tablet:
768px.

Mobile:
390px.

The mobile version should not simply shrink the desktop layout.

Reorganize content appropriately.

For example:

Desktop:
Sidebar + content

Mobile:
Top header + bottom navigation

Cards should stack vertically.

Tables should transform into readable cards where necessary.

---

# 23. DESIGN PROBLEM-SOLVING

The interface must visually demonstrate solutions to the problems identified in the research.

### Problem:

Manual encoding

### UI Solution:

Structured online application forms.

---

### Problem:

Difficult document sorting

### UI Solution:

Digital document categories and requirement checklist.

---

### Problem:

Manual document checking

### UI Solution:

AI-assisted preliminary document pre-verification.

---

### Problem:

Difficulty tracking applications

### UI Solution:

Application status timeline and dashboard.

---

### Problem:

Record retrieval difficulties

### UI Solution:

Centralized searchable application records.

---

### Problem:

Lack of traceability

### UI Solution:

Audit Trail.

---

### Problem:

Risk of AI replacing staff decisions

### UI Solution:

Human-in-the-loop workflow and explicit staff validation.

---

# 24. INNOVATION FEATURE

Create a visual section called:

## “Smart Document Check”

This should be the signature feature of MyIsko.

Show a document entering the system:

**UPLOAD**
↓
**READABILITY CHECK**
↓
**DOCUMENT CLASSIFICATION**
↓
**INFORMATION EXTRACTION**
↓
**CROSS-REFERENCE**
↓
**POTENTIAL ISSUES**
↓
**STAFF REVIEW**

Make this visually engaging but professional.

Use subtle animations if supported.

Do not make the AI look like a chatbot.

The AI is a **document-processing assistant**, not a conversational assistant.

---

# 25. MICROCOPY

Use simple language.

Prefer:

“Upload your document”

instead of:

“Initialize document ingestion.”

Prefer:

“Needs Attention”

instead of:

“Anomaly Detected.”

Prefer:

“Ready for Staff Review”

instead of:

“AI Decision Complete.”

Prefer:

“Check your document”

instead of:

“Execute validation procedure.”

The system should be understandable to scholarship applicants.

---

# 26. EMPTY STATES

Design useful empty states.

Example:

### No Applications Yet

“You haven't started a scholarship application.”

Button:

**Start Application**

---

### No Notifications

“You're all caught up.”

---

### No Documents

“Upload your required documents to continue your application.”

---

# 27. ERROR STATES

Design realistic errors.

Example:

### Upload Failed

“We couldn't upload your document. Please check your connection and try again.”

Button:

**Try Again**

---

### Document Needs Attention

“This document may need to be reviewed or replaced.”

Buttons:

**View Issue**

**Upload New Document**

---

# 28. LOADING STATES

Include:

* Document upload progress
* AI analysis progress
* Skeleton cards
* Processing indicators

Example:

**Analyzing document…**

Then:

**Preliminary check complete**

Avoid claiming that the AI is making a final decision.

---

# 29. DEMO DATA

Use realistic but fictional sample data.

Do NOT use real personal information.

Example applicants:

* Maria Santos
* Juan Dela Cruz
* Andrea Reyes
* Carlo Mendoza

Example documents:

* Birth Certificate
* Certificate of Enrollment
* Transcript of Records
* Income Certificate
* Residency Certificate

Use realistic statuses.

---

# 30. PROTOTYPE INTERACTIONS

Make the prototype clickable.

At minimum:

Landing Page
→ Login
→ Applicant Dashboard
→ Application
→ Documents
→ Upload
→ AI Pre-Verification
→ Status

And:

Staff Login
→ Staff Dashboard
→ Applications
→ Applicant Record
→ Document Review
→ AI Result
→ Staff Validation
→ Audit Trail

Buttons must navigate to the appropriate screen.

Use overlays/modals for:

* Upload document
* AI details
* Notifications
* Compliance request
* Staff validation confirmation

---

# 31. PRESENTATION-FIRST DESIGN

This prototype will be presented to an academic/research panel.

The most visually impressive sequence should be:

### 01

Applicant Dashboard

### 02

Document Requirements

### 03

AI-Assisted Document Pre-Verification

### 04

AI Findings + Human Review

### 05

ESSO Staff Dashboard

### 06

Audit Trail

The AI document screen should receive the strongest visual emphasis.

---

# 32. DESIGN RATIONALE EMBEDDED IN THE UI

The design should visibly communicate these four evaluation criteria:

## DESIGN ACCURACY — 25 POINTS

Demonstrate:

* Alignment with actual scholarship workflow
* Clear applicant/staff separation
* Simple navigation
* Document-focused workflow
* Status tracking
* Accessibility
* Human validation

## INNOVATION & CHALLENGE — 25 POINTS

Demonstrate:

* AI-assisted document pre-verification
* Document classification
* Information extraction
* Cross-referencing
* Potential issue detection
* Human-in-the-loop workflow
* Auditability

## DEPTH & THOROUGHNESS — 25 POINTS

Demonstrate:

* Complete applicant journey
* Complete staff journey
* Application
* Document management
* AI pre-verification
* Staff validation
* Status tracking
* Notifications
* Audit trail
* Reports
* Responsive/mobile interface
* Accessibility

## VISUAL STYLE & PROFESSIONALISM — 25 POINTS

Demonstrate:

* Consistent design system
* Professional government-service aesthetic
* Consistent typography
* Consistent spacing
* Consistent status colors
* Strong information hierarchy
* Clean responsive layouts
* Polished components
* Presentation-ready screens

---

# 33. CRITICAL RESEARCH ALIGNMENT

The design must remain faithful to the research study.

The research identifies needs related to:

* scholarship application processes
* applicant profiling
* digital document submission
* workflow/status tracking
* examination scheduling
* ranking support
* role-based access
* audit logging
* AI-assisted document pre-verification
* technical and operational feasibility

The AI feature is specifically intended for **preliminary assistance**, while authorized personnel retain official validation and decision-making authority.

The prototype must NOT introduce unsupported features that fundamentally change the research scope.

Do not turn this into:

* a banking app
* a social media platform
* a chatbot
* an AI-only scholarship decision system
* an online payment platform

---

# 34. FINAL FIGMA MAKE OUTPUT REQUIREMENT

Generate a complete, polished, high-fidelity prototype with:

* Consistent design system
* Reusable components
* Desktop layouts
* Mobile layouts
* Applicant experience
* ESSO staff experience
* Clickable navigation
* AI document pre-verification showcase
* Document upload flow
* Application tracking
* Staff validation
* Audit trail
* Reports
* Notifications
* Accessibility states
* Loading states
* Empty states
* Error states

The final result should look like a **real government scholarship platform ready for an academic system demonstration**, not a generic UI template.

The visual personality should be:

**Trustworthy + Accessible + Modern + Local Government Service + Student-Friendly + Technology-Enabled**

The design should feel like a **scholarship service within the Naga City digital ecosystem**, while maintaining an original MyIsko identity.

Most importantly:

> **Make the AI-Assisted Document Pre-Verification workflow the hero feature, but make it clear that AI assists ESSO personnel rather than replacing human judgment.**
