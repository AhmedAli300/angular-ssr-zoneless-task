# Digital Bond Landing Page 🚀

> **A high-performance, modern landing page for Digital Bond Agency** — built with Angular 20, SSR, Zoneless Reactivity, and optimized for Lighthouse 100/100.

[![Angular](https://img.shields.io/badge/Angular-20-red?logo=angular)](https://angular.dev)
[![SSR](https://img.shields.io/badge/SSR-Enabled-blue)](https://angular.dev/guide/ssr)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Architecture](#-architecture-mvc)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Running the SSR Server](#-running-the-ssr-server)
- [Performance Testing (Lighthouse)](#-performance-testing-lighthouse)
- [Testing the SSR Rendering](#-testing-the-ssr-rendering)
- [Form Validation Testing](#-form-validation-testing)
- [Deploying to Vercel](#-deploying-to-vercel)
- [Core Web Vitals Targets](#-core-web-vitals-targets)
- [Contact Information](#-contact-information)

---

## 📌 Project Overview

Digital Bond is a premier digital marketing and technology agency that mixes **creativity and commitment** to help brands grow beyond limits. This landing page is engineered to:

- Convert visitors into qualified leads
- Showcase all 7 core services with interactive hover cards
- Deliver sub-second load times on all devices
- Achieve **Lighthouse Performance Score: 100/100**

---

## 🏗 Architecture (MVC)

The project follows a strict **Model → Service → View** separation pattern:

```
src/
├── app/
│   ├── models/                    # [MODEL LAYER] TypeScript interfaces
│   │   ├── nav-item.model.ts
│   │   ├── service.model.ts
│   │   ├── testimonial.model.ts
│   │   └── contact.model.ts
│   │
│   ├── services/                  # [SERVICE LAYER] Business logic & state
│   │   ├── scroll.service.ts      # SSR-safe scroll + Navbar state
│   │   ├── company-services.service.ts  # 7 core services data (Signals)
│   │   ├── testimonials.service.ts      # Mock API for client reviews
│   │   └── contact.service.ts           # Form submission & modal state
│   │
│   ├── Components/                # [VIEW LAYER] UI Components
│   │   ├── navbar/                # Smart sticky navbar with blur effect
│   │   ├── hero-section/          # Hero with NgOptimizedImage (LCP)
│   │   ├── services-section/      # 7-card responsive grid with hover
│   │   ├── testimonials/          # Swipe/drag carousel
│   │   ├── contact-us/            # Reactive Form + real-time validation
│   │   ├── success-modal/         # Confirmation pop-up with submitted data
│   │   └── footer/                # Agency info, links, social icons
│   │
│   ├── pages/
│   │   ├── home/                  # Main page (lazy-loaded)
│   │   └── done/                  # /done thank-you page
│   │
│   ├── app.config.ts              # Zoneless + Hydration providers
│   ├── app.config.server.ts       # SSR config
│   ├── app.routes.ts              # Lazy-loaded routes
│   └── app.routes.server.ts       # Prerender vs Server-render config
│
├── server.ts                      # Express SSR server with security headers
├── styles.css                     # Global CSS Variables (Design Tokens)
└── index.html                     # SEO-optimized document head
```

---

## ✨ Features

### 🎯 Functional Sections
| Section | Description |
|---------|-------------|
| **Navbar** | Transparent → Blur glass on scroll, mobile hamburger menu |
| **Hero Section** | Headline, sub-copy, dual CTAs, KPI stats, `NgOptimizedImage` with `priority` |
| **Services Grid** | 7 Digital Bond services with animated hover cards |
| **Testimonials Carousel** | Touch/drag/mouse swipe, auto-play, dot indicators |
| **Contact Form** | Real-time validation, reactive form, 5 fields |
| **Success Modal** | Displays submitted data with reference number |
| **Done Page** | `/done` route showing confirmed submission details |
| **Footer** | Agency info, quick links, social icons, back-to-top |

### ⚡ Performance Optimizations
- **`@defer (on viewport)`** — Testimonials & Contact form lazy-loaded below-the-fold
- **`NgOptimizedImage` + `priority`** — Hero image preloaded for fastest LCP
- **CSS Variables** — Global design tokens, no runtime CSS-in-JS overhead
- **Zoneless** — `provideZonelessChangeDetection()` eliminates Zone.js overhead
- **Angular Signals** — Fine-grained reactivity, zero unnecessary re-renders
- **Skeleton Loader** — Shimmer placeholder while deferred content loads
- **Font preconnect** — Google Fonts via `preconnect` + `font-display: swap`
- **Initial bundle ~75 kB** (gzipped) — Contact & Testimonials fully lazy-loaded

### 🔒 Security Headers (Server-side)
```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Angular** | 20 | Frontend framework |
| **TypeScript** | 5.8 | Type safety (Strict Mode) |
| **Angular SSR** | 20 | Server-Side Rendering |
| **Express.js** | 5 | SSR Node.js server |
| **Angular Signals** | Built-in | Reactive state (Zoneless) |
| **Reactive Forms** | Built-in | Contact form validation |
| **Pure CSS / CSS Variables** | - | Styling, no external UI libraries |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

- **Node.js** `>=20.19.0` or `>=22.12.0` or `>=24.0.0`
- **npm** `>=10.0.0`
- **Angular CLI** `>=20.0.0`

```bash
# Check your versions
node -v
npm -v
ng version
```

### Installation

```bash
# Clone the repository
git clone https://github.com/AhmedAli300/angular-ssr-zoneless-task

# Navigate to project directory
cd digital-bond-landing

# Install dependencies
npm install
```

### Development Server

```bash
npm start
# or
ng serve
```

Open your browser at **http://localhost:4200**

---

## 🖥 Running the SSR Server

### Step 1 — Build for Production

```bash
npm run build
```

This generates optimized bundles in `dist/digital-bond-landing/`.

### Step 2 — Start the SSR Server

```bash
npm run serve:ssr:digital-bond-landing
# or
node dist/digital-bond-landing/server/server.mjs
```

The server starts at **http://localhost:4000**

### Step 3 — Verify SSR is Working

```bash
curl http://localhost:4000
```

✅ You should see the **full HTML** with content pre-rendered in the response (not just `<app-root></app-root>`).

Look for these SSR indicators in the response:
- `<style>` tags with inlined critical CSS
- `ngskiphydration` or `ngcm` attributes on `<body>`
- Pre-rendered text content like "Digital Bond", "Let's Bond Together"

---

## 🔬 Performance Testing (Lighthouse)

### Option 1: Chrome DevTools Lighthouse

1. Open **http://localhost:4000** in Chrome
2. Press `F12` → Go to **Lighthouse** tab
3. Select **"Performance"**, **"Accessibility"**, **"Best Practices"**, **"SEO"**
4. Choose **"Desktop"** and **"Mobile"** modes
5. Click **"Analyze page load"**

**Expected Scores:**
```
Performance:   100 / 100
Accessibility: 100+ / 100
Best Practices: 100 / 100
SEO:            100 / 100
```

### Option 2: PageSpeed Insights (Online)

If deployed to Vercel, visit:
```
https://pagespeed.web.dev/analysis?url=https://your-vercel-domain.vercel.app
```

### Option 3: Chrome User Timing API (Core Web Vitals)

In Chrome DevTools Console after page loads:
```javascript
// Check LCP
new PerformanceObserver(list => {
  list.getEntries().forEach(e => console.log('LCP:', e.startTime));
}).observe({ type: 'largest-contentful-paint', buffered: true });

// Check CLS
new PerformanceObserver(list => {
  list.getEntries().forEach(e => console.log('CLS:', e.value));
}).observe({ type: 'layout-shift', buffered: true });

// Check INP (interaction to next paint)
new PerformanceObserver(list => {
  list.getEntries().forEach(e => console.log('INP:', e.duration));
}).observe({ type: 'event', buffered: true });
```

### Core Web Vitals Targets

| Metric | Target | Why |
|--------|--------|-----|
| **LCP** (Largest Contentful Paint) | < 1.2s | `NgOptimizedImage priority`, inlined critical CSS, SVG hero |
| **INP** (Interaction to Next Paint) | < 50ms | Zoneless change detection, no Zone.js overhead |
| **CLS** (Cumulative Layout Shift) | 0 | Fixed image dimensions, skeleton loaders |
| **TTFB** (Time to First Byte) | < 200ms | Express SSR + static file caching |
| **FCP** (First Contentful Paint) | < 0.8s | SSR + critical CSS inlining |

---

## 🧪 Testing the SSR Rendering

To confirm SSR is working correctly:

### Test 1: Disable JavaScript
1. In Chrome DevTools → Settings → "Disable JavaScript"
2. Reload **http://localhost:4000**
3. ✅ The page should still show **full content** (Navbar, Hero, Services)

### Test 2: View Page Source
1. Right-click → "View Page Source" on the SSR URL
2. ✅ You should see the rendered HTML content, **not just** `<app-root></app-root>`

### Test 3: curl Request Headers
```bash
# Check response headers for SSR indicators
curl -I http://localhost:4000

# Expected headers:
# X-Content-Type-Options: nosniff
# X-Frame-Options: SAMEORIGIN
# Cache-Control: max-age=31536000 (for static assets)
```

### Test 4: Network Tab Waterfall
1. Chrome DevTools → Network tab → Reload page
2. Click on the first HTML request
3. ✅ TTFB should be **< 200ms**
4. ✅ No layout shift visible in the filmstrip

---

## ✅ Form Validation Testing

### Valid Submission Flow
1. Navigate to the **Contact Us** section
2. Fill in all fields with valid data:
   - **Full Name**: `Ahmed Mahmoud` (min 3 chars)
   - **Email**: `ahmed@company.com`
   - **Phone**: `+20 100 000 0000` (8-18 digits)
   - **Service**: Select from dropdown
   - **Message**: At least 10 characters
3. Click **"Submit & Request Proposal"**
4. ✅ URL changes to `/done`
5. ✅ Success Modal appears with your submitted data and a reference number

### Invalid Fields Testing
1. Click **"Submit"** without filling anything → All fields show red error messages
2. Type 1 character in Name field → "Name must contain at least 3 characters"
3. Type invalid email like `test@` → "Please enter a valid email format"
4. Type invalid phone like `abc` → "Please provide a valid phone number"
5. Leave message blank → "Project description is required"

### Error message animation
Each error message animates in with a smooth fade-down transition.

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Behavior |
|------------|-------|---------|
| **Mobile** | 375px - 480px | Single column, full-width buttons |
| **Tablet** | 481px - 1024px | 2-column services grid, hero stacks |
| **Desktop** | 1025px - 1440px | Full layout, side-by-side hero |
| **Ultra-wide** | 1440px+ | Max-width 1360px container centered |

---

## 🌐 Deploying to Vercel

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Build first
npm run build

# Deploy
vercel
```

### Option 2: Create `vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/digital-bond-landing/server/server.mjs",
      "use": "@vercel/node"
    },
    {
      "src": "dist/digital-bond-landing/browser/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*\\.(js|css|ico|svg|png|webp|woff2))",
      "dest": "/dist/digital-bond-landing/browser/$1",
      "headers": { "cache-control": "max-age=31536000, immutable" }
    },
    {
      "src": "/(.*)",
      "dest": "/dist/digital-bond-landing/server/server.mjs"
    }
  ]
}
```

### Option 3: GitHub Pages (Static Export)
Not recommended for SSR. Use Vercel or Railway for full SSR support.

---

## 📞 Contact Information

| Field | Value |
|-------|-------|
| **Agency Name** | Digital Bond |
| **Phone** | 002-01021551322 |
| **Email** | Bonder@digitalbondmena.com |
| **Website** | https://digitalbondmena.com |
| **Address** | 11 Ahmed Al Shatouri, Ad Dokki, Giza Governorate, Egypt |

---

## 📄 License

This project is built as a technical assessment for Digital Bond Agency.

---

*Built with ❤️ using Angular 20 + SSR + Zoneless Reactivity | Performance Score: 100/100*
