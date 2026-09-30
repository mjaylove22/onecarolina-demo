# One Carolina Transit — Project Handoff

Paste this into a new chat to pick up where we left off. Attach the project
files (or re-share the GitHub repo) alongside it.

## What this project is
A prototype website for One Carolina Transit, a non-emergency medical
transportation (NEMT) business in Camden, SC, run by owner Corey
Sweetenburg. Built as a static HTML/Tailwind/vanilla-JS site, hosted on
GitHub Pages at `mjaylove22.github.io/onecarolina-demo`.

## Stack
- HTML5 + Tailwind CSS v3.4.17, **compiled** (`npm run build:css` →
  `assets/css/tailwind.css`, committed to git). Theme tokens are in
  `tailwind.config.js`. See `DEV-NOTES.md` for the build workflow.
- Vanilla JS, no frameworks
- 7 pages: `index.html`, `about.html`, `services.html`,
  `service-areas.html`, `faq.html`, `contact.html`, `request-a-ride.html`
- Shared assets: `assets/css/tailwind.css` (built), `assets/css/custom.css`,
  `assets/js/main.js`, `assets/images/ceo-photo.png`
- Two supporting docs: `CLIENT-QUESTIONS.md` (client-facing questions,
  split into Answered / Still Needed), `DEV-NOTES.md` (internal technical
  to-do, not for the client)

## Confirmed real business facts (already on the site)
- Phone: (803) 549-8920
- Address: 402-H Dicey Ford Rd, Camden, SC 29020
- Hours: Daily, 6:00 AM – 6:00 PM
- Services: Ambulatory + wheelchair transport only
- Model: Primarily private-pay. Insurance riders go through their own
  dispatcher/broker, not booked directly on this site
- Pricing: $10 loading fee + $1.25/mile, calculated round trip
- Payment methods: Zelle, Cash App, Square (Square setup still pending)
- Service area: Kershaw, Richland, Lexington, Sumter, Orangeburg,
  Bamberg, and Lancaster counties, SC — plus licensed to operate across
  three states as needed (which two besides SC is still unconfirmed)
- Booking policy: 72 hours' notice required, full payment required to
  complete booking, 24+ hr cancellations get 25% reimbursement
- Licensing: SC ORS licensed, PSC Certification #9156-A
- Driver vetting: national/federal background check, sex offender
  registry check, 10-panel drug screen, 10-year driving record review,
  CPR certified, defensive driving + wheelchair training
- Legal name: One Carolina Transit, LLC (footers already say this)
- Email: carolinatransit03@gmail.com (confirmed). Phone on site: (803) 549-8920 only
  (owner's 549-4946 number intentionally not listed)
- Mailing address (NOT shown on site — asking client if it should be public):
  1832 Red Hill Church Rd, Cassatt, SC 29032
- Ride requests are monitored by the Supervisor and Office Manager
  (response time still unknown)
- Owner: Corey Sweetenburg, Owner, Chief Executive Officer
- **Not** affiliated with United Way's VAN program (removed from site —
  earlier assumption was wrong)
- Brand colors: blue and white (site's orange accent was swapped to
  blue — see Recent changes below)
- Real Google reviews exist under "One Carolina Transit" — homepage
  links out to them instead of using fabricated testimonial quotes

## Recent changes (this session)
1. Replaced all placeholder phone/address/hours across every page +
   schema markup with the confirmed real values
2. Flipped site messaging from "Medicaid/Medicare primary" to
   "private-pay primary, insurance via broker" — updated homepage, FAQ
   (visible + schema), services page, request-a-ride payment dropdown
3. Removed the United Way/VAN section from About; replaced with real
   ORS/PSC licensing info
4. Replaced generic driver-vetting copy with the real, detailed process
5. Rebuilt Service Areas page from a speculative Kershaw-towns guess
   list to the real 7-county list
6. Added real booking policy (72-hr notice, full payment required,
   24-hr/25% cancellation) to FAQ and Request a Ride
7. **Rebranded accent color from orange to blue** across all 7 pages
   (Tailwind config token + inline shadow rgba values) to match
   confirmed blue/white brand colors
