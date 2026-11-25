## NEW USER ROLE — NAGA CITY SCHOLARSHIP GUILD (NCSG) OFFICER

Update the existing \*\*MyIsko\*\* prototype by adding a new user role:

\*\*Naga City Scholarship Guild (NCSG) Officer\*\*

Do NOT merge this role with the Scholarship Coordinator, ESSO staff, or Applicant/Scholar account.

The NCSG Officer must have a \*\*separate account and separate dashboard\*\* with permissions limited to scholar monitoring and event attendance.

### NCSG OFFICER PURPOSE

The NCSG Officer is responsible for monitoring existing scholars after they have been awarded the scholarship.

The primary purpose is to:

1. Monitor whether scholars remain \*\*Active\*\* or \*\*Inactive\*\*.
2. Monitor scholar compliance related to \*\*renewal requirements\*\*.
3. Record and monitor scholar participation/attendance in important NCSG or city-related events.
4. Maintain a centralized monitoring record that can help NCSG track scholars and identify those requiring attention.

This role is NOT responsible for:

\* Applicant approval
\* Scholarship application processing
\* AI document pre-verification
\* Final scholarship eligibility decisions
\* Ranking applicants
\* Official document validation
\* Managing ESSO administrative workflows

Keep those responsibilities under the appropriate ESSO/Scholarship Coordinator roles.

---

# NCSG ACCOUNT

Create a dedicated NCSG login.

Keep the account fields intentionally simple:

### NCSG Officer Login

\*\*Username\*\*

\*\*Password\*\*

Button:

\*\*Login\*\*

Do NOT require a complicated registration process for NCSG.

The NCSG account should be provisioned by the authorized system administrator/Scholarship Coordinator.

---

# NCSG DASHBOARD

Create a completely separate dashboard called:

\*\*NCSG Scholar Monitoring\*\*

Header:

\*\*Good day, NCSG Officer\*\*

Subtext:

“Monitor scholar status, renewal compliance, and participation in important events.”

Show summary cards:

### Active Scholars

Example: \*\*842\*\*

### Inactive Scholars

Example: \*\*36\*\*

### For Renewal

Example: \*\*124\*\*

### Compliance Attention

Example: \*\*28\*\*

### Upcoming Events

Example: \*\*3\*\*

### Attendance to Review

Example: \*\*17\*\*

These numbers are demonstration data only.

---

# PRIMARY NCSG FEATURE — SCHOLAR MONITORING

Create a main module:

\*\*Scholar Monitoring\*\*

Display a searchable scholar table.

Columns:

| Scholar | School | Year Level | Status | Renewal Compliance | Last Updated | Action |
| ------- | ------ | ---------- | ------ | ------------------ | ------------ | ------ |

Status options:

\*\*ACTIVE\*\*

\*\*INACTIVE\*\*

Use clear status badges.

Do not rely on color alone.

For example:

🟢 \*\*Active\*\*

🔴 \*\*Inactive\*\*

---

# SCHOLAR PROFILE / MONITORING DETAILS

When the NCSG Officer selects a scholar, open:

\*\*Scholar Monitoring Profile\*\*

Display:

### Scholar Information

\* Scholar Name
\* School
\* Course/Program
\* Year Level
\* Scholarship Status
\* Current Academic Year

Keep sensitive information limited to what NCSG actually needs for monitoring.

Do NOT expose unnecessary financial documents, AI results, or application-processing controls.

---

# RENEWAL COMPLIANCE

Create a dedicated section:

## Renewal Compliance

Show:

\*\*Renewal Status\*\*

\* Compliant
\* Pending
\* Needs Attention
\* Inactive

Create a requirement checklist where applicable.

Example:

✓ Renewal requirement submitted
✓ Academic requirement recorded
⚠ Requirement needs attention

Add:

\*\*Last Compliance Update\*\*

\*\*Next Renewal Period\*\*

The NCSG Officer should be able to monitor compliance status but should NOT make the official scholarship approval decision.

If a scholar requires attention, provide:

\*\*Flag for Follow-up\*\*

rather than:

\*\*Reject Scholar\*\*

---

# ACTIVE / INACTIVE MONITORING

Create an easy-to-use monitoring control.

When reviewing a scholar, display:

### Current Scholar Status

\*\*ACTIVE\*\*

Allow an authorized NCSG Officer to update the monitoring status when supported by the organization's procedures.

Before changing status, show a confirmation modal:

\*\*Update Scholar Status\*\*

“Are you sure you want to change this scholar's monitoring status?”

Fields:

\*\*New Status\*\*

\* Active
\* Inactive

\*\*Reason / Notes\*\*

Button:

\*\*Confirm Update\*\*

Button:

\*\*Cancel\*\*

Every status change must be recorded in the system's audit trail.

---

# IMPORTANT EVENT MONITORING

Add a separate NCSG module:

## Events & Attendance

Purpose:

Allow NCSG to organize and monitor scholar participation in important events.

Example:

### Upcoming Event

\*\*Naga City Civic Parade\*\*

Date:
\*\*October 25, 2026\*\*

Location:
\*\*Naga City\*\*

Description:
“Scholar participation monitoring for an upcoming civic activity.”

Display:

\*\*Expected Scholars: 250\*\*

\*\*Present: 218\*\*

\*\*Absent: 21\*\*

\*\*Pending: 11\*\*

---

# EVENT CREATION

Allow NCSG Officers to create an event using a simple form:

### Create Event

\*\*Event Name\*\*

\*\*Date\*\*

\*\*Time\*\*

\*\*Location\*\*

\*\*Description\*\*

\*\*Expected Participants\*\*

Button:

\*\*Create Event\*\*

Keep this form simple.

Do not create unnecessary fields.

---

# ATTENDANCE MONITORING

