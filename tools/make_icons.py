"""Builds the launcher/tab icons in icons/ from tools/flutter-logo-source.png.

The source has the logo sitting on a white field, so the script trims that
field away, then re-centres the mark on a fresh white square at each size.
Run from the project root:  python tools/make_icons.py
"""
from PIL import Image

SOURCE = "tools/flutter-logo-source.png"
WHITE = (255, 255, 255, 255)


def trimmed_logo():
    """The source with its surrounding white field cropped off."""
    img = Image.open(SOURCE).convert("RGBA")

    # Anything close to white counts as background. The Flutter mark is solid
    # blue throughout, so nothing inside it is at risk of being trimmed.
    mask = Image.new("L", img.size, 0)
    pixels = img.load()
    mask_pixels = mask.load()
    for y in range(img.height):
        for x in range(img.width):
            r, g, b, a = pixels[x, y]
            if a > 8 and not (r > 244 and g > 244 and b > 244):
                mask_pixels[x, y] = 255

    box = mask.getbbox()
    return img.crop(box) if box else img


def square(logo, size, pad_ratio):
    """The mark centred on a white square, inset by pad_ratio on each side."""
    canvas = Image.new("RGBA", (size, size), WHITE)
    room = int(size * (1 - pad_ratio * 2))
    scale = min(room / logo.width, room / logo.height)
    art = logo.resize(
        (max(1, round(logo.width * scale)), max(1, round(logo.height * scale))),
        Image.LANCZOS,
    )
    canvas.paste(art, ((size - art.width) // 2, (size - art.height) // 2), art)
    return canvas


def main():
    logo = trimmed_logo()

    square(logo, 192, 0.16).save("icons/icon-192.png")
    square(logo, 512, 0.16).save("icons/icon-512.png")
    square(logo, 180, 0.16).save("icons/apple-touch-icon.png")
    # Android may crop up to ~20% off each side of a maskable icon.
    square(logo, 512, 0.28).save("icons/icon-maskable-512.png")
    square(logo, 64, 0.10).convert("RGB").save(
        "icons/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)]
    )

    print("wrote icons/icon-*.png, apple-touch-icon.png, favicon.ico")


if __name__ == "__main__":
    main()
