# Biszaal Tech — design system

This records the system that already exists in `src/App.css`. It is a
description, not a proposal: every value below was read out of the source. If
this file and the CSS disagree, the CSS is right and this file is stale.

---

## 1. Two worlds, one system

The site has two colour worlds built from the same variable names:

- **Light (default `:root`)** — "soft structuralism". Warm paper, deep warm ink,
  one deep-emerald accent, soft diffused tinted shadows. The company site.
- **Dark (`.world-dark`)** — "ethereal glass arcade". Near-black, hairline
  borders, one warm-amber accent. Biszaal Games.

`.world-dark` re-declares the same tokens with different values, so **any
subtree becomes dark by adding one class** and every child inverts with no code
path of its own. `GamesDoorway` uses this to put a dark island inside a light
page.

**There is no `prefers-color-scheme` anywhere on the site.** Dark is a place you
navigate to, not a setting. Do not add one.

---

## 2. The 25 tokens

All defined in `src/App.css`. No component CSS file defines a custom property.

```
Surfaces      --paper #faf9f6   --paper-raised #ffffff   --paper-sunken #f1efe9
Ink           --ink #191713     --ink-soft #4d4a43       --ink-faint #8a867c
Hairlines     --line rgba(25,23,19,.1)   --line-strong rgba(25,23,19,.18)
Accent        --accent #0e6b4a  --accent-deep #0a523a    --accent-ink #ffffff
              --accent-soft rgba(14,107,74,.08)  --accent-line rgba(14,107,74,.25)
Shadows       --shadow-soft  --shadow-lift  --shadow-ambient
Shape         --r-outer 28px  --r-inner 20px  --r-small 12px  --r-pill 999px
Type          --font-display 'Space Grotesk'   --font-mono 'Space Mono'
Rhythm        --container 1160px   --section-y clamp(5rem,12vw,9rem)
              --ease cubic-bezier(0.32, 0.72, 0, 1)
```

Dark world swaps surfaces to `#09090b / #121215 / #060607`, ink to
`#f4f2ec / #b8b4a9 / #7a766c`, and the accent to amber
`#e8a33d / #c9832a / #1a1105`.

**There is no spacing scale and no `--color-*` names.** Spacing is raw `rem` or
`clamp()`. The de-facto idiom:

- Section vertical: `padding: var(--section-y) 0`
- Container inline: `clamp(1.25rem, 4vw, 2.5rem)`
- Big grid gaps: `clamp(2.5rem, 6vw, 5rem)` · bento gap `1rem`
- "Gap before the next block": `clamp(3rem, 7vw, 5rem)`

Shadows are **tinted to the background hue and lit from a single source above** —
never plain black at low opacity.

---

## 3. Type

Space Grotesk (display and body) + Space Mono (labels, numerals, metadata),
loaded from Google Fonts in `public/index.html`. No self-hosted faces, no
`@font-face`.

- `h1`–`h4` are **always `font-weight: 600`, never 700**, `line-height: 1.05`,
  `text-wrap: balance`.
- Tracking ramps negative with size: `-0.035em` (h1) → `-0.03em` (h2) →
  `-0.02em` (h3) → `-0.015em` (h4). Body is `-0.011em`.
- `h1 clamp(2.6rem, 6.5vw, 4.6rem)` · `h2 clamp(1.9rem, 4vw, 2.9rem)` ·
  `h3 clamp(1.25rem, 2.2vw, 1.55rem)` · `h4 1.05rem`.
- Global `p { color: var(--ink-soft); max-width: 62ch; text-wrap: pretty; }` —
  a component that needs full width must say `max-width: none` (see
  `.footer-company p`).
- Numerals in mono contexts use `font-variant-numeric: tabular-nums`.

---

## 4. Primitives

Reuse these rather than writing new ones.

**`.container`** — `max-width: var(--container)`, auto margins, fluid inline
padding. Careful: its `margin: 0 auto` shorthand will zero a `margin-top` you
set on the same element (this bit `.footer-bottom`, now scoped as
`.site-footer .footer-bottom`).

**`.eyebrow`** — the mono pill label above every section heading. Uppercase,
`0.22em` tracking, hairline pill border, accent dot via `::before`.

**`.shell` / `.shell-core`** — the double bezel, and the single most
characteristic surface on the site. Outer tray (`--paper-sunken`, `--r-outer`,
**8px padding**) holding an inner core (`--paper-raised`, `--r-inner`, inset
white highlight).

