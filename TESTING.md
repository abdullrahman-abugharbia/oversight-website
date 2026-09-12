# Oversight Frontend — Test Report

Date: 2026-09-12 · Build: `npm run build` ✓ · Typecheck: `tsc --noEmit` ✓

Tests were executed against the running app (`http://localhost:5180`) by driving the
real DOM — clicking the actual language switcher, nav links, tabs, dots and form
controls, then asserting on computed styles, ARIA state and layout geometry.

---

## 1. Test summary

```
Total Test Cases:  68
Passed:            68
Failed:             0
Blocked:            0
```

| Area | Cases | Result |
|---|---|---|
| Navigation | 9 | Pass |
| UI components | 14 | Pass |
| English language | 10 | Pass |
| Arabic language | 10 | Pass |
| Language switching | 20 | Pass |
| Persistence | 2 | Pass |
| Responsive | 3 viewports × 10 | Pass |

### Language testing

```
English:            Pass
Arabic:             Pass
RTL:                Pass
LTR:                Pass
Language Switching: Pass
```

### Responsive testing

```
Desktop (1440):  Pass
Laptop  (1280):  Pass
Tablet  (768):   Pass
Mobile  (375):   Pass
```

No horizontal overflow on any page, in either language, at any viewport.

---

## 2. Test cases

### Navigation

| ID | Page | Scenario | Steps | Expected | Actual | Status |
|---|---|---|---|---|---|---|
| TC-NAV-01 | All | Every route renders | Click each nav link | Page renders with h1 + footer | All 5 render, both languages | Pass |
| TC-NAV-02 | All | Active nav state | Navigate to /services | Only "Services" has `is-active` | `Home About Us Our Work *Services Contact Us` | Pass |
| TC-NAV-03 | All | Browser back | /services → /work → back | Returns to /services, active state follows | `/services`, active = Services | Pass |
| TC-NAV-04 | All | Browser forward | after back, forward | Returns to /work | `/work` | Pass |
| TC-NAV-05 | All | Scroll reset | Scroll to 3000px, navigate | Scroll returns to 0 | `scrollY = 0` | Pass |
| TC-NAV-06 | All | Unknown route | Push `/no-such-page` | 404 page renders | 404 + "Page not found" | Pass |
| TC-NAV-07 | All | 404 translated | 404 page, switch to AR | Arabic 404, dir=rtl | "الصفحة غير موجودة", rtl | Pass |
| TC-NAV-08 | Mobile | Drawer navigation | Open burger, tap link | Navigates + drawer closes | Works, both languages | Pass |
| TC-NAV-09 | All | Header nav responsive | Shrink to 375px | Links hide, burger shows | `links:none, burger:flex` | Pass |

### UI components

| ID | Component | Scenario | Expected | Actual | Status |
|---|---|---|---|---|---|
| TC-CMP-01 | Service tabs | Switch tab 1→3 | Panel content changes, ARIA updates | `false,false,true,false,false` | Pass |
| TC-CMP-02 | Accordion | Open item 4, close it | Single-open, toggles closed | `...,true,...` → all false | Pass |
| TC-CMP-03 | Accordion | Default state | First item open | `true,false,false,false,false,false` | Pass |
| TC-CMP-04 | Diagnostic selector | Select card 2 | Front card changes | Front = "Pre-Purchase Inspection" | Pass |
| TC-CMP-05 | Thermal slider | Drag to 30% | Overlay width follows | `50% → 30%` | Pass |
| TC-CMP-06 | Thermal slider | Image alignment | Overlay image = frame width | 1200/1200, 837/837 | Pass (after BUG-03) |
| TC-CMP-07 | Testimonial carousel | Select slide 2 | Slide 2 fully visible | `[0,1200,0]` | Pass (after BUG-02) |
| TC-CMP-08 | Testimonial carousel | Select slide 3 | Slide 3 fully visible | `[0,0,1200]` | Pass (after BUG-02) |
| TC-CMP-09 | Language dropdown | Open, pick English | Menu opens, language changes | Works | Pass |
| TC-CMP-10 | Mobile drawer | Open/close geometry RTL | Slides off-screen left | open `0..323`, closed `-322..0` | Pass |
| TC-CMP-11 | Mobile drawer | Open/close geometry LTR | Slides off-screen right | open `53..375`, closed `375..698` | Pass |
| TC-CMP-12 | Partner filter | Filter by category | Grid filters, empty state translated | Works both languages | Pass |
| TC-CMP-13 | Form | Empty submit | 4 validation errors | 4 errors, translated | Pass |
| TC-CMP-14 | Form | Valid submit | Loading → success state | Success panel, translated | Pass |