Inside an event, show:

### Attendance

Search scholar name.

Display:

| Scholar        | Status | Attendance |
| -------------- | ------ | ---------- |
| Maria Santos   | Active | Present    |
| Juan Dela Cruz | Active | Absent     |
| Andrea Reyes   | Active | Pending    |

Attendance states:

\*\*Present\*\*

\*\*Absent\*\*

\*\*Pending\*\*

Allow the NCSG Officer to update attendance.

Include:

\*\*Mark Present\*\*

\*\*Mark Absent\*\*

Avoid complicated attendance mechanisms.

The goal is quick and practical monitoring during actual events.

---

# EVENT ATTENDANCE SUMMARY

Create visual summary cards:

\*\*Total Expected\*\*

\*\*Present\*\*

\*\*Absent\*\*

\*\*Pending\*\*

Then create a simple attendance progress visualization.

Example:

\*\*218 / 250 scholars attended\*\*

Keep the visualization clean and easy to understand.

---

# NCSG NOTIFICATIONS

Create notifications relevant only to NCSG responsibilities.

Examples:

🔔 \*\*Renewal monitoring reminder\*\*

“28 scholars require compliance follow-up.”

🔔 \*\*Upcoming event\*\*

“Naga City Civic Parade is scheduled for October 25.”

🔔 \*\*Attendance update\*\*

“17 scholar attendance records are still pending.”

Do not show applicant document-verification notifications to NCSG.

---

# NCSG REPORTS

Create a restricted:

## Monitoring Reports

Include:

### Scholar Status Report

\* Active scholars
\* Inactive scholars

### Renewal Compliance Report

\* Compliant
\* Pending
\* Needs Attention

### Event Attendance Report

\* Event
\* Date
\* Expected
\* Present
\* Absent
\* Pending

Reports should be designed for monitoring and administrative reference.

---

# NCSG AUDIT TRAIL

NCSG actions should be traceable.

Record:

\* NCSG Officer username
\* Action performed
\* Scholar/event affected
\* Date
\* Time
\* Previous status
\* New status

Example:

\*\*October 1, 2026 — 10:42 AM\*\*

NCSG Officer updated:

\*\*Maria Santos\*\*

Status:

\*\*Inactive → Active\*\*

Reason:

“Renewal compliance completed.”

This aligns the NCSG module with the existing MyIsko audit-trail concept.

---

# NCSG NAVIGATION

Create a dedicated sidebar:

\*\*NCSG Scholar Monitoring\*\*

Navigation:

\* Dashboard
\* Scholars
\* Renewal Compliance
\* Events
\* Attendance
\* Reports
\* Notifications
\* Audit Trail
\* Account

Do NOT display:

\* AI Document Verification
\* Applicant Applications
\* Scholarship Ranking
\* Application Approval
\* ESSO Staff Management

This reinforces \*\*Role-Based Access Control (RBAC)\*\*.

---

# ROLE RELATIONSHIP

Design the system so the three major experiences are clearly separated:

### APPLICANT / SCHOLAR

Apply → Submit Documents → Track Application

### ESSO / SCHOLARSHIP COORDINATOR

Manage Applications → Review Documents → AI Pre-Verification → Official Validation → Reports

### NCSG OFFICER

Monitor Scholars → Renewal Compliance → Active/Inactive Status → Events → Attendance → Monitoring Reports

The NCSG Officer should complement ESSO's scholarship administration rather than duplicate it.

---

# VISUAL DESIGN

Keep the existing \*\*MyIsko\*\* visual identity:

\* Deep Indigo/Purple
\* White
\* Subtle Gold Accent
\* Clean cards
\* Rounded components
\* Clear status badges
\* Poppins or similarly readable sans-serif
\* Professional government-service aesthetic

However, give the NCSG dashboard a slightly more \*\*monitoring-oriented visual hierarchy\*\*.

Prioritize:

\*\*Scholar Status → Renewal Compliance → Events → Attendance\*\*

The dashboard should immediately answer:

> “How are our scholars doing, who needs attention, and who is participating in important activities?”

---

# UX PRINCIPLES FOR NCSG

The NCSG interface must be:

### SIMPLE

The officer should be able to find a scholar quickly.

### MONITORING-FOCUSED

Do not overload the interface with application-processing functions.

### TRACEABLE

Status changes and attendance updates should be recorded.

### ROLE-RESTRICTED

Only show information and functions necessary for NCSG duties.

### MOBILE-FRIENDLY

Attendance monitoring may occur during actual events, so the attendance interface must work well on smartphones/tablets.

### ACCESSIBLE

Use readable text, clear labels, status text, sufficient contrast, and buttons large enough for quick interaction.

---

# IMPORTANT RESEARCH ALIGNMENT

Use the existing MyIsko research foundation:

\* Centralized records
\* Application/status monitoring
\* Role-Based Access Control
\* Audit Trail
\* Reporting
\* Administrative workflow
\* Scholar monitoring

The research specifically emphasizes that system permissions should be aligned with official user responsibilities and that audit trails should record activities for traceability.

The research also identifies post-selection monitoring as outside the original scope \*\*unless it emerges as a relevant requirement during the needs assessment\*\*. Treat this NCSG module as the newly identified monitoring requirement and keep it focused on scholar status, renewal compliance, and event attendance rather than expanding the entire scholarship workflow.

NOW UPDATE THE EXISTING MYISKO PROTOTYPE.

Do not redesign the entire application from scratch.

Preserve the existing Applicant and ESSO experiences.

Add the new \*\*NCSG Officer account, dashboard, navigation, scholar monitoring, renewal compliance, event management, attendance monitoring, reports, notifications, and audit trail\*\* as a separate role-based experience.

Make all relevant screens clickable and presentation-ready.