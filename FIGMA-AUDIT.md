# Figma ↔ Website Audit

Page-by-page comparison of the implementation against Figma file
`zGZoW2Ike9ma1fn3HXiU6U`, page `design`.

Method: every value below was read out of the Figma document JSON (fills, strokes,
corner radii, type styles, absolute geometry) and compared against the running app's
**computed** styles and `getBoundingClientRect()` measurements at a 1440px viewport —
not by eye.

---

## Summary

```
Pages checked:            5  (home, about, services, our work, contact)
Pages with differences:   5
Total fixes applied:     47
Sections verified:       27  (section count + background match on all 5 pages)
```

| Page | Figma frame | Sections | Result |
|---|---|---|---|
| Home | `home` 20:266 | 10/10 | match |
| About | `about us` 90:2393 | 6/6 | match |
| Services | `services` 132:4425 | 4/4 | match |
| Our Work | `our work` 186:3761 | 4/4 | match |
| Contact | `contact us` 120:4095 | 3/3 | match |

---

## Cross-cutting issues (affected every page)

| # | Issue | Figma | Was | Fixed |
|---|---|---|---|---|
| 1 | **Container width** — `max-width` included the padding, so every section on every page was 80px narrower than the design | content 1360 / 1280 / 1245 inside 40px margins | content 1280 / 1200 / 1165 | `max-width: calc(var(--container) + 80px)` |
| 2 | **Button radius** — no button in the entire Figma file is a pill; a survey of every button-shaped frame returned radii of 0, 2, 4, 8, 10, 12, 16 only | 0–16px per context | `99px` everywhere | `radius` prop on `Button`, default 8 |
| 3 | **Navbar logo** | 214×56 | 130×34 | `height: 56px` |
| 4 | **Navbar CTA** `اتصل بنا` | plain white text, underlined | filled teal pill | plain text + `text-decoration: underline` |
| 5 | **Nav link pill** — the link group's *parent* is a translucent capsule (I originally inspected only the child link frames, which have no fill) | `406×52`, `#ffffff` @20%, `r:99` | no background | added |
| 6 | **Overlay routes** — About and Work also have dark heroes | nav floats over the hero | solid white bar above it | `OVERLAY_ROUTES = ['/', '/about', '/work']` |

---

## Home (`home`, 20:266)

**Ten sections — five were built light that are dark in Figma.** This was the single
largest source of visual drift.

| Section | Figma | Was |
|---|---|---|
| About + stats | `#000000` | white |
| 4-step journey | `#010101` | white |
| Thermal demo | `#121316` | white |
| Testimonials | `#000e0f` | warm beige |
| Map CTA | `#0c0c10` | white |
| NDT lab | `#121413` | `#1b1c1a` |

The About block renders **white text on black**, which is why its isolated Figma export
came back looking blank — a clue I initially misread as an empty frame.

**Hero** — five separate mismatches:

| | Figma | Was |
|---|---|---|
| Height | 746px | `min-height:720` + padding → 961 |
| Title line-height | 96px | 82px (1.28) |
| Content width | 542px | 620px |
| Inset from page edge | 88px | 40px |
| Button order | teal left, white right | reversed |
| Buttons | square, `#318391` / `#ffffff` with **black** text | pill, teal / transparent-outline with white text |

**Diagnostic cards** — I had invented brown text (`#6b3b2f`, `#6b4a42`). Each card has
its own accent in the design:

| Card | Tint | Accent | Body |
|---|---|---|---|
| الفحص الهيكلي | `#ffecea` | `#4d1c1b` | `#000000` |
| فحص ما قبل الشراء | `#edefff` | `#273879` | `#151517` |
| كشف تسريبات | `#f2f9eb` | `#345612` | `#718096` |

Card radius was also wrong: `70px` in Figma, `30px` in the build.

**Other component fixes:** testimonial cards `#141819` with a `#22686d` border whose
**top edge is 6px** (`individualStrokeWeights.top`), not white cards; NDT device cards
`#131315` on `#90d1d7`, `r:4`; FAQ rows black border, square corners, black text;
detailed-service headings `#111111` and body `#737373`; step numbers `#2a6e73` with the
final one `#36dbe7`.

---

## About (`about us`, 90:2393)

**Header was the wrong component entirely** — a light beige box where Figma has a
793px dark image hero.

