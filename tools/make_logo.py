"""Draws the SentiQ 21 mark (cupped hands holding a smiling brain) and the
social preview banner that link previews show.

Writes icons/logo.png (used on the welcome screen) and icons/og-image.png
(used by the og:image meta tag). The launcher icons come from a different
source - see tools/make_icons.py.

Rendered at 4x and downsampled so the edges stay smooth without any external
SVG tooling. Run from the project root:  python tools/make_logo.py
"""
import math
from PIL import Image, ImageDraw

S = 4                 # supersample factor
N = 1024              # final size
W = N * S

PINK = (244, 158, 183, 255)
PINK_DARK = (214, 105, 137, 255)
TEAL = (58, 180, 170, 255)
FACE = (74, 53, 64, 255)

img = Image.new("RGBA", (W, W), (0, 0, 0, 0))
d = ImageDraw.Draw(img)


def circle(cx, cy, r, fill):
    d.ellipse([(cx - r) * S, (cy - r) * S, (cx + r) * S, (cy + r) * S], fill=fill)


def bezier(p0, p1, p2, p3, n=48):
    pts = []
    for i in range(n + 1):
        t = i / n
        u = 1 - t
        x = u**3 * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t**3 * p3[0]
        y = u**3 * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t**3 * p3[1]
        pts.append((x * S, y * S))
    return pts


def stroke(pts, color, width):
    d.line(pts, fill=color, width=int(width * S), joint="curve")
    r = width * S / 2
    for p in (pts[0], pts[-1]):
        d.ellipse([p[0] - r, p[1] - r, p[0] + r, p[1] + r], fill=color)


def capsule(a, b, color, width):
    stroke([(a[0] * S, a[1] * S), (b[0] * S, b[1] * S)], color, width)


# ---------------------------------------------------------------- brain
# A union of bumps: painted once oversized in the outline colour, then
# again in the fill colour, which leaves an even rim around the whole blob.
BUMPS = [
    (404, 306, 88), (474, 268, 80), (556, 268, 80), (626, 306, 88),
    (686, 366, 84), (676, 446, 84), (616, 502, 78), (512, 522, 84),
    (408, 502, 78), (348, 446, 84), (338, 366, 84), (512, 400, 150),
]
RIM = 13
for cx, cy, r in BUMPS:
    circle(cx, cy, r + RIM, PINK_DARK)
for cx, cy, r in BUMPS:
    circle(cx, cy, r, PINK)

# hemisphere divide + folds
stroke(bezier((512, 232), (546, 300), (478, 344), (512, 404)), PINK_DARK, 14)
stroke(bezier((396, 306), (438, 336), (386, 380), (424, 412)), PINK_DARK, 13)
stroke(bezier((628, 306), (586, 336), (638, 380), (600, 412)), PINK_DARK, 13)
stroke(bezier((352, 428), (398, 444), (368, 486), (404, 500)), PINK_DARK, 13)
stroke(bezier((672, 428), (626, 444), (656, 486), (620, 500)), PINK_DARK, 13)

# face
circle(462, 438, 17, FACE)
circle(562, 438, 17, FACE)
stroke(bezier((470, 476), (492, 512), (532, 512), (554, 476)), FACE, 14)

# ------------------------------------------------------------- droplets
def droplet(cx, cy, r, tilt):
    tip = (cx + math.cos(tilt) * r * 2.5, cy + math.sin(tilt) * r * 2.5)
    left = (cx + math.cos(tilt + math.pi / 2) * r, cy + math.sin(tilt + math.pi / 2) * r)
    right = (cx + math.cos(tilt - math.pi / 2) * r, cy + math.sin(tilt - math.pi / 2) * r)
    circle(cx, cy, r, TEAL)
    d.polygon([(p[0] * S, p[1] * S) for p in (left, tip, right)], fill=TEAL)


for cx, cy, r, t in [(252, 286, 20, -2.3), (206, 372, 17, -2.5), (296, 212, 16, -2.1)]:
    droplet(cx, cy, r, t)
for cx, cy, r, t in [(772, 286, 20, -0.84), (818, 372, 17, -0.64)]:
    droplet(cx, cy, r, t)


