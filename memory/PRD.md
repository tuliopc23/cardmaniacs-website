# Cardmaniacs Marketing Website — PRD

## Problem Statement

Build a marketing website for Cardmaniacs, a native Apple RSS reader / Read Later / Bookmark manager app. Visual style inspired by Apple Developer Docs, Bear app asymmetric layout, and Apple HIG typography (bold sans-serif headings, no serif/librarian style). Deployment target: Cloudflare Workers.

## Tech Stack

- **Framework**: Astro 6.1 (static output)
- **Styling**: Tailwind CSS v4 (via @tailwindcss/vite)
- **Animations**: Motion.dev
- **CMS**: Keystatic (local storage, blog posts collection)
- **Content**: Markdoc for blog articles

## Architecture

```
/app/frontend/ — Astro project
├── src/
│   ├── pages/        — index, features, pricing, blog/index, blog/[slug]
│   ├── components/   — Header, Footer, Hero, ProofStrip, WorkflowSections,
│   │                   ReadingDesk, TrustSection, PricingCards, FinalCTA, MotionInit
│   ├── layouts/      — Layout.astro (base HTML shell)
│   ├── styles/       — global.css (Tailwind + custom theme tokens)
│   └── content/      — Blog posts (Markdoc .mdoc files)
├── keystatic.config.ts
└── public/images/    — 17 product screenshots + logo
```

## User Personas

- **Indie developer** exploring the app before downloading
- **Power reader** comparing Cardmaniacs to their current RSS/bookmarks workflow
- **Blog visitor** reading product updates and development stories

## Core Requirements

- [x] Home page: Hero, proof strip, workflow sections (Feeds/Read Later/Bookmarks), reading desk composition, trust comparison, pricing teaser, final CTA
- [x] Features page: 4 feature groups (Capture, Read, Organize, Integrate) with screenshots
- [x] Pricing page: $4.99/month, $29.99/year (Save 50%), FAQ, trust band
- [x] Blog: Keystatic CMS, 3 sample posts, article detail pages with prose styling
- [x] Navigation: Sticky header with backdrop blur, footer with 4 columns
- [x] Motion.dev: Scroll-triggered reveal animations
- [x] MacBook frame around all product screenshots
- [x] App Store badge/button placeholders
- [x] Apple HIG-inspired typography (SF Pro font stack, bold headings)

## What's Been Implemented (March 28, 2026)

- Full 4-page marketing website (Home, Features, Pricing, Blog)
- 17 product screenshots displayed in MacBook-style frames
- Keystatic CMS integration with 3 sample blog posts
- Motion.dev scroll animations (reveal on scroll, stagger groups)
- Apple-inspired design: organic background blobs, proof strip, comparison table
- Responsive layout across desktop and mobile
- All tests passing (100%)

## Prioritized Backlog

### P0 (Critical)

- None remaining

### P1 (Important)

- Real App Store link integration (when available)
- iOS screenshots in iPhone frames
- OpenGraph / Twitter card meta tags for social sharing
- Sitemap.xml and robots.txt

### P2 (Nice to have)

- Dark mode support
- Blog post cover images
- RSS feed for the blog itself
- Analytics integration
- Cookie consent banner
- Cloudflare Workers deployment config (wrangler.toml)
