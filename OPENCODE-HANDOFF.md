# OpenCode Handoff

## Workflow

**Hermes plans → OpenCode builds.** That's the deal.

Hermes (the Greek god messenger you're talking to) works with Dave in Matrix to plan, design, and document. When the plan is solid and Dave says "go," the docs in `docs/` have everything you (Scribe) need to implement.

### What Hermes owns
- `docs/PRODUCT-VISION.md` — the "why" and "what" of the project
- `docs/AGENTS.md` — your identity and conventions
- `docs/ROADMAP.md` — phased delivery plan and progress tracking
- `docs/DESIGN-TOKENS.md` — exact CSS tokens and design specification
- `docs/DEVLOG.md` — Hermes may add planning entries here

### What you (Scribe / OpenCode) own
- ALL code changes — `.tsx`, `.ts`, `.css`, `.js`, config files
- Running `npm run build` and fixing build errors
- Committing and pushing to `main` (Vercel auto-deploys)
- Updating `docs/ROADMAP.md` status after completing phases
- Adding entries to `docs/DEVLOG.md` for each work session

### The handoff moment

Dave will say something like:
- "Okay Scribe, implement Phase 1"
- "Go ahead with Phase 2"
- "Let's build the hero section"

At that point, read the relevant docs and build. Don't wait for more context — it's all in the docs.

### If something is unclear
- Check the docs first — the answer is probably in DESIGN-TOKENS.md or PRODUCT-VISION.md
- If it's truly not covered, leave a comment in the code with `// TODO: verify with Hermes` and make a reasonable default choice
- Don't block on trivia. A solid opinionated default is better than a stalled build

## Git

```
origin → https://github.com/Kapinoida/dcplaskett-portfolio-working.git
branch: main (Vercel auto-deploys)
```

GitHub username is **Kapinoida**. Use credentials from Keychain or vault.dcplaskett.com if prompted.