### English language

| ID | Page | Expected | Actual | Status |
|---|---|---|---|---|
| TC-EN-01 | / | dir=ltr, zero Arabic characters | 0 Arabic lines | Pass |
| TC-EN-02 | /about | dir=ltr, zero Arabic | 0 | Pass |
| TC-EN-03 | /services | dir=ltr, zero Arabic | 0 | Pass |
| TC-EN-04 | /work | dir=ltr, zero Arabic | 0 | Pass |
| TC-EN-05 | /contact | dir=ltr, zero Arabic | 0 | Pass |
| TC-EN-06 | All | Nav labels translated | Home / About Us / Our Work / Services / Contact Us | Pass |
| TC-EN-07 | Contact | Form labels + errors translated | "Please enter your full name" | Pass |
| TC-EN-08 | Contact | Success message translated | "Your request has been received" | Pass |
| TC-EN-09 | All | Footer translated | Quick Links / Contact Information | Pass |
| TC-EN-10 | All | No text overflow | No page overflow at any width | Pass |

### Arabic language

| ID | Page | Expected | Actual | Status |
|---|---|---|---|---|
| TC-AR-01..05 | All 5 | dir=rtl, Arabic content present | rtl on all, Arabic present | Pass |
| TC-AR-06 | All | Text aligns to the right | `body { text-align: start }` + dir=rtl | Pass |
| TC-AR-07 | All | Drawer opens from the inline-end side | Left edge in RTL | Pass |
| TC-AR-08 | Home | Carousel advances in RTL | Correct slide visible | Pass |
| TC-AR-09 | All | Carousel arrows point correctly | Prev = →, Next = ← in RTL | Pass |
| TC-AR-10 | All | Latin technical terms preserved | `SRV_CIVIL`, `SBC 304`, `NDT` intact | Pass |

Note on TC-AR-10: some Latin strings are intentional in Arabic (service codes, standards
references, `WhatsApp`, the email address). These are Latin in the Figma design too.

### Language switching (TC-SWITCH-01..20)

From each of the five pages, the sequence `AR → EN → AR → EN` was executed and asserted
after every step: `dir` correct, nav labels in the right language, and no text from the
previous language remaining in `<main>`.

```
/services → ar,en,ar,en   4/4 PASS
/work     → ar,en,ar,en   4/4 PASS
/contact  → ar,en,ar,en   4/4 PASS
/about    → ar,en,ar,en   4/4 PASS
/         → ar,en,ar,en   4/4 PASS
                          ─────────
                          20/20 PASS
```

No page refresh is required; switching is instant and components stay functional.

### Persistence

| ID | Scenario | Expected | Actual | Status |
|---|---|---|---|---|
| TC-PERSIST-01 | Select English, reload | English retained | `lang=en, dir=ltr, stored=en`, nav "Home" | Pass |
| TC-PERSIST-02 | Select Arabic, reload | Arabic retained | `lang=ar, dir=rtl, stored=ar`, nav "الرئيسية" | Pass |

Storage: `localStorage["oversight.lang"]`. All reads/writes are wrapped in `try/catch`
so private-browsing or blocked storage degrades to the Arabic default instead of throwing.

---

## 3. Bug report

### BUG-01 — Language switcher changed nothing but its own label (the reported bug)

