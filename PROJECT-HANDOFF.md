# One Carolina Transit — Project Handoff (updated Oct 1, 2026)

Paste this into a new chat and attach the project zip. Read it fully before touching code.

## What this is
Prototype website for **One Carolina Transit, LLC**, a private-pay-focused non-emergency
transportation business in Camden, SC. Owner: **Corey D. Sweetenburg** (Owner, CEO).
Built by Jaylen Love (agency/freelance, Windows, Edge browser) as a static site on GitHub Pages:
`https://mjaylove22.github.io/onecarolina-demo/index.html`
Repo: `mjaylove22/onecarolina-demo`. Local: `C:\Users\jayle\Projects\OneCarolina`.

## Stack and layout
- Static HTML + **compiled Tailwind v3.4.17** + vanilla JS. No frameworks.
- 8 pages: `index`, `about`, `services`, `service-areas`, `faq`, `contact`, `request-a-ride`, `pay`.
- `assets/css/tailwind.css` is BUILT and committed (GitHub Pages has no build step).
  After changing any classes/config: `npm install` (once) then `npm run build:css`.
  Theme tokens live in `tailwind.config.js`. Other CSS: `assets/css/custom.css`.
- JS: `assets/js/main.js` (mobile menu, scroll reveal, FAQ accordion, **fare calculator**:
  `$10 + $1.85 × round-trip miles`), `assets/js/pay.js` + `assets/js/payment-config.js` (payment page).
- Brand: blue/white (primary `#0F2E5C`/`#1E4B8F`, accent `#2563EB`). No logo file exists (inline SVG mark).
- Docs in repo root: this file, `CLIENT-QUESTIONS.md` (client-facing), `DEV-NOTES.md` (internal).

## Confirmed business facts (client emails Sep 28 + Oct 1) — all on the site unless noted
- Phone: **(803) 549-8920** only (his 549-4946 deliberately NOT listed). Public email confirmed as
  carolinatransit03@gmail.com (NOT the "trasnsit" typo in his signature) — not shown on site.
- Address: **402-H Dicey Ford Rd, Camden, SC 29020 — display this ONLY.** (Cassatt mailing address: do not show.)
- Hours: daily 6:00 AM – 6:00 PM. Established **March 2016** (site says "since 2016").
- **Pricing: $10.00 loading fee + $1.85/mile, round trip** (rate raised from $1.25 per client, Oct 1).
- Policies: 72 hours' notice, full payment to book. Rescheduled trips rebooked 72 hrs ahead.
  Cancellation: see "Needs confirming" — site still shows 24 hrs / 25% reimbursement + "issued to original payment method".
- Booking flow: requests are reviewed by Supervisor **Crystal Ray** and Office Manager **Florene Davis**;
  client gets a **response/approval within 12 hours**, then pays. Refunds go to the original payment method.
- Insurance riders: contact Office Manager Florene Davis at 803-549-8920 (site now says this, name included).
- Trips: medical appointments, dialysis, physical therapy, specialist visits, grocery runs, work
  transportation, airport trips. Vehicles: ambulatory + wheelchair-accessible.
- Coverage (10 counties): Kershaw, Richland, Lexington, Sumter, Orangeburg, Bamberg, Lancaster,
  **Aiken, Lee, Chesterfield** — "more to be added as needed". Licensed in three states (which two besides SC: unknown).
- Licensing: SC ORS + PSC Certification #9156-A. NOT affiliated with United Way's VAN (removed).
- Drivers: national/federal background check, sex-offender registry check, 10-panel drug screen,
  10-year driving record review, CPR certified, defensive driving + wheelchair training.
- Payment methods: Zelle, Cash App, Square (Square pending). Corey plans a separate bank account for this.
- Reviews: exist on Google under "One Carolina Transit"; homepage button links to a Google SEARCH, not his profile.
- **Private details — keep OUT of the repo and the site:** Supervisor and Office Manager email
  addresses are in Corey's Oct 1 email (needed for the form backend; configure them in the form
  service's dashboard, never in committed files — the GitHub Pages repo is public).

## What was done (history, condensed)
- S1: real phone/address/hours; private-pay messaging (Medicaid/VAN removed); real vetting + licensing copy;
  blue rebrand; fare calculator; Google-reviews link instead of fake testimonials.
- S2: fixed contradictory copy (72-hr FAQ, Kershaw-only wording); stripped stale comments;
  **Tailwind CDN -> compiled build**; new **How to Pay page** (`pay.html`, shows only validated real
  values from `payment-config.js`, else "call us"); Square removed from form/FAQ until live; hero SVG
  "Appointment" label clipping fixed (right-aligned, `x=464 text-anchor=end`).
