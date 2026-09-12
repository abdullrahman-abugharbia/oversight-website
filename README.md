# Oversight — Frontend

Frontend-only implementation of the **Oversight** (أوفرسايت) Figma design — a Saudi
engineering/building-inspection company site. Bilingual Arabic (RTL) / English (LTR).

> **There is no backend in this project, by design.** No API server, no database, no
> auth server, no controllers or models. Everything that would normally need a backend
> is mocked in `src/utils/mockApi.ts` so it can be swapped for real endpoints later.

Source of truth: Figma file `zGZoW2Ike9ma1fn3HXiU6U` (page `design`). Colors, type,
spacing, radii and copy were extracted from the file via the Figma REST API rather
than eyeballed.

---

## Technology

| Concern | Choice |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Routing | react-router-dom 6 |
| Styling | Plain CSS with custom properties (design tokens) — one stylesheet per component |
| State | React local state only |
| Data | Typed modules under `src/data/` |
| Icons | Inline SVG (`src/components/Icons.tsx`) — no icon dependency |
| Fonts | IBM Plex Sans Arabic + JetBrains Mono (Google Fonts) |

Runtime dependencies are just `react`, `react-dom`, `react-router-dom`. Nothing else.

Plain CSS was chosen over Tailwind deliberately: the design leans on exact Figma
values (specific radii, a warm off-white, a fixed type ramp), and CSS custom
properties express that as a real token layer. Swapping to Tailwind later means
mapping `tokens.css` into a theme config.

---

## Implemented pages

| Route | Figma frame | Contents |
|---|---|---|
| `/` | `home` (20:266) | Hero, about + stats, interactive diagnostic selector, 4-step journey, 5 detailed services, thermal before/after slider, NDT device lab, testimonials, FAQ, map CTA |
| `/about` | `about us` (90:2393) | Hero, 3 pillars, integrity oath, why-us, 4 sectors, partner grid with filters, CTA band |
| `/services` | `services` (132:4425) | Hero, 5-tab service explorer, 4-step process, FAQ |
| `/work` | `our work` (186:3761) | Hero, impact stats, 3 case studies, testimonials, CTA with badges |
| `/contact` | `contact us` (120:4095) | Hero, 4 contact channels, validated enquiry form, map |
| `*` | — | 404 page |

Shared across every page: the navbar (`Frame 174`) and the footer.

---

## Project structure

```
oversight-frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/images/        47 images exported from Figma, converted to WebP
│   ├── components/           Navbar, Footer, Button, Accordion, SectionHeader,
│   │                         DiagnosticSelector, BeforeAfterSlider,
│   │                         TestimonialCarousel, Icons, ScrollToTop
│   ├── content/              ar.ts (aggregates data/), en.ts (typed mirror)
│   ├── data/                 site, home, about, services, work, contact,
│   │                         faq, testimonials  ← Arabic source content
│   ├── i18n/                 LanguageProvider — lang, dir, persistence
│   ├── layouts/SiteLayout.tsx
│   ├── pages/                Home, About, Services, Work, Contact, NotFound
│   ├── styles/               tokens.css, global.css
│   ├── utils/mockApi.ts      the only "backend" boundary
│   ├── App.tsx
│   └── main.tsx
├── index.html                <html lang="ar" dir="rtl">
├── package.json
├── tsconfig.json
└── vite.config.ts
```

Every component owns a sibling `.css` file. `@/` is aliased to `src/`.

---

## Running it

```bash
npm install
npm run dev
```

Opens on **http://localhost:5180**.

```bash
npm run build      # type-check + production build into dist/
npm run preview    # serve the built output locally
npm run lint       # tsc --noEmit
```

## Deploying

The build output in `dist/` is fully static — any static host works.

- **Netlify** — build `npm run build`, publish `dist`
- **Vercel** — framework preset "Vite", no extra config
- **GitHub Pages / S3 / nginx** — upload `dist/`

One requirement: because routing is client-side, the host must rewrite unknown
paths to `/index.html`, or `/about` will 404 on refresh. On Netlify add a
`_redirects` file containing `/*  /index.html  200`.

---

## Design system

`src/styles/tokens.css` holds the values extracted from Figma.

**Colors** — primary teal `#22686d` (the most-used fill in the file), plus
`#2a6e73`, `#318391`, `#90d1d7`, and a 10% `#aceef3` wash. Text is `#4c4546` on
`#ffffff` / `#f5f4f0`. Dark sections use `#1b1c1a` / `#141819`. Borders `#cfc4c5`,
`#dbdad6`, `#e2e8f0`.