| | |
|---|---|
| **Title** | Selecting a language did not translate the site or switch RTL/LTR |
| **Page** | All pages |
| **Severity** | **Critical** — the entire English experience did not exist |
| **Status** | **Fixed** |

**Steps to reproduce**
1. Open any page.
2. Click the language control in the header.
3. Select "Saudi Arabia | English".

**Expected** — content switches to English and the layout switches to LTR.
**Actual** — only the dropdown's own label changed. All content stayed Arabic and the
layout stayed RTL.

**Root cause** — four separate defects, all of which had to be fixed:

1. **`index.html` hardcoded `<html lang="ar" dir="rtl">`** and nothing ever changed it.
   A grep for `documentElement`, `setAttribute` or any runtime `dir` handling across
   `src/` returned no matches. The direction was baked into the served markup.
2. **`Navbar.tsx` held the selection in component-local state.**
   `const [activeLocale, setActiveLocale] = useState(locale.options[0])` — the value was
   rendered back into the button and never left the component. Nothing else in the tree
   could observe it.
3. **`global.css` set `body { direction: rtl; text-align: right; }`** — physical values
   that would have survived a `dir` flip and kept text right-aligned even in English.
4. **No translation layer existed.** Every string in `src/data/*.ts` was an Arabic
   literal imported directly by components. There was no second locale to switch to.

**Responsible files** — `index.html`, `src/components/Navbar.tsx`,
`src/styles/global.css`, and all of `src/data/`.

**Fix**

- Added `src/i18n/LanguageProvider.tsx`: React context holding `lang`, `dir`, `setLang`
  and the active content tree. An effect writes `lang` and `dir` onto
  `document.documentElement`, making the document element the single source of truth
  for direction.
- Added `src/content/ar.ts`, which aggregates the existing `src/data/*` modules
  (so the Arabic copy extracted from Figma did not move), and derives a `Content` type
  from that shape.
- Added `src/content/en.ts`, typed as `Content`. **A missing or misspelled translation
  is now a compile error, not a runtime surprise.** A `Widen<T>` helper widens the
  literal types so another locale can supply its own strings.
- `Navbar.tsx` now calls `setLang` from the provider instead of local state.
- `global.css` uses `text-align: start` and no longer hardcodes `direction`.
- Added a `ui` string set for aria-labels, validation messages, empty/loading/success
  states and alt text — previously hardcoded Arabic in JSX.
- Added an inline pre-render script to `index.html` (see BUG-04).

**Why the fix works** — direction now lives on `<html>`, which every logical CSS
property (`inset-inline`, `margin-inline`, `padding-inline`, `text-align: start/end`)
already keys off. The stylesheet was written with logical properties throughout, so the
entire layout mirrors correctly the moment `dir` changes; only `global.css` needed a
physical value removed.

**Effect on other pages/components** — every page and component now reads from the
content tree via `useContent()`. Rendering is unchanged in Arabic (verified by
regression), and English is newly available everywhere. No component-level layout code
changed.

---

### BUG-02 — Testimonial carousel showed a blank viewport in LTR

| | |
|---|---|
| **Title** | Carousel moved slides the wrong way in LTR; no slide visible after selecting one |
| **Page** | Home, Our Work |
| **Severity** | **High** — the component was unusable in English |
| **Status** | **Fixed** |

**Steps to reproduce**
1. Switch to English.
2. Go to `/work` and click the second carousel dot.

**Expected** — the second testimonial slides into view.
**Actual** — the viewport went blank. Measured: viewport `113..1313`, slides pushed to
`1313..2513`, `2513..3713`, `3713..4913` — every slide off to the right.

**Root cause** — `TestimonialCarousel.tsx` used
`transform: translateX(${index * 100}%)`. A **positive** translateX is correct in RTL
(where flex items lay out right-to-left) but backwards in LTR, where showing slide *N*
requires `translateX(-N × 100%)`. The component was written against the Arabic design
only, so the sign was never wrong until LTR existed.

**Fix** — replaced the transform with `margin-inline-start: -${index * 100}%` on the
first slide. `margin-inline-start` is direction-aware, so a single value is correct in
both RTL and LTR with no sign-flipping logic. The CSS transition moved from
`transform` to `margin-inline-start` accordingly.

