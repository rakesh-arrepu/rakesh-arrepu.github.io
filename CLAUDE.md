# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static portfolio website for a Principal QA Engineer, built with Next.js 16 (App Router) and deployed to GitHub Pages via static export.

## Commands

```bash
npm run dev      # Dev server at http://localhost:3000
npm run build    # Static export to ./out directory
npm run lint     # ESLint check
```

There is no test framework configured. Use `npm run build` to validate changes (catches TypeScript errors, Zod validation failures, and build issues).

## Architecture

### Data-Driven Content System

All portfolio content lives in `data/portfolio-content-v2.json`. Components never hardcode content — they consume it through typed loader functions in `lib/content-loader.ts`, which validates the JSON against Zod schemas (`data/schema.ts`) at build time. To update content, edit the JSON file; to change presentation, edit the components.

### Key Data Flow

```
data/portfolio-content-v2.json  →  lib/content-loader.ts (Zod validation)  →  React components
data/types.ts (TypeScript interfaces)    data/schema.ts (Zod schemas)
data/config.ts (icon/gradient mappings)
```

### Component Structure

- `app/page.tsx` — Assembles all section components into the single-page layout
- `app/layout.tsx` — Root layout with Sidebar, fonts (Space Grotesk, JetBrains Mono)
- `components/` — One component per portfolio section (Hero, About, Skills, Experience, ProjectsEnhanced, CertificationsEnhanced, ContactEnhanced, Sidebar)
- `components/ui/` — Reusable UI primitives (GlowCard, CertificationModal, CircularProgress, etc.)

All section components are client components (`"use client"`) due to Framer Motion animations and interactive state.

### Animation System

`lib/animations.ts` defines reusable Framer Motion variants (fadeIn, scaleIn, stagger patterns). Components use `whileInView` for viewport-triggered animations and container+item stagger patterns for lists.

### Styling

- Tailwind CSS 4 with CSS variables for theming in `app/globals.css`
- `lib/utils.ts` exports `cn()` (clsx + tailwind-merge) for conditional classes
- Dark mode via `prefers-color-scheme` media query with CSS variable overrides
- Predefined gradient names (blue, indigo, purple, cyan, green) mapped in `data/config.ts`

### Content Conventions

- Bold text in JSON uses `**text**` syntax, rendered by `renderBold()` in components
- Icon names in JSON (Mail, Linkedin, Github, FileText, Twitter, Phone) map to Lucide React components via `ICON_MAP` in `data/config.ts`
- Skill levels are numbers 0–100; Zod enforces this range
- Projects support both v1 (flat array) and v2 (grouped by organization) structures

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on push to `main`. Uses Node.js 20, `npm ci`, then `npm run build`.

## Static Export Constraints

`next.config.ts` sets `output: "export"` and `images: { unoptimized: true }`. This means no server-side features (API routes, SSR, image optimization). All pages must be statically renderable.

## Path Alias

`@/*` maps to the project root (configured in `tsconfig.json`).
