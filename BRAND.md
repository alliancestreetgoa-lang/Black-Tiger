# Black Tiger brand rules — read before any Black Tiger work

Applies to everything made for this client: website, photos, videos, reels, posters, QR cards, flyers, captions, voiceovers, alt text and messages.

## Name

- The name is **Black Tiger Security Service**.
- Never write or say **"Black Tiger Security Solutions LLP"**, "Security Solutions", or "LLP". That name is retired (owner's instruction, 30 Oct 2026).
- Short form when space is tight: **Black Tiger**. In two-line titles use "Black Tiger" / "Security Service".
- Generic marketing phrases such as "security solutions for hotels" are fine. They're not the name.

## Logo

- The only logo is `brand/logo-original.png`, a copy of the client's `~/Desktop/BT/BT Services.png`: silver shield, infinity symbol, BLACK TIGER, and a white banner with red **SECURITY SERVICE**.
- Web sizes are `public/img/logo-bt.png`, `logo-bt-sm.png`, `favicon-bt.png` and `apple-touch-bt.png` (alpha-trimmed, then resized).
- Never recolour it, redraw it or add emojis to it. The old "SECURITY SOLUTIONS LLP" banner logo and the dark-banner variant are retired. Don't bring them back.

## People in images

- Every guard, bouncer and officer wears the logo on the **left chest** (polo, shirt, suit or hi-vis vest).
- Make images in ChatGPT with the logo attached as a reference, then **zoom in on every chest banner**. ChatGPT often misspells it ("SERVICES", "SERVIC2"). Fix those by pasting the real banner from the logo into the banner rectangle; don't keep re-rolling.
- Gallery photos also carry the logo in the top-right corner: banner width 0.2 × image width, the same placement on every photo.

## Video format

- **Make videos in 9:16 vertical only** (1080×1920), for Reels, Shorts and Status. Never make a 16:9 version unless the owner asks for one (owner's instruction, 30 Oct 2026).
- New AI images for videos should be portrait too (2:3 or 9:16), with calm space at the top and bottom for captions.

## Contact details (use exactly)

- Phone / WhatsApp: **+91 78880 12309**
- Website: **blacktigergoa.com**
- Tagline: **Your Safety. Our Responsibility.**
- Office: opposite Mapusa Police Station, Mapusa, Goa.

## Where the name and logo live

| Place | File |
| --- | --- |
| Site name, footer, © line | `src/data.ts` (`COMPANY.name`) |
| Header text under the logo | `src/components/Chrome.tsx` |
| Page title and share tags | `index.html` |
| QR card and QR poster | `brand/qr/make_qr.py`, `brand/qr/make_poster.py` (the poster redraws the background's name line) |
| Remotion reels (Holi, wedding) | `video/HoliReel.tsx`, `video/WeddingReel.tsx` |
| Intro video (HyperFrames, 9:16 only) | edit `~/hyperframes-kit/video-projects/black-tiger-intro/build.py`, then `python3 build.py --vertical` and render in `black-tiger-intro-vertical` (never render the 16:9 project) |

When you change any of these, check the others too, and update this file if a rule changes.
