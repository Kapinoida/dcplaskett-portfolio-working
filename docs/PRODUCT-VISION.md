# dcplaskett.com — Product Vision

> **For Hermes:** Use this document to understand the full vision before writing per-phase implementation plans.
> **For OpenCode:** Read AGENTS.md first, then look at ROADMAP.md for what to build next. This doc is the "why."

## 1. Design Concept

### The Core Idea: Paper / Terminal

The portfolio presents Dave in two worlds — the notebook-and-pen craftsman and the terminal-and-tools engineer. The light/dark theme toggle doesn't just swap colors; it switches between two completely different visual languages.

|            | **Paper (light)**                               | **Terminal (dark)**                            |
|------------|--------------------------------------------------|------------------------------------------------|
| **Vibe**   | Notebook, typewriter, sketchbook, physical craft | CRT monitor, terminal emulator, green phosphor |
| **Font**   | Platypi (serif, typewriter character)            | JetBrains Mono / Fira Code (monospace)         |
| **Bg**     | Warm off-white + subtle paper texture            | Deep near-black + subtle scanlines             |
| **Accent** | Blue ink, pencil sketch lines                    | Green #00ff41 or amber #ffb000 phosphor        |
| **Sections** | Separated by card shadows, staples              | Separated by `---` horizontal rules, `$` prompt prefixes |
| **Hover fx** | Highlighter pen swoops (random colors)           | Terminal cursor underline, inverse text        |
| **Logo**   | `dp.` (handwritten feel)                         | `$ dp` (command prompt)                        |
| **Footer** | "Made with organic pixels."                      | "Built with 1s and 0s."                        |

### Design Principles

1. **Cohesive before clever.** Every element earns its place. If it doesn't reinforce the Paper/Terminal story, it doesn't belong.
2. **One scroll, not ten pages.** The homepage tells the whole story in a single scroll. Internal pages (blog, portfolio detail, about) exist for depth but the homepage is the main event.
3. **Playful but purposeful.** Micro-interactions should delight, not distract. Text swaps on hover, typewriter reveals, random highlighter colors — small touches that reward exploration.
4. **Content-first.** The design showcases the work, not itself. Blog posts are readable, project pages are scannable, the about page is genuine.

## 2. Architecture

### Stack (unchanged, just refreshed)

```
Next.js 14 (App Router)
  + Keystatic CMS (content in mdoc files)
  + Tailwind CSS (custom theme layers)
  + shadcn/ui base (heavily customized)
  + next-themes (dual-mode toggle)
  → Vercel (auto-deploy from GitHub main)
```

### Key architectural decisions

| Decision | Rationale |
|----------|-----------|
| **No new framework** | Keep Vercel auto-deploy. Next.js 14 + Keystatic already works. Don't break what's not broken. |
| **CSS custom properties** | Paper/Terminal themes are defined as CSS vars in `globals.css`, not as separate theme files. The `.dark` class drives the switch. |
| **Font swap on theme toggle** | Use `next/font` for both fonts. Apply Platypi by default; swap to mono class on `<html>` when `.dark` is active. |
| **No global state library** | Theme state is already managed by `next-themes`. No additional state needed. |
| **Keystatic stays** | Content editing via Keystatic works in both themes. The admin UI is separate. |
| **Static generation** | Pages are `force-static` where possible. Blog/portfolio content rebuilds on git push via Vercel webhook. |

## 3. Content Model (unchanged, just styled)

The existing mdoc structure stays:

```
content/
  about/about.md          — About page
  blog/*.mdoc             — Blog posts
  portfolio/*.mdoc        — Portfolio projects
```

No schema changes needed. The design refresh is purely presentational.

## 4. Pages & Routes

| Route | Purpose | Design treatment |
|-------|---------|-----------------|
| `/` | Homepage — single scroll hero + projects + writing + contact | Full dual-theme treatment. Typewriter hero, staple cards (paper) / terminal list (dark). |
| `/portfolio` | All projects grid | Consistent grid, dual-themed |
| `/portfolio/[id]` | Project detail | Full prose layout, dual-themed |
| `/blog` | Blog index | List layout, dual-themed |
| `/blog/[id]` | Blog post | Reading-optimized, dual-themed |
| `/about` | About Dave | Letter-style (paper) / readme-style (terminal) |
| `/keystatic` | CMS admin | Unchanged — Keystatic owns this |

## 5. Phased Delivery

### Phase 0: Documentation & Infrastructure
**Goal:** Set up the docs structure and OpenCode workflow so implementation can begin.

**Deliverable:** AGENTS.md, ROADMAP.md, DESIGN-TOKENS.md created. OpenCode can read and execute.

**Tasks:**
- Create `docs/` directory with planning documents
- Create `.hermes/OPENCODE-HANDOFF.md` for the collaboration workflow
- Verify local dev server still works (`npm run dev -p 3001`)
- Verify git remote and push access

