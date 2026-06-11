# Nandhavanam — Technical Specification

**Version:** 2.0  
**Last verified against:** `http://localhost:3000` (live dev server, 2026-06-11)  
**Canonical production URL:** `https://shuddhnandhavanam.com`  
**Status:** Active development. All routes confirmed reachable.

This document is the single source of truth for every engineer and automation agent working on this codebase. It covers: architecture, routing, component contracts, data shapes, design tokens, animation system, API surface, state management, accessibility, SEO, performance, CI/CD, testing, observability, and agent playbooks.

---

## Table of Contents

1. [Quick Start](#1-quick-start)
2. [Repository Layout](#2-repository-layout)
3. [Tech Stack & Versions](#3-tech-stack--versions)
4. [Architecture Overview](#4-architecture-overview)
5. [Design System (Tokens, Typography, Spacing)](#5-design-system)
6. [Route Map & Page Metadata](#6-route-map--page-metadata)
7. [Component Contracts](#7-component-contracts)
8. [Data Layer (`lib/data.ts` & `types/index.ts`)](#8-data-layer)
9. [Modal & Form System](#9-modal--form-system)
10. [API Route: `POST /api/trial`](#10-api-route-post-apitrial)
11. [State Management](#11-state-management)
12. [Animation System (Framer Motion)](#12-animation-system)
13. [Image & Asset Strategy](#13-image--asset-strategy)
14. [SEO & Structured Data](#14-seo--structured-data)
15. [Analytics (GA4)](#15-analytics-ga4)
16. [Accessibility Audit](#16-accessibility-audit)
17. [Performance Budget](#17-performance-budget)
18. [Environment Variables](#18-environment-variables)
19. [Testing Strategy](#19-testing-strategy)
20. [CI/CD Pipeline](#20-cicd-pipeline)
21. [Observability & Telemetry](#21-observability--telemetry)
22. [Security Checklist](#22-security-checklist)
23. [Known Issues & Backlog](#23-known-issues--backlog)
24. [Agent Playbooks](#24-agent-playbooks)
25. [Live UI Content Inventory](#25-live-ui-content-inventory)

---

## 1. Quick Start

```bash
# Prerequisites: Node 18+, npm 9+
npm install
npm run dev          # Turbopack dev server → http://localhost:3000
npm run build        # Production build
npm run lint         # ESLint
npx tsc --noEmit     # TypeScript check (no build artefacts)
```

No `.env` file is required for local development. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to enable GA4 (optional).

---

## 2. Repository Layout

```
e:\Milk/
├── app/
│   ├── layout.tsx                   # Root layout — fonts, metadata, JSON-LD, GA4, TrialModalProvider
│   ├── page.tsx                     # Homepage (all sections in sequence)
│   ├── globals.css                  # Tailwind v4 @theme tokens + global CSS
│   ├── icon.tsx                     # Favicon (ImageResponse, 48×48 PNG)
│   ├── not-found.tsx                # Branded 404
│   ├── our-farm/page.tsx            # /our-farm route
│   ├── products/page.tsx            # /products route
│   ├── plans/page.tsx               # /plans route
│   ├── delivery/page.tsx            # /delivery route
│   ├── reviews/page.tsx             # /reviews route
│   ├── faq/page.tsx                 # /faq route
│   ├── privacy-policy/page.tsx      # Legal: privacy policy
│   ├── terms-of-service/page.tsx    # Legal: terms of service
│   └── api/
│       └── trial/route.ts           # POST /api/trial — lead capture
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx               # Fixed floating pill navbar
│   │   └── Footer.tsx               # 4-column footer with social links
│   ├── sections/
│   │   ├── Hero.tsx                 # Full-viewport hero with floating bottle
│   │   ├── FarmStory.tsx            # Buffalo farm intro + stats
│   │   ├── MorningTimeline.tsx      # 5-step 5AM→7:30AM timeline
│   │   ├── PurityRitual.tsx         # 4 purity feature cards + FSSAI badge
│   │   ├── Products.tsx             # 4 product cards with cart CTAs
│   │   ├── Pricing.tsx              # 3 subscription plan cards
│   │   ├── DeliveryChecker.tsx      # Pincode lookup widget
│   │   ├── Comparison.tsx           # Dual-render table (mobile cards / desktop table)
│   │   ├── Testimonials.tsx         # 6 review cards + aggregate 4.9★ badge
│   │   ├── FAQ.tsx                  # 8-item accordion
│   │   └── CtaSection.tsx           # Final CTA with background image
│   ├── ui/
│   │   ├── Button.tsx               # Polymorphic button — 3 variants × 3 sizes
│   │   ├── Badge.tsx                # Pill label — 3 variants
│   │   └── SectionLabel.tsx         # Section eyebrow text
│   ├── TrialModalProvider.tsx       # React context — openModal()
│   ├── TrialModal.tsx               # AnimatePresence modal shell
│   └── TrialSignupForm.tsx          # 4-field form → POST /api/trial → WhatsApp
│
├── lib/
│   ├── data.ts                      # All static content constants
│   └── utils.ts                     # cn() — clsx + tailwind-merge
│
├── types/
│   └── index.ts                     # TypeScript interfaces (Product, Testimonial, …)
│
├── public/images/
│   ├── logo.png                     # Brand logo (transparent PNG)
│   ├── milk-bottle.jpg              # Hero bottle (intrinsic 500×680)
│   ├── farm-bg.jpg                  # Hero/CTA background
│   ├── buffalo.jpg                  # FarmStory buffalo image
│   ├── curd.jpg                     # Clay Pot Curd product
│   ├── ghee.jpg                     # Desi Ghee product
│   └── paneer.jpg                   # Fresh Paneer product
│
├── next.config.ts                   # devIndicators: false
├── postcss.config.mjs               # @tailwindcss/postcss
├── tsconfig.json
├── package.json
└── eslint.config.mjs
```

---

## 3. Tech Stack & Versions

| Package | Version | Role |
|---|---|---|
| `next` | 15.3.3 | App Router, Image optimisation, Metadata API |
| `react` / `react-dom` | 19.0.0 | UI runtime |
| `typescript` | ^5 | Static typing |
| `tailwindcss` | ^4 | CSS-first utility framework with `@theme {}` |
| `@tailwindcss/postcss` | ^4 | PostCSS integration for Tailwind v4 |
| `framer-motion` | ^11.18.0 | Scroll animations, modal transitions |
| `lucide-react` | ^0.511.0 | SVG icon set |
| `clsx` | ^2.1.1 | Conditional class builder |
| `tailwind-merge` | ^2.6.0 | Tailwind class deduplication |

**Build toolchain:** Turbopack (dev), standard Next.js bundler (prod).  
**Node requirement:** 18+.  
**No test framework installed yet** (Jest/Playwright are backlog items).

---

## 4. Architecture Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│  Browser                                                             │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Next.js App Router (app/)                                   │   │
│  │                                                              │   │
│  │  Server Components (layout, pages, Footer, not-found)        │   │
│  │         ↓ hydrates into                                      │   │
│  │  Client Components ('use client')                            │   │
│  │    Navbar · Hero · all Sections · Modal system · Forms       │   │
│  │                                                              │   │
│  │  Context tree: TrialModalProvider wraps all children         │   │
│  │    └── openModal() available everywhere via useTrialModal()  │   │
│  └────────────────────────┬─────────────────────────────────────┘   │
│                           │                                          │
│              POST /api/trial (JSON)                                  │
│                           ↓                                          │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Next.js Route Handler (app/api/trial/route.ts)              │   │
│  │  Validates → writes data/leads.json                          │   │
│  │  Returns { ok, id, createdAt } : 201                         │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  External services                                                   │
│    WhatsApp intent: wa.me/919959306634?text=…                        │
│    GA4: gtag (conditional on NEXT_PUBLIC_GA_MEASUREMENT_ID)          │
└──────────────────────────────────────────────────────────────────────┘
```

### Rendering model

| Layer | Strategy | Reason |
|---|---|---|
| Root layout | Server Component | Metadata, fonts, JSON-LD |
| All page.tsx files | Server Component | Metadata per route, no interactivity |
| Footer | Server Component | No state needed |
| Navbar, Hero, all sections | Client Component | Scroll state, animations, modal context |
| Modal system | Client Component | DOM effects, context |

### Dynamic imports (homepage only)

`app/page.tsx` dynamically imports all sections except `Navbar`, `Hero`, `Products`, `Pricing`. This splits the JS bundle and defers non-critical sections until the main thread is free.

```ts
const FarmStory = dynamic(() => import('@/components/sections/FarmStory'), { ssr: false })
// … same pattern for MorningTimeline, PurityRitual, Comparison, etc.
```

---

## 5. Design System

### 5.1 Color Tokens (`app/globals.css` `@theme {}`)

All tokens are CSS custom properties, mapped into Tailwind classes automatically by Tailwind v4.

| Token | Hex | Tailwind Class | Usage |
|---|---|---|---|
| `--color-primary` | `#093819` | `bg-primary`, `text-primary` | Navbar bg, headings, pricing highlight card |
| `--color-on-primary` | `#ffffff` | `text-on-primary` | Text on primary backgrounds |
| `--color-primary-container` | `#234f2e` | `bg-primary-container` | MorningTimeline section bg |
| `--color-on-primary-container` | `#90c096` | `text-on-primary-container` | Text on primary-container |
| `--color-primary-fixed` | `#bdefc2` | `text-primary-fixed` | Subtle text on dark bg (nav links) |
| `--color-secondary` | `#2c6c02` | `bg-secondary`, `text-secondary` | Area pills, section labels |
| `--color-on-secondary` | `#ffffff` | `text-on-secondary` | — |
| `--color-secondary-fixed` | `#adf682` | `bg-secondary-fixed`, `text-secondary-fixed` | CTA buttons, "Most Popular" badge, tagline |
| `--color-on-secondary-fixed` | `#082100` | `text-on-secondary-fixed` | Text on lime CTA buttons |
| `--color-tertiary` | `#402c00` | `text-tertiary` | — |
| `--color-tertiary-fixed` | `#ffdea6` | `bg-tertiary-fixed` | Gold badge variant |
| `--color-background` | `#fff8f0` | `bg-background` | Page background (warm cream) |
| `--color-surface` | `#fffbf7` | `bg-surface` | Section backgrounds |
| `--color-surface-dim` | `#ede8e0` | `bg-surface-dim` | Products section, FAQ section |
| `--color-surface-container` | `#f0ece4` | `bg-surface-container` | Card interiors |
| `--color-surface-container-high` | `#e4e0d8` | `bg-surface-container-high` | FAQ icon bg, card hover |
| `--color-on-surface` | `#1f1b11` | `text-on-surface` | Body text |
| `--color-on-surface-variant` | `#4a4538` | `text-on-surface-variant` | Secondary body text |
| `--color-outline` | `#7a7469` | `border-outline` | Outline button border |
| `--color-outline-variant` | `#cbc5bc` | `border-outline-variant` | Card borders |
| `--color-error` | `#ba1a1a` | `text-error` | — |

### 5.2 Typography

| Variable | Font | Weights | Usage |
|---|---|---|---|
| `--font-montserrat` | Montserrat (Google) | 600, 700, 800 | `font-display` class — all headings, nav brand, badges |
| `--font-inter` | Inter (Google) | 400, 500, 600 | Body text, descriptions, labels |

**Type scale (Tailwind):**
- Section headings: `text-3xl md:text-5xl` (Montserrat 700)
- Hero H1: `text-3xl sm:text-4xl md:text-[56px]` (Montserrat 700)
- Card titles: `text-base md:text-lg` (Montserrat 700)
- Body: `text-sm md:text-base` (Inter 400)
- Eyebrow labels: `text-xs uppercase tracking-[0.2em]` (Inter 600)

### 5.3 Spacing & Layout

- **Container max-width:** `1280px` (`max-w-[1280px] mx-auto`)
- **Section horizontal padding:** `px-5 md:px-16`
- **Section vertical padding:** `py-16 md:py-24` (standard), `py-20 md:py-32` (CTA)
- **Grid gaps:** `gap-4 md:gap-6` (cards), `gap-10 md:gap-16` (two-column layouts)
- **Breakpoints:** `sm` 640px, `md` 768px, `lg` 1024px (standard Tailwind v4)

### 5.4 Shadow & Glow Variables

| Variable | Value | Usage |
|---|---|---|
| `--shadow-glow-lime` | `0 0 30px rgba(173,246,130,0.4)` | Primary button hover glow |
| `--shadow-glow-lime-lg` | `0 0 50px rgba(173,246,130,0.5)` | Hero bottle drop shadow |

### 5.5 Animation Utilities (global CSS)

```css
@keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-20px) } }
@keyframes slideInFade { from { transform: translateX(50px); opacity: 0 } to { transform: translateX(0); opacity: 1 } }

.animate-float { animation: float 6s ease-in-out infinite }
.animate-slide-in-fade { animation: slideInFade 1.2s cubic-bezier(0.16,1,0.3,1) forwards }
```

### 5.6 Button Variants

| Variant | Background | Text | Hover |
|---|---|---|---|
| `primary` | `bg-secondary-fixed` | `text-on-secondary-fixed` | `shadow-glow-lime`, `-translate-y-0.5` |
| `ghost` | `bg-white/10 backdrop-blur-md` | `text-white` | `bg-white/20` |
| `outline` | transparent | `text-on-surface` | `bg-surface-container` |

**Sizes (responsive):**

| Size | Mobile | Desktop |
|---|---|---|
| `sm` | `px-4 py-2 text-xs` | `md:px-5 md:text-sm` |
| `md` | `px-5 py-3 text-sm` | `md:px-8 md:py-3.5 md:text-base` |
| `lg` | `px-6 py-3.5 text-base` | `md:px-10 md:py-5 md:text-lg` |

All buttons: `rounded-full font-semibold inline-flex items-center gap-2 active:scale-95 transition-all duration-300`.

---

## 6. Route Map & Page Metadata

| Path | Component | Title | Key Sections |
|---|---|---|---|
| `/` | `app/page.tsx` | `Nandhavanam \| Farm-Fresh Pure Buffalo Milk, Hyderabad` | Hero → FarmStory → DeliveryChecker → MorningTimeline → PurityRitual → Products → Pricing → Comparison → Testimonials → FAQ → CtaSection |
| `/our-farm` | `app/our-farm/page.tsx` | `Our Farm \| Nandhavanam` | FarmStory → MorningTimeline → PurityRitual → CtaSection |
| `/products` | `app/products/page.tsx` | `Our Products \| Nandhavanam` | Products → CtaSection |
| `/plans` | `app/plans/page.tsx` | `Subscription Plans \| Nandhavanam — From ₹90/L` | Pricing → FAQ → CtaSection |
| `/delivery` | `app/delivery/page.tsx` | `Delivery Areas \| Nandhavanam — Hyderabad` | DeliveryChecker → CtaSection |
| `/reviews` | `app/reviews/page.tsx` | `Customer Reviews \| Nandhavanam — 500+ Happy Families` | Testimonials → Comparison → CtaSection |
| `/faq` | `app/faq/page.tsx` | `FAQ \| Nandhavanam Pure Farm Milk Hyderabad` | FAQ → CtaSection |
| `/privacy-policy` | `app/privacy-policy/page.tsx` | `Privacy Policy \| Nandhavanam` | Prose legal content |
| `/terms-of-service` | `app/terms-of-service/page.tsx` | `Terms of Service \| Nandhavanam` | Prose legal content |

**Favicon:** `app/icon.tsx` generates a 48×48 PNG from `public/images/logo.png` via `ImageResponse` (white circle, centred logo).

**404:** `app/not-found.tsx` — branded page with milk emoji, heading, and "Back to Home" button.

### Metadata base (layout.tsx)

```ts
metadataBase: new URL('https://shuddhnandhavanam.com')
title: { default: 'Nandhavanam | …', template: '%s | Nandhavanam' }
openGraph: { images: [{ url: '/images/milk-bottle.jpg', width: 1200, height: 630 }] }
robots: { index: true, follow: true }
```

---

## 7. Component Contracts

All section components receive **no props** — they consume data from `lib/data.ts` directly and context via `useTrialModal()`.

### 7.1 Navbar

**File:** `components/layout/Navbar.tsx`  
**Type:** Client Component  

**State:**

| State | Type | Default | Purpose |
|---|---|---|---|
| `scrolled` | `boolean` | `false` | Shadow/padding tightening above 50px scroll |
| `menuOpen` | `boolean` | `false` | Mobile menu toggle |

**Scroll listener:** `window.scroll` → `{ passive: true }`, threshold 50px. Removed on unmount.

**Visual structure:**
```
div.fixed.top-3.left-4.right-4.md:left-6.md:right-6.z-[1000]
  header.bg-primary/90.backdrop-blur-md.border.border-white/15.rounded-2xl
    div.flex.justify-between.items-center.px-4.md:px-8
      Link (brand)
        div.bg-white.rounded-full.p-0.5 → Image logo 40×40
        div.flex.flex-col.gap-0.5
          span "Nandhavanam" (Montserrat, text-sm md:text-base)
          span "PURE FARM MILK" (text-[10px] md:text-[11px], tracking-[0.15em])
      nav.hidden.md:flex → 6 NAV_LINKS
      div.hidden.md:flex → Button "Start Free Trial"
      button.md:hidden → Menu / X toggle
  AnimatePresence → mobile dropdown card
    nav.flex.flex-col → NAV_LINKS + CTA
```

**Mobile menu animation:**  
`initial: { opacity: 0, y: -8, scale: 0.97 }` → `animate: { opacity: 1, y: 0, scale: 1 }` (200ms easeOut)

**CTA action:** `onClick={openModal}` — opens TrialModal via context.

---

### 7.2 Hero

**File:** `components/sections/Hero.tsx`  
**Type:** Client Component  

**Layout:** `min-h-[100svh]` with `flex flex-col md:flex-row` at `md:` — stacked on mobile, side-by-side on desktop.

**Left column (text):**
- Badge (lime variant): "Brahma Muhurtham Harvest"
- H1: "From Our Farm / To Your Family." — `text-3xl sm:text-4xl md:text-[56px]`
- Trust bar: 3 pill badges (⭐ 500+ families, FSSAI Certified, Hyderabad)
- Buttons: "Start Free Trial" (primary, `openModal`) + "WhatsApp Order" (ghost, `window.open(WHATSAPP_URL)`)

**Right column (bottle):**
- Hidden below `sm` (`hidden sm:flex`), `flex-1 justify-center items-center`
- Inner floating div: `w-full max-w-[300px] sm:max-w-[380px] md:max-w-[480px]`
- `next/image` with `w-full object-contain` — fills container up to max-width
- Float animation: `y: [0, -20, 0]` 6s infinite (Framer Motion)
- Trust card overlay: `absolute -bottom-4 -right-2 md:-right-4` — "100% Raw & Pure"

**Background:** `farm-bg.jpg` with gradient `from-primary/90 via-primary/75 to-primary/40 md:to-transparent`

---

### 7.3 FarmStory

**File:** `components/sections/FarmStory.tsx`  
**Type:** Client Component  

2-column grid (`lg:grid-cols-2`). Image on left (order-2 on mobile → order-1 on lg). Buffalo image with aspect-[4/3] on mobile, aspect-[4/5] on desktop. Gradient overlay with embedded quote. Right column: eyebrow, H2, body, 2-card stats grid (Pesticide Free, Natural Care).

---

### 7.4 MorningTimeline

**File:** `components/sections/MorningTimeline.tsx`  
**Type:** Client Component  
**Data:** `TIMELINE_STEPS` (5 items)

5-card grid: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`. 5th card `col-span-2 sm:col-span-1` (centres it on 2-col mobile layout). Dark primary-container background with lime-green accents. Time labels `text-secondary-fixed`.

---

### 7.5 PurityRitual

**File:** `components/sections/PurityRitual.tsx`  
**Type:** Client Component  
**Data:** `PURITY_FEATURES` (4 items), `FSSAI_NUMBER`

Header row: H2 left + FSSAI badge right (green-50 bg, border-green-200). On mobile: `flex-col`, on desktop: `flex-row justify-between items-end`. 4 white cards with lucide icons (icon name resolved from string via a local map).

**Icon resolver map:**
```ts
const ICON_MAP: Record<string, LucideIcon> = {
  FlaskConical, ShieldCheck, ThumbsDown, Waves
}
```

---

### 7.6 Products

**File:** `components/sections/Products.tsx`  
**Type:** Client Component  
**Data:** `PRODUCTS` (4 items)

Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`. Each card is `article.flex.flex-col`. Card anatomy:
```
article.flex.flex-col
  div (image container, h-64, shrink-0)
    Image (hover: scale-110 over 700ms)
    Badge overlay (if product.badge)
  div (details, flex-1 flex flex-col)
    h3 (product name)
    p (description, flex-1)           ← pushes price row to bottom
    div.border-t.pt-3 (price row)
      span (price)
      span (unit, text-xs)
      button (cart icon → WhatsApp)
```

The `flex-1` on the description paragraph ensures all price rows align at the same vertical position regardless of description length.

---

### 7.7 Pricing

**File:** `components/sections/Pricing.tsx`  
**Type:** Client Component  

3 plans rendered from inline `plans` array (not imported from `lib/data.ts`). Highlighted card (`highlight: true`) gets `bg-primary`, `md:scale-[1.02]`, and a "Most Popular" absolute badge at `-top-4`. All CTAs call `openModal()`.

**Urgency banner** (above cards): Red alert box — "Limited delivery slots remaining this week in Hastinapuram & Nagole".

---

### 7.8 DeliveryChecker

**File:** `components/sections/DeliveryChecker.tsx`  
**Type:** Client Component  

**State:**

| State | Type | Description |
|---|---|---|
| `pincode` | `string` | Input value, digits only (maxLength 6) |
| `status` | `'idle' \| 'checking' \| 'available' \| 'unavailable'` | Check result state |
| `areaName` | `string` | Resolved area name on success |

**Serviceable pincodes (in-memory Map):**

| Pincode | Area |
|---|---|
| 500079 | Hastinapuram |
| 500035 | Nagole |
| 500036 | Kothapet |
| 500059 | Dilsukhnagar |
| 500074 | LB Nagar |
| 500060 | Saroornagar |
| 500070 | Champapet |
| 500068 | Vanasthalipuram |
| 500097 | Mallapur |
| 500076 | Uppal |

**Check flow:** validate 6-digit numeric → set `checking` → 600ms `setTimeout` → lookup Map → set `available`/`unavailable`.

**Result actions:**  
- Available: full-width green "Start My Free Trial" → `openModal()`  
- Unavailable: full-width amber "Notify Me on WhatsApp" → `window.open(NOTIFY_WA)`

---

### 7.9 Comparison

**File:** `components/sections/Comparison.tsx`  
**Type:** Client Component  
**Data:** `COMPARISON_ROWS` (4 rows)

**Dual rendering strategy:**
- `md:hidden` — card layout: each row is an independent card with feature header + 2-column grid (green Nandhavanam left, grey market right)
- `hidden md:block` — table layout: `<table>` with `overflow-x-auto min-w-[500px]`

This avoids a single table that would break on mobile without horizontal scrolling.

---

### 7.10 Testimonials

**File:** `components/sections/Testimonials.tsx`  
**Type:** Client Component  
**Data:** `TESTIMONIALS` (6 items)

Grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`. Aggregate rating badge above cards (white card, inline-flex, centered). Each card is a `<blockquote>` with star rating, italic quote, author avatar (initial-based circle), name, location, duration.

---

### 7.11 FAQ

**File:** `components/sections/FAQ.tsx`  
**Type:** Client Component  

8 questions in local `faqs` array. Single-open accordion (`openIndex: number | null`). First item open by default (`useState(0)`). AnimatePresence answer with `height: 0 → 'auto'` (250ms easeInOut). **Note:** Q2–Q8 answer text is not present in SSR HTML — it's client-rendered on interaction.

---

### 7.12 CtaSection

**File:** `components/sections/CtaSection.tsx`  
**Type:** Client Component  

Full-bleed `farm-bg.jpg` with `bg-primary/80 mix-blend-multiply` overlay. Centered H2, subtext, 2 CTAs (primary `openModal`, ghost WhatsApp), 3 trust badges (FSSAI, Organic Fodder, Zero Plastic).

---

### 7.13 Footer

**File:** `components/layout/Footer.tsx`  
**Type:** Server Component  

4-column grid (1→2→4). Columns: Brand (logo + description + social icons), Quick Links (4), Sustainability (4), Contact (address, phone, email with Lucide icons).

**Social icons:** Globe (website), MessageCircle (WhatsApp `wa.me/919959306634`), Mail (`Nandhavanammilk@gmail.com`). Each: `hover:bg-primary hover:text-white` transition.

**Dynamic year:** `new Date().getFullYear()` in copyright (safe in Server Component since this is Hyderabad local time).

---

## 8. Data Layer

### 8.1 `types/index.ts` — Interfaces

```typescript
export interface Product {
  id: string
  name: string
  description: string
  price: string          // e.g. "₹90"
  unit: string           // e.g. "Litre"
  image: string          // path under /images/
  imageWidth?: number
  imageHeight?: number
  badge?: string         // e.g. "Best Seller"
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  location: string
  subscriptionDuration: string
  initials: string       // 2-char avatar text
  rating: number         // 1–5
}

export interface TimelineStep {
  time: string           // e.g. "5:00 AM"
  title: string
  description: string
}

export interface PurityFeature {
  iconName: string       // key in ICON_MAP within PurityRitual.tsx
  title: string
  description: string
}

export interface ComparisonRow {
  feature: string
  nandhavanam: string
  market: string
}

export interface NavLink {
  label: string
  href: string           // must be a real route (not a #anchor)
}
```

### 8.2 `lib/data.ts` — Exported Constants

| Export | Type | Description |
|---|---|---|
| `NAV_LINKS` | `NavLink[6]` | `/our-farm`, `/products`, `/plans`, `/delivery`, `/reviews`, `/faq` |
| `WHATSAPP_URL` | `string` | `https://wa.me/919959306634?text=Hi%2C+I%27d+like+to+start+a+trial+for+Nandhavanam+milk.` |
| `PRODUCTS` | `Product[4]` | buffalo-milk, clay-pot-curd, malai-paneer, desi-ghee |
| `TIMELINE_STEPS` | `TimelineStep[5]` | 5:00 AM → 7:30 AM |
| `PURITY_FEATURES` | `PurityFeature[4]` | Double Testing, Live Auditing, Authority To Reject, Glass Sanitization |
| `COMPARISON_ROWS` | `ComparisonRow[4]` | Packaging, Safe Transit, Quality Audit, Farm to Door |
| `TESTIMONIALS` | `Testimonial[6]` | Santhosh Kumar, Sai, Aruna, Lakshmi Devi, Ravi Shankar, Priya |
| `FSSAI_NUMBER` | `string` | `'XXXXXXXXXXXXXX'` — **placeholder, must be updated before launch** |
| `IMAGES` | `object` | `{ farmBg, milkBottle, buffaloes, logo }` pointing to `/images/*` |

### 8.3 Product Records

| id | name | price | unit | badge |
|---|---|---|---|---|
| `buffalo-milk` | Pure Buffalo Milk | ₹90 | Litre | Best Seller |
| `clay-pot-curd` | Clay Pot Curd | ₹60 | 500g | — |
| `malai-paneer` | Fresh Paneer | ₹120 | 200g | — |
| `desi-ghee` | Desi Ghee | ₹850 | 500ml | Desi Gold |

---

## 9. Modal & Form System

### Flow diagram

```
Any CTA button → useTrialModal().openModal()
                        ↓
        TrialModalProvider.setIsOpen(true)
                        ↓
          TrialModal (AnimatePresence renders)
            ↓ backdrop click / Escape → onClose()
            ↓ X button → onClose()
          TrialSignupForm
            ↓ submit
          POST /api/trial
            ↓ 201 OK
          setSubmitted(true)  ← success state shown (800ms)
            ↓
          window.open(WhatsApp URL with prefilled message)
```

### TrialModal (`components/TrialModal.tsx`)

**Props:** `{ isOpen: boolean, onClose: () => void }`

**Effects:**
1. Escape key listener: `keydown` → if `isOpen && key === 'Escape'` → `onClose()`
2. Body scroll lock: `document.body.style.overflow = isOpen ? 'hidden' : ''` — restores on unmount

**Animation:**
```ts
backdrop: initial { opacity: 0 } animate { opacity: 1 } exit { opacity: 0 }  // 200ms
modal:    initial { opacity: 0, scale: 0.92, y: 20 }
          animate { opacity: 1, scale: 1, y: 0 }                              // 250ms, cubic-bezier(0.16, 1, 0.3, 1)
          exit    { opacity: 0, scale: 0.95, y: 10 }
```

### TrialSignupForm (`components/TrialSignupForm.tsx`)

**Fields:**

| Field | Type | Required | Options |
|---|---|---|---|
| `name` | text | yes | free text |
| `phone` | tel | yes | free text |
| `area` | select | yes | 10 delivery areas |
| `plan` | select | yes | Free Trial, Daily ₹90, Family Pack ₹160 |

**Submit handler:**
```ts
async function handleSubmit(e) {
  e.preventDefault()
  setSubmitting(true)
  await fetch('/api/trial', { method: 'POST', body: JSON.stringify(form) })
  await new Promise(r => setTimeout(r, 400))
  setSubmitted(true)
  onSuccess?.()
  setTimeout(() => window.open(whatsappURL, '_blank'), 800)
}
```

**WhatsApp message template:**
```
Hi! I'd like to start a trial.
Name: {name}
Phone: {phone}
Area: {area}
Plan: {plan}
```

---

## 10. API Route: `POST /api/trial`

**File:** `app/api/trial/route.ts`

**Method:** `POST`

**Request body (JSON):**
```json
{
  "name": "Rajesh Kumar",
  "phone": "+91 98765 43210",
  "area": "Hastinapuram",
  "plan": "Free Trial (2 days, no payment)"
}
```

**Validation:** `name`, `phone`, `area` are required. `plan` defaults to empty string if absent.

**Success (201):**
```json
{
  "ok": true,
  "id": "lead_1718000000000",
  "createdAt": "2026-06-11T10:00:00.000Z"
}
```

**Errors:**

| Code | Body | Cause |
|---|---|---|
| 400 | `{ "ok": false, "error": "missing_fields" }` | name, phone, or area missing |
| 500 | `{ "ok": false, "error": "server_error" }` | Unexpected exception |

**Storage:** Reads `data/leads.json`, appends lead object, writes back. Creates the `data/` directory if absent.

**Production note:** File-system persistence does not work in serverless environments (Vercel). Replace with a database (see [Backlog](#23-known-issues--backlog)). The `data/` directory should be added to `.gitignore`.

---

## 11. State Management

No global state library. State is localized at the smallest scope that requires it.

| State | Location | Scope |
|---|---|---|
| Modal open/close | `TrialModalProvider` | Global (entire app) |
| Scroll position | `Navbar` | Local |
| Mobile menu open | `Navbar` | Local |
| Pincode input & check result | `DeliveryChecker` | Local |
| FAQ open index | `FAQ` | Local |
| Form data, submitting, submitted | `TrialSignupForm` | Local |

**Context API shape:**
```ts
interface TrialModalContextType {
  openModal: () => void
}
// Consuming: const { openModal } = useTrialModal()
// Provider: <TrialModalProvider>{children}</TrialModalProvider>  (in app/layout.tsx)
```

---

## 12. Animation System

All animations use Framer Motion 11. Patterns are consistent across sections.

### Scroll entrance (standard)

```ts
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: '-50px' }}
transition={{ duration: 0.6, ease: 'easeOut' }}
```

**Stagger children (card grids):**
```ts
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },  // 0.08–0.12s depending on section
}
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}
```

### Hero entrance

```ts
// Left content
initial={{ opacity: 0, x: -40 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}

// Right bottle
initial={{ x: 60, opacity: 0 }}
animate={{ x: 0, opacity: 1 }}
transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
```

### Bottle float loop

```ts
animate={{ y: [0, -20, 0] }}
transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
```

### Two-way slide (FarmStory, DeliveryChecker)

```ts
// Left panel: initial: x -30 → 0
// Right panel: initial: x 30 → 0, delay: 0.1s
transition={{ duration: 0.8, ease: 'easeOut' }}
```

### Modal/menu (AnimatePresence)

```ts
// Mobile menu
initial={{ opacity: 0, y: -8, scale: 0.97 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
exit={{ opacity: 0, y: -8, scale: 0.97 }}
transition={{ duration: 0.2, ease: 'easeOut' }}

// Modal
initial={{ opacity: 0, scale: 0.92, y: 20 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
```

---

## 13. Image & Asset Strategy

All images are local files in `public/images/` — no external CDN dependencies that could expire.

| File | Intrinsic dims | Priority | `sizes` hint | Use |
|---|---|---|---|---|
| `logo.png` | variable | `priority` | 40px in nav | Navbar, Footer, favicon |
| `milk-bottle.jpg` | 500×680 | `priority` | `300px / 380px / 480px` | Hero right column |
| `farm-bg.jpg` | large | `priority` | `100vw` | Hero bg, CtaSection bg |
| `buffalo.jpg` | large | — | responsive | FarmStory |
| `curd.jpg` | product | — | `h-64` container | Products grid |
| `ghee.jpg` | product | — | `h-64` container | Products grid |
| `paneer.jpg` | product | — | `h-64` container | Products grid |

**`next/image` optimisation:** format negotiation (WebP/AVIF), responsive srcset generated automatically from `sizes` prop. Quality 80 on large backgrounds, 100 on logo.

---

## 14. SEO & Structured Data

### `app/layout.tsx` global metadata

```ts
metadataBase: new URL('https://shuddhnandhavanam.com')
title: {
  default: 'Nandhavanam | Farm-Fresh Pure Buffalo Milk, Hyderabad',
  template: '%s | Nandhavanam'
}
description: 'Pure farm-fresh buffalo milk delivered at your doorstep…'
keywords: ['buffalo milk', 'farm fresh milk', 'Hyderabad milk delivery', …]
openGraph: { type: 'website', images: [{ url: '/images/milk-bottle.jpg', width: 1200, height: 630 }] }
twitter: { card: 'summary_large_image' }
robots: { index: true, follow: true }
alternates: { canonical: 'https://shuddhnandhavanam.com' }
```

### JSON-LD Schemas (injected in `<head>` via `<Script type="application/ld+json">`)

1. **LocalBusiness:**
   - `@type: LocalBusiness`, name, url, telephone, email, address (Hastinapuram, Hyderabad 500079), geo (lat/lng)
2. **Product:**
   - Pure Buffalo Milk, offers: price ₹90, availability in stock, aggregateRating 5/5
3. **ItemList of Reviews:**
   - 3 inline Review objects with author, rating, reviewBody

---

## 15. Analytics (GA4)

**Script location:** `app/layout.tsx`, inside `<head>` using `next/script` with `strategy="afterInteractive"`.

**Conditional load:**
```tsx
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
// Only renders if GA_ID is truthy
{GA_ID && (
  <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    <Script id="ga-init" strategy="afterInteractive">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}');
    `}</Script>
  </>
)}
```

**Events to add (not yet implemented — see backlog):**

| Event name | Trigger | Properties |
|---|---|---|
| `trial_modal_opened` | `openModal()` call | `{ source: 'hero' \| 'navbar' \| 'pricing' \| … }` |
| `trial_form_submitted` | form submit success | `{ area, plan }` |
| `product_enquiry_clicked` | product cart button | `{ product_id, product_name }` |
| `delivery_check` | pincode check | `{ pincode, result: 'available' \| 'unavailable' }` |
| `whatsapp_cta_clicked` | any WhatsApp button | `{ source }` |

---

## 16. Accessibility Audit

**Current status:** Partial. Key issues:

| Issue | Severity | Location | Fix |
|---|---|---|---|
| No focus trap in modal | High | `TrialModal.tsx` | Use `@radix-ui/react-dialog` or implement manually with `focus-trap-react` |
| No `aria-modal="true"` | High | `TrialModal.tsx` | Add to modal container |
| No `aria-live` region for delivery result | Medium | `DeliveryChecker.tsx` | Add `role="status" aria-live="polite"` to result container |
| FAQ collapsed answers not in SSR | Medium | `FAQ.tsx` | Fine for SEO (client accordion is expected), but confirm screen readers see expanded content |
| Color contrast audit incomplete | Medium | `text-on-surface-variant` (#4a4538 on #fffbf7) | Run `axe` — should pass WCAG AA at these values |
| `Products` cart buttons are icon-only on some widths | Low | `Products.tsx` | Add `aria-label="Order {product.name} on WhatsApp"` |

**Verified accessible:**
- All `next/image` have descriptive `alt` attributes
- Navbar hamburger has `aria-label` and `aria-expanded`
- FAQ buttons have `aria-expanded`
- Form labels are proper `<label for>` associations

---

## 17. Performance Budget

**Targets (Core Web Vitals):**

| Metric | Target | Notes |
|---|---|---|
| LCP | < 2.5s (3G mobile) | Hero image + bottle both `priority` |
| FID/INP | < 200ms | No heavy synchronous JS on load |
| CLS | < 0.1 | All images have explicit dimensions |
| TTFB | < 400ms | Server-rendered shell, Turbopack HMR |
| JS bundle (initial) | < 200KB gzip | Dynamic imports + Next.js tree-shaking |

**Optimisations in place:**
- `priority` on Hero images (LCP images)
- `dynamic(() => import(…), { ssr: false })` on all below-fold sections
- `sizes` prop on every `next/image`
- `quality={80}` on large background images
- Google Fonts with `display: swap` (no FOIT)
- `devIndicators: false` in `next.config.ts`

---

## 18. Environment Variables

| Variable | Type | Required | Description |
|---|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `string` | Optional | GA4 Measurement ID (e.g. `G-XXXXXXXXXX`). GA4 script skipped if absent. |

**To add for production:**

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string when replacing file-based lead storage |
| `SENTRY_DSN` | Sentry error reporting (server-side errors in API route) |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry for client-side errors |

Set variables in `.env.local` (local) or Vercel project settings (production). Never commit secrets to source control.

---

## 19. Testing Strategy

**No tests are installed yet.** This section defines the target state.

### Unit tests (Jest + React Testing Library)

```bash
npm install -D jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

Priority test cases:

| Component | Test |
|---|---|
| `DeliveryChecker` | Known pincode returns 'available'; unknown returns 'unavailable'; invalid input (5-digit) does not trigger check |
| `FAQ` | First item open by default; clicking toggles; only one open at a time |
| `TrialSignupForm` | Required field validation; submit calls `fetch`; success state shown; WhatsApp opens after delay |
| `Button` | Renders all variants and sizes; `href` renders `<a>`; disabled state |
| `cn()` utility | Merging conflicting Tailwind classes, conditional classes |

### E2E (Playwright)

```bash
npm install -D @playwright/test
npx playwright install chromium
```

Priority flows:

| Flow | Steps |
|---|---|
| Homepage load | Navigate `/`, verify H1 visible, bottle image loaded |
| Trial modal | Click "Start Free Trial", modal opens, fill form, submit, success state, WhatsApp intent URL formed correctly |
| Delivery checker | Enter `500079`, "available" message shown; enter `999999`, "unavailable" shown |
| Mobile navigation | Resize to 375px, hamburger visible, click opens menu, link closes menu |
| FAQ accordion | Click Q2, answer visible; click again, answer hidden |

### Accessibility (axe-core)

```bash
npm install -D axe-playwright
```

Run axe on `/`, `/plans`, `/faq` in Playwright tests. Fail on critical violations.

---

## 20. CI/CD Pipeline

**Recommended:** GitHub Actions.

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm test -- --passWithNoTests

  build:
    needs: quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with: { name: next-build, path: .next/ }

  e2e:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm run build && npm run start &
      - run: npx wait-on http://localhost:3000
      - run: npx playwright test
```

**Deployment:** Vercel. Connect GitHub repository. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel environment variables. Ensure `data/` is in `.gitignore` (file-based lead storage is dev-only).

**Automation bots:**
- Dependabot / Renovate: weekly dependency updates
- Lighthouse CI: performance budgets enforced on PRs

---

## 21. Observability & Telemetry

**Current state:** None beyond GA4 (conditional on env var).

**Recommended additions:**

| Tool | Purpose | Integration |
|---|---|---|
| Sentry | Runtime error capture (client + server) | `npm install @sentry/nextjs`, wrap API route |
| Vercel Analytics | Real Core Web Vitals from field data | `@vercel/analytics` package |
| Hotjar / LogRocket | Session replay for UX issues | Script in layout.tsx (GDPR considerations apply) |
| Uptime monitor | Alert if production site goes down | UptimeRobot / Better Uptime (free tier) |

**Key server events to log (in `/api/trial` route handler):**
```ts
console.info('[trial] lead created', { id: lead.id, area: lead.area, plan: lead.plan })
// On error:
console.error('[trial] storage error', { error: err.message })
```

---

## 22. Security Checklist

| Item | Status | Note |
|---|---|---|
| No secrets in source | ✅ | Only `NEXT_PUBLIC_*` (non-sensitive) referenced |
| Input validation in API route | ⚠️ | Validates presence but not format (phone, name length) |
| Rate limiting on `/api/trial` | ❌ | Not implemented — add before production launch |
| XSS | ✅ | React escapes all output; no `dangerouslySetInnerHTML` |
| SQL injection | ✅ | No database queries (file-based storage) |
| CSRF | ✅ | No auth cookies; form submission is from same origin |
| Content Security Policy | ❌ | No CSP headers — add via `next.config.ts` headers |
| Phone number normalisation | ❌ | Raw user input stored — normalise to E.164 before storage |

**Minimum production hardening (add to `app/api/trial/route.ts`):**
```ts
// Rate limit: 5 submissions per IP per hour
// Phone normalise: strip non-digits, validate 10-digit Indian mobile
// Size limit: name ≤ 100 chars, phone ≤ 15 chars
// Sanitise: strip HTML tags from all string fields
```

---

## 23. Known Issues & Backlog

**Blocking for production launch:**
1. `FSSAI_NUMBER = 'XXXXXXXXXXXXXX'` — replace with real FSSAI licence number in `lib/data.ts`
2. File-based lead storage (`data/leads.json`) — replace with a database before deploying to Vercel
3. Rate limiting on `/api/trial` — required to prevent abuse
4. Focus trap missing in `TrialModal` — accessibility regression

**High priority:**
5. GA4 analytics events for modal open, form submit, product clicks, delivery check
6. Add `aria-live="polite"` to `DeliveryChecker` result container
7. Add `aria-label` to product cart buttons (icon-only on some breakpoints)
8. Phone number validation in `TrialSignupForm` (10-digit Indian mobile)

**Medium priority:**
9. Unit tests for `DeliveryChecker`, `FAQ`, `TrialSignupForm`, `cn()`
10. Playwright E2E for trial modal flow and delivery checker
11. `/api/trial` — add proper lead persistence (Supabase or Airtable)
12. Sitemap (`app/sitemap.ts`) — not yet generated
13. `robots.txt` (`app/robots.ts`) — not yet generated

**Low priority:**
14. Social media OG images per route (currently all routes share the same image)
15. Google Search Console verification meta tag
16. Lighthouse CI budget enforcement in GitHub Actions
17. FSSAI certificate download link in PurityRitual FSSAI badge

---

## 24. Agent Playbooks

These playbooks are written for AI coding agents (Claude Code, Copilot, custom CI agents). Each playbook is self-contained.

---

### Playbook A: Add a new product

**Files to touch:**
1. `public/images/` — add `{product-id}.jpg`
2. `lib/data.ts` — append to `PRODUCTS` array
3. `types/index.ts` — no changes (interface already covers optional fields)

**Template:**
```ts
// In lib/data.ts PRODUCTS array:
{
  id: 'new-product-id',
  name: 'Product Name',
  description: 'Short description in Indian English.',
  price: '₹XX',
  unit: 'Xg',
  image: '/images/new-product-id.jpg',
  badge: 'Optional Badge',   // omit if none
}
```

**Verification:** `npm run build` should pass; product appears in Products section on `/products`.

---

### Playbook B: Add a new delivery area

**Files to touch:**
1. `components/sections/DeliveryChecker.tsx` — add to `SERVICEABLE` Map
2. `components/TrialSignupForm.tsx` — add to `AREAS` array
3. `app/delivery/page.tsx` — update metadata description if needed

**Template:**
```ts
// In DeliveryChecker.tsx SERVICEABLE Map:
['500XXX', 'AreaName'],

// In TrialSignupForm.tsx AREAS array:
'AreaName',
```

---

### Playbook C: Update FSSAI licence number

**File:** `lib/data.ts`  
**Change:**
```ts
// Before:
export const FSSAI_NUMBER = 'XXXXXXXXXXXXXX'
// After:
export const FSSAI_NUMBER = '21224000000001'  // replace with actual number
```

FSSAI number renders in `PurityRitual.tsx` header badge automatically.

---

### Playbook D: Replace file-based lead storage with Supabase

1. Create a Supabase project; create table `leads (id uuid, name text, phone text, area text, plan text, created_at timestamptz)`
2. `npm install @supabase/supabase-js`
3. Add `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` to `.env.local` and Vercel
4. Rewrite `app/api/trial/route.ts`:

```ts
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

export async function POST(req: Request) {
  const { name, phone, area, plan } = await req.json()
  if (!name || !phone || !area) return Response.json({ ok: false, error: 'missing_fields' }, { status: 400 })
  const { data, error } = await supabase.from('leads').insert({ name, phone, area, plan }).select().single()
  if (error) return Response.json({ ok: false, error: 'server_error' }, { status: 500 })
  return Response.json({ ok: true, id: data.id, createdAt: data.created_at }, { status: 201 })
}
```

---

### Playbook E: Add a new page route

1. Create `app/{route}/page.tsx`:

```tsx
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import SomeSectionComponent from '@/components/sections/SomeSectionComponent'
import CtaSection from '@/components/sections/CtaSection'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description.',
}

export default function NewPage() {
  return (
    <div className="pt-6">
      <Navbar />
      <main>
        <SomeSectionComponent />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
```

2. Add to `NAV_LINKS` in `lib/data.ts` if it should be in the navbar.

---

### Playbook F: Add a new testimonial

**File:** `lib/data.ts` — append to `TESTIMONIALS` array.

```ts
{
  id: 'author-id',             // kebab-case unique
  quote: 'Review text…',
  author: 'Full Name',
  location: 'Area, Hyderabad',
  subscriptionDuration: 'Verified Customer',
  initials: 'AB',              // 2 chars
  rating: 5,
}
```

Auto-renders in `Testimonials` section (grid expands automatically).

---

### Playbook G: Implement focus trap in TrialModal

```bash
npm install focus-trap-react
```

```tsx
// TrialModal.tsx
import FocusTrap from 'focus-trap-react'

// Wrap modal content:
<FocusTrap active={isOpen} focusTrapOptions={{ initialFocus: false, escapeDeactivates: true, onDeactivate: onClose }}>
  <motion.div
    role="dialog"
    aria-modal="true"
    aria-labelledby="trial-modal-title"
    ...
  >
    ...
  </motion.div>
</FocusTrap>
```

Add `id="trial-modal-title"` to the modal heading.

---

## 25. Live UI Content Inventory

Verified from `http://localhost:3000` on 2026-06-11.

### Homepage (`/`)

**Section order and key copy:**

| # | Section id | Heading | Key content |
|---|---|---|---|
| 1 | — | "From Our Farm / To Your Family." | Hero, farm-bg.jpg, milk-bottle.jpg, trust bar (500+ families, FSSAI, Hyderabad), Start Free Trial + WhatsApp Order |
| 2 | `#farm` | "Families Who Care About Purity." | Buffalo farm image, Pesticide Free / Natural Care stats |
| 3 | `#delivery` | "Do We Deliver To Your Door?" | 10 area pills, pincode checker |
| 4 | `#process` | "The Morning Ritual" | 5 timeline steps (5:00 AM–7:30 AM) |
| 5 | `#purity` | "Built On Unwavering Trust." | FSSAI badge (placeholder number), 4 trust cards |
| 6 | `#products` | "Pure & Natural, Every Single Day." | 4 product cards |
| 7 | — | "No Hidden Charges. Ever." | 3 pricing plans, urgency banner |
| 8 | — | "Why We Are Different." | 4-row comparison (Nandhavanam vs Market Milk) |
| 9 | `#reviews` | "Stories From The Table." | 4.9★, 6 reviews |
| 10 | `#faq` | "Everything You Want to Know." | 8 FAQ items (Q1 open by default) |
| 11 | — | "Start Your Purity Journey Tomorrow." | Final CTA, trust badges |
| 12 | — | Footer | Quick links, contact, copyright 2026 |

### Sub-routes

| Route | Unique content vs homepage |
|---|---|
| `/our-farm` | FarmStory + MorningTimeline + PurityRitual only (no hero, products, pricing) |
| `/products` | Products section only |
| `/plans` | Pricing + FAQ |
| `/delivery` | DeliveryChecker only |
| `/reviews` | Testimonials + Comparison |
| `/faq` | FAQ only |

All sub-routes include Navbar, CtaSection, Footer.

### Pricing plans

| Plan | Price | Period | CTA |
|---|---|---|---|
| Free Trial | ₹0 | 2-day trial | "Start Free Trial" |
| Daily Subscription (Most Popular) | ₹90 | per litre / day | "Subscribe Now" |
| Family Pack | ₹160 | per 2 litres / day | "Order Family Pack" |

### Testimonials

| Author | Location | Key quote excerpt |
|---|---|---|
| Santhosh Kumar | Hastinapuram | "…morning chai tastes much better now. Love the glass bottle concept!" |
| Sai | Nagole | "…pure buffalo milk without water mixing. Delivery is always on time." |
| Aruna | Hastinapuram | "…quality reminds me of fresh farm milk from childhood." |
| Lakshmi Devi | Vanasthalipuram | "My children refuse to drink any other milk now." |
| Ravi Shankar | Kothapet | "Three months in and the consistency is impressive." |
| Priya | LB Nagar | "The curd set from this milk is outstanding." |

### Contact & social

| Channel | Value |
|---|---|
| Address | Plot No 137, Hastinapuram, Hyderabad, Telangana 500079 |
| Phone | +91 99593 06634 |
| Email | Nandhavanammilk@gmail.com |
| WhatsApp | `wa.me/919959306634` |
| Website | `https://shuddhnandhavanam.com` |

---

*Generated from repository source inspection + live server verification — 2026-06-11.*
