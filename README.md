# MAR24.DEV — Next.js

Portfolio rebuilt on **Next.js (App Router)** with a distinctive *Editorial Index — Warm Ink & Amber* aesthetic.

## Stack
- **Next.js 14** (App Router)
- **Fonts via `next/font/google`:** Bricolage Grotesque (display), Space Grotesk (body), JetBrains Mono (data) — no Inter/Roboto/system fonts.
- Single amber accent on warm ink; grain + scanline atmosphere.

## File structure
```
mar24-dev/
├── app/
│   ├── layout.jsx      # fonts, metadata / SEO / Open Graph
│   ├── page.jsx        # main client component (all UI + logic)
│   └── globals.css     # full stylesheet
├── public/             # favicon.svg, favicon-32.png, apple-touch-icon.png, og-image.png
├── next.config.mjs
└── package.json
```

## Migrating from the old Vite project
1. Create a fresh Next.js repo (or convert): keep your `public/` assets.
2. Drop in the `app/` folder, `next.config.mjs`, and `package.json` above.
3. Delete the old Vite files (`index.html`, `src/main.jsx`, `vite.config.*`) — they are no longer used.
4. `npm install`
5. `npm run dev` → http://localhost:3000

## Deploy (Vercel)
Vercel auto-detects Next.js — just push and it builds. No config needed.

```bash
npm install
git add .
git commit -m "Rebuild on Next.js: editorial warm-ink/amber overhaul"
git push
```

## Notes
- Contact form posts to Formspree (`xeaqjzak`) with honeypot spam protection.
- Keyboard: **⌘K / Ctrl+K** opens the command palette.
- Theme (light/dark) persists via `localStorage`.