- S3 (Oct 1 reply, applied locally, **tested but not yet pushed**): rate -> $1.85; counties 7 -> 10 on every
  page/footer/schema; "since 2016" restored; services expanded (new "Where we take you" block, homepage
  card "Medical & Everyday Trips", FAQ non-medical answer); 12-hour response wording on request/pay/home/services;
  insurance routed to Office Manager; refunds-to-original-method wording added.
- Verified in headless Chromium (Playwright works in the sandbox; Inter font does NOT load there, so test
  text fit with a wider font): no JS errors, no horizontal overflow at 1280/390 on all 8 pages, fare math
  ($158.00 for 80 mi; Orangeburg-Aiken ~120 mi round trip ≈ $232 — mileage is an estimate), JSON-LD valid,
  all internal links resolve.

## STATE OF DEPLOYMENT (do this first)
The live demo was last checked before the pay page existed. Everything from S2 (pay page, hero fix) and
all of S3 needs to be committed and pushed. Copy the zip contents over the local repo (keep `.git`, skip
`node_modules`), then `git add -A && git commit && git push`; hard-refresh (Ctrl+F5) to bypass cache
(GitHub Pages caches ~10 min). Check `.../pay.html` loads and the footer shows "How to Pay".
Internal docs (`PROJECT-HANDOFF.md`, `CLIENT-QUESTIONS.md`, `DEV-NOTES.md`) are served publicly by Pages if
committed: they're gitignored in this zip; if already tracked run
`git rm --cached PROJECT-HANDOFF.md CLIENT-QUESTIONS.md DEV-NOTES.md`.

## Needs confirming with Corey (do not guess)
1. **Loading fee:** does the $10 loading fee still apply with $1.85/mile, still round trip? (Assumed yes; changed only the per-mile rate.)
2. **Cancellation policy conflict:** earlier = 24 hrs before appointment -> 25% reimbursement. Oct 1 =
   "up to 24 hours to cancel after approval; refunds through the original payment method." Which is current? Full or 25% refund?
3. **Payment deadline:** how long after approval does a rider have to pay before the booking is dropped? (Unanswered.)
4. **Payment details:** Zelle email/phone, Cash App $cashtag, Square link — enter in `assets/js/payment-config.js` (no rebuild needed).
5. Which two other states he's licensed in. Photos of vehicles/drivers/office (unanswered). Direct Google review link.
6. Assumed Aiken/Lee/Chesterfield are counties served as both pickup and destination.
7. OK to publish Florene Davis's name on the site? (Done per his instruction; easy to remove.)
8. "Corey asked about a downloadable app" — see below.

## Open work, in priority order
1. **Form backend** (nothing submits yet; both forms are `action="#"`). Requests must reach Crystal Ray AND Florene Davis.
   Interim: Formspree (or similar) with recipients set in its dashboard; Netlify Forms if hosting moves.
   Form currently collects name, phone, pickup, destination, date/time, ride type, payment method, notes.
2. **Downloadable app request.** Recommendation: build an installable **PWA** (web manifest, service worker,
   icons; Android shows an install prompt, iOS = Share > Add to Home Screen) once the form backend exists —
   it's a small add-on on the current stack and opens straight to Request a Ride / call. Icons need a logo:
   none exists, so render the inline SVG mark or design a simple one. A **native iOS/Android app** is a
   separate, scoped project (developer accounts, store review, ongoing maintenance, accounts/notifications/
   payments) and isn't justified while booking is request -> staff approval -> manual payment.
3. Enter payment values (item 4 above); add a Square link when his account is live and restore the Square
   `<option>` in `request-a-ride.html` (TODO comment marks the spot).
4. Placeholder boxes still visible: homepage photo + service-area map, contact map (address confirmed — can
   embed now), service-areas map. `assets/images/og-cover.jpg` doesn't exist. Real photos/logo pending.
5. Phase 7 local SEO polish -> Phase 8 performance (real WebP images, Lighthouse once deployed) -> Phase 9 final
   review/approval -> real domain + hosting + business email.

## Working style notes
- Client emails: plain, direct, no filler or "AI" phrasing; Jaylen writes as "Mr. Sweetenburg," and signs "Jaylen".
- Never fabricate business facts, payment handles, or review quotes. Mark unconfirmed items `TODO`.
- Verify in a real browser (Playwright) before claiming something works; deliver an updated zip each round.
