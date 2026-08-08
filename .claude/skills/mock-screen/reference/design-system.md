# HolidAI design-system reference — for /mock-screen

> **SOURCE OF TRUTH: the `.fig` export (the FUTURE UI).**
> The HolidAI codebase is the LEGACY UI — never consult it for mockup visuals, and never use
> this file to implement app code while `phase: figma-only`. `wiki/docs/` documents the code
> that exists; this file documents the design that is coming.

```yaml
phase: figma-only          # figma-only | storybook-aligned
fig_exported_at: 2026-08-07T12:00:31.713Z
fig_file: holidai basic flows.fig
```

**Refresh rule:** if the attached fig's `exported_at` is newer than the stamp, re-extract the DS
canvas (`HolidAI Cartman System` — cards titled `HolidAI <Component>`), update this file, and
report the diff. Where this file and the fig disagree on a token value, **the fig wins after a
refresh; this file wins mid-run** (it is the curated extraction).

---

## Tokens

### Colour ramps — `purple-500 #5906DF` is the accent. No fifth hue.

|            | 300       | 500 (base)    | 700       | 900       |
| ---------- | --------- | ------------- | --------- | --------- |
| **purple** | `#935DEA` | **`#5906DF`** | `#4505AE` | `#31037B` |
| **lime**   | `#E8FEB1` | `#DBFE87`     | `#ABC669` | `#788C4A` |
| **red**    | `#FF6890` | `#FF1654`     | `#C71142` | `#8C0C2E` |
| **cyan**   | `#5AFEF9` | `#01FDF6`     | `#01C5C0` | `#018B87` |

lime = success/positive · red = danger · cyan = informational.

### Neutrals

White `#FFFFFF` · Grey 50 `#F9F9F9` · Grey 100 `#F5F5F5` · Grey 500 `#8E8E8F` · Black `#000000`
— plus `#220059` (deep violet, used behind globes/space), `#E5B3D1` (disabled pink), `#E9E9E9`,
`#C7C1B5` (sand — unchecked borders, muted chevrons).

### Warm surfaces — sanctioned even though "not in the design system" (fig's own words)

Page `#FAF8F4` · tinted card `#F7F4EF` · structural hairline `#EEE9E0`.
**Controls follow the surface temperature**: segmented track = `#F5F5F5` on white, `#EEE9E0` on
`#FAF8F4` (there, `#F5F5F5` "clashes and vanishes"). Any `#F9F9F9`/`#F5F5F5` card on a warm page
needs a border to read as a surface.

### Spacing (only these steps)

`0 · 1 · 1.5 · 2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 28 · 32 · 40 · 48 · 80 · 120 · 160`

### Radii

`4 · 6 · 7 · 8 · 26 · 28 · 30` + `pill` (28, fully rounded). Device screen corner = **55** (frame
geometry, deliberately outside the scale).

### Opacity

`10 · 20 · 28 · 40 · 55 · 60 · 80 · 90 · 100`

### Typography

**Inter only** — Regular / Medium / SemiBold / Bold / ExtraBold. ExtraBold = display moments;
Medium/SemiBold carry UI text.

### Documented rules (fig annotations — obey)

- Border = 1px solid, **one step darker in the same ramp** (300 fill → 500 border).
- Buttons fill 100% of their container; button text **uppercase 16** by default; icon optional.
- Progress bars: fill = the ramp's `-500`; track/not-yet-completed = shared `#F5F5F5`;
  `primaryBlack` variant is all-black.
- Chips: radius 6 + 1px border at every size (see blur variant exception below).
- **Blur intensity 30 = `blur(12px)`** (expo-blur 0–100 scale, not px). Every glass surface uses
  exactly this — tab bar, glass buttons, blur chips/tags, sheets. Glass recipe:
  `rgba(0,0,0,.25)` fill + `backdrop-filter: blur(12px)`; chip/tag add a 1px
  `rgba(255,255,255,.5)` hairline, icon buttons don't.

---

