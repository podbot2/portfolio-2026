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

### Smooth Scroll
- **Library:** Lenis v1.0.42
- **Duration:** 1.2s
- **Easing:** easeOutExpo — `1.001 - Math.pow(2, -10 * t)`
- **Wheel multiplier:** 0.8

### Anchor Scroll (e.g. scroll indicator click)
- **Duration:** 2s
- **Easing:** cubic ease-in-out — `t < 0.5 ? 4*t³ : 1 - (-2t+2)³/2`
- **Offset:** -80px (breathing room from viewport top)

### Scroll-Triggered Reveals
- **Char stagger** (headings): `yPercent: 110`, duration 0.75s, stagger 0.018, `power3.out`
- **Footer heading**: `yPercent: 40`, opacity 0→1, duration 0.9s, `power3.out`
- **Word scrub** (text blocks): opacity 0.2→1, scrub-linked to scroll position
- **Card border trace**: SVG stroke-dashoffset, 0.9s `cubic-bezier(0.65, 0, 0.35, 1)`
- **Card gradient reveal**: opacity transition 0.6s `cubic-bezier(0.33, 0, 0.2, 1)`

### Page Load
- **Loader:** 3-dot bounce, fades out over 0.6s on `window.load`
- **Hero content:** Webflow entrance (translate-y 1rem → 0, opacity 0→1)
- **Scroll indicator:** fade-in at 1.8s delay (after hero entrance settles)
- **Spline koi fish:** opacity 0→1 once scene loads

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