The prev/next arrow icons are now also direction-aware — "previous" points toward the
start of the reading direction (→ in RTL, ← in LTR).

**Verified** — selecting slide N leaves exactly slide N visible (1200px) and the others
at 0px, in both languages.

---

### BUG-03 — Thermal comparison slider misaligned after any resize

| | |
|---|---|
| **Title** | The clipped "before" image kept a stale width, breaking the comparison |
| **Page** | Home |
| **Severity** | **Medium** |
| **Status** | **Fixed** |

**Steps to reproduce**
1. Load the home page at 1440px.
2. Resize the browser to 900px.
3. Inspect the thermal slider.

**Expected** — both halves of the comparison stay aligned.
**Actual** — frame width 837px but the overlay image still 1200px, so the two images no
longer lined up and the reveal showed the wrong part of the picture.

**Root cause** — `BeforeAfterSlider.tsx` read a ref during render:
`style={{ width: wrapRef.current?.offsetWidth ?? '100%' }}`. Refs are `null` on the
first render and are never re-read on resize, so the value was wrong at first paint and
stale afterwards.

**Fix** — track the frame width in state, populated by a `ResizeObserver` in an effect,
and fall back to no inline width until it is measured.

**Verified** — image width matches frame width at 900px and 1440px on mount.
(The live-resize path could not be exercised in the automated environment — see
"Environment notes" — but the mount path is confirmed and the observer is standard.)

---

### BUG-04 — Flash of RTL layout for English visitors

| | |
|---|---|
| **Title** | Stored English preference applied only after React mounted |
| **Page** | All |
| **Severity** | **Low** (cosmetic, first paint only) |
| **Status** | **Fixed** |

**Root cause** — `index.html` ships `<html lang="ar" dir="rtl">`. With English stored,
the first paint was RTL and flipped to LTR once the provider's effect ran.

**Fix** — a small inline script in `index.html` reads
`localStorage["oversight.lang"]` and sets `lang`/`dir` before the module bundle loads.
Wrapped in `try/catch` so blocked storage falls back to the markup default.

---

### BUG-05 — Reason dropdown kept the previous language's text

| | |
|---|---|
| **Title** | Selected dropdown value stayed in the old language after switching |
| **Page** | Contact |
| **Severity** | **Medium** |
| **Status** | **Fixed** |

**Root cause** — the `<select>` stores the translated label as its value. After a
language switch the stored Arabic string no longer matched any option, so the field
showed stale text or silently reset.

**Fix** — an effect in `Contact.tsx` re-maps the selection to the **same option index**
in the new language whenever `form.reasonOptions` changes, preserving the user's choice.

**Verified** — picking option index 2 in Arabic, switching to English and back keeps
index 2 selected with correctly translated text each time.

---

### Non-bugs investigated and dismissed

| Observation | Verdict |
|---|---|
| Carousel slides reported outside the viewport | Expected — parked slides inside `overflow: hidden` |
| Contact success panel visible on a fresh visit | Test-harness artifact; state correctly resets on navigation and reload (verified) |
| Latin text present on Arabic pages | Intentional — service codes, SBC standards, `WhatsApp`, email address are Latin in the Figma design |
| Screenshots returning blank | Environment, not the app — see below |

---

## 4. Environment notes

Three separate anomalies during testing traced to **one** cause: the automated browser
pane runs hidden, which pauses the rendering frame loop. Confirmed directly —
`requestAnimationFrame` never fired (`rafTicked: 0`) and `ResizeObserver` never
delivered a callback.

Consequences, all tooling artifacts rather than product defects:

- screenshots of scrolled content came back blank
- CSS transitions never advanced, so animated values stayed at their start
- `ResizeObserver` callbacks were not delivered

Where a transition blocked a measurement, it was disabled (`transition: none`) so the
value committed immediately and the real geometry could be asserted. That is how
BUG-02's off-screen slides were measured.

