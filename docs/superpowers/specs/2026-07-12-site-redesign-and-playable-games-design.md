# Site redesign + playable games — Design

> Session note: this design was produced in an autonomous session. The user's
> directive was explicit ("make a proper /games page, implement Ludo and
> Helicopter, redesign the whole website, home = financial app, /games =
> games"), so open questions were resolved by the implementing agent and the
> reasoning is recorded inline rather than via interactive Q&A.

## Purpose

Split biszaaltech.com into two clearly separated worlds under one company:

1. **`/` — the financial side.** A redesigned, premium landing page for
   BISZAAL TECH LTD whose job is to route visitors to the Expenzez app
   (expenzez.com + App Store).
2. **`/games` — Biszaal Games.** A proper games landing page with its own
   arcade identity, plus **playable browser versions** of the two games,
   Helicopter and Ludo, at `/games/helicopter` and `/games/ludo`.

"Implement our games" is interpreted as *playable web implementations*, not
more marketing cards: the existing `/games` page already had placeholder
cards marked "Coming Soon", the privacy policies are already live, and the
user explicitly separated "make a proper page" from "implement our games".
The mobile apps remain separate products; each game page notes the mobile
version is coming to the App Store.

## Current problems being fixed

Design (audit against redesign-existing-projects):

- System font / Inter-alike everywhere; no typographic identity.
- AI-template fingerprints: floating dots, button shimmer sweeps, gradient
  text, everything centered, gold + silver dual accents.
- No header navigation at all — footer is the only way between pages.
- `height: 100vh` hero; generic cards (border+shadow+white); accordion FAQ;
  3-up testimonial grid; no 404 page; no skip link.

Content integrity (must not survive the redesign):

- **Fabricated testimonials** ("Sarah Mitchell", 4×5 stars, "join thousands
  of satisfied users") for an MVP app. Removed, not restyled.
- **Comparison table against invented "Competitor A/B"**. Removed.
- **Fake contact form** — it `console.log`s the message, shows "sent
  successfully", and nobody receives anything. Replaced with an honest
  `mailto:hello@biszaaltech.com` contact section.

Kept content: real company facts (founded 2025, London, company no.
16693100), Expenzez feature set (manual entry, CSV import/export, analytics,
categories, free, iOS live / Android coming), FAQ answers, all legal pages.

## Architecture: two worlds, one system

Shared typographic + structural DNA, two color worlds:

- **Main site (light)** — "soft structuralism": warm paper background
  (`#FAF9F6` family), deep warm ink, **one accent: deep emerald**
  (fintech/money, desaturated). Soft, diffused, tinted shadows.
- **Games (dark)** — "ethereal glass arcade": near-black (`#09090B` family),
  hairline white borders, glass panels, **one accent: warm amber**, glow
  used sparingly. Ludo's four token colors appear only as game content.

Both worlds share:

- **Fonts:** Space Grotesk (display + body) and Space Mono (eyebrow labels,
  stats, HUD, numerals — `tabular-nums`). Loaded via Google Fonts in
  `public/index.html`. Inter/system stacks removed.
- **Double-bezel surfaces:** cards/frames are an outer shell (hairline ring,
  large radius, 6–8px padding) holding an inner core (own background,
  concentric smaller radius). Used for the phone mockup, bento cards, game
  arena frames, key-art panels.
- **Floating pill nav** (`SiteNav`): fixed, top-center, detached, rounded-
  full, backdrop-blur (fixed element only). Left: wordmark. Right: links
  with active-page indication. On `/games*` routes it renders the dark
  variant with the "BISZAAL GAMES" wordmark; wordmark links back to the
  other world (cross-navigation, no dead ends). Mobile: hamburger that
  morphs to an X, opening a full-screen staggered overlay.
- **Motion:** IntersectionObserver reveal hook (`useReveal`) adding
  `is-visible`; CSS transitions on transform/opacity only, custom
  `cubic-bezier(0.32, 0.72, 0, 1)`, staggered delays. All motion disabled
  under `prefers-reduced-motion`. No scroll listeners.
- **A11y:** skip-to-content link, focus-visible rings, semantic landmarks,
  aria labels on game controls.

## Routes

| Path | Page | Notes |
|---|---|---|
| `/` | `Home` | redesigned, financial focus |
| `/games` | `Games` | redesigned Biszaal Games landing |
| `/games/helicopter` | `HelicopterPage` | playable game |
| `/games/ludo` | `LudoPage` | playable game |
| `/games/helicopter/privacy` | existing | content unchanged |
| `/games/ludo/privacy` | existing | content unchanged |
| `/privacy`, `/terms` | existing | content unchanged, reskinned shell |
| `*` | `NotFound` | new branded 404, links to both worlds |

`vercel.json` + `public/_redirects` SPA fallbacks already cover the new
routes. Existing files `Comparison.tsx` and `Testimonials.tsx` (+ CSS +
imports) are deleted.

## Home page (financial)

1. **Hero** — editorial split: left, eyebrow pill `BISZAAL TECH · LONDON`,
   massive headline ("Know where every pound goes."), plain-language subline
   naming Expenzez, primary pill CTA "Open Expenzez" (→ expenzez.com, nested
   arrow-in-circle), text CTA "Download for iOS" (App Store link). Right: a
   redesigned CSS phone mockup of Expenzez in a double-bezel frame, slight
   rotation, soft emerald ambient shadow.
2. **Fact strip** — mono row of real facts: Founded 2025 · London ·
   Company № 16693100 · Free on iOS. No invented metrics.
3. **Product bento** — asymmetric grid (one large analytics card with CSS
   bar/donut art + smaller feature cards: manual entry, CSV import, smart
   categories, security, CSV export). Real copy, sentence case.
4. **Roadmap** — Open Banking, Android app, richer analytics as a quiet
   numbered list with status labels (mono).
5. **About band** — condensed real story, two-column editorial, values as a
   plain list (icon grid removed).
6. **FAQ** — top six questions as a two-column static list (no accordion).
7. **Games doorway** — deliberate dark double-bezel band: "We also make
   games." + "Enter the arcade" CTA → `/games`. Prefigures the dark world so
   it reads intentional, not accidental.
8. **Contact** — honest: heading, one line, `hello@biszaaltech.com` as a big
   mailto pill. No fake form.
9. **Footer** — slimmed: wordmark, nav links, legal links, company info.
   Light and dark variants matching route.

## Games landing (`/games`)

1. **Hero** — dark; eyebrow `BISZAAL GAMES`, headline "Press start.",
   mono subline: original games, playable in the browser, App Store soon.
2. **Game rows** — two alternating full-width double-bezel cards, each with
   CSS key art (helicopter: canyon silhouettes + rotor glyph; ludo: board
   motif with the four token colors), name, one-liner, mono meta row
   (genre · players · controls), primary "Play now" CTA + "Privacy policy"
   text link, "Mobile version — coming to the App Store" label.
3. **Cross-band** — "Looking for the finance side?" → `/`.

## Helicopter game

Classic one-button cave flyer. **Pure engine + thin canvas component.**

- `src/games/helicopter/engine.ts` — no DOM. Types + `createInitialState`,
  `step(state, dt, thrust)`, terrain generation (smoothed random-walk cave
  narrowing with distance), obstacle blocks, AABB collision, score =
  distance. RNG injected for determinism. Difficulty ramps by distance.
- `HelicopterGame.tsx` — canvas + rAF loop; DPR scaling; input: pointer
  down/up anywhere in arena, or hold Space/↑; pauses on tab blur; states
  ready → playing → crashed; best score in `localStorage`
  (`biszaal.helicopter.best`). Canvas is decorative-rendered; HUD (score,
  best) is real DOM in mono font.
- `HelicopterPage.tsx` — dark page: title block, arena in double-bezel
  frame, controls hint, mobile-app note, link back to `/games`.
- jsdom has no canvas: component tests only assert DOM shell (HUD, buttons);
  all gameplay logic is engine-level unit tests.

## Ludo game

Classic 2–4 player Ludo with CPU opponents and pass-and-play.

- `src/games/ludo/engine.ts` — pure rules engine:
  - Board model: 52-cell ring; per-color start offsets 0/13/26/39; token
    progress 0–56 (0 = start cell, 50 = last ring cell, 51–55 home column,
    56 = home). Base = progress −1 (not on board).
  - Rules: 6 to leave base; extra roll on 6; three consecutive 6s forfeit
    the turn; landing on a single opponent token on a non-safe cell captures
    it (back to base); 8 safe cells (4 starts + 4 stars); own tokens may
    stack (no blockade rule — standard digital simplification); home column
    entry is color-private; final cell requires exact roll; first player
    with all 4 tokens home wins.
  - API: `createGame(config)`, `roll(state, rng)`, `legalMoves(state)`,
    `applyMove(state, tokenIndex)`, `aiChooseMove(state)` (heuristic:
    win > capture > enter-home > escape-threat > leave-base > advance).
  - `ringCoord(color, progress)` → 15×15 grid coordinates, built from an
    explicitly walked ring path; tests assert 52 unique orthogonally
    adjacent cells and correct start/entry cells.
- `LudoGame.tsx` — setup screen (2–4 players, each Human/CPU, fixed colors
  red/green/yellow/blue) → SVG board (15×15) with tokens transitioning via
  transform; dice with roll affordance; turn banner ("Green — roll", "Red
  is thinking…"); CPU turns auto-play on short delays; capture + win
  feedback; play-again. Local only — the page notes online multiplayer is
  a mobile-app feature.
- `LudoPage.tsx` — dark page wrapper matching HelicopterPage.

## Testing

- **Engines TDD-first:** helicopter (terrain bounds/monotonic difficulty,
  collision, scoring, thrust physics direction), ludo (path mapping, exit
  on 6, capture vs safe cell, exact home roll, extra turn on 6, triple-6
  forfeit, stacking, win detection, AI legality + capture preference).
- **Pages:** update `App.test.tsx` (new hero copy, nav-based navigation),
  `Games.test.tsx` (play links + privacy links instead of "Coming Soon"),
  keep `Footer.test.tsx` (Games link stays) and both `GamePrivacyPolicy`
  tests green. New smoke tests for both game pages and 404.
- Existing test copy assertions change deliberately with the redesign; the
  plan lists each.

## Meta / chrome

- `public/index.html`: new title ("Biszaal Tech — Expenzez & Biszaal
  Games"), description, Google Fonts preconnect + stylesheet, theme-color.
- `public/manifest.json`: names updated.

## Out of scope

- Real screenshots / store assets; sound effects; online multiplayer;
  contact-form backend; analytics; changes to legal copy; dark-mode toggle
  for the light world (each world commits to one tone).