| | Figma | Was |
|---|---|---|
| Hero | 793px dark image hero | light beige block |
| Title | 70px/700, lh 96, middle line `#46a39e` | 60px, all one colour |
| Trust strip | 3 glassmorphism cards (`rgba(255,255,255,0.05)`, 1px white border, `r:2`, `blur(12px)`) overlapping the hero | plain bordered columns in a separate section |
| Oath section | `#faf9f5`, heading `#2a6e73` | white, dark heading |

Verified after fix: title `w:747 fromRight:82 y:140 fs:70 lh:96` — exact.

**"لماذا يختار الملاك والمطورون" was also the wrong component:**

| | Figma | Was |
|---|---|---|
| Background | `#ffffff` | `#1b1c1a` |
| Cards | 3 gradient teal cards, `r:16` | no cards — a teal top-border line |
| Card images | one per card | none |
| Centre card | taller (772 vs 699), raised 73px | all equal |

Gradient: `linear-gradient(135deg, #117788 0%, #086272 12.1%, #138193 78.9%, #00a8c4 100%)`.
Card order was wrong too — Figma's RTL order is حياد (right) · الدقة (centre) · حماية (left).

**Sectors section** — rebuilt twice. First pass fixed the background (`#0d1111`, was warm
beige). Second pass found the cards themselves were wrong: Figma has a 2x2 grid of
**644x402 photo cards** (`#1b1c1c` base, `#3f4849` border, `r:2`) with a background image
under a dark gradient, a `#90d1d7` icon, the number and SBC code top-right, and a
rule-separated tag at the bottom. The build had plain bordered cards with no imagery.

**Partners** — Figma is a **logo carousel**: a 1216x96 rail flanked by prev/next chevrons,
with the filter tabs sitting on a `#d1d5db` bottom rule. The build had a static 6-column
grid of bordered boxes.

**Final CTA band** — was teal `#22686d`; Figma is `#0d1111` at 447px with a `#cfc4c5`
hairline **and a background image** (`gradient-band`) under a directional gradient, with
the content block confined to 582px on the inline-end side rather than centred.

**Partners heading** `#001618`.

---

## Services (`services`, 132:4425)

**The service explorer was the wrong component.** I had built it as a thin tab strip
above a three-column text panel. Figma has:

| | Figma | Was |
|---|---|---|
| Tabs | 76px pills, `r:16`, wrapping onto **two rows**; active `#318391` white, inactive `#323232` | small single-row tabs with a bottom rule |
| Panel | two columns: 466px info card + 662px diagram | three text columns |
| Info card | `#ffffff` on `#d9d9d4`, `r:2`, 33px padding | no card |
| Header badge | `400x89` on `#1b1b1b`, `r:2`, 21/600 white | plain heading |
| Sections | three rule-separated blocks | ungrouped |
| Tech chips | four 94px bordered cards, `r:2` | inline pills |
| CTA | `400x61`, `#318391`, `r:2` | pill button |
| Right column | **building diagram with 5 inspection hotspots** and a `#060505` label chip | absent |

**The hero was also wrong.** Figma "Frame 167" is 1440x566 with a **centred** 772x192
title (60px/96px, `#000000`) carrying the same swoosh as the Work page at 97px, a
centred 802x88 body (30px/44px), and two 169px `#2a6e73` circles at the far edges under
a **354px layer blur**. Mine was left-aligned with no swoosh and small hard-edged dots at
arbitrary positions. Verified after fix: title `w:772 h:192 y:174`, body `w:802 h:88
y:401`, swoosh offset 97 — exact. The same hero is shared with Contact.

**The process section was a 2-column card grid; Figma has a zig-zag timeline.**

| | Figma | Was |
|---|---|---|
| Background | `#020a0c` | `#f5f4f0` warm |
| Layout | 4 cards alternating around a central spine | 2-column grid |
| Card | `460×157`, `r:24`, 0.5px gradient border | `r:16`, flat border |
| Card fill | `#003034` @80% → `#0b1d1e` @60% gradient | white |
| Spine | 5px vertical gradient line, 789px tall | none |
| Markers | 4 × 64px numbered circles | inline 48px circles |
| CTA | `273×77` white pill, `r:50`, `#318391` text at 34/600 | dark 56px pill |

Verified after fix: `460×157`, `r:24`, zig-zag `RLRL`, CTA `273×77 r:50 #318391 on #ffffff`.

Hero was warm beige with `#1b1c1a` text; Figma is **white with pure `#000000`** at 60/700.

---

## Our Work (`our work`, 186:3761)

**Hero rhythm was loose guesswork.** Rebuilt to the exact y-coordinates:

```
                app / figma
section height  1278 / 1278
title           y:174  h:192  w:502   60px/96px
body            y:401  h:88   w:802   30px/44px
impact title    y:756  h:96          51px/96px
stat cards      y:917  h:304  w:300
swoosh offset   97 / 97
```

- **Swoosh was missing** — Figma has a curved teal underline (`248×10`, `#318391`) under
  *both* headings. It also sits **between the two title lines** (`y=271` inside a title
  spanning 174–366), not below the heading.
- Rendering it inline broke the heading's intrinsic width and wrapped
  "أثر Oversight الهندسي" onto two lines; Figma has one. Now absolutely positioned.
- **Wrong decorative shapes** — the two circles were `Ellipse 31/32`, which belong to the
  Services and Contact heroes. Work uses large rotated teal corner gradients.
- **Impact stats** were bare columns; Figma has 4 bordered cards (`300×304`, `r:16`,
  `#2a6e73` border, teal glow fading up) each with an icon (clock / warning / money /
  buildings — all four added to the icon set).

**Case studies were a stacked list; Figma is a slider:**

| | Figma | Was |
|---|---|---|
| Layout | slider, active card + neighbour peeking | 3 stacked full-width cards |
| Card | `900×635`, `r:16`, `#cfc4c5` | full-width, variable height |
| Image side | left | right |
| Value block | `#f5f4f0` panel, `r:2` | top-border divider |
| Controls | 2 × 48px circles + dots | none |

**Testimonials** rebuilt to `724×448` cards in a 998px viewport (active flush to the
inline-end, previous peeking 250px), controls `35×35` — one outlined white, one solid.

**Final CTA** had no background; Figma is a 434px image under a 5-stop black gradient,
with `r:16` buttons.

---

## Contact (`contact us`, 120:4095)

| | Figma | Was |
|---|---|---|
| Hero | white, `#000000` title at 60/700 | warm beige, `#1b1c1a` |
| Channels | **one** `607×981` card, `r:24`, `#cfc4c5` | four separate cards |
| Form card | `r:24`, `#cfc4c5` border | `r:24`, `#e2e8f0` border |
| Columns | two equal 607px, 50px gutter, 1264 container | 0.9fr / 1.1fr, 56px gutter, 1280 |
| Map section | `#ffffff` | `#f5f4f0` warm |

---

## Verification

```
Section count + background     5/5 pages match
Page × language regression    10/10 pass  (AR/RTL + EN/LTR × 5 pages)
Desktop 1440                  no overflow, both directions
Tablet   768                  no overflow, both directions
Mobile   375                  no overflow, both directions
tsc --noEmit                  clean
npm run build                 clean
```

---

## A mistake worth recording: physical vs logical coordinates

Figma `x` values are **physical canvas coordinates**, not reading-order positions.
A node named "Left Column" at `x:64` is on the physical **left** — full stop. Twice I
read such a value as "the RTL start side" and placed the element on the right, which
mirrored the layout:

| Section | Figma | Shipped as | Now |
|---|---|---|---|
| Services explorer | info `x:64` LEFT, diagram `x:554` RIGHT | info RIGHT, diagram LEFT | fixed |
| Contact columns | channels `x:0` LEFT, form `x:657` RIGHT | channels RIGHT, form LEFT | fixed |

Section-level checks (background colour, section count, element sizes) pass happily
while a layout is mirrored, so these only surfaced on visual inspection. After the second
one I swept every paired layout in the file against its physical `x`:

```
CONTACT          channels LEFT  · form RIGHT      was swapped → fixed
HOME hero        content RIGHT                    ok
ABOUT hero       content RIGHT                    ok
HOME service 01  image RIGHT                      ok
ABOUT oath wide  image RIGHT                      ok
HOME map CTA     map LEFT · content RIGHT         ok (fixed earlier)
WORK case card   image LEFT · content RIGHT       ok
FOOTER           brand RIGHT · links LEFT         ok (fixed earlier)
```

## Remaining differences

Things I could not reproduce exactly from the file, and why:

1. **Title line-wrapping.** The hero headline breaks one word earlier than Figma. The box
   is `542×288` either way — the difference is font metrics between Google Fonts' IBM Plex
   Sans Arabic and the copy embedded in Figma. Forcing explicit `<br>` would match at
   1440px but break at every other width.

2. **Decorative gradient geometry.** Figma's corner glows are large rotated rectangles
   positioned off-canvas. I reproduced them as blurred radial gradients — visually
   equivalent and seam-free, but not the same primitive. My first attempt used linear
   gradients and left a visible hard edge across the hero.