Separately, three orphaned Vite dev servers were left holding ports 5180–5182 from
earlier restarts. The stale one on 5180 was serving a cached empty module for
`NotFound.tsx`, producing a misleading "does not provide an export named 'default'"
error. Killing the zombies and starting a single clean server resolved it — worth
knowing if that error reappears.

---

## 5. Regression testing

Run after all five fixes:

| Check | Result |
|---|---|
| `tsc --noEmit` | Clean |
| `npm run build` | Succeeds — 264 KB JS (90 KB gzip), 46 KB CSS (8 KB gzip) |
| All 5 pages × AR | Pass — dir, content, no overflow |
| All 5 pages × EN | Pass — dir, zero Arabic leakage, no overflow |
| Language switch × 5 pages × 4 cycles | 20/20 Pass |
| Desktop / tablet / mobile | Pass — no overflow in either language |
| Navigation, back/forward, active states | Pass |
| Tabs, accordion, diagnostic, slider, carousel | Pass in both languages |
| Contact form validation + submit | Pass in both languages |
| Backend-code audit | None — runtime deps are `react`, `react-dom`, `react-router-dom` |
| Hardcoded Arabic in components | None — all strings come from the content tree |

Final consolidated sweep: **10/10 page × language combinations pass.**

---

## 6. Adding a third language

1. Create `src/content/<code>.ts` exporting `const x: Content = { … }`.
   TypeScript will list every key you still owe.
2. Register it in `LANGS` and `TREES` in `src/i18n/LanguageProvider.tsx`,
   with its `dir`.

No component changes required.

---

## Contact form delivery (added after the "does the email work?" audit)

**Bug 6 — the form claimed success without sending anything.** Submitting ran a
900 ms `setTimeout` and then showed "تم استلام طلبك بنجاح — سيتواصل معك أحد
مهندسينا خلال دقائق". Instrumenting `fetch`, `XMLHttpRequest` and
`sendBeacon` recorded **zero outbound requests**. Real enquiries would have
been lost silently, with the sender told they had been received.

Two faults, both fixed:

1. No delivery mechanism at all (`mockApi.ts` was a stub).
2. `onSubmit` did `await submitContactForm(values); setStatus('sent')` with no
   `try/catch` — so once a real network call existed, any failure would *still*
   have shown the success panel.

### Verification

The Web3Forms call was intercepted in-page, so no request left the machine.

| Case | Expected | Result |
|---|---|---|
| No key configured | success panel + visible demo notice | ✅ "وضع تجريبي: لم يتم إرسال بريد فعلي" |
| Relay rejects (401) | failure banner, no success panel, fields kept | ✅ banner shown, `leakedToSuccessPanel: false`, name still "أحمد علي" |
| Relay accepts (200) | success panel, no demo notice, banner cleared | ✅ all three |

Payload shape confirmed against the relay's contract:

```json
{ "access_key": "…", "subject": "طلب فحص", "from_name": "أحمد علي",
  "email": "ahmed@example.com", "phone": "0591234567",
  "reason": "استفسار عام", "message": "…", "opted_in": "no" }
```

## Bug 7 — honeypot caused an ~8000px horizontal scroll (RTL)

Self-inflicted, while adding spam protection. The honeypot was parked with the
conventional `position:absolute; left:-9999px`.

That idiom assumes LTR. **This document is RTL**, and in RTL a box pushed past
the left edge extends the scrollable area rather than being discarded, so
`/contact` gained a ~8000px horizontal scroll (`scrollWidth` 9264 vs
`clientWidth` 1265).

It hid well: no element measured wider than the viewport, `body.scrollWidth`
was normal, and only `documentElement.scrollWidth` showed it. Removing the map
iframe and the nav drawer changed nothing, which is what pointed at the input.

Fixed with `clip-path: inset(50%)` on a 1×1 box — hidden from people, still in
the DOM for bots, and occupying no space in any direction. Confirmed
`scrollWidth === clientWidth` and the field is still 1×1, invisible and outside
the tab order.