### Phase 1: Design System & Theme Engine
**Goal:** The Paper/Terminal dual-theme system is functional. Toggling the theme switch visibly changes the entire visual language.

**Deliverable:** `globals.css` rewritten with full dual-theme CSS custom properties. Font swap works on theme toggle. Background textures render correctly. Mode toggle is redesigned.

**Details:**
- CSS custom properties for both themes (colors, borders, shadows, font families)
- Paper texture via CSS gradient + pattern overlay (inline, no external images needed)
- Terminal scanline effect via CSS pseudo-element at low opacity
- Font swap — `<body>` gets `.font-paper` or `.font-terminal` class based on theme
- Custom `ModeToggle` component — not a dropdown, but a single button that flips between paper/terminal icons
- Smooth transition between themes via `transition-colors` on the body

### Phase 2: Navigation & Global Shell
**Goal:** The navbar, footer, and page shell reflect the new design.

**Deliverable:** Nav with `dp.` / `$ dp` logo, text-swapping hover effects, mobile hamburger that matches the theme. Footer with tagline.

**Details:**
- Logo text swaps on hover (like the old portfolio: `dp.` → `davidplaskett.` and `$ dp` → `whoami`)
- Nav links change text on hover: "Portfolio." → "work.", "Blog." → "writing.", "About." → "me."
- Mobile menu matches the design language
- Footer tagline switches between "Made with organic pixels." and "Built with 1s and 0s."
- Back-to-top button re-styled

### Phase 3: Hero Section
**Goal:** The first thing visitors see makes an impression.

**Deliverable:** Full dual-theme hero with typewriter animation (paper) and terminal boot sequence (dark).

**Details (Paper):**
- "Hi, I'm Dave." with typewriter reveal (CSS animation, like the old portfolio)
- Subtitle: "I like to build things."
- Two CTA buttons with sketch-style borders (`.sketch-highlight` from the old design)
- Random highlighter color on button hover

**Details (Terminal):**
- `$ whoami` at the top, then "dave" printed below with blink
- `> cat intro.md` effect
- "web developer / systems thinker / automation enthusiast" as terminal output
- Buttons have terminal-style borders (dashed green `──[ Résumé ]──`)

### Phase 4: Portfolio Grid
**Goal:** Featured projects and full portfolio list reflect the theme.

**Deliverable:** Project cards with staple motif (paper) or terminal file listing (dark). Random highlighter colors on hover.

**Details (Paper):**
- Cards with staple icon at top (bring back the `staple.png` concept, but as SVG/CSS)
- Card shadow that mimics paper stack depth (the `::before`/`::after` skew trick from the old portfolio)
- Highlighter pen swoosh on hover (random color from palette)
- Sketch-style borders on images

**Details (Terminal):**
- Projects displayed as a file listing: `drwxr-xr-x  dave  hermes-agent/`
- `README.md` for each project on hover/click
- Green accent borders, terminal cursor on hover

### Phase 5: Blog & About
**Goal:** Reading experience matches the design language.

**Deliverable:** Blog index and detail pages fully themed. About page as letter (paper) / README (terminal).

**Details:**
- **Reading view:** Clean typography, generous measure (65-75ch max-width), prose styles updated for each theme
- **Blog index:** List view with category badges styled per theme
- **About (Paper):** Styled like a handwritten letter — salutation, body, signature
- **About (Terminal):** Styled like a `README.md` rendered in terminal — `## About Me`, bullet points, `$ contact` section

### Phase 6: Polish & Content
**Goal:** Everything ties together. Animations are smooth. Content is updated.

**Deliverable:** Fully functioning portfolio. Theme transitions are fluid. Blog and portfolio content is current.

**Details:**
- Smooth theme transition (0.3s ease on all color properties)
- Favicon that matches the theme (paper icon / terminal icon)
- 404 page matches the theme
- SEO metadata updated
- Resume PDF linked
- Contact form still working

## 6. Scope

### In scope
- Complete visual redesign of all pages
- Paper/Terminal dual-theme system
- All micro-interactions described above
- Content remains in Keystatic (no migration needed)
- Vercel auto-deploy stays
- GitHub repo stays public

### Out of scope
- Changing the tech stack (Next.js 14 stays)
- Adding a database or backend beyond Keystatic
- Migrating away from Vercel
- New content creation (existing content stays, just re-styled)
- Contact form backend rewrite (it works, keep it)

## 7. Workflow

```
Dave + Hermes (here, in Matrix)
  → Plan, discuss, refine
  → Write PRODUCT-VISION.md, AGENTS.md, ROADMAP.md, DESIGN-TOKENS.md
  → Commit to repo

Dave fires up OpenCode
  → Reads AGENTS.md → knows identity, conventions, workflow
  → Reads ROADMAP.md → knows what phase to build
  → Reads DESIGN-TOKENS.md → knows exact CSS variables
  → Reads PRODUCT-VISION.md → understands the "why"

OpenCode builds
  → Commits to main
  → Vercel auto-deploys

Dave + Hermes verify
  → Feedback loop continues
```