3. **Timeline marker artwork.** The spine markers are grouped vector artwork
   (`Group 125–127`). I rendered them as numbered circles matching the 64px footprint and
   teal palette rather than re-tracing the vectors.

4. **Section pixel heights.** Backgrounds, widths, type and card geometry match, but total
   section heights vary by a few percent because Arabic text reflows differently in a
   browser than in Figma. Anchored geometry (hero, stat cards, case cards, timeline cards)
   is pixel-exact; content-driven heights are not.

5. **Figma `components` page.** A working scratch page, not part of the site. Not built,
   by design.

6. **Content gaps** (unchanged, documented in the README): collapsed FAQ answers 3–6,
   placeholder testimonial names (`اسم وتفاصيل العميل` in the file itself), and service
   tabs 2–5 which Figma does not detail.

---

## Round 6 — Contact page (Figma `172:3596`)

| # | Figma | Was | Now |
|---|-------|-----|-----|
| 48 | Form fields ordered: `[name \| phone]` row → email → subject → **textarea** → select → checkbox → submit | email+subject shared a 2-col row; the select came *before* the textarea | field order matches Figma exactly |
| 49 | Inputs filled `#f5f4f0`, `r=8`, no visible border | white fill with a `#cfc4c5` 1px border, `r=10` | `--c-surface-warm` fill, `r-8`, transparent border that only colours on focus/error |
| 50 | Submit `509×56`, `#318391`, `r=8`, full card width | `align-self: flex-start`, `min-width:180px`, `h=52`, pill radius, `#22686d` | full width, `56px`, `--c-teal-600` (#318391), `r-8` |
| 51 | Checkbox `20×20`, `r=2` | `18×18`, no radius | `20×20`, `r-2` |
| 52 | A `542×368` blueprint drawing closes the channels card (`#e9e8e4` plate) | missing entirely | `.channels-card__media` with `img-540x366.webp`, `aspect-ratio: 542/368` |
| 53 | Map section | flat screenshot (`map-placeholder.webp`) | live Google Maps embed — see below |

### Google Maps without a backend

The map is a **keyless embed**: `https://www.google.com/maps?q=<lat>,<lng>&hl=<lang>&z=<zoom>&output=embed`.
`output=embed` is served directly by Google to the browser — no API key, no billing account,
no server call of ours — so the frontend-only constraint holds.

* The marker is placed by **coordinate, not by text query**. A text query
  ("حي الملقا، الرياض") lets Google resolve whatever it thinks you meant, so the
  pin lands on the district centroid and can drift as Google's index changes.
  `q=<lat>,<lng>` fixes the marker on one point permanently.
* The coordinate lives in `src/config/location.ts`, **not** in `src/data/`.
  `content/ar.ts` aggregates the data modules with `import * as`, so an export
  added there becomes part of the translated tree and every locale is forced to
  restate it — a coordinate is language-neutral and must have exactly one copy.
* `hl` follows the active UI language, so Google's own map labels come back in
  Arabic or English.
* An "open in Google Maps" link sits under the frame using the public
  `maps/search/?api=1&query=` URL, for users who want the full app.

If a styled/branded map is wanted later, swap the `src` for the Maps **Embed API**
(`https://www.google.com/maps/embed/v1/place?key=…`) and read the key from
`import.meta.env.VITE_GOOGLE_MAPS_KEY`. That is still frontend-only — Vite inlines the
value at build time — but the key becomes public, so it must be HTTP-referrer-restricted
in Google Cloud Console. The keyless embed above avoids that entirely.

### The home-page map plate is a link too

The dark "Map-Placeholder" plate in the home-page CTA (artwork **and** the
"مقرنا الرئيسي" badge) is a single `<a>` to the same pin, opening in a new tab.

It was a `<figure>` with a `<figcaption>`. `<figcaption>` is only valid as a
child of `<figure>`, so wrapping the pair in an anchor would have produced
invalid markup and an inconsistent hit area — the badge is now a `<span>` and
the anchor is the container. Verified by hit-testing `elementFromPoint` at the
badge, the artwork centre and all four corners: every point resolves to the link.

It reads the same `mapPin` constant as the contact-page embed, so moving the pin
moves both.

### Real head-office pin (replaces the Al Malqa placeholder)

The earlier coordinate was the **Al Malqa district centroid** — the best the
Figma copy allowed, since it gave no building. The actual office is in
**الروضة / Al Rawdah**, the other side of Riyadh.

Resolved from the Google Maps place "Super Office"
(`ftid=0x3e2f01ab06ec3315:0x1c82ebad616ae97f`). The shared URL carried no
lat/lng, only that feature id, so the coordinates came from Google's own
canonical rewrite: `/maps/place/Super+Office/@24.7220218,46.7722786,17z`.

```
24.8026, 46.6044  z16   Al Malqa      (was — wrong district)
24.7220218, 46.7722786  z17  Al Rawdah  (now)
```

Verified by round-tripping the embed URL: Google's response for that point names
الروضة / الرياض, with no الملقا anywhere.

**Six copy references moved with it**, or the page would have shown one district
while the map showed another — `site.ts` address + mapAlt, `contact.ts` address,
and the three English equivalents. `grep` for الملقا/Malqa now returns nothing.

### Contact CTAs route to /contact

"اتصل بنا" in the header and "تواصل معنا الان" on the Services page were
`tel:` links — a phone dial, not a route. Both now go to `/contact`.

Left on their own channels deliberately, because each label names the channel
and carries its icon:

| Label | Goes to | Why |
|---|---|---|
| تواصل معنا عبر واتساب | wa.me | says "via WhatsApp" |
| اتصل بنا هاتفياً | tel: | says "by phone" |
| ٠٥٩٩٣٩٩٣٦٨ (drawer, footer) | tel: | the number itself is the label |

**Also fixed a routing bug found in passing.** The Services panel CTA was
`<a className="svc-cta" href="/contact">` — a bare anchor, which reloads the
whole SPA instead of routing. That discarded the React tree, so the chosen
language and scroll position were lost on every click. Now `<Link to>`.

Verified across all six pages: every "تواصل معنا"/"اتصل بنا" resolves to
`/contact`, and a click leaves a window-scoped probe intact — proving
client-side routing, not a reload.

### Heroes fill the viewport (one section on screen at a time)

Both heroes carried their Figma frame height verbatim — `.hero` 746px,
`.about-hero` 793px. On an 800px-tall viewport that left 203px and 166px of
the *next* section showing, so the screen displayed two sections at once.

The rem scaling made it worse, not better: shrinking the design to 80% shrank
the heroes too (746→597), widening the gap. A fixed pixel height cannot fill a
screen whose height it does not know.

Both now use `min-height: 100dvh` with a `100vh` fallback, and centre their
content. `dvh` because on mobile `vh` measures the viewport *without* the
browser's collapsing toolbars, so a `100vh` hero is taller than what you can see.

Top padding is mirrored on the bottom so `align-items: center` centres the
**content** rather than the padding box, while the padding still guarantees
clearance under the fixed navbar when the viewport is too short to centre.

**Regression caught during verification.** Adding `display: flex` to
`.about-hero` broke it below 1200px, where `.trust-strip` switches to
`position: static`: as a flex item in the default *row* direction it lined up
**beside** the heading instead of under it. Fixed with
`flex-direction: column` + `justify-content: center`, and the desktop-only
bottom padding that reserves the strip's band is reset in that breakpoint.

Verified: 1280×800, 1280×600, 1280×1200, 1150×800 (the strip's mode switch) and
375×812. Heroes fill the screen, nothing peeks, no navbar overlap, no strip
overlap, no horizontal overflow.

### Footer social links

They were placeholders: four entries hardcoded in `Footer.tsx` with
`href: '#'`, including a Facebook account that does not exist and the retired
Twitter bird.

Now driven by `src/config/social.ts` — outside `src/data/` for the same reason
as the map pin: `content/ar.ts` aggregates data modules with `import * as`, so
an export there joins the translated tree and forces every locale to restate a
URL that is identical in both.

| | Handle | |
|---|---|---|
| Instagram | oversight.sa | |
| TikTok | @oversight.sa | |
| Snapchat | oversight.sa | |
| X | @Oversighsa | **transcribed from a screenshot — unconfirmed** |

Facebook removed. The Twitter bird is replaced by the 2023 X mark.
Links open in a new tab with `rel="noreferrer"`.

**HTTP status cannot validate these.** All four URLs return 200 — but so does
`x.com/zzzz_definitely_not_a_real_handle_9182`, and so does a nonsense
Instagram handle. These are client-rendered apps that serve a shell for any
path. Any future "the link is verified" claim based on a status code is false.

Icons verified with `getBBox()` instead: each glyph fills the 24-unit viewBox
(Instagram 20x20, TikTok 15.7x18, Snapchat 19.6x17, X 21.6x19.5) in white.
