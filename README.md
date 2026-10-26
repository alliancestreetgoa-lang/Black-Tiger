# Black Tiger Security Solutions LLP — website

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

- `brand/logo-original.png` — the logo as supplied.
- `public/img/logo-dark.png` — dark-site version: white banner strip turned black with silver edge, brighter red text, grey side wings and drop-shadow removed. Used everywhere on the site.
- `public/img/logo-mark.png`, `favicon.png` — small sizes. Full-resolution dark version: `brand/logo-dark-full.png`.

## Images

All photographs were generated with ChatGPT using the supplied logo as reference, so every guard wears the Black Tiger shield on the left chest. Originals (PNG) were downloaded to `~/Downloads/bt-*.png`; web JPEGs are in `public/img/`.

## Contact form

No server needed: the quote form and "Apply" buttons open WhatsApp (+91 77859 09090) with the visitor's details pre-filled.

## Remotion licence note

Remotion is free for individuals and companies of up to 3 people; larger companies need a company licence from remotion.pro. `acknowledgeRemotionLicense` only hides the console notice.

## Responsive coverage

Tested headless at 320, 360, 375, 390, 412, 430 (phones), 844×390 (phone landscape), 768, 834, 1024, 1180 (tablets), 1024×600 and 1280×600 (short laptops), 1280, 1366, 1536, 1920 and 2560 px — no horizontal scroll, no clipped text. Behaviour by size:

- ≤ 900px wide **or** ≤ 620px tall: services become a stacked list (2 columns from 600px wide); value cards and careers photo stop being sticky; compact nav and floating buttons.
- ≤ 1100px: nav collapses to the full-screen menu (2 columns on short screens).
- ≥ 1800px: wider container (1640px) and larger type/cards.

## Deployment (GitHub Pages)

Every push to `main` builds and deploys automatically via `.github/workflows/deploy.yml`.
Live URL: https://alliancestreetgoa-lang.github.io/Black-Tiger/

The build uses the base path `/Black-Tiger/` (see `vite.config.ts`). To serve from a custom domain such as blacktigergoa.com, set the repository variable or build env `BASE_PATH=/`, add a `public/CNAME` file containing the domain, and point the domain's DNS at GitHub Pages.
