# Dev Notes — One Carolina Transit (internal, not for client)

## Build
Tailwind is now **compiled** (v3.4.17, pinned). The CDN script is gone from all pages.
- Source: `assets/css/input.css` + `tailwind.config.js` (theme tokens live here now, not inline)
- Output: `assets/css/tailwind.css` (minified, ~17 KB) — **committed to git** so GitHub Pages serves it with no build step
- After editing any HTML class or the config: `npm install` (first time), then `npm run build:css`
- `npm run watch:css` while developing. `node_modules/` is git-ignored.

## Not yet built
- Form backend — both `<form action="#">` tags don't submit anywhere yet. No email/notification on submission.
  - Plan: Netlify Forms (add `data-netlify="true"`) once hosting moves off GitHub Pages
  - Interim option if hosting stays on GitHub Pages: Formspree or similar
  - Requests are monitored by the Supervisor and Office Manager (client answer #25); response time still unknown
- Real domain + hosting (currently free GitHub Pages demo URL)
- Public email confirmed: carolinatransit03@gmail.com (the "trasnsit" spelling in his signature is a typo). Not shown on the site yet; only (803) 549-8920 is listed as the phone. Decide whether to publish the email or route everything through the form + phone. Business-domain email is a later option.
- `assets/images/og-cover.jpg` is referenced by the homepage OG meta tag but does not exist yet

## Payments
- Current model is manual: the form collects the requester's chosen method (Zelle / Cash App); the office calls to confirm details and payment ("full payment to complete booking"). Nothing is charged online.
- The site names Zelle and Cash App but publishes **no handle/$cashtag yet** — need the real values from the owner. Never fabricate them.
- Square is "coming soon" (owner's setup pending): removed from the form dropdown and FAQ claims until live. When it is, add a Square payment link and restore the dropdown option (see TODO in request-a-ride.html).
- **pay.html ("How to Pay") is built.** It renders payment cards from `assets/js/payment-config.js` (three fields: `zelle`, `cashApp`, `squareLink`). Blank = hidden; all blank = "call us" fallback. Values are validated in `assets/js/pay.js` (cashtag pattern, Zelle email/phone, Square links limited to square.link / *.squareup.com / *.square.site) and rendered with textContent, so a typo can never create a broken or unsafe link.
- **To go live once the owner sends real values:** edit ONLY `payment-config.js` — no rebuild needed (no new Tailwind classes) — then commit + push. Hard-refresh to check.
- Optional later: after the form backend exists, the confirmation email/page can show the payment instructions + handle for the method chosen. Card processing on the site itself is not planned.

## Service area question (Aiken)
- Owner reports many cash riders going Orangeburg -> Aiken. Aiken County is NOT in the 7 confirmed counties. Nothing on the site claims Aiken service; asked the client (see CLIENT-QUESTIONS.md). If confirmed, update: service-areas.html, footers (all pages), homepage + FAQ copy/schema, services.html `areaServed` schema.

## Visible placeholder boxes still on the site (need real assets)
- Homepage: vehicle/driver photo slot, service-area map slot
- Contact page: map slot (address is confirmed — a real embed can be added now)
- Service Areas page: map/graphic slot

## Removed as unconfirmed
- "Since 2016" founding-year claim (homepage stat, why-us copy, About page copy + meta) — replaced with confirmed facts. Re-add only if the client confirms a year.
- "dialysis, therapy, specialist" appointment-type list on homepage — now generic "medical appointments" until the client confirms.

## Once forms are live
- Decide notification method (email vs. text) based on the answer to client question #25
