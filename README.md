# Oversight — أوفرسايت

Bilingual (Arabic RTL / English LTR) static website built from the Figma
prototype `oversight`. No framework, no build step required to run it: open
`index.html` or drop the folder on any static host.

---

## Pages

| File            | Arabic       | English    | Source of design |
|-----------------|--------------|------------|------------------|
| `index.html`    | الرئيسية      | Home       | Figma frame 1    |
| `about.html`    | من نحن        | About      | new, in the same visual language |
| `work.html`     | أعمالنا       | Our Work   | new, in the same visual language |
| `services.html` | خدمات        | Services   | Figma frame 3 (interactive inspection blueprint) |
| `contact.html`  | تواصل معنا    | Contact    | Figma frame 2 (form + map) |

---

## Layout of the folder

```
index.html  about.html  work.html  services.html  contact.html   ← the site (generated)
assets/
  css/main.css        one stylesheet, CSS custom properties for all tokens
  js/i18n.js          every string, in Arabic and English
  js/main.js          nav, tabs, FAQ, comparison slider, carousel, filters, form
  img/                images — placeholders you replace with Figma exports
src/                  templates the pages are generated from
  layout.html         shell: <head>, header, footer
  pages/*.html        the body of each page
  partials/*.html     blocks reused on more than one page (FAQ, CTA band)
tools/
  build.py            src/ → the five .html files in the root
  make_placeholders.py  regenerates the placeholder images
  check.py            functional smoke test (33 checks)
  shoot.py            screenshots every page in both languages
```

### Editing

Header, footer and shared blocks live in `src/`, so they only exist once.
After changing anything in `src/`:

```bash
python3 tools/build.py
```

That rewrites the five root `.html` files. If you'd rather not use the build
step at all, delete `src/` and `tools/` and edit the root `.html` files
directly — they are complete, standalone pages.

---

## Dropping in the real images

`assets/img/` currently holds generated placeholders. Each one is named for its
slot and sized to the aspect ratio the layout expects, and the filename and
dimensions are printed on the image itself. **Export from Figma and overwrite
the file of the same name** — no HTML changes needed.

| File | Used for | Size |
|---|---|---|
| `hero.jpg` | home hero background | 1920×1080 |
| `concern-structural.jpg` `concern-leaks.jpg` `concern-mep.jpg` `concern-handover.jpg` | the four "where does your property worry you" cards | 1200×900 |
| `service-structural.jpg` `service-electrical.jpg` `service-mechanical.jpg` `service-environmental.jpg` `service-leaks.jpg` | the five service rows | 1280×880 |
| `compare-visual.jpg` / `compare-thermal.jpg` | before/after thermal slider — must be the **same wall from the same angle** | 1600×800 |
| `kit-*.jpg` (8 files) | equipment lab grid | 800×600 |
| `map-riyadh.jpg` | CTA band map | 1280×880 |
| `map-wide.jpg` | contact page map (or swap the `<img>` for a Google Maps `<iframe>`) | 1680×720 |
| `contact-illustration.jpg` | contact page illustration | 1000×700 |
| `plan-house-3d.jpg` | services page 3D cutaway | 1400×1100 |
| `about-team.jpg` | about page | 1400×900 |
| `work-*.jpg` (6 files) | portfolio cards | 1200×800 |
| `logo-light.svg` / `logo-dark.svg` | logo for dark and light backgrounds | vector |
| `favicon.svg` | browser tab icon | vector |

Two logo files exist because the home page header sits over a dark hero and the
other pages sit over a cream one. `tools/build.py` picks the right one per page.

### Hotspots on the services page

The numbered markers over `plan-house-3d.jpg` are positioned in percentages in
`src/pages/services.html` (`style="top:22%;inset-inline-start:34%"`). Once the
real 3D render is in place, nudge those percentages so each marker lands on the
right part of the house.

---

## Arabic ↔ English

