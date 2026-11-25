# ROLE
You are a senior product designer and front-end engineer inside Figma Make, writing precise, developer-ready design handoff documentation.

# GOAL
Using the existing MyIsko Scholarship Management System prototype in this project as the single source of truth, build a "Design Handoff Document" as a 1920×1080 slide deck. Follow the structure, layout and visual language below (based on the Figma Community "Design Handoff Document Template"). The deck documents the end-to-end journey, from student registration and document upload to the admin / ESSO Staff dashboard where submissions are reviewed and scholarships awarded, plus the usability improvements made.

# NON-NEGOTIABLE RULES
1. Do not change, restyle or break any existing screen, route, component, state or data. Add the deck as a new route "/handoff" with a small, unobtrusive "Handoff doc" link. Scope the deck's styles so they never leak into the app.
2. Everything shown must come from this project. Read the code (routes, components, Tailwind/CSS tokens, mock data) and report real values. Never invent screens, features, colors, font sizes, spacing, durations or links. If a value cannot be verified from the code, print "[CONFIRM]" in its place.
3. The template's sample content (food app, "Adam", Jira, etc.) is dummy. Replace all of it with MyIsko content.
4. Show screens as live, scaled renders of the real components (CSS transform: scale) inside device frames, not redrawn approximations. Use a desktop browser frame for web screens and a phone frame only for views that actually exist as responsive/mobile.
5. Keep the template's slide order, section names, grid and annotation style. If a section doesn't fit a web app, adapt it (see per-slide notes) instead of dropping it.

# DOCUMENT DESIGN TOKENS (deck chrome only; embedded screens keep the app's own styling)
- Canvas: 1920×1080 per slide, scaled to fit the viewport.
- Font: Work Sans (400, 600, 700).
- H1: Bold 160 / line-height 100% (cover title, section dividers)
- H2: Bold 100 / 100% (slide headings)
- H3: Regular 40 / 100% (cover subtitle, divider kicker, TOC items)
- Body 1: Bold 28 / 40 (sub-heads in body copy, status pill label)
- Body 2: Regular 28 / 40 (paragraphs, bullets, cover meta line)
- Body 4: SemiBold 18 / 24 (annotation pills)
- Dark slides (cover + dividers): background ≈ #212121, text #FFFFFF.
- Light slides: background ≈ #F9FBFA, text #000000.
- Gray 1 #333333 (pills, leader lines); Yellow #F2C94C (status dot); white chips with a soft shadow (0 2px 8px rgba(0,0,0,.08)); number badges: 48px circle, light gray ≈ #F0F0F0.
- Grid on light slides: left margin 134px; H2 top at y=230; body copy starts at y=411. Single-column body max width ≈ 832px. Two-column slides start at x=134 and x=1029, each ≈ 681px wide.

# SLIDES (build in this exact order)

## A. Opening
1. COVER (dark). Centered block: kicker "Design handoff document" (H3) above the title "MyIsko Scholarship Management System" (H1, shrink to fit in ≤2 lines, block width ≈ 1052). Bottom-left: 72px circular avatar (initials "IT" if no photo, 2px white border) at x=140, y=894, then "Updated 25 Nov 2026 · By Ian Frederick Talania" (Body 2) at x=236. Bottom-right: 281×60 pill, background #333333, fully rounded, 16px yellow dot + "In development" (Body 1, white), right edge at x≈1780.
2. PREVIEW (light). H2 "Preview" at left. Right \~60% of the slide: two frames side by side showing the two most representative real screens (a student application/upload screen and the ESSO Staff / admin dashboard).
3. INTRODUCTION. H2 + two Body 2 paragraphs. Draft: (a) MyIsko is a scholarship management system that takes applicants from registration and document upload through to the administrative dashboard where staff review submissions and award scholarships; this document hands the prototype's UI/UX to developers. (b) The design work focuses on usability: reducing application errors, clarifying each step of the journey, and making review-and-award faster and easier to audit. Correct anything the code contradicts.
4. TABLE OF CONTENTS. H2 + numbered list (48px badge + H3 label, 80px row pitch, starting y=444). List the deck's real sections in order (Screenflow … Animations & transitions) in two columns of five, at x=134 and x=700.
5. SCOPE and LIMITATIONS. Two columns with H2 "Scope" and H2 "Limitations". Scope: the screens/features included and excluded, taken from the app's routes. Limitations: only what is verifiable in the code (e.g., mock data, no real authentication or file storage); otherwise mark [CONFIRM].
6. SUPPORTING DOCUMENTS. H2 + link chips: white, 66px tall, 28px horizontal padding, 24px external-link icon, 86px row pitch, two columns at x=134 and x=608, starting y=474. Candidates: Figma Make prototype, WCAG 2.2 accessibility audit, Design tokens, Usability findings, Requirements, QA checklist. Keep only those that exist; link "#" and tag [CONFIRM] when the URL is unknown.

