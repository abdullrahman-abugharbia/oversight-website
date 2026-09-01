#!/usr/bin/env python3
"""Functional smoke test: nav, tabs, FAQ, comparison slider, filters, form, i18n."""
import pathlib
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
fails, checks = [], 0


def ok(cond, label):
    global checks
    checks += 1
    if not cond:
        fails.append(label)


with sync_playwright() as p:
    b = p.chromium.launch()

    # ---------- desktop, home ----------
    pg = b.new_context(viewport={"width": 1440, "height": 900}).new_page()
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto((ROOT / "index.html").as_uri())
    pg.wait_for_timeout(500)

    ok(pg.get_attribute("html", "dir") == "rtl", "default dir is rtl")
    ok(pg.get_attribute("html", "lang") == "ar", "default lang is ar")

    # concern tabs
    ok(pg.is_visible('[data-panel="c1"]'), "concern panel 1 visible initially")
    pg.click('[data-tab="c3"]')
    pg.wait_for_timeout(250)
    ok(pg.is_visible('[data-panel="c3"]'), "concern panel 3 shows after click")
    ok(pg.is_hidden('[data-panel="c1"]'), "concern panel 1 hides after click")

    # FAQ
    ok(pg.get_attribute('.faq__item:nth-child(1)', "data-open") == "true", "first FAQ open")
    pg.click('.faq__item:nth-child(3) .faq__q')
    pg.wait_for_timeout(250)
    ok(pg.get_attribute('.faq__item:nth-child(3)', "data-open") == "true", "FAQ 3 opens")
    ok(pg.get_attribute('.faq__item:nth-child(1)', "data-open") == "false", "FAQ 1 closes")

    # comparison slider
    start = pg.evaluate("getComputedStyle(document.querySelector('.compare')).getPropertyValue('--pos')")
    pg.eval_on_selector(".compare__range",
                        "el => { el.value = 20; el.dispatchEvent(new Event('input')); }")
    pg.wait_for_timeout(120)
    after = pg.evaluate("getComputedStyle(document.querySelector('.compare')).getPropertyValue('--pos')")
    ok(start.strip() != after.strip() and "20" in after, f"compare slider moves ({start!r}->{after!r})")

    # testimonial rail
    ok(pg.eval_on_selector_all(".rail-dot", "els => els.length") == 4, "4 rail dots generated")
    left0 = pg.eval_on_selector(".rail", "el => el.scrollLeft")
    pg.click("[data-rail-next]")
    pg.wait_for_timeout(700)
    left1 = pg.eval_on_selector(".rail", "el => el.scrollLeft")
    ok(left0 != left1, "rail next scrolls")

    # language toggle
    pg.click('[data-lang-btn="en"]')
    pg.wait_for_timeout(350)
    ok(pg.get_attribute("html", "dir") == "ltr", "switches to ltr")
    ok("deserves protection" in pg.inner_text("h1"), "h1 translated to English")
    ok(pg.inner_text(".nav a[aria-current='page']").strip() == "Home", "nav translated")

    # persistence across navigation
    pg.click(".nav a[href='about.html']")
    pg.wait_for_timeout(500)
    ok(pg.get_attribute("html", "lang") == "en", "language persists across pages")
    ok("Saudi engineering team" in pg.inner_text("h1"), "about h1 translated")

    ok(not errs, f"no JS errors ({errs})")

    # ---------- work filters ----------
    pg.goto((ROOT / "work.html").as_uri())
    pg.wait_for_timeout(400)
    ok(pg.eval_on_selector_all("#work-grid [data-cat]:not([hidden])", "e => e.length") == 6, "6 cards shown by default")
    pg.click('[data-filter="com"]')
    pg.wait_for_timeout(250)
    ok(pg.eval_on_selector_all("#work-grid [data-cat]:not([hidden])", "e => e.length") == 2, "2 commercial cards after filter")
    pg.click('[data-filter="all"]')
    pg.wait_for_timeout(250)
    ok(pg.eval_on_selector_all("#work-grid [data-cat]:not([hidden])", "e => e.length") == 6, "filter resets")

    # ---------- contact form ----------
    pg.goto((ROOT / "contact.html").as_uri())
    pg.wait_for_timeout(400)
    pg.click("button[type=submit]")
    pg.wait_for_timeout(200)
    ok(pg.is_hidden(".form-status"), "empty form does not report success")
    pg.fill("input[name=name]", "Test User")
    pg.fill("input[name=phone]", "0500000000")
    pg.select_option("select[name=propertyType]", "villa")
    pg.fill("textarea[name=message]", "Riyadh, 300 sqm")
    pg.check("input[name=consent]")
    pg.click("button[type=submit]")
    pg.wait_for_timeout(250)
    ok(pg.is_visible(".form-status"), "valid form shows confirmation")

    # ---------- services tabs ----------
    pg.goto((ROOT / "services.html").as_uri())
    pg.wait_for_timeout(400)
    pg.click('[data-tab="p4"]')
    pg.wait_for_timeout(250)
    ok(pg.is_visible('[data-panel="p4"]'), "services tab 4 shows")
    ok(pg.is_hidden('[data-panel="p1"]'), "services tab 1 hides")

    # ---------- mobile nav ----------
    m = b.new_context(viewport={"width": 390, "height": 844}).new_page()
    m.goto((ROOT / "index.html").as_uri())
    m.wait_for_timeout(400)
    ok(not m.is_visible("#primary-nav a"), "mobile nav closed initially")
    m.click(".nav-toggle")
    m.wait_for_timeout(400)
    ok(m.is_visible("#primary-nav a"), "mobile nav opens")
    ok(m.get_attribute(".nav-toggle", "aria-expanded") == "true", "toggle reports expanded")
    m.keyboard.press("Escape")
    m.wait_for_timeout(400)
    ok(not m.is_visible("#primary-nav a"), "Escape closes mobile nav")

    # no horizontal overflow anywhere
    for name in ["index", "about", "work", "services", "contact"]:
        m.goto((ROOT / f"{name}.html").as_uri())
        m.wait_for_timeout(400)
        over = m.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
        ok(over <= 1, f"{name}.html: no horizontal overflow on mobile (got {over}px)")

    b.close()

print(f"{checks - len(fails)}/{checks} checks passed")
for f in fails:
    print("  FAIL:", f)
