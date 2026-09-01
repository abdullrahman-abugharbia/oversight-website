#!/usr/bin/env python3
"""
Tiny static-site assembler.

    python3 tools/build.py

Reads src/layout.html + src/pages/*.html (+ src/partials/*.html for
{{include:name}}) and writes plain .html files to the project root. The output
needs no server-side anything — open it, or drop it on any static host.

Edit the templates in src/, not the generated files in the root.
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
LAYOUT = (SRC / "layout.html").read_text(encoding="utf-8")

PAGES = {
    # file stem: (title key, desc key, body class, logo file, nav key)
    "index":    ("meta.home.title",     "meta.home.desc",     "",             "logo-light.svg", "HOME"),
    "about":    ("meta.about.title",    "meta.about.desc",    "header-light", "logo-dark.svg",  "ABOUT"),
    "work":     ("meta.work.title",     "meta.work.desc",     "header-light", "logo-dark.svg",  "WORK"),
    "services": ("meta.services.title", "meta.services.desc", "header-light", "logo-dark.svg",  "SERVICES"),
    "contact":  ("meta.contact.title",  "meta.contact.desc",  "header-light", "logo-dark.svg",  "CONTACT"),
}

NAV_SLOTS = ["HOME", "ABOUT", "WORK", "SERVICES", "CONTACT"]

# Arabic fallbacks written into the static markup, so the page reads correctly
# even before main.js runs (and for crawlers).
FALLBACK = {
    "meta.home.title": "أوفرسايت | فحص وتقييم هندسي للعقارات في السعودية",
    "meta.home.desc": "فحص وتقييم هندسي متكامل للمباني السكنية والتجارية بأحدث أجهزة الكشف غير المتلف NDT.",
    "meta.about.title": "من نحن | أوفرسايت",
    "meta.about.desc": "فريق هندسي سعودي متخصص في الفحص الفني للعقارات قبل الشراء والتسليم.",
    "meta.work.title": "أعمالنا | أوفرسايت",
    "meta.work.desc": "نماذج من مشاريع الفحص الهندسي التي أنجزناها في المملكة.",
    "meta.services.title": "خدماتنا | أوفرسايت",
    "meta.services.desc": "تفاعل مع مخطط الفحص الذكي لعقارك واختر نوع الفحص الذي تحتاجه.",
    "meta.contact.title": "تواصل معنا | أوفرسايت",
    "meta.contact.desc": "اطلب استشارتك المجانية أو احجز فحص عقارك مع مهندسي أوفرسايت.",
}


def expand_includes(html: str, depth: int = 0) -> str:
    if depth > 5:
        raise RuntimeError("include nesting too deep")

    def sub(m):
        name = m.group(1).strip()
        path = SRC / "partials" / f"{name}.html"
        if not path.exists():
            raise FileNotFoundError(f"missing partial: {path}")
        return expand_includes(path.read_text(encoding="utf-8"), depth + 1)

    return re.sub(r"\{\{include:([a-z0-9_-]+)\}\}", sub, html)


def build_page(stem: str) -> pathlib.Path:
    title_key, desc_key, body_class, logo, nav_key = PAGES[stem]
    content = expand_includes((SRC / "pages" / f"{stem}.html").read_text(encoding="utf-8"))

    out = LAYOUT
    out = out.replace("{{CONTENT}}", content)
    out = out.replace("{{TITLE_KEY}}", title_key)
    out = out.replace("{{TITLE_FALLBACK}}", FALLBACK[title_key])
    out = out.replace("{{DESC_KEY}}", desc_key)
    out = out.replace("{{DESC_FALLBACK}}", FALLBACK[desc_key])
    out = out.replace("{{BODY_CLASS}}", body_class)
    out = out.replace("{{LOGO}}", logo)
    for slot in NAV_SLOTS:
        out = out.replace(f"{{{{ACTIVE_{slot}}}}}", ' aria-current="page"' if slot == nav_key else "")

    leftover = re.findall(r"\{\{[A-Za-z0-9_:.-]+\}\}", out)
    if leftover:
        raise RuntimeError(f"{stem}.html: unresolved placeholders {sorted(set(leftover))}")

    dest = ROOT / f"{stem}.html"
    dest.write_text(out, encoding="utf-8")
    return dest


if __name__ == "__main__":
    wanted = sys.argv[1].split(",") if len(sys.argv) > 1 else list(PAGES)
    for stem in wanted:
        print("  wrote", build_page(stem).name)
