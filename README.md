# dcplaskett.com

David Plaskett's personal portfolio — a dual-theme site that lives in two worlds: **Paper** (notebook, typewriter, analog craft) and **Terminal** (CRT, phosphor, digital craft).

Built with Next.js 14 + Keystatic CMS. Deploys on push via Vercel.

## Quick Start

```bash
npm install
npm run dev -- -p 3001    # port 3000 is taken by OrbStack/Homepage
```

## Documentation

All planning and implementation docs live in `docs/`:

| Document | Purpose |
|----------|---------|
| `docs/PRODUCT-VISION.md` | Full design concept and phased delivery plan |
| `docs/AGENTS.md` | Agent instructions for OpenCode (Scribe) |
| `docs/ROADMAP.md` | Phase tracking and task lists |
| `docs/DESIGN-TOKENS.md` | CSS variables, colors, fonts, and spacing |
| `docs/DEVLOG.md` | Development log |

## Workflow

1. **Dave + Hermes** discuss and plan in Matrix
2. **Hermes** writes/updates docs in `docs/`
3. **Scribe (OpenCode)** reads docs, implements, and pushes to `main`
4. **Vercel** auto-deploys

## Tech Stack

- Next.js 14 (App Router)
- Keystatic CMS (GitHub storage mode)
- Tailwind CSS v3
- shadcn/ui base components (customized)
- next-themes (theme toggle)
- Fonts: Platypi (serif), JetBrains Mono (monospace)
- Hosted on Vercel, domain purchased through Vercel

## Repo

`https://github.com/Kapinoida/dcplaskett-portfolio-working`