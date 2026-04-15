# UI/UX Improvements Implementation Plan

## Context

**Site:** https://atrellis-web.vercel.app (Atrellis luxury interior design services)  
**Current State:** Services page with dark glass-morphism design, 6 service cards, 2 portfolio items, 3 product rows, quotation form
**Design Principles:** UI/UX Pro Max (social proof, clarity, conversion), shadcn/ui components, frontend design (bold aesthetics)

## Phase 1: Quick Wins (High-Impact, Low-Effort)

### Task 1.1: Install shadcn/ui and Initialize Design System
**Scope:** Set up shadcn/ui foundation with custom theme aligned to Atrellis dark aesthetic
**Files to modify/create:**
- `components.json` - shadcn configuration
- `globals.css` - CSS variables for dark theme with Atrellis blue accents
- `lib/cn.ts` - Tailwind class merge utility
- Add initial components: button, card, badge

**Acceptance Criteria:**
- shadcn/ui initialized with `-d` flag (non-interactive)
- CSS variables configured for dark mode (bg-black, text-white, blue-500 accents)
- `cn()` utility available for className merging
- Button and Card components usable in project

---

### Task 1.2: Add Social Proof Section (Trustbar + Client Logos)
**Scope:** New section after hero, before services grid. Shows trust indicators (existing brand logos + completion count)
**Files to modify/create:**
- `app/services/client.tsx` - Add new `<SocialProofSection />` with:
  - "2000+ Satisfied Clients" or "50+ Luxury Projects Completed"
  - Horizontal scroll of brand logos (BCA Authority, Bizsafe3, HDB Licensed, etc.) from `public/assets/trustbar_logos/`
  - Dark glass-morphism styling (bg-white/5, backdrop-blur-xl)
  - Smooth scroll animation on viewport enter

**Acceptance Criteria:**
- Section renders between hero and services grid
- All logos from `public/assets/trustbar_logos/` display correctly
- Glass-morphism styling matches existing design
- ScrollTrigger animation reveals section on scroll
- No horizontal overflow on mobile
- Metrics (client count) displayed prominently

---

### Task 1.3: Enhance Service Card Hover States & Add Micro-Interactions
**Scope:** Improve existing service cards (6 cards in grid) with premium hover feedback
**Files to modify/create:**
- `app/services/client.tsx` - Update `.showcase-reveal` service card styling:
  - Add icon animation on hover (SVG icon rotation/pulse)
  - Enhance translate-y and shadow on hover (current: translate-y-[-10px], add shadow-2xl glow)
  - Add top gradient line animation (already exists, enhance opacity transition)
  - Add cursor-pointer to cards

**Acceptance Criteria:**
- Service cards have smooth hover animations (no layout shift)
- Visual feedback is clear (shadow, border, icon animation)
- Animations use transform/opacity (performance-optimized)
- Cursor is pointer on hover
- Mobile tap targets are adequate (44x44px minimum)

---

### Task 1.4: Add Contextual CTAs in Service Cards
**Scope:** Add "Request Quote for This Service" button inside each service card
**Files to modify/create:**
- `app/services/client.tsx` - Update `ServiceCard` interface and JSX:
  - Add button to bottom of each card
  - Link to `/quotation` with query param: `?service={cardTitle}`
  - Button styling: blue accent, glass effect

**Acceptance Criteria:**
- Each service card has CTA button at bottom
- Button links to `/quotation?service=ServiceName`
- Styling consistent with "GET A FAST QUOTE" header button
- Quotation form receives service pre-selection (next phase)

---

## Phase 2: Content Expansion (Medium Effort, High Impact)

### Task 2.1: Expand Portfolio Section (2 → 4-6 Case Studies)
**Scope:** Increase portfolio diversity to show all service types
**Files to modify/create:**
- `app/services/client.tsx` - Update `portfolioCards` array:
  - Current: 2 cards (Sentosa Cove, Marina One)
  - Add 4 more: commercial space, residential kitchen, outdoor living, smart ecosystem integration
  - Create placeholder images or use existing assets
  - Maintain current styling (rounded, border, hover effects)

**Acceptance Criteria:**
- Portfolio section has 6 case studies (one per service type ideally)
- All images load without errors
- Grid layout responsive (1 col mobile, 2 cols tablet, 3 cols desktop)
- Hover states smooth (scale, border-blue-500, shadow)
- ScrollTrigger animations fire on viewport enter

---

### Task 2.2: Add Process/Timeline Section
**Scope:** New section showing how clients move from inquiry → quote → execution → completion
**Files to modify/create:**
- `app/services/client.tsx` - Add new `<ProcessSection />`:
  - 4-step timeline: "Consultation" → "Design" → "Execution" → "Completion"
  - Each step has icon, title, description, estimated duration
  - Animated progress indicators (underline animation, step numbers)
  - Vertical layout on mobile, horizontal on desktop

**Acceptance Criteria:**
- Section appears after services grid, before case studies
- All 4 steps clearly labeled with estimated duration
- Icons animate on scroll into view
- Layout responsive (vertical mobile, horizontal desktop)
- Dark glass-morphism styling consistent with page

---

### Task 2.3: Implement Testimonials/Reviews Section
**Scope:** New section with 3-4 client testimonials (quotes + ratings)
**Files to modify/create:**
- `app/services/client.tsx` - Add new `<TestimonialsSection />`:
  - 3-4 testimonial cards with:
    - 5-star rating (use Lucide star icon)
    - Client quote (2-3 sentences)
    - Client name + project type
    - Avatar placeholder or image
  - Grid layout: responsive (1 col mobile, 2-3 cols desktop)
  - Glass-morphism cards matching existing design

