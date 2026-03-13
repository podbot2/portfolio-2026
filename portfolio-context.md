# Portfolio 2025 — Project Context
> Reference doc for Claude Code. Covers design system, content, structure, and component behavior.

---

## 1. Overview

A personal portfolio site (`portfolio-2025.html`) for a Product Designer II at Cox Automotive / vAuto. Single-page, scroll-driven, no frameworks — vanilla HTML, CSS, and JS only.

**Fonts:** Cormorant Garamond (display) + DM Mono (mono/body) — loaded via Google Fonts  
**Base unit:** 4px  
**Design file:** `portfolio-design-system.css`, `portfolio-variables.json`, `portfoliodesignsystem.pdf`

---

## 2. Color tokens

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#f5f2ee` | Page background — warm off-white |
| `--surface` | `#faf8f5` | Cards, ticker, elevated surfaces |
| `--ink` | `#1c1a2e` | Primary text, headings |
| `--ink-mid` | `#4a4760` | Body copy, secondary text |
| `--ink-dim` | `#9e9ab0` | Labels, metadata, placeholders |
| `--line` | `rgba(28,26,46,.08)` | Borders, dividers |
| `--pink` | `#e88fa0` | Accent — Human-centered design, Spec |
| `--pink-t` | `rgba(232,143,160,.14)` | Pink tint backgrounds |
| `--mint` | `#6ecfb8` | Accent — Systems thinking, Content strategy |
| `--mint-t` | `rgba(110,207,184,.14)` | Mint tint backgrounds |
| `--lav` | `#a89dcc` | Accent — User research |
| `--lav-t` | `rgba(168,157,204,.14)` | Lavender tint backgrounds |
| `--navy` | `#2b2850` | Deep navy — dark surfaces only |
| `--accent` | (dynamic) | Active accent; defaults to `--pink`; shifts per discipline stop |
| `--accent-t` | (dynamic) | Active accent tint |
| `--accent-rgb` | (dynamic) | Raw RGB for `rgba()` usage |

**Subtle variants (tag backgrounds):**
- pink subtle: `#f9edf0`
- mint subtle: `#e8f8f5`

---

## 3. Typography tokens

| Token | Size | Family | Weight | Tracking | Leading | Usage |
|---|---|---|---|---|---|---|
| `display-xl` | 52px | Cormorant Garamond | 300 | -0.025em | 0.95 | h1 — "Craft. Clarity. Care." |
| `display-lg` | 40px | Cormorant Garamond | 300 | -0.025em | 1.0 | Section titles |
| `display-md` | 28px | Cormorant Garamond | 300 | — | 1.15 | Stat numbers |
| `display-sm` | 21px | Cormorant Garamond | 300 | — | 1.15 | Callout title (italic) |
| `body` | 15px | DM Mono | 300 | 0.06em | 1.65 | Card body copy |
| `label` | 10px | DM Mono | 400 | 0.20em | — | Nav, section labels (uppercase) |
| `micro` | 9px | DM Mono | 400 | 0.22em | — | Tags, ticker, metadata |
| `nano` | 8px | DM Mono | 400 | 0.25em | — | Scroll cue, nano labels |

---

## 4. Spacing tokens

| Token | Value | Semantic use |
|---|---|---|
| `space/1` | 4px | — |
| `space/2` | 8px | — |
| `space/3` | 12px | — |
| `space/4` | 16px | — |
| `space/5` | 20px | — |
| `space/6` | 24px | — |
| `space/7` | 28px | card-padding |
| `space/8` | 32px | — |
| `space/10` | 40px | — |
| `space/12` | 48px | section padding top (min) |
| `space/14` | 56px | stats gap |
| `space/16` | 64px | section padding bottom (min) |
| `space/20` | 80px | section-gap between major sections |
| `space/24` | 96px | section padding bottom (max) |
| `page-margin-sm` | 24px | Mobile page edge |
| `page-margin-lg` | 60px | Desktop page edge |
| `section-gap` | 80px | Between major sections |
| `card-padding` | 28px | Project card internal padding |
| `tag-padding-x` | 12px | Discipline / filter tag |
| `tag-padding-y` | 6px | Discipline / filter tag |
| `pill-padding-x` | 10px | Availability pill |
| `pill-padding-y` | 4px | Availability pill |

---

## 5. Border tokens

**Radius:**
| Token | Value | Usage |
|---|---|---|
| none | 0 | Tags, nav items — hard edge |
| sm | 2px | Spec bars, shimmer blocks |
| md | 4px | UI elements inside frames |
| lg | 8px | Cards (via overflow) |
| full | 9999px | Dots, pills, cursor ring |

**Line weights:**
| Token | Value | Usage |
|---|---|---|
| hairline | 0.6px | Inactive frame borders |
| thin | 0.8px | Empathy map connecting lines |
| default | 1px | Dividers, card borders, tag borders |
| emphasis | 1.5px | Active / hero frame border |

**Border colors:**
- default: `rgba(28,26,46,.08)` → `--line`
- accent: `rgba(accent-rgb,.30)` → pill, active tag, hover card

---

## 6. Page structure

```
<body>
  #cursor
  #cursor-ring
  #ambient           ← radial gradient, updates with accent color
  .hero              ← full-viewport hero, scroll-driven stops
  .work-scroll       ← horizontal project scroll section
```

### Hero section layout (grid rows)
1. `.nav` — name + availability pill (left), role + company (right)
2. `.hero-tag` — discipline label, updates per stop
3. `.hero-title` — large display text, updates per stop
4. `.hero-frames` — canvas-based Figma frame illustrations (3 floating frames per stop)
5. `.hero-body` — body paragraph, updates per stop
6. `.hero-scroll-cue` — "scroll" + arrow

