#!/usr/bin/env python3
"""
Generates neutral placeholder images at the exact dimensions the layout expects.
Overwrite any file in assets/img/ with your Figma export of the same name and
the page picks it up with no HTML changes.

    python3 tools/make_placeholders.py
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent / "assets" / "img"
OUT.mkdir(parents=True, exist_ok=True)

DARK = (26, 37, 41)
LIGHT = (214, 220, 221)
TEAL = (20, 179, 164)

# name, width, height, dark?
SLOTS = [
    ("hero.jpg", 1920, 1080, True),
    # "where does your property worry you" tab cards
    ("concern-structural.jpg", 1200, 900, False),
    ("concern-leaks.jpg", 1200, 900, False),
    ("concern-mep.jpg", 1200, 900, False),
    ("concern-handover.jpg", 1200, 900, False),
    # service rows
    ("service-structural.jpg", 1280, 880, False),
    ("service-electrical.jpg", 1280, 880, False),
    ("service-mechanical.jpg", 1280, 880, False),
    ("service-environmental.jpg", 1280, 880, False),
    ("service-leaks.jpg", 1280, 880, False),
    # thermal comparison
    ("compare-visual.jpg", 1600, 800, False),
    ("compare-thermal.jpg", 1600, 800, True),
    # equipment lab
    ("kit-thermal-camera.jpg", 800, 600, True),
    ("kit-moisture-meter.jpg", 800, 600, True),
    ("kit-borescope.jpg", 800, 600, True),
    ("kit-drain-camera.jpg", 800, 600, True),
    ("kit-air-quality.jpg", 800, 600, True),
    ("kit-laser-level.jpg", 800, 600, True),
    ("kit-circuit-tester.jpg", 800, 600, True),
    ("kit-light-meter.jpg", 800, 600, True),
    # cta + contact
    ("map-riyadh.jpg", 1280, 880, True),
    ("map-wide.jpg", 1680, 720, False),
    ("contact-illustration.jpg", 1000, 700, False),
    # services page
    ("plan-house-3d.jpg", 1400, 1100, False),
    # about
    ("about-team.jpg", 1400, 900, False),
    # work
    ("work-villa-riyadh.jpg", 1200, 800, False),
    ("work-office-riyadh.jpg", 1200, 800, False),
    ("work-compound.jpg", 1200, 800, False),
    ("work-warehouse-dammam.jpg", 1200, 800, False),
    ("work-apartment-jeddah.jpg", 1200, 800, False),
    ("work-cafe-khobar.jpg", 1200, 800, False),
]

FONT_CANDIDATES = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
]


def load_font(size):
    for path in FONT_CANDIDATES:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def build(name, w, h, dark):
    bg = DARK if dark else LIGHT
    fg = (150, 165, 168) if dark else (108, 122, 126)
    img = Image.new("RGB", (w, h), bg)
    d = ImageDraw.Draw(img)

    # diagonal hatch so a missing export is obvious at a glance
    step = max(24, w // 40)
    hatch = (34, 47, 51) if dark else (203, 210, 211)
    for x in range(-h, w + h, step):
        d.line([(x, 0), (x + h, h)], fill=hatch, width=max(1, step // 12))

    # centre plate
    pw, ph = min(int(w * 0.72), 900), max(96, int(h * 0.2))
    x0, y0 = (w - pw) // 2, (h - ph) // 2
    d.rounded_rectangle([x0, y0, x0 + pw, y0 + ph], radius=14, fill=bg, outline=fg, width=2)

    f1 = load_font(max(15, min(30, pw // 26)))
    f2 = load_font(max(12, min(22, pw // 36)))
    line1, line2 = name, f"{w} x {h}"
    b1 = d.textbbox((0, 0), line1, font=f1)
    b2 = d.textbbox((0, 0), line2, font=f2)
    d.text(((w - (b1[2] - b1[0])) / 2, y0 + ph * 0.24), line1, font=f1, fill=fg)
    d.text(((w - (b2[2] - b2[0])) / 2, y0 + ph * 0.58), line2, font=f2, fill=TEAL)

    img.save(OUT / name, quality=82, optimize=True)
    return name


if __name__ == "__main__":
    for name, w, h, dark in SLOTS:
        build(name, w, h, dark)
    print(f"Wrote {len(SLOTS)} placeholder images to {OUT}")