**Acceptance Criteria:**
- Section renders after process timeline
- All 3-4 testimonials display correctly
- Star ratings visible and consistent
- ScrollTrigger reveals cards on scroll
- Cards have hover effects (shadow, slight lift)
- Avatar images/placeholders load correctly

---

## Phase 3: Structural Changes (High Effort, High Value)

### Task 3.1: Implement Multi-Step Quotation Form
**Scope:** Convert single-page form to 3-step flow (service selection → details → contact)
**Files to modify/create:**
- `app/quotation/page.tsx` - Major refactor:
  - Step 1: Select service(s) from radio buttons or multi-select (pre-filled if from service card CTA)
  - Step 2: Project description textarea + photo upload optional
  - Step 3: Contact details (name, email, phone)
  - Navigation: Previous/Next buttons, progress indicator
  - Form state management (use React hooks, Context if needed)

**Acceptance Criteria:**
- Form has 3 distinct steps with clear navigation
- Progress indicator shows current step (1/3, 2/3, 3/3)
- Service pre-selection from query param works
- All fields validated before proceeding
- Submit button disabled until all fields valid
- Form data persisted across steps (no data loss on nav)
- Responsive on mobile (full-width inputs)

---

### Task 3.2: Add Service Filtering System
**Scope:** Allow users to filter services by category (Residential, Commercial, Outdoor, Technology, etc.)
**Files to modify/create:**
- `app/services/client.tsx` - Update services section:
  - Add filter tabs/buttons above service grid: "All" | "Residential" | "Commercial" | "Outdoor" | "Technology"
  - Tag each service card with category in `ServiceCard` interface
  - Filter logic: show/hide cards based on selected filter (animated reveal)
  - Default: "All" selected, all cards visible

**Acceptance Criteria:**
- Filter buttons render above service grid
- Clicking filter updates displayed cards
- Cards animate in/out smoothly (opacity/scale)
- "All" filter shows all services
- Filter state persists on page (doesn't reset on scroll)
- Mobile-friendly (may use dropdown instead of horizontal tabs on small screens)

---

### Task 3.3: Implement Progressive Image Loading (Skeleton Screens & Blur-Up)
**Scope:** Improve perceived performance for portfolio and product images
**Files to modify/create:**
- `app/services/client.tsx` - Update image rendering:
  - Portfolio images: Add blur-up effect (low-res placeholder → high-res onload)
  - Product mockups: Add skeleton loaders while images load
  - Use `<Image />` from Next.js with `placeholder="blur"` and `blurDataURL`
  - Implement Intersection Observer for lazy loading of below-fold images

**Acceptance Criteria:**
- All images use Next.js `<Image />` component
- Placeholder blur-up effect visible on slow network (DevTools throttle)
- Skeleton loaders appear for product mockups during load
- Lazy loading works for images below the fold
- No layout shift when images load (reserved space)
- LCP improved (faster first paint with placeholders)

---

## Rollout Order (Dependency-Aware)

1. **Task 1.1** (shadcn/ui setup) - Prerequisite for all tasks
2. **Task 1.2** (Social proof) - No dependencies, high impact
3. **Task 1.3** (Service card hovers) - Low complexity, visual polish
4. **Task 1.4** (Contextual CTAs) - Enables quotation form pre-fill
5. **Task 2.1** (Portfolio expansion) - Visual content, no logic changes
6. **Task 2.2** (Process timeline) - New section, no dependencies
7. **Task 2.3** (Testimonials) - New section, standalone
8. **Task 3.1** (Multi-step form) - Depends on Task 1.4 (pre-fill logic)
9. **Task 3.2** (Service filtering) - Depends on Task 1.1 (shadcn), can run parallel to 2.x
10. **Task 3.3** (Progressive images) - Last, visual optimization, no breaking changes

## Design System Specifications

**Color Palette (CSS Variables):**
- Primary: `#2b73f0` (blue-500, glow effect on hover)
- Background: `#000000` (black, `bg-black`)
- Surface: `rgba(255, 255, 255, 0.05)` (glass cards, `bg-white/5`)
- Text: `#ffffff` (white, `text-white`), `rgba(255, 255, 255, 0.5)` (muted, `text-white/50`)
- Border: `rgba(255, 255, 255, 0.1)` (subtle, `border-white/10`)

**Typography:**
- Headings: `font-bold text-6xl` (h1), `text-4xl` (h2), `text-xl` (h3)
- Body: `text-base`, `text-sm` for metadata
- Letter spacing: `letter-spacing-1` (uppercase titles)

**Animations:**
- Reveal on scroll: 0.6s duration, 0.1s stagger
- Hover transitions: 200-300ms smooth
- Icon animations: 300-500ms pulse/rotation
- Page load: Staggered reveals (GSAP ScrollTrigger)

**Components:**
- shadcn Button, Card, Badge (Phase 1+)
- Dark mode: `dark` class on `<html>` (already in place)
- Glassmorphism: `bg-white/5 backdrop-blur-xl border-white/10`

## Success Metrics (Post-Deployment)

- Conversion rate to quotation form +20%
- Time on /services page +30% (more engagement)
- Portfolio CTA clicks +40% (expanded case studies + social proof)
- Form completion rate +15% (3-step flow vs. single-page)
- LCP improvement +25% (progressive image loading)
- Mobile usability score 95+ (shadcn responsive components)
