# Games Page + Privacy Policies — Design

> **Superseded on data practices:** this doc's original assumption that both
> games have "identical data practices (no collection, local-only storage)"
> turned out to be wrong for Ludo Game, which has a real Supabase backend
> (accounts, profiles, friends, room invites). The implementation plan
> (`docs/superpowers/plans/2026-07-05-games-page.md`) and the shipped
> `GamePrivacyPolicy` component reflect the corrected, accurate content via a
> `dataPractices: 'local-only' | 'online-multiplayer'` prop — treat the plan,
> not this section, as the source of truth for data-collection content and
> the "Last updated" date.

## Purpose

Add a new "Our Games" section to the BISZAAL TECH LTD website showcasing two
unreleased mobile games (working titles: "Helicopter Game" and "Ludo Game"),
plus a public privacy policy page per game. Both games are pre-release, so
store links are omitted; a "Coming Soon" status is shown instead. The privacy
policy pages need to be live before either game is submitted to an app store,
since both Apple App Store and Google Play require a working privacy policy
URL at submission time.

## Scope

- New dedicated route `/games` (not folded into the existing home-page
  "Our Products" section — user chose the separate-page option explicitly).
- Two new privacy policy routes, one per game.
- Footer navigation link so `/games` is reachable (currently the footer is the
  only cross-page navigation on the site).
- No changes to `Home.tsx`, `Hero.tsx`, `About.tsx`, or `Products.tsx`.
- No real screenshots/icons — CSS-only placeholder mockups, consistent with
  how `Products.tsx` currently renders a CSS phone mockup for Expenzez.

## Routing

Added to `src/App.tsx`:

| Path | Element |
|---|---|
| `/games` | `<Games />` |
| `/games/helicopter/privacy` | `<GamePrivacyPolicy gameName="Helicopter Game" slug="helicopter" />` |
| `/games/ludo/privacy` | `<GamePrivacyPolicy gameName="Ludo Game" slug="ludo" />` |

## Components

### `src/pages/Games.tsx` + `src/pages/Games.css`

A listing page in the site's existing visual language (gold/silver accent
line, card hover-lift, `--spacing-*` / `--color-*` custom properties from
`index.css`). Structure:

- Page title "Our Games" (matches `.products-title` treatment)
- A 2-up responsive grid (`repeat(auto-fit, minmax(...))`, stacks to 1 column
  on mobile, mirroring the breakpoint pattern already used in `Products.css`)
- One card per game, each containing:
  - A CSS-only placeholder mockup box (no image assets): a sky-gradient panel
    with a simple triangular/rotor CSS shape for the helicopter game; a
    grid/checkerboard-with-dots pattern for the ludo game. Same visual weight
    as the existing `.phone-frame` mockup, new game-specific classes.
  - Game name + one-line tagline
  - Short description paragraph (placeholder marketing copy, clearly generic
    since gameplay isn't finalized)
  - A "Coming Soon" status badge (small pill, similar styling to
    `.upcoming-status` in `Products.css`)
  - A "Privacy Policy" link (`react-router-dom` `Link`) to that game's
    `/games/<slug>/privacy` route

### `src/pages/GamePrivacyPolicy.tsx` (shared, parameterized)

One component, reused for both routes via props (`gameName`, `slug`), not two
near-duplicate files. Rationale: both games currently have identical data
practices (no collection, local-only storage, possible future AdMob), so a
shared template means a future edit (e.g. adding AdMob disclosure) happens
once and both pages stay in sync automatically, instead of relying on someone
remembering to edit two files identically.

Reuses `src/pages/LegalPages.css` — no new stylesheet, since the layout
(h1, "last updated", `<section>` blocks, contact box) is identical to the
existing `/privacy` and `/terms` pages.

Content sections (legal tone matching existing `PrivacyPolicy.tsx`):

1. **Introduction** — BISZAAL TECH LTD as developer of `{gameName}`
2. **Information We Collect** — states no personal data is currently
   collected; game progress/settings are stored locally on-device only; no
   account or sign-in is required to play
3. **Third-Party Services** — states none are currently integrated (no ads,
   no analytics SDKs); includes an explicit forward-looking disclosure that
   if third-party services such as advertising (e.g. Google AdMob) or
   analytics are added in a future update, this policy will be updated in
   advance and the current version will always be published at this URL.
   A one-line code comment marks this section as the spot to revise before
   AdMob is integrated.
4. **Children's Privacy** — no knowing collection of data from children;
   relevant given casual/arcade games often have younger players
5. **Data Security** — standard reasonable-measures statement
6. **Your Rights** (UK GDPR) — same rights list as the site-wide privacy
   policy (access, correction, deletion, objection, portability)
7. **Changes to This Policy**
8. **Contact Us** — BISZAAL TECH LTD, hello@biszaaltech.com, registered
   address (matching `Footer.tsx` / existing legal pages)

"Last updated" date: 2026-07-05 (today), matching the format used in the
existing legal pages.

## Navigation

`src/components/Footer.tsx`: add a `Games` link into the existing
`footer-links` group, alongside `Privacy Policy` and `Terms of Service`,
pointing at `/games`. No other nav changes — the site has no header/nav bar
today, so the footer is the correct (and only existing) place for
cross-page links.

## Out of scope / explicitly not doing

- No app store / Play Store links or download buttons (games aren't
  released yet)
- No real screenshots, icons, or logo assets
- No changes to the home page, Hero, About, Products, or Contact components
- No dynamic/data-driven multi-game system (e.g. `/games/:slug` with a
  content array) — with only two games and no near-term plan for more, that
  would be premature abstraction. If a third game is added later, this
  should be revisited.
