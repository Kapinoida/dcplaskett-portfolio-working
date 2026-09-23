# Design Tokens — Paper / Terminal

## Overview

The portfolio uses a dual-theme system where `.paper` (light default) and `.terminal` (dark class) define completely different visual languages. All colors, typography, and effects are driven by CSS custom properties set on the `<body>` element. Components must use these variables — never hardcode Tailwind color values for theme-specific UI.

## Theme Activation

```css
/* globals.css */

/* Paper (default / light) */
:root {
  /* ... paper tokens below */
}

/* Terminal (dark) */
.dark {
  /* ... terminal tokens below */
}
```

The `<html>` element gets `.dark` via `next-themes`. The `<body>` gets a font class via a layout effect:

```tsx
// In layout.tsx — swap body class when theme changes
const { theme } = useTheme();
const bodyClass = theme === 'dark' ? 'font-terminal' : 'font-paper';
```

## Color Tokens

### Paper Mode (`:root`)

```
--bg-primary:       #faf6f0      /* warm cream — main background */
--bg-secondary:     #f0ebe0      /* slightly darker cream — cards */
--bg-tertiary:      #e8e0d0      /* card hover, subtle backgrounds */
--text-primary:     #2c2416      /* warm near-black — body text */
--text-secondary:   #6b5d48      /* muted brown — secondary text */
--text-muted:       #9a8c78      /* very muted */
--ink-blue:         #1e3a6f      /* blue ink accent — links, highlights */
--ink-red:          #9b1b1b      /* red pen — corrections, emphasis */
--ink-green:        #2b5e2b      /* green pen */
--border-primary:   #d4c9b8      /* soft border */
--border-sketch:    #1e3a6f      /* blue sketch border (low opacity) */
--shadow-card:      0 4px 12px rgba(44, 36, 22, 0.08), 0 2px 4px rgba(44, 36, 22, 0.04)
--shadow-elevated:  0 8px 24px rgba(44, 36, 22, 0.12)
--radius:           2px          /* sharp corners — paper has no radii */
--font-family:      'Platypi', serif
--font-heading:     'Platypi', serif
--font-mono:        'JetBrains Mono', monospace  /* minimal use in paper */
```

### Paper Texture

A subtle paper texture applied to the body:

```css
body.font-paper {
  background-color: var(--bg-primary);
  background-image: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.015) 2px,
      rgba(0,0,0,0.015) 3px
    );
}
```

For deeper texture on cards and sections, a CSS-only linen overlay:

```css
.paper-texture {
  position: relative;
}
.paper-texture::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,..."); /* inline SVG noise */
  pointer-events: none;
}
```

---

### Terminal Mode (`.dark`)

```
--bg-primary:       #0a0a0a      /* CRT off-black */
--bg-secondary:     #141414      /* terminal background */
--bg-tertiary:      #1e1e1e      /* slightly lighter */
--text-primary:     #c0c0c0      /* soft white — body text (CRT glow sim) */
--text-secondary:   #808080      /* dim text */
--text-muted:       #505050      /* very dim */
--phosphor-green:   #00ff41      /* classic green */
--phosphor-amber:   #ffb000      /* amber alternative */
--phosphor-dim:     #003b1a      /* very dim green for borders, backgrounds */
--accent:           var(--phosphor-green)  /* primary accent */
--border:           #00ff4140    /* 25% green */
--border-bright:    #00ff41      /* full green */
--shadow:           0 0 12px rgba(0, 255, 65, 0.15)   /* green glow */
--shadow-bright:    0 0 24px rgba(0, 255, 65, 0.25)
--radius:           0px          /* terminals are sharp */
--font-family:      'JetBrains Mono', 'Fira Code', monospace
--font-heading:     'JetBrains Mono', 'Fira Code', monospace
```

### Scanline Overlay

```css
body.font-terminal::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.08) 2px,
    rgba(0, 0, 0, 0.08) 4px
  );
}
```

---

## Highlighter Palette (Paper Mode)

These are the random highlighter colors from the old portfolio, used on hover effects:

```
--highlighter-yellow:  rgba(248, 255, 0, 0.6)
--highlighter-green:   rgba(130, 255, 173, 0.6)
--highlighter-pink:    rgba(255, 20, 147, 0.3)
--highlighter-blue:    rgba(0, 255, 217, 0.5)
--highlighter-orange:  rgba(255, 166, 31, 0.5)
```

