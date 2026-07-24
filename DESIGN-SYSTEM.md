# Design System

Living reference for spacing, color, typography, and animation conventions used across jennifer-flores.com.

---

## Colors

| Token | Value | Usage |
|-------|-------|-------|
| Accent | `#6a6ff7` | Chatbot, transition gradient, interactive highlights |
| Background | `#06111e` | Page background, loader |
| Text primary | `rgba(255,255,255,1)` | Headings |
| Text secondary | `rgba(255,255,255,0.58)` | Subtitles, hero sub-line |
| Text tertiary | `rgba(255,255,255,0.35)` | Muted text, secondary info |
| Text quaternary | `rgba(255,255,255,0.4)` | Scroll indicator, micro-labels |
| Border / glow | `rgba(255,255,255,0.25)` | Card border trace on hover |

## Typography

| Element | Font | Size | Weight | Notes |
|---------|------|------|--------|-------|
| Hero heading | Montserrat | `clamp(4rem, 10vw, 8rem)` | 700 | Uppercase via CSS |
| Hero subtitle | monospace | `clamp(0.9375rem, 2.3vw, 1.375rem)` | 400 | Letter-spacing 0.05em |
| Hero secondary line | monospace | `clamp(0.75rem, 1.6vw, 1rem)` | 400 | Letter-spacing 0.05em |
| Section headings | Montserrat | — | 700 | "Selected UX Work", project titles |
| Body / UI text | Inter | — | 400–500 | Descriptions, footer |
| Micro labels | monospace | 12–14px | 400 | Scroll indicator, tool tags |

## Spacing

| Token | Desktop | Tablet (≤991px) | Mobile (≤479px) |
|-------|---------|-----------------|-----------------|
| Content padding (horizontal) | 90px | 40px | 20px |
| Section margin (vertical) | 80px | 80px | 60px |
| Scroll-to offset | -80px | -80px | -80px |

These values are aligned to the navbar margins so content, nav, and sections share consistent edges.

## Animation

### Principles

1. **Content is always visible** — animations enhance, never gate. No `opacity: 0` start states on scroll-triggered sections.
2. **Scrub for scroll-linked effects** (`scrub: 0.3`) so animation speed matches scroll speed.
3. **No pinning for content sections** — pins create hard stops that fight with Lenis smooth scroll.
4. **`toggleActions: "play none none reverse"`** for time-based entrances — plays on enter, stays visible when scrolling past, reverses only when scrolling back above trigger.

### Patterns

Each pattern is reusable. "Used in" tracks where the implementation code lives for reference.

#### Smooth Scroll
- **Specs:** Lenis v1.0.42, duration 1.2s, easeOutExpo, wheelMultiplier 0.8
- **Used in:** `index.html`, `about.html`

#### Anchor Scroll
- **Specs:** 2s duration, cubic ease-in-out, -80px offset
- **Used in:** `index.html` (scroll indicator)

#### Page Load Entrance
- **Specs:** `translateY(1rem) → 0`, `opacity: 0 → 1`, duration 0.9s, `power3.out`, 0.3s delay
- **Used in:** `index.html` (hero), `about.html` (hero section)

#### Image Wipe Reveal
- **Specs:** solid color overlay, `scaleX: 1 → 0`, scrubbed (`scrub: 0.3`), trigger range `top 85%` to `top 30%`
- **Used in:** `about.html` (section 1 on page load, section 2 on scroll)

#### Text Fade-Slide
- **Specs:** `opacity: 0.3 → 1`, `y: 15 → 0`, scrubbed (`scrub: 0.3`), trigger range `top 80%` to `top 40%`
- **Used in:** `about.html` (section 2 body text)

#### Char Stagger Reveal
- **Specs:** `yPercent: 110`, duration 0.75s, stagger 0.018, `power3.out`
- **Used in:** `index.html` ("Selected UX Work" heading)

#### Word Scrub
- **Specs:** `opacity: 0.2 → 1`, scrub-linked to scroll position
- **Used in:** `index.html`, case study pages (body text blocks)

