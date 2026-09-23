# dcplaskett.com — Roadmap

## Phase Status

| Phase | Name | Status |
|-------|------|--------|
| 0 | Infrastructure & Documentation | ✅ Complete |
| 1 | Design System & Theme Engine | 🔜 Planned |
| 2 | Navigation & Global Shell | 📋 Queued |
| 3 | Hero Section | 📋 Queued |
| 4 | Portfolio Grid | 📋 Queued |
| 5 | Blog & About | 📋 Queued |
| 6 | Polish & Content Refresh | 📋 Queued |

---

## Phase 0: Infrastructure & Documentation ✅

**Deliverable:** Planning docs created, workflow established.
**Completion:** Initial documents written by Hermes.

### Documents created
- `docs/PRODUCT-VISION.md` — Full design concept and phased plan
- `docs/AGENTS.md` — Scribe identity, conventions, workflow
- `docs/ROADMAP.md` — This file, phase tracking
- `docs/DESIGN-TOKENS.md` — CSS custom properties and theme tokens (next phase)

### What next
Phase 1 can begin. OpenCode should start by reading AGENTS.md, DESIGN-TOKENS.md, and PRODUCT-VISION.md, then implementing the theme engine in globals.css.

---

## Phase 1: Design System & Theme Engine 🔜

**Goal:** The Paper/Terminal dual-theme system is functional and the mode toggle visibly switches between two complete visual languages.

### Tasks
- [ ] Write `docs/DESIGN-TOKENS.md` with exact CSS custom properties (Hermes does this)
- [ ] Rewrite `app/globals.css` with full dual-theme CSS vars
- [ ] Add paper texture as CSS background (no external images needed)
- [ ] Add scanline overlay for terminal theme
- [ ] Swap fonts on theme toggle via `<body>` class
- [ ] Redesign `ModeToggle` — single button with paper/terminal icons instead of dropdown
- [ ] Add smooth transition between themes (0.3s ease)

### Key files
- `app/globals.css` — Complete rewrite
- `components/ui/mode-toggle.tsx` — Redesign
- `app/(public)/layout.tsx` — Font logic update
- `tailwind.config.ts` — Theme extend updates

### Verification
- [ ] `npm run build` passes
- [ ] Toggle between light and dark shows two completely different visual languages (not just inverted colors)
- [ ] Fonts swap correctly
- [ ] No layout shift on theme switch
- [ ] Mobile works

### Estimated time
~3 hours

---

## Phase 2: Navigation & Global Shell 📋

**Goal:** Navbar and footer reflect the Paper/Terminal design.

### Tasks
- [ ] Redesign nav with `dp.` / `$ dp` logo
- [ ] Text-swapping hover effects on logo and nav links
- [ ] Mobile hamburger styled per theme
- [ ] Footer with tagline that switches per theme
- [ ] Back-to-top button re-styled

### Key files
- `components/navigation/nav.tsx` — Full rewrite
- `components/footer/footer.tsx` — Full rewrite
- `components/ui/back-to-top.tsx` — Update styles

### Verification
- [ ] Nav links swap text on hover
- [ ] Logo swaps text on hover
- [ ] Footer tagline matches current theme
- [ ] Mobile menu opens/closes correctly
- [ ] Back-to-top is visible and functional

### Estimated time
~2 hours

---

## Phase 3: Hero Section 📋

**Goal:** The homepage hero immediately communicates the dual-nature of the portfolio.

### Tasks
- [ ] Paper theme: typewriter animation on heading
- [ ] Terminal theme: `$ whoami` / `> cat intro.md` effect
- [ ] CTA buttons with sketch-style borders (paper) / terminal brackets (dark)
- [ ] Random highlighter colors on button hover (paper)
- [ ] Staple motif reintroduced

### Key files
- `app/(public)/page.tsx` — Update hero section
- `components/` — New hero components

### Verification
- [ ] Typewriter animation works in paper mode
- [ ] Terminal intro works in dark mode
- [ ] Buttons have proper theme styling
- [ ] No CLS or performance issues

### Estimated time
~2 hours

---

## Phase 4: Portfolio Grid 📋

**Goal:** Project cards and portfolio list match the dual-theme design.

### Tasks
- [ ] Paper: staple cards with depth shadow and sketch borders
- [ ] Terminal: file listing style for projects
- [ ] Random highlighter swoosh on card hover (paper)
- [ ] Highlighter lines return from old portfolio

### Key files
- `components/portfolio/featured.tsx` — Full rewrite
- `components/portfolio/links.tsx` — Update
- `components/ui/content-grid.tsx` — Full rewrite
- `components/portfolio/skills.tsx` — Update

### Verification
- [ ] Featured projects render with staple motif (paper)
- [ ] Featured projects render as file listing (terminal)
- [ ] Highlighter colors appear on hover
- [ ] Grid is responsive

### Estimated time
~3 hours

---

## Phase 5: Blog & About 📋

**Goal:** Blog and about pages use the full design language.

### Tasks
- [ ] Blog index styled per theme
- [ ] Blog post reading view optimized for each mode
- [ ] About page as letter (paper) / README (terminal)
- [ ] Category badges per theme

### Key files
- `app/(public)/blog/page.tsx` — Update
- `app/(public)/blog/[id]/page.tsx` — Update
- `app/(public)/about/page.tsx` — Rewrite
- `components/blog/` — Update all components

### Verification
- [ ] Blog posts are readable and well-proportioned in both themes
- [ ] About page feels like a letter in paper, README in terminal
- [ ] Prose styles look good

### Estimated time
~3 hours

---

## Phase 6: Polish & Content Refresh 📋

**Goal:** Everything is polished, transitions are smooth, content is current.

### Tasks
- [ ] Smooth transitions across all theme-able properties
- [ ] Dual favicon that swaps with theme
- [ ] 404 page themed
- [ ] SEO metadata updated
- [ ] Resume PDF linked properly
- [ ] Contact form visually updated
- [ ] Blog/portfolio content reviewed and refreshed

### Key files
- `app/(public)/not-found.tsx` — Update
- `app/(public)/page.tsx` — Final pass
- `public/favicon.svg` — New
- `app/layout.tsx` — SEO pass

### Verification
- [ ] `npm run build` passes clean
- [ ] Lighthouse scores >90 on both themes
- [ ] No broken links or images
- [ ] All content renders correctly
- [ ] Contact form submits successfully

### Estimated time
~2 hours

---

## Deferred / Out of Scope

- Changing tech stack (Next.js 14, Vercel, Keystatic stay)
- Adding a real backend or database
- Blog comments
- Analytics setup (Vercel Analytics already installed)
- Third-party integrations