Implemented as a CSS gradient overlay on hover:

```css
.highlighter-hover {
  position: relative;
  display: inline-block;
}
.highlighter-hover::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 0.75rem 1.5rem;
  background: linear-gradient(
    104deg,
    transparent 1.5%,
    var(--hl-color) 4%,
    var(--hl-color) 20%,
    transparent 93%,
    var(--hl-color) 96%,
    transparent 98%
  );
}
.highlighter-hover:hover::before {
  opacity: 1;
}
```

---

## Typography

### Paper Mode

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| Body | Platypi | 1.125rem (18px) | 400 | 1.6 |
| H1 | Platypi | 3rem (48px) | 700 | 1.1 |
| H2 | Platypi | 2rem (32px) | 700 | 1.2 |
| H3 | Platypi | 1.5rem (24px) | 600 | 1.3 |
| Nav logo | Platypi | 1.5rem | 400 | 1 |
| Small / meta | Platypi | 0.875rem | 400 | 1.4 |

### Terminal Mode

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| Body | JetBrains Mono | 1rem (16px) | 400 | 1.5 |
| H1 | JetBrains Mono | 2rem (32px) | 700 | 1.2 |
| H2 | JetBrains Mono | 1.5rem (24px) | 700 | 1.3 |
| H3 | JetBrains Mono | 1.25rem (20px) | 600 | 1.4 |
| Nav logo | JetBrains Mono | 1.25rem | 400 | 1 |
| Small / meta | JetBrains Mono | 0.75rem | 400 | 1.4 |

---

## Spacing

Use Tailwind's default spacing scale. Notable values:

| Token | Value | Usage |
|-------|-------|-------|
| `section-gap` | `py-24` (6rem/96px) | Between homepage sections |
| `container-padding` | `px-4 md:px-8` | Page edges |
| `content-max-width` | `max-w-3xl` (768px) | Blog/about reading width |
| `card-gap` | `gap-6 md:gap-8` | Between grid cards |
| `prose-padding` | `py-1` | Paragraph spacing in content |

---

## Shadows

### Paper Mode

```
card:         0 1px 3px rgba(44,36,22,0.08), 0 1px 2px rgba(44,36,22,0.04)
card-hover:   0 10px 25px rgba(44,36,22,0.12), 0 4px 10px rgba(44,36,22,0.06)
depth-1:      0 1px 3px rgba(44,36,22,0.1)
depth-2:      0 4px 6px rgba(44,36,22,0.1)
stack-shadow: 0 4px 12px rgba(0,0,0,0.3)  /* the ::before/::after skew shadow for paper stack effect */
```

### Terminal Mode

```
card:         0 0 4px rgba(0,255,65,0.1)
card-hover:   0 0 12px rgba(0,255,65,0.2)
glow-green:   0 0 6px rgba(0,255,65,0.3)
text-glow:    0 0 4px rgba(0,255,65,0.1)  /* subtle text glow on headings */
```

---

## Animations

### Paper

```
typewriter:     steps(n) forwards  /* reveal text left to right */
fade-in:        opacity 0 → 1, translateY 20px → 0
highlight-swoop:  ::before background-position shift
```

### Terminal

```
blink-cursor:   opacity 1 ↔ 0  /* on the terminal cursor */
boot-sequence:  staggered text reveal with increasing delay
scanlines:      continuous (always on)
```

---

## Font Loading

```tsx
// app/(public)/layout.tsx
import { Platypi, JetBrains_Mono } from 'next/font/google';

const platypi = Platypi({
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
});
```

Apply the font class to `<body>` based on theme:

```tsx
// In a client component wrapper
const { resolvedTheme } = useTheme();
const bodyFont = resolvedTheme === 'dark' ? jetbrainsMono.className : platypi.className;

// Apply to body via useEffect or a className on the wrapper
```

---

## Quick Reference

**If you're building a component and need to make it theme-aware:**

```tsx
// DON'T do this:
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">

// DO this instead (via CSS vars):
<div className="bg-primary text-primary">
// With: --bg-primary and --text-primary defined per theme
```

For the rare case where a component needs explicitly per-theme styling in JSX, use a theme-aware helper:

```tsx
const themeClass = resolvedTheme === 'dark' ? 'terminal-style' : 'paper-style';
```