---

## 7. Hero scroll stops (STOPS array)

There are 5 stops. Each stop shifts the accent color and updates all hero content.

| Index | Tag | Title | Accent | Accent RGB |
|---|---|---|---|---|
| 0 | Human-centered design | "Start with the person" | `#e88fa0` | 232,143,160 |
| 1 | Systems thinking | "One decision, thousand screens" | `#6ecfb8` | 110,207,184 |
| 2 | User research | "Listen first, then design" | `#a89dcc` | 168,157,204 |
| 3 | Spec-driven development · Handoff | (spec stop) | `#e88fa0` | 232,143,160 |
| 4 | Content strategy · UX writing | (content stop) | `#6ecfb8` | 110,207,184 |

Each stop object includes: `rotX`, `rotY`, `hero` (frame index), `accent`, `rgb`, `g` (group key), `tag`, `title`, `body`.

Stop body copy:
- Stop 0: "Observation before assumption. Every decision traces back to a real user need — watched, tested, and iterated until the design gets out of the way."
- Stop 1: "Tokens, components, and patterns that scale without losing craft. The best design system is the one teams actually reach for."
- Stop 2: "Contextual interviews, affinity mapping, journey diagrams. Turning ambiguous signals into direction the whole team can act on."

---

## 8. Project cards (`.work-scroll`)

5 horizontally-scrolling project cards. Each has: index, discipline, title (with `<em>`), description, year, team, and a canvas-drawn Figma frame illustration on the right.

| # | Discipline | Title | Description | Year | Team |
|---|---|---|---|---|---|
| 01 | Human-centered design · Appraisal UX | Appraisal *workflow* redesign | Reduced task time by 34% through progressive disclosure and smarter defaults. | 2024 | vAuto · Appraisal |
| 02 | Systems thinking · Interstate DS | Component *library* contribution | Designed and documented 14 new components for the Interstate Design System, including data table variants, inline feedback patterns, and empty state templates. | 2023 | Interstate DS |
| 03 | User research · Discovery | Dealer *persona* framework | Led 22 contextual interviews across 8 dealership archetypes. Synthesized findings into a persona and journey map framework now used across 4 product teams. | 2023 | vAuto · Research |
| 04 | Spec-driven development · Handoff | Zero-ambiguity *spec* practice | Built a spec templating system that cut engineering clarification cycles by 60%. Adopted as standard practice across the vAuto UX team. | 2024 | vAuto · Handoff |
| 05 | Content strategy · UX writing | Error state *language* system | Audited and rewrote 200+ error messages across vAuto's product suite using grade-5 readability standards. Introduced a reusable error copy framework. | 2022 | vAuto · Content |

Card accent colors:
- 01: `#c4688c` / `rgb 196,104,140`
- 02: `#3d9e8a` / `rgb 61,158,138`
- 03: `#7060a8` / `rgb 112,96,168`
- 04: `#b07840` / `rgb 176,120,64`
- 05: `#4a6080` / `rgb 74,96,128`

---

## 9. Canvas / frame illustration system

Each project card and hero stop renders animated Figma-style frames on a `<canvas>` element via JS. Key behaviors:

- 3 floating frames per canvas, each with a titlebar (dots + label), body shimmer lines, and a color-matched border
- Hero frame: `border 1.5px`, `shadowBlur 40`, higher opacity
- Hovered frame: `border 1px`, `shadowBlur 20`, mid opacity
- Inactive frames: `border 0.6px`, `shadowBlur 8`, low opacity
- Frames float with subtle `sin`/`cos` animation using time offsets
- Active/hero frame renders the stop's body text centered in the card interior at `fontSize ~9px`, DM Mono

---

## 10. JavaScript systems

### Cursor
- `#cursor` (8px dot) follows mouse exactly via `transform: translate`
- `#cursor-ring` (36px ring) follows with 0.1 lerp smoothing

### Accent color transitions
- `--accent`, `--accent-t`, `--accent-rgb` on `:root` update on each stop change
- `#ambient` background radial gradient re-renders with new accent RGB
- `#cursor`, `.avail-dot`, hero tag, hero title `<em>` all respond to `--accent`
- Transition: `1s ease` on most elements, `0.5s` on cursor

### Hero scroll stops
- `IntersectionObserver` or scroll position drives stop index
- Stop index updates: tag text, title text, body text, active frame canvas, accent vars

### Project card progress bar
- `.proj-progress-fill` width driven by scroll position within each card
- Transitions smoothly as card enters/exits viewport

---

## 11. Animation

- Hero entrance: `.nav`, `.hero-tag`, `.hero-title`, `.hero-frames`, `.hero-body`, `.hero-scroll-cue` all animate in with staggered `slideDown` / `fadeUp` keyframes (delays: 0.4s → 1.4s)
- Frames float continuously via `requestAnimationFrame` loop
- Accent color shifts use CSS transitions (`1s ease`)

---

## 12. Accessibility notes

- Custom cursor active — default system cursor hidden (`cursor: none` on body)
- All interactive elements should maintain focus styles using accent color
- Contrast: `--ink` on `--bg` passes WCAG AA; `--ink-dim` on `--bg` may need audit at small sizes

---

## 13. File inventory

| File | Purpose |
|---|---|
| `portfolio-2025.html` | Single-file site — all HTML, CSS, JS inline |
| `portfolio-design-system.css` | CSS custom properties reference with usage comments |
| `portfolio-variables.json` | Figma-style variable export (Color, Typography, Spacing collections) |
| `portfoliodesignsystem.pdf` | Visual design system reference sheet |
