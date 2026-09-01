#!/usr/bin/env python3
"""Screenshot every page of the site in both languages, for review."""
import sys, os, pathlib
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / ".shots"
OUT.mkdir(exist_ok=True)

PAGES = sys.argv[1].split(",") if len(sys.argv) > 1 else [
    "index", "about", "work", "services", "contact"
]
LANGS = sys.argv[2].split(",") if len(sys.argv) > 2 else ["ar", "en"]
WIDTHS = [int(w) for w in (sys.argv[3].split(",") if len(sys.argv) > 3 else ["1440"])]

errors = []

with sync_playwright() as p:
    browser = p.chromium.launch()
    for width in WIDTHS:
        ctx = browser.new_context(viewport={"width": width, "height": 1000},
                                  device_scale_factor=1)
        page = ctx.new_page()
        page.on("console", lambda m: errors.append(f"console[{m.type}] {m.text}")
                if m.type in ("error", "warning") else None)
        page.on("pageerror", lambda e: errors.append(f"pageerror {e}"))
        for name in PAGES:
            for lang in LANGS:
                url = (ROOT / f"{name}.html").as_uri() + f"?lang={lang}"
                page.goto(url, wait_until="load")
                page.wait_for_timeout(700)
                # force every reveal element visible for the full-page shot
                page.evaluate("document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('is-in'))")
                page.wait_for_timeout(250)
                path = OUT / f"{name}-{lang}-{width}.png"
                page.screenshot(path=str(path), full_page=True)
                print(f"  {path.name}")
        ctx.close()
    browser.close()

if errors:
    print("\n--- page issues ---")
    for e in dict.fromkeys(errors):
        print(" ", e)
else:
    print("\nNo console errors.")
