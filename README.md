# Black Tiger Security Service — website

Rebuild of blacktigergoa.com. React + Vite + TypeScript, animated with Framer Motion, Lenis smooth scroll and two live Remotion compositions.

## Run locally

```sh
export PATH=$HOME/.local/node/bin:$PATH
npm install
npm run dev -- --port 5240      # http://127.0.0.1:5240
npm run build                   # static site in dist/
npm run preview
```

`dist/` is a plain static site — it can be hosted on Netlify, GitHub Pages, Cloudflare Pages or the existing host.

## Where things live

| What | File |
| --- | --- |
| All text, phone, email, address, services, clients, jobs | `src/data.ts` |
| Hero (parallax, word reveal, service ribbon) | `src/components/Hero.tsx` |
| All other sections | `src/components/Sections.tsx` |
| Loader, nav, mobile menu, scroll bar, WhatsApp button | `src/components/Chrome.tsx` |
| Reusable animations (reveal, split words, tilt, marquee, count-up) | `src/components/motion.tsx` |
| Remotion: shield radar HUD (CTA band) | `src/remotion/ShieldHud.tsx` |
| Remotion: live CCTV wall (command-centre section) | `src/remotion/CctvWall.tsx` |
| Styles / colours | `src/index.css` (`:root` tokens) |
| Images | `public/img/` |

## Logo files

- `brand/logo-original.png` — the client's logo as supplied (`BT Services.png`, 30 Oct 2026: silver shield, white banner reading "SECURITY SERVICE"). This is the only logo used on the site; it is never recoloured. It replaced the earlier "SECURITY SOLUTIONS LLP" banner logo everywhere — don't bring the old one back.
- `public/img/logo-bt.png` (640px), `logo-bt-sm.png` (160px), `favicon-bt.png`, `apple-touch-bt.png` — web sizes made from it (alpha-trimmed, then resized).

## Images

All photographs were generated with ChatGPT using the supplied logo as reference, so every guard wears the Black Tiger shield (banner "SECURITY SERVICE") on the left chest. Originals (PNG) were downloaded to `~/Downloads/bt-*.png`; web JPEGs are in `public/img/`.
The hero (`hero.jpg`) shows two officers: a woman centre-left and a man in front on the right; the left 40% stays dark for the headline.

## Contact form

No server needed: the quote form and "Apply" buttons open WhatsApp (+91 78880 12309) with the visitor's details pre-filled.

## Remotion licence note

Remotion is free for individuals and companies of up to 3 people; larger companies need a company licence from remotion.pro. `acknowledgeRemotionLicense` only hides the console notice.

## Responsive coverage

Tested headless at 320, 360, 375, 390, 412, 430 (phones), 844×390 (phone landscape), 768, 834, 1024, 1180 (tablets), 1024×600 and 1280×600 (short laptops), 1280, 1366, 1536, 1920 and 2560 px — no horizontal scroll, no clipped text. Behaviour by size:

- ≤ 900px wide **or** ≤ 620px tall: services become a stacked list (2 columns from 600px wide); value cards and careers photo stop being sticky; compact nav and floating buttons.
- ≤ 1100px: nav collapses to the full-screen menu (2 columns on short screens).
- ≥ 1800px: wider container (1640px) and larger type/cards.

## Deployment

### Netlify (recommended)

Everything is configured in `netlify.toml` — no settings to type in.

1. Netlify → **Add new site → Import an existing project → GitHub** → pick `vvernekar123-pixel/Black-Tiger`.
2. Netlify reads `netlify.toml`: build `npm run build`, publish `dist`, Node 22, `BASE_PATH=/`. Click **Deploy**.
3. Every push to `main` redeploys. Pull requests get preview links automatically.
4. Custom domain (e.g. blacktigergoa.com): **Domain management → Add a domain**, then point the DNS records Netlify shows. HTTPS is issued automatically.

`netlify.toml` also sets long-term caching for the hashed `/assets/*` files, a week for `/img/*`, basic security headers, and a fallback so unknown URLs open the home page.

### GitHub Pages (also set up)

`.github/workflows/deploy.yml` builds and publishes `main` to https://vvernekar123-pixel.github.io/Black-Tiger/ (Settings → Pages → Source: GitHub Actions). Pages builds use the base path `/Black-Tiger/`; Netlify builds use `/` via `BASE_PATH`.
If the site moves fully to Netlify, the Pages workflow can be deleted.

## Gallery

`src/components/Gallery.tsx` — masonry photo + video gallery with filters and a full-screen viewer (swipe / arrow keys / Esc).
Items are listed in `GALLERY` in `src/data.ts`; files live in `public/img/gallery/`:
photos as `<name>.jpg` + `<name>-sm.jpg`, videos as `video-<name>.mp4` + `video-<name>.jpg` (poster).
Every photo has the client's original logo (`brand/logo-original.png`, colours untouched) in the top-right corner, and the four videos carry it too (Women's Day: corner badge and the faint end-card watermark were also switched to "SECURITY SERVICE").
Uniform logos on `duo-corporate-logo` and `officer-solo-logo` were added with ChatGPT; originals stay local in `brand/gallery-originals/` (git-ignored).
