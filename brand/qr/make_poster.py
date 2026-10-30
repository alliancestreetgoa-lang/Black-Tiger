"""QR poster: ChatGPT-designed background (poster-bg.png, 1024x1536, blank white
square left for the code) + the client's logo + a real QR code; the name line
at the bottom is redrawn as "Black Tiger Security Service".
    python make_poster.py
Writes black-tiger-qr-poster.png (2560x3840, 300 dpi) and .pdf next to this file.
"""
from pathlib import Path

import qrcode
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
URL = "https://blacktigergoa.com"
INK = (11, 12, 15)
SCALE = 2.5

# Positions measured on the 1024x1536 background
SQUARE = (271, 722, 752, 1202)       # blank white square (inclusive)
SQUARE_MARGIN = 36                   # white quiet zone kept inside the square
TOP_LOGO = (512, 30, 340)            # centre x, top y, width: covers ChatGPT's redrawn shield
NAME = "Black Tiger Security Service"  # never "Security Solutions LLP"
NAME_BAND = (40, 1284, 984, 1352)    # the background's own name line, painted over
NAME_CAP_TOP, NAME_CAP_H = 1292, 44  # where its capitals sat, so the new line matches

bg = Image.open(HERE / "poster-bg.png").convert("RGB")
poster = bg.resize((round(bg.width * SCALE), round(bg.height * SCALE)), Image.LANCZOS).convert("RGBA")
s = lambda v: round(v * SCALE)
logo_src = Image.open(ROOT / "public/img/logo-bt.png").convert("RGBA")

# Original logo over the AI-drawn one at the top (never recoloured)
cx, top, width = TOP_LOGO
logo = logo_src.resize((s(width), round(s(width) * logo_src.height / logo_src.width)), Image.LANCZOS)
poster.alpha_composite(logo, (s(cx) - logo.width // 2, s(top)))

# Company name: cover the background's line and set the current name in its place
x0, y0, x1, y1 = NAME_BAND
draw = ImageDraw.Draw(poster)
draw.rectangle((s(x0), s(y0), s(x1), s(y1)), fill=poster.getpixel((s(x0) - 4, s(y0) + 30)))
size = 10
while True:  # grow the font until its cap height matches the original line
    f_name = ImageFont.truetype("/System/Library/Fonts/Avenir Next.ttc", size, index=0)
    if f_name.getbbox("B")[3] - f_name.getbbox("B")[1] >= s(NAME_CAP_H):
        break
    size += 2
cap_off = f_name.getbbox("B")[1]
w = draw.textlength(NAME, font=f_name)
draw.text((s(512) - w / 2, s(NAME_CAP_TOP) - cap_off), NAME, font=f_name, fill="white")

# Real QR, high error correction so the centre logo doesn't stop it scanning
x0, y0, x1, y1 = SQUARE
qr_size = s(x1 - x0 + 1 - 2 * SQUARE_MARGIN)
qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H, border=0, box_size=40)
qr.add_data(URL)
qr.make(fit=True)
qr_img = qr.make_image(fill_color=INK, back_color="white").convert("RGBA")
qr_img = qr_img.resize((qr_size, qr_size), Image.NEAREST)

pad_w = int(qr_size * 0.26)
small = logo_src.resize((round(pad_w * 0.82 * logo_src.width / logo_src.height), int(pad_w * 0.82)), Image.LANCZOS)
pad = Image.new("RGBA", (pad_w, pad_w), (0, 0, 0, 0))
ImageDraw.Draw(pad).rounded_rectangle((0, 0, pad_w - 1, pad_w - 1), radius=pad_w // 7, fill="white")
pad.alpha_composite(small, ((pad_w - small.width) // 2, (pad_w - small.height) // 2))
qr_img.alpha_composite(pad, ((qr_size - pad_w) // 2, (qr_size - pad_w) // 2))

sq_cx, sq_cy = s((x0 + x1 + 1) / 2), s((y0 + y1 + 1) / 2)
poster.alpha_composite(qr_img, (sq_cx - qr_size // 2, sq_cy - qr_size // 2))

out = poster.convert("RGB")
out.save(HERE / "black-tiger-qr-poster.png", dpi=(300, 300))
out.save(HERE / "black-tiger-qr-poster.pdf", resolution=300)
print(f"saved {out.width}x{out.height} to {HERE}")