# ---------------------------------------------------------------- hands
def hand(mirror=False):
    """Open palm cupping the brain from below; mirrored for the right side."""
    def fx(x):
        return 1024 - x if mirror else x

    palm = [
        bezier((212, 604), (188, 672), (228, 744), (306, 762)),
        bezier((306, 762), (384, 780), (440, 736), (446, 674)),
        bezier((446, 674), (388, 660), (318, 636), (272, 596)),
        bezier((272, 596), (248, 582), (226, 584), (212, 604)),
    ]
    d.polygon([(fx(p[0] / S) * S, p[1]) for seg in palm for p in seg], fill=TEAL)

    for (ax, ay), (bx, by), w in [
        ((250, 618), (214, 512), 40),
        ((302, 600), (288, 482), 40),
        ((356, 606), (352, 492), 40),
        ((408, 634), (424, 538), 38),
    ]:
        capsule((fx(ax), ay), (fx(bx), by), TEAL, w)
    capsule((fx(238), 690), (fx(166), 646), TEAL, 44)   # thumb


hand(False)
hand(True)

# Trim to the drawn artwork, then recentre it on a square canvas so the
# icon reads the same at every size.
box = img.getbbox()
art = img.crop(box)
side = int(max(art.size) * 1.10)
canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
canvas.paste(art, ((side - art.width) // 2, (side - art.height) // 2), art)
img = canvas

logo = img.resize((N, N), Image.LANCZOS)

# ------------------------------------------------------ outputs
logo.resize((512, 512), Image.LANCZOS).save("icons/logo.png")
print("wrote icons/logo.png")


# --------------------------------------------- link preview banner
# 1200x630 is what WhatsApp, Telegram, Facebook and X all read as a wide
# preview card. Anything smaller and they fall back to a thumbnail.
from PIL import ImageDraw as _ImageDraw, ImageFont as _ImageFont  # noqa: E402

OG_W, OG_H = 1200, 630
MINT_BG = (227, 243, 239)
CARD = (255, 255, 255)
TITLE_INK = (18, 83, 78)
LABEL_INK = (91, 143, 136)
BODY_INK = (60, 107, 101)
PILL_BG = (207, 233, 227)


def font(bold, size):
    name = "segoeuib.ttf" if bold else "segoeui.ttf"
    for path in ("C:/Windows/Fonts/" + name, "arialbd.ttf" if bold else "arial.ttf"):
        try:
            return _ImageFont.truetype(path, size)
        except OSError:
            continue
    return _ImageFont.load_default()


def tracked(draw, xy, text, fnt, fill, tracking):
    """Draws text with extra letter spacing, which PIL has no option for."""
    x, y = xy
    for char in text:
        draw.text((x, y), char, font=fnt, fill=fill)
        x += draw.textlength(char, font=fnt) + tracking
    return x


og = Image.new("RGB", (OG_W, OG_H), MINT_BG)
d2 = _ImageDraw.Draw(og)
d2.rounded_rectangle([40, 40, OG_W - 40, OG_H - 40], radius=36, fill=CARD)

mark = logo.resize((300, 300), Image.LANCZOS)
og.paste(mark, (110, (OG_H - 300) // 2), mark)

X = 470
tracked(d2, (X, 168), "SARINGAN KESIHATAN MENTAL", font(True, 24), LABEL_INK, 3.5)
d2.text((X - 4, 208), "SentiQ 21", font=font(True, 96), fill=TITLE_INK)
d2.text((X, 332), "Ujian DASS-21 - 21 soalan, lebih kurang 2 minit.",
        font=font(False, 30), fill=BODY_INK)
d2.text((X, 374), "Dapat skor dan tahap keparahan serta-merta.",
        font=font(False, 30), fill=BODY_INK)

x = X
for word in ("Depression", "Anxiety", "Stress"):
    fnt = font(True, 26)
    w = d2.textlength(word, font=fnt)
    d2.rounded_rectangle([x, 442, x + w + 44, 498], radius=28, fill=PILL_BG)
    d2.text((x + 22, 453), word, font=fnt, fill=TITLE_INK)
    x += w + 60

og.save("icons/og-image.png")
print("wrote icons/og-image.png")