> **Concentric rule:** `R_inner = R_outer − padding` (20 = 28 − 8). Any nested
> radius must satisfy it or the bezel looks wrong. The logo obeys the same rule.

**`.pill-btn` + `.btn-orb`** — asymmetric padding (`1.5rem` left, `0.6rem`
right) so the nested circular orb sits flush at the right edge. Markup is always:

```jsx
<a className="pill-btn pill-btn--accent">Label<span className="btn-orb" aria-hidden="true">↗</span></a>
```

Orb glyph vocabulary: **`↗` external link · `→` internal · `✉` mail.**

**`.text-link`** — secondary action. The underline is a real `border-bottom`
that turns accent on hover.

**`.mono-meta`** — the metadata voice. Mono, `0.72rem`, `0.14em` tracking,
uppercase, `--ink-faint`, tabular numerals.

**`.reveal` / `.reveal-delay-1..3`** — driven by `useReveal()`
(`src/hooks/useReveal.ts`), an IntersectionObserver at `threshold: 0.15` that
unobserves after firing once. It is attached to whole blocks, never to
individual grid children, so a grid reveals as one unit. In jsdom (no
IntersectionObserver) it marks content visible immediately, which is what keeps
the tests able to query it.

---

## 5. Section template

```jsx
<section id="x" className="<block>">
  <div className="container [<block>-grid]">
    <div className="<block>-head reveal" ref={headRef}>
      <span className="eyebrow">Label</span>
      <h2>Sentence-case headline with a full stop.</h2>
      <p className="<block>-lead">…</p>
    </div>
    … content …
  </div>
</section>
```

`padding: var(--section-y) 0`, with backgrounds alternating `--paper` and
`--paper-sunken`. **Sunken bands get `border-top` / `border-bottom: 1px solid
var(--line)`.** Home currently reads paper → paper → sunken → paper → sunken →
paper → sunken.

---

## 6. Class convention

Flat, lowercase, hyphenated, block-prefixed. Single dash for elements, double
dash for modifiers: `.bento-card--wide`, `.pill-btn--accent`,
`.project-row--flip`. Global state classes are unprefixed: `.reveal`,
`.is-visible`, `.is-open`, `.world-dark`.

---

## 7. Motion

Transform and opacity only — never `top`, `left`, `width` or `height`. Always
`var(--ease)`.

| Duration | Used for |
|---|---|
| 300ms | colour and link transitions |
| 500ms | buttons, nav |
| 600ms | card hover lift |
| 700ms | reveals, large transforms |

Hover lift is `translateY(-2px)` for buttons and `translateY(-4px)` for cards,
always swapping `--shadow-soft` → `--shadow-lift`. Press is
`translateY(0) scale(0.98)`.

**There are no `@keyframes` and no scroll listeners anywhere on the site.** Do
not add ambient loops, shimmer sweeps or parallax. The
`prefers-reduced-motion` block in `App.css` neutralises reveals, the nav overlay
and all transitions — anything new must survive it, which is why `ScrollToHash`
calls `scrollIntoView()` with no options rather than passing
`behavior: 'smooth'`.

---

## 8. The logo

The B as **one unbroken stroke**, drawn on a 48-unit grid the way you would draw
it by hand without lifting the pen: down the spine, up, around the upper bowl,
back across the waist, around the lower bowl, closed along the baseline. The
doubled waist segment is what a single stroke does, and the round joins make it
read as intentional.

It is a **free-standing letterform**. It has no tile, badge or container in any
layout the site controls — a container makes a company read as an app.

### Construction

```
Path    M14 38 V10 H24 A7 7 0 0 1 24 24 H14 H27 A7 7 0 0 1 27 38 Z
Stroke  5.5, round caps and joins
Bounds  x 11.25-36.75, y 7.25-40.75 — centred on (24, 24)
Waist   upper bowl reaches x 31, lower reaches x 34
```

That 3-unit difference between the bowls is the waist, and it is the whole
reason the mark reads as a B rather than as a rounded rectangle. Do not
equalise them.

### Colour

The stroke is `currentColor`, defaulted to `var(--accent)` by `.logo-mark`, so
the mark goes emerald on paper in the light world and amber on near-black in
the dark world with **no conditional code**. Navigating `/` -> `/games` and
watching the nav mark flip is the quickest check that the token plumbing is
intact.