## Component inventory + parity

Parity: **fig** = specced in Figma · **code** = exists in the legacy app (old palette/spec ≠
aligned) · **sb** = Storybook story. Update on refresh and at phase flip.

| Component | Spec (from the fig) | fig | code | sb |
| --- | --- | :-: | :-: | :-: |
| Flat pill button | h 30/40/50, solid ramp fill, uppercase 16 Bold | ✓ | legacy | ✗ |
| Glass/blur pill button | same sizes, glass recipe, no border | ✓ | ✗ | ✗ |
| Circular icon button | 3 sizes 30/40/50, diameter = w = h; blur variant has no stroke | ✓ | legacy | ✗ |
| Raised "Cartman" 3D button | 4 sizes; face + bevel (one step darker: `#5906DF`→`#4505AE`, `#DBFE87`→`#ABC669`, `#FF1654`→`#C71142`, `#01FDF6`→`#01C5C0`, neutral→`#F5F5F5`); an ordinary button, no special-occasion status | ✓ | legacy (`Custom3DButton`) | ✗ |
| Chips (`Cheap`) | radius 6, 1px border, 3 sizes; **Cheap-Blur: h32 radius 24** glass + white hairline | ✓ | legacy | ✗ |
| Tags | h 24/32/40; Tag-Blur: h32 **radius 6** glass + white hairline | ✓ | ✗ | ✗ |
| Progress bars | linear + stepped; per size only height/radius change | ✓ | ✗ | ✗ |
| Spinner | circular 270° arc; diameter + stroke scale together | ✓ | ✗ | ✗ |
| **Segmented control** | track h48 `radius/28` pad 4 (fill per surface temperature); thumb h40 `radius/28` white, soft shadow, **w = (track−8)/N**, own layer, slides; labels **Inter Bold 14 title case** (≠ button default), selected `#000`, unselected `#8E8E8F`; each segment IS a DS button; equal width, never content-hugging; N = 2 or 3 max; sizes Small 38 (thumb 30, label 12) / **Medium 48 default** — no Large (width-locked); disabled = 40% opacity on the whole control; never disable a single segment — drop it and reduce N; segments never shrink on press — the thumb travelling is the feedback; spring ~250–300ms slight overshoot, label colour-crossfade, reduced-motion = instant | ✓ | ✗ | ✗ |
| **Weather badge** | 6 conditions, square, 24/32/48, two-tone from the ramps. Tone roles: **family** paints "the cloud body, the sun's rays"; **detail** paints "drops, flake, the sun's core"; severe = Red 500. Sunny = Lime · Partly cloudy = Lime+Neutral (`#ABC669 #DBFE87 #8E8E8F`) · Cloudy = Neutral · Rain/Snow = Cyan (`#01C5C0 #01FDF6`) · Storm = Neutral+Red. Glyphs = **real Ionicons geometry** (`partly-sunny` etc. — fetch path data from unpkg ionicons), recoloured per role — never hand-drawn approximations. `Mostly sunny` → Partly cloudy | ✓ | ✗ | ✗ |
| **Checkbox** | circular; states **Checked / Unchecked / Empty** (Empty = hairline `#EEE9E0` circle — use for the not-yet-created row in add flows; Unchecked = `#C7C1B5` border); check auto-contrasts: white on purple/red/black, black on lime/cyan; Static variant = always-checked non-interactive; Blur variant for photography. Every checkable row uses THIS — no ad-hoc ticks | ✓ | ✗ | ✗ |
| Bottom tab bar | **iOS Liquid Glass only** (never the Android variant): capsule, glass recipe, specular top highlight (`inset 0 1px 0 rgba(255,255,255,.7)`), structure `bar → tab → tabicon + tablabel`; tabs **Home · Trips · Activities · Profile**; active black, inactive Grey 500 | ✓ | legacy (2 tabs) | ✗ |

Shadows in use: soft `0 6px 16px rgba(40,30,40,.05)` · raised `0 12px 26px rgba(40,25,45,.14)`.

