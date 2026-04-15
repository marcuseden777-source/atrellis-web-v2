# Services Page Integration Plan

## Goal
Convert the static services.html page into a Next.js React component (app/services/page.tsx) with Tailwind CSS styling and GSAP animations, then deploy to Vercel.

## Context
- Current project: Next.js 14 with Tailwind CSS, GSAP, and scroll animations
- Source: services.html (static HTML) + css/style.css (global styles) + js/services.js (animations)
- Target: app/services/page.tsx (React component) with integrated styles and animations
- Deployment: Verify it works on Vercel at /services route

## Structure of services.html
- Header with logo and CTA button
- Hero section with "ENGINEERED LUXURY" title and intro text
- Services grid (6 cards with indices, titles, descriptions, feature lists)
- Portfolio/Case studies section (2 cards with images)
- Products section (3 product rows with images, titles, and variant descriptions)
- Footer
- All elements use class "showcase-reveal" for scroll animations

## Task Breakdown

### Task 1: Create app/services/page.tsx (React Component)
**Scope:** Convert HTML structure to React component with proper TypeScript
- Create client component ('use client')
- Convert all HTML sections to React JSX
- Maintain semantic HTML structure
- Integrate all 6 service cards with data structure
- Integrate 2 portfolio cards with image paths
- Integrate 3 product rows with variant data
- Add all necessary imports (React, GSAP, etc.)
- **Do NOT add animations yet** - just structure

**Files to create:**
- app/services/page.tsx

**Acceptance Criteria:**
- Component renders without errors
- All sections visible (hero, services, portfolio, products, footer)
- All text content from services.html present
- Proper TypeScript typing
- No animation code (will add in Task 3)

---

### Task 2: Convert CSS to Tailwind Classes
**Scope:** Convert css/style.css styles to Tailwind utility classes in the React component
- Replace glass-morphism CSS variables with Tailwind equivalents
- Convert `showcase-reveal` class initial states to inline Tailwind styles
- Convert glass effects (backdrop-filter, blur) to Tailwind backdrop-blur
- Convert spacing, typography, colors to Tailwind
- Ensure responsive design (mobile-first, 768px breakpoint if needed)

**Key styles to convert:**
- Glass background: rgba(255, 255, 255, 0.03) → backdrop blur
- Glass border: rgba(255, 255, 255, 0.12) → border opacity
- Text colors: --text-offwhite, --text-grey → text-white/95, text-white/50
- Initial reveal states: opacity-0, translate-y shifts

**Acceptance Criteria:**
- All visual styles match the original services.html
- No external CSS imports needed (all Tailwind)
- Responsive on mobile (360px) and desktop (1440px)
- Glass-morphism effect visually matches original

---

### Task 3: Add GSAP Scroll Animations
**Scope:** Integrate GSAP ScrollTrigger animations from js/services.js into the component
- Extract animation logic from public/js/services.js
- Convert to React hooks (useEffect)
- Apply scroll reveal animations to all `.showcase-reveal` elements
- Test that animations work as scroll events trigger
- Set up ScrollTrigger to work with the component lifecycle

**Animation behavior:**
- Elements with className="showcase-reveal" should animate from opacity-0 to opacity-1 when scrolled into view
- Use gsap.to() pattern (not gsap.from())
- Stagger animations for card reveals
- Smooth scroll behavior with ScrollTrigger

**Acceptance Criteria:**
- All elements marked showcase-reveal animate on scroll
- Animations smooth and performant
- No animation conflicts (ScrollTriggers properly cleaned up on unmount)
- Works on both desktop and mobile viewports

---

### Task 4: Integrate Assets & Links
**Scope:** Ensure all assets and navigation links work
- Update image paths to use public/assets/...
- Update "GET A FAST QUOTE" button to link to /quotation (or create quotation page)
- Verify all portfolio images load (sentosa_cove.png, marina_one_loft.png)
- Verify all product images load (zipblinds_mockup, blinds_mockup, roofing_mockup)
- Add metadata for SEO

**Acceptance Criteria:**
- All images load without 404 errors
- Links navigate correctly
- Metadata title/description present
- No broken asset paths

---

### Task 5: Deploy & Verify
**Scope:** Commit changes, deploy to Vercel, and test
- Commit all changes with descriptive message
- Run `vercel --prod --yes` 
- Verify https://atrellis-web.vercel.app/services loads without errors
- Verify scroll animations work in production
- Verify responsive design on mobile

**Acceptance Criteria:**
- Deployment successful (READY status)
- Page loads at /services route
- All content visible
- Animations working in browser
- No console errors

---

## Technical Notes
- Component uses 'use client' (client-side rendering needed for GSAP)
- GSAP ScrollTrigger already available (installed in package.json)
- Tailwind configured in project (tailwind.config.js exists)
- Next.js 14 App Router in place

## Dependencies
- React 18.2.0 (already installed)
- GSAP 3.12.2 (already installed)
- Tailwind CSS 3.3.6 (already installed)

## Deployment
After all tasks complete, deploy with:
```bash
git add .
git commit -m "feat: integrate services page as Next.js component"
vercel --prod --yes
```