There is one set of HTML files. Every translatable node carries a
`data-i18n` attribute, and `assets/js/i18n.js` holds both languages:

```html
<h3 data-i18n="svc1.title">الفحص الإنشائي (المدني)</h3>
```

```js
ar: { "svc1.title": "الفحص الإنشائي (المدني)" },
en: { "svc1.title": "Structural (civil) inspection" }
```

The attribute variants:

| Attribute | Sets |
|---|---|
| `data-i18n` | `textContent` |
| `data-i18n-html` | `innerHTML` — for copy containing `<span>` or `<br>` |
| `data-i18n-placeholder` | input placeholder |
| `data-i18n-aria` | `aria-label` |
| `data-i18n-alt` | image `alt` |
| `data-i18n-title` | page `<title>` |
| `data-i18n-content` | `<meta content>` |

To change wording, edit `assets/js/i18n.js` — and the Arabic fallback in the
HTML too, since that is what shows before JavaScript runs and what crawlers
read.

The language choice is remembered in `localStorage` and applies across pages.
`?lang=en` on any URL forces a language, which is handy for sharing a link.
Arabic is the default. Direction (`dir="rtl"` / `dir="ltr"`) flips with it, and
the whole stylesheet uses logical properties (`margin-inline-start`,
`inset-inline-end`) so the layout mirrors without a second stylesheet.

---

## Before this goes live

1. **Phone number and email.** `+966500000000` and `info@ovrsight-sa.com` are
   placeholders. They appear in the header, hero, CTA band, contact page,
   footer and the floating WhatsApp button — search the whole folder for
   `966500000000` and for `ovrsight-sa.com`.
2. **The contact form does not send anything.** `main.js` validates it and
   shows the confirmation message, nothing more. Point it at Formspree, Web3Forms,
   or your own endpoint: give the `<form>` an `action` and `method`, and remove
   the `data-demo-form` attribute so the script stops intercepting the submit.
3. **Map.** Replace `map-wide.jpg` on the contact page with a Google Maps
   `<iframe>` once you have the exact address (there is a comment marking the spot).
4. **Social links** in the footer are `href="#"`.
5. **Privacy policy / terms** in the footer bar are `href="#"` — those pages
   don't exist yet.
6. **Fonts** load from Google Fonts (IBM Plex Sans Arabic + Inter). If the real
   brand font differs, change the `<link>` in `src/layout.html` and `--font-ar`
   / `--font-en` in `main.css`, then rebuild.
7. **Numbers in the copy** (350+ clients, $250K+, "39 of 42 snags fixed", the
   case-study figures on `work.html`) came from the prototype or were written to
   fit it. Confirm them before publishing.

---

## A note on the Arabic copy

Headings, section titles, service names, FAQ questions and the statistics were
read directly off the prototype. The prototype renders at a resolution where
the smallest body text isn't fully legible, so some **body paragraphs, feature
descriptions and FAQ answers were written to match the design's intent rather
than transcribed word for word**. Anywhere the exact client wording matters,
paste it over the value in `assets/js/i18n.js` (and the Arabic fallback in the
matching `src/pages/*.html`).

The English is a translation of that Arabic, not separately briefed copy.

---

## Checks

```bash
python3 tools/check.py    # 33 functional checks: nav, tabs, FAQ, slider,
                          # carousel, filters, form validation, i18n
                          # persistence, mobile nav, horizontal overflow
python3 tools/shoot.py    # screenshots of all pages, both languages → .shots/
```

Both need `playwright` (`pip install playwright && playwright install chromium`).

---

## Browser support & accessibility

Modern evergreen browsers. Uses CSS logical properties, `clamp()`, `:has()`-free
selectors, grid, `aspect-ratio` and `IntersectionObserver` — all widely
supported. Keyboard navigation works throughout (tabs respond to arrow keys),
there is a skip link, `prefers-reduced-motion` disables the animations, and
focus rings are visible.
#   o v e r s i g h t - w e b s i t e  
 