## B. Screenflow
7. DIVIDER (dark): kicker "MyIsko" (H3) above "Screenflow" (H1), both centered. Every section divider below uses this same layout with its own section name.
8. SCREENFLOW. Real screens left→right, connected by 2px black elbow arrows with arrowheads, showing actual navigation. Use one row for the student flow and one for the staff flow. Use black pills (Body 4, white text) for non-screen outcomes such as "File picker" or "Email notification".

## C. Designs
9. DIVIDER "Designs".
10+. One or more slides per role (e.g., "Student portal", "ESSO Staff / Admin"): H2 role label at left, 2–3 frames per slide, small centered captions (≈16px, black) under each frame naming screen + state (e.g., "Document upload · Error state"). Cover every significant screen and every state that exists (default, error, empty, loading, success).

## D. Anatomy
11. DIVIDER "Anatomy".
12. ANATOMY (one per key screen, minimum: student application/upload and staff dashboard). Left: H2 "Anatomy" + numbered list (48px badge + Body 2 label). Right: the live screen with \~40px black circle markers (white numbers) joined to elements by 3px black horizontal leader lines. Name real UI parts (header, page title, stepper, upload dropzone, data table, filters, action bar…).

## E. Before and now
13. DIVIDER "Before and now".
14. BEFORE AND NOW. Left: a Body 2 paragraph on what changed and why (usability fixes, error reduction, accessibility fixes, new features such as the ESSO Staff dashboard/report changes if present). Right: two frames captioned "Before" and "Now". If no baseline version exists in the project, render "Before" as a dashed-outline placeholder labelled "Insert baseline screenshot". Do not fabricate a before-state.

## F. UI characteristics
15. DIVIDER "UI characteristics".
16. SPACING. H2 at left; right: a real screen with translucent colored bands and numeric labels on the right edge. Color code: gray = page side margin, red = section gap, orange = element gap, blue = tight gap, green = block gap. Include a small legend. Measure every value (in px) from the code.
17. SIZING. Same treatment. Fixed sizes in blue (e.g., avatar 40×40), "Dynamic height" in red with a vertical bracket, aspect ratios in green (e.g., 335:145), minimum sizes in orange.

## G. Typography
18. DIVIDER "Typography".
19. TEXT STYLES. Left: H2 + one Body 2 sentence. Right: the live screen with dark pills (#333333, Body 4, white) joined by 3px leader lines, naming each text style in use plus family / size / line-height / weight read from the CSS.
20. MAXIMUM LINE-COUNT. Same layout with pills "No limit" / "Max line count 1/2/3", derived from line-clamp / truncate in the code. If none is set, mark [CONFIRM].

## H. Components
21. DIVIDER "Components".
22. COMPONENTS. Pills naming the real component names from the codebase (e.g., Button/Primary, StatusBadge, FileUpload, DataTable, StatCard). Add a second slide for variants/states if there are more than six.

## I. Touch area
23. DIVIDER "Touch area".
24. TOUCH AREA. Left: H2 + one line explaining hit-area padding, plus a small padding diagram (e.g., 16 / 16 horizontal padding, 32 height) taken from a real control. Right: the live screen with translucent overlays and pills with colored dots (red = primary action, blue = open details, yellow = secondary/gesture). Flag any interactive target smaller than 24×24 px (WCAG 2.2 SC 2.5.8) as "Below 24×24".

## J. Small devices
25. DIVIDER "Small devices".
26. BREAKPOINTS. Left: H2 + numbered rules in the form "On smaller devices (device-width < X)," listing the real responsive changes (read the media queries / Tailwind breakpoints). Right: two frames captioned "Device width < X" and "Device width > Y", rendered by actually constraining the real component's width. If the app isn't responsive, state the minimum supported width instead.

## K. Animations & transitions
27. DIVIDER "Animations & transitions".
28+. One slide per transition ("Screen A → Screen B"): H2 title, a Body 2 intro line, then a Body 1 sub-head per animated element followed by bullets (starting delay, duration, easing, distance) read from the actual CSS transition / animation / motion values. Right: a live looping demo inside a light-gray (#E0E0E0) rounded panel with a "Run the preview to view the animation" button. If the project has no custom animations, make one slide stating that only default transitions are used and mark [CONFIRM].

# VIEWER BEHAVIOR
- 1920×1080 stage, letterboxed and scaled to the viewport.
- Navigate with ← / → / Space and by click. Show a small gray slide counter at bottom-right.
- Press "G" (or use a button) to toggle an overview grid that mimics the Figma canvas: one row per section, one column per slide. Esc exits.
- Add a print stylesheet that gives one 16:9 slide per page, so the deck exports cleanly to PDF.

# QUALITY CHECKLIST (verify before finishing)
- Slides appear in the order above with the exact section names.
- Every number on Spacing / Sizing / Text styles / Breakpoints / Animations matches the code.
- No template placeholder content remains.
- The existing prototype is unchanged and still works.
- No text overflow or clipped annotations; contrast on dark slides ≥ 4.5:1.

# FINAL REPLY
When done, list every "[CONFIRM]" item and any section you adapted or skipped, with the reason.