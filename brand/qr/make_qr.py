"""Website QR card: QR to blacktigergoa.com with the original logo in the middle,
name, phone and website underneath. Run with a Python that has qrcode + Pillow:
    python make_qr.py
Writes black-tiger-qr.png (print size) and black-tiger-qr.pdf next to this file.
"""
from pathlib import Path

import qrcode
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
URL = "https://blacktigergoa.com"
NAME = "Black Tiger Security Service"
PHONE = "+91 78880 12309"
WEBSITE = "www.blacktigergoa.com"
TAGLINE = "Scan to visit our website"

INK = (11, 12, 15)
RED = (227, 22, 31)
GREY = (90, 95, 104)
FONTS = Path("/System/Library/Fonts/Supplemental")

W = 2400                # card width in px (8 in at 300 dpi)
MARGIN = 220
QR_SIZE = W - 2 * MARGIN


def font(name, size):
    return ImageFont.truetype(str(FONTS / name), size)


# QR with high error correction so the centre logo doesn't break scanning
qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H, border=0, box_size=40)
qr.add_data(URL)
qr.make(fit=True)
qr_img = qr.make_image(fill_color=INK, back_color="white").convert("RGB")
qr_img = qr_img.resize((QR_SIZE, QR_SIZE), Image.NEAREST)

# Original logo, never recoloured, on a white rounded pad (~24% of the QR width)
logo = Image.open(ROOT / "public/img/logo-bt.png").convert("RGBA")
pad_w = int(QR_SIZE * 0.26)
logo_h = int(pad_w * 0.82)
logo = logo.resize((int(logo.width * logo_h / logo.height), logo_h), Image.LANCZOS)
pad = Image.new("RGBA", (pad_w, pad_w), (0, 0, 0, 0))
ImageDraw.Draw(pad).rounded_rectangle((0, 0, pad_w - 1, pad_w - 1), radius=pad_w // 7, fill="white")
pad.alpha_composite(logo, ((pad_w - logo.width) // 2, (pad_w - logo.height) // 2))
qr_img.paste(pad, ((QR_SIZE - pad_w) // 2, (QR_SIZE - pad_w) // 2), pad)

# Text block under the QR
f_tag = font("Arial Bold.ttf", 64)
f_name = font("Arial Black.ttf", 92)
f_phone = font("Arial Bold.ttf", 120)
f_web = font("Arial Bold.ttf", 96)
lines = [
    (TAGLINE.upper(), f_tag, GREY, 60),
    (NAME, f_name, INK, 70),
    (PHONE, f_phone, RED, 50),
    (WEBSITE, f_web, INK, 0),
]
probe = ImageDraw.Draw(Image.new("RGB", (1, 1)))
text_h = sum(probe.textbbox((0, 0), t, font=f)[3] + gap for t, f, _, gap in lines)

H = MARGIN + QR_SIZE + 110 + text_h + MARGIN
card = Image.new("RGB", (W, H), "white")
draw = ImageDraw.Draw(card)
draw.rectangle((0, 0, W - 1, 28), fill=RED)          # brand-red top and bottom bands
draw.rectangle((0, H - 29, W - 1, H - 1), fill=INK)
card.paste(qr_img, (MARGIN, MARGIN))

y = MARGIN + QR_SIZE + 110
for text, f, colour, gap in lines:
    # shrink the name if it is ever wider than the QR
    while probe.textlength(text, font=f) > QR_SIZE:
        f = font(Path(f.path).name, f.size - 4)
    tw = probe.textlength(text, font=f)
    draw.text(((W - tw) / 2, y), text, font=f, fill=colour)
    y += probe.textbbox((0, 0), text, font=f)[3] + gap

card.save(HERE / "black-tiger-qr.png", dpi=(300, 300))
card.save(HERE / "black-tiger-qr.pdf", resolution=300)
print(f"saved {W}x{H} to {HERE}")