**Type** — IBM Plex Sans Arabic throughout (400/500/600/700), JetBrains Mono for
technical labels (device codes, `SRV_CIVIL`, status chips). The ramp runs 64 / 58 /
51 / 48 / 46 / 43 / 40 / 36 / 32 / 30 / 24 / 18 / 16 / 14 / 12 / 10px.

**Radii** — 2, 4, 8, 10, 12, 16, 18, 24, 30, 70, 99px, all from the file.

---

## Bilingual (Arabic / English)

The site ships in Arabic (the design's language) and English, switchable from the
header. Direction is driven by `<html dir>`, which `LanguageProvider` keeps in sync
with the chosen language; every layout rule uses logical properties, so the whole page
mirrors between RTL and LTR with no per-component direction logic.

- `src/content/ar.ts` aggregates the Arabic modules in `src/data/` and derives the
  `Content` type.
- `src/content/en.ts` is typed as `Content`, so **a missing translation fails the
  build** rather than showing the wrong language at runtime.
- The choice persists in `localStorage["oversight.lang"]` and is applied before first
  paint by a small inline script in `index.html`.

To add another language, create `src/content/<code>.ts` and register it in `LANGS`
and `TREES` in `src/i18n/LanguageProvider.tsx`. No component changes needed.

Full test results and the bug report are in [TESTING.md](TESTING.md).

## Frontend interactions (mock only)

- Route navigation, scroll restoration, in-page hash links
- Mobile drawer menu with scrim and scroll lock
- Language switching, Arabic ⇄ English, with RTL/LTR flip and persistence
- Stacked diagnostic card selector (home)
- 5-tab service explorer (services)
- FAQ accordion, single-open, full ARIA
- Drag/keyboard before-after thermal comparison slider
- Testimonial carousel with dots and arrows
- Partner grid category filter
- Contact form: client-side validation, loading state, success state

## Mock data

Content lives in `src/data/*.ts`, separate from components:

```
site.ts  home.ts  about.ts  services.ts  work.ts  contact.ts
faq.ts   testimonials.ts
```

### Connecting a real API later

`src/utils/mockApi.ts` is the single boundary. Today:

```
component → mockApi → setTimeout → UI
```

Replace the function bodies with real requests and nothing else changes:

```ts
export async function submitContactForm(payload: ContactPayload) {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}
```

For content, swap the static imports in `src/data/` for fetches behind a hook.
Component props are already typed against those shapes.

---

## Assets

47 images were pulled from the Figma file through the REST API and converted from
PNG/JPG to WebP: **36.0 MB → 3.2 MB (91% smaller)**, resized to sensible maximums
(1920px heroes, 1400px cards, 800px device shots).

The logo was exported at 4x and its baked-in white background removed so it can
render white over the dark hero and dark over light sections.

---

## Verified

- `tsc --noEmit` — clean
- `npm run build` — succeeds; 264 KB JS (90 KB gzip), 46 KB CSS (8 KB gzip)
- All five routes render their full content
- Service tabs, FAQ accordion, diagnostic selector, thermal slider, testimonial
  carousel, and contact-form validation + submit all exercised in the browser
- 375px, 768px and desktop widths: no horizontal overflow, grids collapse correctly
- No console errors
- Arabic and English verified on all 5 pages; 20/20 language-switch cycles pass
- See [TESTING.md](TESTING.md) for 68 test cases and 5 fixed bugs

---

## Assumptions and gaps

Things worth knowing before you build on this:

1. **FAQ answers 3–6** were collapsed in the Figma file, so only the questions and
   the first two answers exist in the design. I wrote the remaining four answers to
   match the established voice. Replace them with the real copy.
2. **Testimonial authors** are literally `اسم وتفاصيل العميل` ("customer name and
   details") in Figma — placeholders in the design itself, kept as-is.
3. **Service tabs 2–5** on `/services`: Figma only details the first tab (الفحص
   المدني والإنشائي). The other four are built from the matching service
   descriptions on the home page. Flagging it because that content is inferred.
4. **Avatars** in testimonials are CSS gradients — the design has no avatar images.
5. **The map** is the static image from Figma, not an embedded map. Drop in Google
   Maps or Mapbox when there is a key.
6. **English translations were written by me**, not supplied with the design. The
   Figma file is Arabic-only. Review `src/content/en.ts` before going live.
7. **Social links** in the footer point at `#` — no URLs in the design.
8. **The interactive building diagram** described in the services hero copy ("انقر
   على أي جزء من أجزاء المبنى") is not drawn in Figma; the tab explorer is the
   closest faithful equivalent.
9. **Two Figma sections were not reproduced**: the `components` page (a working
   scratch page, not part of the site) and a large `Section 1` container on it.
10. **Generic image names** (`img-449x633.webp` etc.) come from unnamed Figma layers.
    Rename them as their purpose becomes clear.

## Contact form delivery

The contact form posts straight from the browser to **Web3Forms**, which relays
the message to your inbox. There is no backend — Web3Forms is the only thing
between the form and the email, and it is not ours to run.

### Setup

1. Go to <https://web3forms.com>, enter the inbox that should receive enquiries.
   They email you an access key. No account required.
2. `cp .env.example .env` and paste the key into `VITE_WEB3FORMS_KEY`.
3. Restart the dev server — Vite only reads `.env` at startup.

Without a key the form runs in **mock mode**: it shows the success panel with a
visible "وضع تجريبي / Demo mode" notice and sends nothing. That notice is the
only thing stopping a demo build from telling visitors an engineer will call them.

### About the key being public

Vite inlines `VITE_*` variables into the bundle, so this key ships to every
visitor. That is by design for this kind of service: the key only authorises
*delivering a message to the inbox that owns it*. It cannot read that inbox or
send as it. The realistic abuse is someone spamming your own inbox. The form already carries
a **honeypot** (`botcheck`) — a field hidden from people that bots fill in, which
Web3Forms then discards.

Free-plan spam options, per their pricing table: honeypot (wired), "advanced
spam protection" (automatic), and **hCaptcha** (available, not yet wired).
reCaptcha v3, Cloudflare Turnstile and **domain restriction** are paid.

A secret that must stay secret (an SMTP password, a mail API key) can never live
in a frontend, which is why the relay exists.

### Changing who receives enquiries

You **cannot** set the recipient in this codebase, and that is deliberate on
Web3Forms' side: the key is public, so if a `to_email` field existed anyone
could repoint your form at an address of their choosing. One key delivers to one
inbox — the one that registered it.

To send enquiries somewhere else, generate a **new key** at web3forms.com against
that address and replace `VITE_WEB3FORMS_KEY`. (CC'ing a second address is a
paid "Pro" feature, via a `ccemail` field.)

What the form *does* set is `replyto`, so hitting reply in the inbox answers the
person who filled the form rather than Web3Forms.

### Still mocked

`requestInspection()` in `src/utils/api.ts` has no endpoint behind it and
returns `mocked: true`.

## Display scaling (why the CSS says px but ships rem)

The design was drawn on a **1440px** Figma frame. A Windows machine at 125%
display scaling gets a **1280px** CSS viewport, so the design arrived 12.5% too
big and the container filled 1264 of the available 1280px — no margins, cramped.

Rather than redraw anything, the build scales it:

* **You write px.** Every value in `src/` stays a literal Figma pixel, so a
  Figma audit still compares like with like (`724px` really is the 724 in the
  file). Nothing about the authoring workflow changed.
* **The build emits rem.** `postcss-pxtorem` (see `postcss.config.js`) converts
  them, skipping media queries and 1px hairlines.
* **One line sets the scale** — `html { font-size: clamp(0.8rem, 1vw, 1rem) }`
  in `global.css`.

| Viewport | Root | Scale | |
|---|---|---|---|
| any desktop width | 12.8px | 80% | fixed |
| ≤1024px | 16px | 100% | mobile override — those layouts are already small |

**It is fixed, not fluid, and that was a correction.** The first attempt used
`clamp(0.8rem, 1vw, 1rem)`, growing to Figma 1:1 at 1600px. That defeated the
purpose: a maximised Chrome window on a 1920x1080 screen at 125% Windows
scaling is ~1536 CSS px, which landed on ~15.4px — 96%, essentially the full
size that was too large to begin with. Scaling up "on wide screens" was wrong,
because the screen it was meant to help *is* a wide screen.

0.8rem reproduces browsing at 80% zoom exactly: on that display the container
renders 1440 device px either way, 75% of the screen.

The trade-off is that the design no longer grows to fill a very large monitor —
the same trade-off any fixed max-width layout makes.

Written in `rem` rather than `px` so it *multiplies* the reader's browser
font-size preference instead of overriding it.

**To change the scale, edit that one clamp.** Never scale by editing tokens —
1,191 px values live outside `tokens.css` and would not follow.

### Verified

| | |
|---|---|
| 1280px viewport | root 12.8px, container 1152px, 64px margins — identical to browsing at 80% zoom |
| 1600 / 1920 | root 16px, container 1440px, clamped (does not grow) |
| 375px mobile | root 16px, no overflow |
| All 6 pages | no horizontal scroll |
| Carousel | steps (724+24)×0.8 = 598.4px exactly |

Smallest labels (Figma 10px) render at 8px on a 1280px viewport. That is the
same size they appear at 80% browser zoom — the look this scale was chosen to
reproduce — but raise the clamp's lower bound if it reads too small.