### The `field` variant

`<Logo variant="field">` reverses the letter out of a full-bleed square. It
exists only for the places that force a square on you — favicon, app tile,
avatar — never in a layout we control. Following Apple's app-icon guidance it
differs from the bare mark in three deliberate ways:

1. **The letter is scaled to 80% and nudged 0.75 units right.** At full size it
   sat close enough to the corners that the system's rounded mask risked
   clipping it ("keep primary content centred to avoid truncation"), and a B is
   left-heavy, so geometric centring reads as off-centre.
2. **The ground is a top-to-bottom `--accent` -> `--accent-deep` gradient**, not
   a flat fill — those respond best to the system's own lighting effects. Both
   stops are existing tokens, so the icon still inverts to amber.
3. **No baked-in shadows, highlights, bevels or glows.** The system applies its
   own and custom ones fight them.

The gradient id comes from `useId()`, so the variant stays safe to render more
than once on a page.

### Contrast (measured)

| Pair | Ratio |
|---|---|
| paper on emerald `#0e6b4a` | 6.19:1 |
| paper on the gradient's darkest stop `#0a523a` | 8.74:1 |
| amber on near-black `#09090b` | 9.23:1 |

All pass WCAG AA for text, which is stricter than a logo needs.

### Rules

- **Clear space:** the height of the B's bowl, on all four sides.
- **Minimum size 14px.** The stroke closes up below that.
- **In a lockup the mark is decorative.** `<Logo>` renders
  `aria-hidden="true" focusable="false"` and **must never contain a `<title>`** —
  in the nav and footer it sits beside the words "Biszaal Tech", and a title
  would duplicate that text and break `SiteNav.test.tsx`'s `getByText` lookup.
  `Logo.test.tsx` guards this.
- Never put the bare mark back in a rounded tile, recolour it outside emerald /
  amber / ink / paper, stretch or rotate it, add a shadow or glow, or redraw the
  B in a typeface. The letterform is a drawn path, not set type.

### Assets

| File | Notes |
|---|---|
| `src/components/Logo.tsx` | the live mark, token-coloured |
| `public/favicon.svg` | `field` geometry, colours hardcoded (renders outside the page) |
| `public/apple-touch-icon.png` | 180 square, **full-bleed and unrounded** — iOS applies its own mask and rejects transparency |
| `public/og-image.png` | 1200x630, rendered in a browser so the Space Grotesk wordmark is real |
| `~/Desktop/biszaaltech logo/` | 11 vector variants, 110 PNGs, lockups, usage README |

> **Known gap:** `public/favicon.ico` still carries an older mark. Nothing in
> this toolchain writes `.ico`. Regenerate it from `icon-emerald.svg` with
> realfavicongenerator.net or ImageMagick. `favicon.svg` is declared first, so
> only legacy browsers see the stale one.

## 9. Voice

- **Sentence case only.** Never Title Case, in headings or anywhere else.
- Headlines end in a full stop: *"Start a project." "Press start." "Built and
  shipped." "Here's how it goes."*
- UK spelling. Em-dashes and contractions are fine. No exclamation marks, no
  "Oops", no superlatives.
- Numbers are real or absent.

---

## 10. Banned

**Visual** — floating dots · button shimmer sweeps · gradient text · everything
centred (the light world is left-aligned; `/games` centring its hero is a
deliberate arcade exception) · two accents at once · `height: 100vh` (use
`min-height: 100dvh`) · accordion FAQs · pure black or pure white as a ground ·
neon or outer-glow shadows.

**Content integrity** — no invented metrics, no testimonials, no client logos,
no case-study numbers, no fake forms, no promises about price or timeline that
nobody has agreed to. Fabricated testimonials, an invented competitor comparison
and a fake contact form were all **removed from this site once already**; see
the "content integrity" section of
`docs/superpowers/specs/2026-07-12-site-redesign-and-playable-games-design.md`.
The contact section is a mailto and a WhatsApp link precisely because a form
that silently drops a lead is worse than no form.

Marketing copy is also constrained by the shipped legal pages. Two live
examples: `ExpenzezPrivacy.tsx` documents an Expenzez Pro subscription and
AdMob ads, so Expenzez may **not** be described as "free"; the same page states
it does not connect to your bank, so Open Banking must not be mentioned.