#### Card Border Trace
- **Specs:** SVG `stroke-dashoffset` animation, 0.9s, `cubic-bezier(0.65, 0, 0.35, 1)`
- **Used in:** `index.html` (project cards on hover)

#### Card Gradient Reveal
- **Specs:** opacity 0.6s, `cubic-bezier(0.33, 0, 0.2, 1)`
- **Used in:** `index.html` (project cards on hover)

#### Staggered Card Entrance
- **Specs:** `opacity: 0 → 1`, `y: 40 → 0`, duration 0.8s, `power3.out`, stagger 0.15, `toggleActions: "play none none reverse"`
- **Used in:** `about.html` (reference cards)

#### Accent Line Draw
- **Specs:** `width: 0 → 60px`, accent gradient `#6a6ff7`, duration 0.6s, `power2.out`
- **Used in:** `about.html` (reference cards)

#### Footer Heading Reveal
- **Specs:** `yPercent: 40`, `opacity: 0 → 1`, duration 0.9s, `power3.out`
- **Used in:** `index.html`, `about.html` (footer)

#### Page Loader
- **Specs:** 3-dot bounce, fades out over 0.6s on `window.load`
- **Used in:** all pages

#### Cursor-Following Tooltip

Tooltip that tracks the mouse position across an image. Custom dot cursor replaces the default pointer.

- **Structure:** `.img-tooltip-wrap` wraps the image + `<span class="img-tooltip">`. On DOMContentLoaded, JS moves all `.img-tooltip` spans to `document.body` (required to escape CSS `transform` containment on parent sections). A shared `.img-cursor-dot` div is appended to body.
- **Listeners bind to `<img>` elements** (not wrappers) so hover only activates on the visible image, not surrounding whitespace.
- **Tooltip:** `position: fixed`, `max-width: 240px`, white surface (`rgba(255,255,255,0.94)`), dark text, `border-radius: 12px`, `box-shadow: 0 4px 20px rgba(0,0,0,0.3)`, `::after` tail. Clamped to 3 lines (`-webkit-line-clamp: 3`). Opacity fade 0.25s.
- **Cursor dot:** 12px white circle, `box-shadow: 0 0 8px rgba(255,255,255,0.3)`, `z-index: 101`. Opacity fade 0.2s.
- **Positioning:** tooltip sits 20px above cursor. If that would go off-screen (< 8px from top), flips 20px below cursor.
- **Key gotcha:** tooltips inside elements with CSS `transform` (e.g. GSAP-animated sections) must be moved to `document.body` — `position: fixed` inside a transformed parent is relative to that parent, not the viewport.
- **Used in:** `about.html` (all 5 images)

### Hover States
- **Project cards:** gradient overlay + SVG border trace
- **Links/buttons:** translateY(-1px), color brightens, optional text-shadow glow
- **Scroll indicator:** text + arrow brighten from 0.4→0.7 opacity

## Scrollbar

Hidden across all pages for a clean, app-like feel:

```css
html { scrollbar-width: none; }        /* Firefox */
::-webkit-scrollbar { display: none; }  /* Chrome, Safari, Edge */
```

## Breakpoints

| Name | Max-width | Notes |
|------|-----------|-------|
| Desktop | — | Default styles |
| Tablet | 991px | Reduced padding |
| Mobile landscape | 767px | — |
| Mobile portrait | 479px | Smallest breakpoint, chatbot auto-open disabled |

## Components

### Glass Nav Pill (`glass-nav.js`)
- Floating pill, top-right, glassmorphism backdrop
- Contains Home / About links
- Shared across all pages

### Chatbot (`chatbot.js`)
- Purple orb FAB (accent color)
- Auto-opens on homepage first visit (desktop/tablet only)
- Respects `sessionStorage` minimize state
- Hybrid: keyword matching → Claude Haiku fallback via Cloudflare Worker

### Scroll Indicator (homepage only)
- Centered at bottom of hero viewport
- Monospace uppercase label + bouncing SVG arrow
- Clicks use Lenis `scrollTo` with -80px offset
- Fades in after 1.8s

### Water Surface (`water-surface.js`)
- Canvas-based ripple/caustic effect
- Homepage background layer (z-index below content)