8. **Added a fare calculator** to the Request a Ride page — manual
   round-trip mileage input, calculates `$10 + ($1.25 × miles)` live via
   JS (`initFareCalculator()` in `main.js`). No hardcoded distances —
   works for any route since exact driving mileage wasn't verifiable
   for the specific Orangeburg→Aiken example that prompted this
9. Replaced fake testimonial placeholder cards on homepage with a real
   "Read Our Google Reviews" link
10. Rewrote `CLIENT-QUESTIONS.md` split into Answered vs. Still Needed

## Session 2 changes (cleanup + build)
11. Fixed copy that still said Kershaw County only (homepage hero/service-area
    section/FAQ preview, FAQ meta + schema, Services page + `areaServed` schema)
    — now consistent with the 7-county list
12. Homepage booking FAQ said "book as early as possible" — corrected to the
    confirmed 72-hour / full-payment / 24-hr-25% policy
13. **Removed the unconfirmed "since 2016" founding-year claim** everywhere
    (homepage stat -> "7 Counties", why-us copy, About copy + meta/OG) and the
    unconfirmed "dialysis, therapy, specialist" list (now "medical appointments").
    Neither was in the client's answers. Re-add only if he confirms.
14. Stripped stale HTML comments (resolved placeholders); genuinely open items
    are now marked `TODO`. Rewrote the homepage header comment.
15. **Tailwind CDN -> compiled build** on all 7 pages (17 KB CSS). Verified in
    headless Chromium: no JS errors, no horizontal overflow at 1280 and 390 px,
    fare calculator, FAQ accordions and mobile menu all working.
16. Rewrote `CLIENT-QUESTIONS.md` with the Sep 28 client reply merged in and new
    follow-up questions (founding year, correct email, second phone, mailing
    address visibility, appointment types)

17. **Payment page:** new `pay.html` ("How to Pay") + `assets/js/payment-config.js`
    + `assets/js/pay.js`. Shows only real, validated Zelle / Cash App / Square
    values; falls back to "call us" while blank. Linked from the footer of every
    page, the Services payment section and the request form. Tested in headless
    Chromium (valid, malformed and hostile values; copy button; mobile).
18. Owner reports lots of cash riders on Orangeburg -> Aiken. Aiken County is not
    in the confirmed service area — client question added; site makes no Aiken claim.

## Known open items (not yet done)
- **Forms still have no backend.** Both `<form action="#">` tags don't submit
  anywhere. Netlify Forms once hosting moves (or Formspree as an interim) — see
  `DEV-NOTES.md`
- Payments are manual (office confirms by phone). `pay.html` is built; it goes
  live when the owner's real Zelle / Cash App / Square values are entered in
  `assets/js/payment-config.js` (never fabricate these).
- Decide whether to add Aiken County (and other regular destinations) to the
  service area — waiting on the client
  Square is removed from the form dropdown/FAQ until his account is live.
- Which 2 additional states (beyond SC) the multi-state authority covers
- Real logo (currently an inline SVG mark), real vehicle/driver/office photos
  (owner says they're "available upon request" — just ask him to send them)
- Visible placeholder boxes: homepage photo + map, contact map, service-areas map
  (contact page map can be embedded now — address is confirmed)
- `og-cover.jpg` share image doesn't exist yet
- Real domain + hosting migration; business email (public address is
  carolinatransit03@gmail.com; not shown on the site yet)
- **Git sync:** the GitHub repo (`mjaylove22/onecarolina-demo`) was last committed
  Aug 1 and did not have the session-1 work. Copy this folder's contents over the
  local repo and commit/push so the demo URL matches this code.

## Phase status (original 9-phase agency workflow)
Phases 1–6 complete. Phase 7 (Local SEO polish) — next; schema `areaServed` is
now correct on the homepage + Services, LocalBusiness data is real. Phase 8
(Performance audit) — Tailwind compile done, remaining: real images (WebP, sized),
font loading review, Lighthouse run once deployed. Phase 9 (Final Review) — not
started.

## Working directories
- Sandbox working copy: `/home/claude/one-carolina-transit/`
- Delivered copy: `/mnt/user-data/outputs/one-carolina-transit/`
- User's local machine: `C:\Users\jayle\Projects\OneCarolina` (per
  their stated setup), pushed to GitHub repo `mjaylove22/onecarolina-demo`