---

## House style (the converged direction — default for every screen)

Decided 2026-08-07/08 after a 3-direction exploration; the "Dashboard" thesis won, then was
iterated. Apply unless `explore N` is requested. When the user overrules any of these in a
future session, **updating this list is part of that run**.

- **Page** `#FAF8F4`, dark status bar, greeting-style header (`Hi, Tim` 28 ExtraBold + muted
  date), information-led density — the important content lands in the first viewport.
- **Hero** = inset rounded card (radius 26, margin 16), not full-bleed. Live map/globe surfaces
  are **photo placeholders** (never WebGL/canvas/CSS-3D/SVG-map): oblique aerial photo for a 3D
  city map, Earth-from-space on near-black for the globe (flat `purple-500/300` route arcs +
  city dots allowed — Flighty-style). Caption below the frame: `placeholder · Mapbox …`.
  Trip city hero ~270 tall; discovery globe taller (~440), headline inside the image.
- **Status markers on imagery** = blur **chips** (Cheap-Blur: h32, radius 24, glass + white
  hairline) with a coloured dot — purple `Before trip`, lime `Ongoing`. Top-left of the hero.
  (Tags radius 6 were tried and rejected there.)
- **Tiles**: white cards radius 26, 1px `#EEE9E0` border, soft shadow, 2-col grid, gap 12,
  margin 16. Tile kickers: 10px Bold uppercase, letter-spacing .12em, **`purple-700`** (grey was
  rejected; black and `#220059` are the fallback candidates).
- **Primary CTA** = **Cartman raised button** (purple face `#5906DF`, bevel `#4505AE`).
- **Sheets/modals** are presented as **standalone frames** (radius 28, raised shadow, grabber
  44×5 `#E9E9E9`) — not composited over a dimmed page. Completed checklist items: label Grey 500
  + **line-through**. Add-flows show the Empty checkbox + caret + hairline field + Medium-40
  flat button.
- **No fold lines / viewport markers** on frames (tried, removed).
- **Empty/discovery states** stay minimal: hero + segmented + CTA (trending grids and category
  chips were removed from Home's discovery state — don't reintroduce without being asked).
- **Icons**: Ionicons, any glyph (the app's `icons.ts` is a subset, not a whitelist), rendered
  as inline SVG, **one cut (outline) per mock**, stroke ~1.7 round caps. No emoji.
- **Copy verbatim from the fig** — never lorem ipsum, never paraphrase. Invented values (e.g. a
  wind speed) are allowed where the fig demands a figure but gives none — disclose them.

## Frame & canvas rules

- Frame = **393px wide**, height = full content (no internal scrolling, nothing clipped
  vertically), **corner radius 55** masking content, box-shadow to lift off the canvas.
- States = columns; each modal = its own standalone frame after the states.
- Figma-style **label above** each frame (`<Screen> / <State>`, 11px Grey 500) and a muted
  **caption below** (placeholder notes, modal context).
- Canvas: plain CSS grid `repeat(<frames>, 393px)`, gap ~36px, background `#F5F5F5`, small page
  header. **Native browser zoom only** — no pan/zoom code, no canvas chrome.
- One self-contained file: all CSS/JS inline. Google-Fonts Inter link + Unsplash photo URLs are
  the only external requests, and **no text may depend on an image loading** — every photo sits
  on a `purple-900` (city/cards) or `#220059` (space) base with a token-driven gradient scrim.
- JS only for deterministic stamping (icon map, tab bar, repeated lists, sheet template) — no
  interactivity needed.

## Verify mechanics (what worked)

- Headless Chrome full-canvas shot: size `--window-size` to the whole canvas, `--hide-scrollbars`.
- Crop with PIL to inspect regions (`im.crop(...)`) — full-res screenshots hide defects; crops
  found a real grid-collision bug. Verify every user-requested change visually before reporting.
- Playwright MCP may fail against the user's running Chrome profile — the CLI path is the
  reliable fallback.
