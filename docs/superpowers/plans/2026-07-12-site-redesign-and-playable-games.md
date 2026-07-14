# Site Redesign + Playable Games Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Execution note:** this plan is being executed inline by the same session
> that wrote it and the spec (autonomous session). Interface blocks, test
> code, copy strings, and route/class names below are **authoritative**;
> large presentational TSX/CSS listings are specified structurally here and
> written in full during implementation, following the design language in
> `docs/superpowers/specs/2026-07-12-site-redesign-and-playable-games-design.md`.
>
> **Superseded (2026-07-14):** Tasks 5–9 (playable Helicopter and Ludo games)
> were built and verified, then removed on user direction — the site is an
> intro to the business, so `/games` is a showcase of the two mobile games,
> not a play surface. Tasks 1–4 and 10–11 shipped as written. See the scope
> note at the top of the design spec. The playable code lives in git history
> (commits `0a787b3`…`4e38a77`).

**Goal:** Redesign biszaaltech.com into a light premium fintech home (`/`) and a dark Biszaal Games arcade (`/games`) with playable browser Helicopter and Ludo games.

**Architecture:** CRA + TypeScript + react-router v7, vanilla CSS with custom-property tokens. Pure TS game engines (`src/games/*/engine.ts`) under Jest TDD; thin React components render them (canvas for Helicopter, SVG for Ludo). Route-aware shared shell (`SiteNav`, `Footer`) switches light/dark world.

**Tech Stack:** React 19, react-router-dom 7, react-scripts 5 (Jest + RTL), vanilla CSS, Google Fonts (Space Grotesk, Space Mono), lucide-react (existing dep, used sparingly at strokeWidth 1.5).

## Global Constraints

- No new npm dependencies. No framework/styling migrations.
- Fonts: Space Grotesk (display/body), Space Mono (labels/numerals/HUD). No Inter/system-font branding.
- One accent per world: light world emerald `--accent: #0E6B4A` family; dark world amber `--accent: #E8A33D` family. Ludo token colors are game content only.
- Sentence case for all headings/CTAs. No "Elevate/Seamless/Unleash/Next-Gen" copy. No invented metrics, testimonials, or competitors.
- Motion: transform/opacity only, `cubic-bezier(0.32, 0.72, 0, 1)`, IntersectionObserver reveals, all gated behind `prefers-reduced-motion`.
- Full-height sections use `min-height: 100dvh` (with `100vh` fallback line above), never bare `height: 100vh`.
- Tests: `CI=true npx react-scripts test --watchAll=false` must pass at every commit; production build `npx react-scripts build` must pass at Task 11.
- localStorage keys: `biszaal.helicopter.best`, `biszaal.ludo.setup`.
- Existing content that must not change: legal page copy, GamePrivacyPolicy content/tests, footer "Games" link → `/games` (Footer.test.tsx).
- **Real game logos (user instruction):** copy `~/Documents/Github/helicopter/assets/icon.png` → `src/assets/helicopter-icon.png` and `~/Documents/Github/ludo/apps/mobile/assets/brand/icon.svg` → `src/assets/ludo-icon.svg` in Task 1. Use as key art on the games landing (Task 4), in each game page title block (Tasks 6, 9), and as chips in the home GamesDoorway (Task 3), always with descriptive alt text. Web Ludo token palette = icon palette: red `#FF4757`, green `#2ED573`, yellow `#FFC93C`, blue `#3E8BFF` (Task 9). Helicopter canvas art echoes its icon: near-black cave, stalactite silhouettes, white rounded heli, amber spark (Task 6).

---

### Task 1: Design tokens, fonts, meta, reveal hook

**Files:**
- Modify: `public/index.html` (title, description, theme-color, Google Fonts preconnect + stylesheet for Space Grotesk 300..700 + Space Mono 400/700)
- Modify: `public/manifest.json` (`short_name: "Biszaal Tech"`, `name: "Biszaal Tech — Expenzez & Biszaal Games"`)
- Rewrite: `src/App.css` (token system + base + shared primitives)
- Modify: `src/index.css` (font stack → `'Space Grotesk', system-ui fallbacks`)
- Create: `src/hooks/useReveal.ts`
- Test: `src/hooks/useReveal.test.ts`

**Interfaces (produced):**

```ts
// src/hooks/useReveal.ts
import { useEffect, useRef } from 'react';
/** Adds 'is-visible' to the element when it enters the viewport.
 *  Elements start hidden only if CSS pairs `.reveal` with `.is-visible`.
 *  Falls back to immediately visible when IntersectionObserver is absent (jsdom). */
export function useReveal<T extends HTMLElement>(): React.RefObject<T | null>;
```

CSS contract (App.css): `.reveal` (opacity 0, translateY(24px), blur? no — opacity+transform only) → `.reveal.is-visible` resolves over 700ms with the standard bezier; `.reveal-delay-1/2/3` add 90/180/270ms delays; all neutralized inside `@media (prefers-reduced-motion: reduce)`.

Token families in `:root`: `--paper`, `--paper-raised`, `--ink`, `--ink-soft`, `--ink-faint`, `--line`, `--accent`, `--accent-ink`, `--accent-soft`, shadow trio `--shadow-soft/-lift/-ambient` (emerald-tinted), radii `--r-outer: 28px; --r-inner: 20px; --r-pill: 999px`, fonts `--font-display`, `--font-mono`, container `--container: 1160px`, bezier `--ease: cubic-bezier(0.32, 0.72, 0, 1)`. Dark world scope `.world-dark { ... }` overrides the same custom properties (near-black paper, white-alpha lines, amber accent). Shared primitives: `.shell` (double-bezel outer), `.shell-core` (inner), `.pill-btn` (+ `.pill-btn .btn-orb` nested icon circle), `.eyebrow` (mono pill), `.skip-link`.

**Steps:**
- [ ] Write `useReveal.test.ts`: without IntersectionObserver in jsdom, hook marks ref element visible immediately (render tiny component, expect class `is-visible`).
- [ ] Run test — fails (hook missing).
- [ ] Implement `useReveal`; run test — passes.
- [ ] Rewrite App.css/index.css/index.html/manifest per contract above.
- [ ] Full suite: existing tests still pass (no component uses new classes yet).
- [ ] Commit `feat: new design tokens, fonts, and reveal hook`.

### Task 2: SiteNav + Footer (route-aware shell)

**Files:**
- Create: `src/components/SiteNav.tsx`, `src/components/SiteNav.css`
- Test: `src/components/SiteNav.test.tsx`
- Rewrite: `src/components/Footer.tsx`, `src/components/Footer.css`
- Modify: `src/App.tsx` (skip link, `<SiteNav />` inside Router above Routes)

**Interfaces (produced):**

```tsx
// SiteNav: no props. Uses useLocation().
// Dark ("games mode") when pathname === '/games' or startsWith('/games/helicopter') or '/games/ludo' EXCLUDING '/privacy' suffix routes:
export function isGamesWorld(pathname: string): boolean; // exported for tests
// true for /games, /games/helicopter, /games/ludo; false for /, /privacy, /games/ludo/privacy, /games/helicopter/privacy
```

- Light mode: wordmark `BISZAAL TECH` → `/`; links `Home` (`/`), `Games` (`/games`).
- Dark mode: wordmark `BISZAAL GAMES` → `/games`; links `All games` (`/games`), `Biszaal Tech` (`/`).
- Active link gets `aria-current="page"`. Mobile (`max-width: 720px`): links hide; hamburger button (`aria-label="Open menu"`, morphs to X via two spans) toggles full-screen overlay with staggered link reveal; overlay closes on link click and Escape.
- Footer keeps link accessible names: `Games`, `Privacy policy`, `Terms of service` — **wait**: Footer.test asserts name `Games` only; use sentence case for the other two. Company info + `© 2026 BISZAAL TECH LTD`. Footer also gets dark styling under `.world-dark`.

**Steps:**
- [ ] Write SiteNav tests: `isGamesWorld` truth table (6 paths above); renders `Home`/`Games` links at `/`; renders `BISZAAL GAMES` wordmark under MemoryRouter at `/games`; active link has `aria-current`.
- [ ] Run — fails. Implement SiteNav + CSS (floating pill: fixed, top 18px, centered, backdrop-blur, hairline ring). Run — passes.
- [ ] Rewrite Footer (keep `Games` link name + `/games` href). Run Footer.test — passes.
- [ ] Update App.tsx: `<a href="#main" className="skip-link">Skip to content</a>`, `<SiteNav />`, wrap `<Routes>` output pages each in their own `<main id="main">` (pages own `<main>`; App keeps div).
  App.test still passes (old hero copy untouched until Task 3 — nav adds a second `Games` link, so **first** update App.test navigation to `within(screen.getByRole('navigation'))`).
- [ ] Full suite passes. Commit `feat: route-aware floating pill nav and redesigned footer`.

### Task 3: Home page redesign (financial world)

**Files:**
- Rewrite: `src/components/Hero.tsx` + `Hero.css` (hero + fact strip)
- Rewrite: `src/components/Products.tsx` + `Products.css` (bento + roadmap)
- Rewrite: `src/components/About.tsx` + `About.css`
- Rewrite: `src/components/FAQ.tsx` + `FAQ.css` (static two-column, top 6 questions, no accordion state)
- Create: `src/components/GamesDoorway.tsx` + `GamesDoorway.css`
- Rewrite: `src/components/Contact.tsx` + `Contact.css` (mailto pill; delete form/validation)
- Delete: `src/components/Comparison.tsx`, `Comparison.css`, `Testimonials.tsx`, `Testimonials.css`
- Modify: `src/pages/Home.tsx` (order: Hero, Products, About, FAQ, GamesDoorway, Contact; wrap in `<main id="main">`)
- Modify: `src/App.test.tsx` (hero assertion → `/Know where every pound goes/i`)

**Copy (authoritative):**
- Hero eyebrow: `Biszaal Tech · London`; H1: `Know where every pound goes.`; sub: `Expenzez is our free expense tracker built in London — manual entry, CSV import, and clean analytics that make sense of your spending. Available now on iOS.`; primary pill CTA `Open Expenzez` → https://expenzez.com (btn-orb arrow); text link `Download for iOS` → existing App Store URL.
- Fact strip (mono): `Founded 2025`, `London, UK`, `Company № 16693100`, `Free on iOS`.
- Bento cards: large analytics card (`Spending, made visible` + CSS bar chart art) + `Manual entry`, `CSV import & export`, `Smart categories`, `Private by design`. Roadmap list: `Open Banking connections — in development`, `Android app — in development`, `Richer analytics — planned`.
- GamesDoorway (dark shell): eyebrow `Biszaal Games`; H2 `We also make games.`; line: `Two originals — a cave-flying arcade run and a fresh take on Ludo. Playable in your browser right now.`; pill CTA `Enter the arcade` → `/games`.
- Contact: H2 `Say hello.`; mailto pill `hello@biszaaltech.com`.

**Steps:**
- [ ] Update App.test hero assertion first; run — fails (old copy).
- [ ] Rewrite Hero (+CSS phone mockup in `.shell` double-bezel, slight rotate, emerald ambient shadow) — App.test hero passes.
- [ ] Rewrite Products/About/FAQ/Contact; create GamesDoorway; update Home.tsx; delete Comparison/Testimonials files.
- [ ] `grep -r "Comparison\|Testimonials" src/` → no hits. Full suite passes.
- [ ] Commit `feat: redesign home page around Expenzez, remove fabricated content`.

### Task 4: Games landing redesign

**Files:**
- Rewrite: `src/pages/Games.tsx` + `src/pages/Games.css`
- Rewrite: `src/pages/Games.test.tsx`

**Copy (authoritative):** eyebrow `Biszaal Games`; H1 `Press start.`; sub `Original games from Biszaal Tech — playable right here in your browser, and coming soon to the App Store.` Cards: `Helicopter` (`Thread the cave. Beat your best.`, meta `Arcade · 1 player · One button`) and `Ludo` (`The classic board game with sharper teeth.`, meta `Board · 2–4 players · Dice`). Each: primary link `Play now` → `/games/helicopter` | `/games/ludo`; text link `Privacy policy` → existing privacy routes; mono label `Mobile version — coming to the App Store`. Cross-band link `Looking for the finance side?` → `/`.

**Steps:**
- [ ] Rewrite Games.test.tsx:

```tsx
test('lists both games with play and privacy links', () => {
  render(<MemoryRouter><Games /></MemoryRouter>);
  expect(screen.getByRole('heading', { name: 'Press start.' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Helicopter' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Ludo' })).toBeInTheDocument();
  const playLinks = screen.getAllByRole('link', { name: 'Play now' });
  expect(playLinks.map(l => l.getAttribute('href'))).toEqual(
    expect.arrayContaining(['/games/helicopter', '/games/ludo'])
  );
  const privacyLinks = screen.getAllByRole('link', { name: 'Privacy policy' });
  expect(privacyLinks.map(l => l.getAttribute('href'))).toEqual(
    expect.arrayContaining(['/games/helicopter/privacy', '/games/ludo/privacy'])
  );
});
```

- [ ] Run — fails. Rewrite Games page (`.world-dark` wrapper, alternating shell rows, CSS key art). Run — passes.
- [ ] Update App.test navigation test (nav → Games → heading `Press start.`; privacy link name now `Privacy policy`; card container class `.game-row`). Full suite passes.
- [ ] Commit `feat: redesign games landing as Biszaal Games arcade`.

### Task 5: Helicopter engine (TDD)

**Files:**
- Create: `src/games/helicopter/engine.ts`
- Test: `src/games/helicopter/engine.test.ts`

**Interfaces (produced, authoritative):**

```ts
export type HeliPhase = 'ready' | 'playing' | 'crashed';
export interface Segment { ceiling: number; floor: number; }   // world-y of cave top/bottom edges
export interface Obstacle { x: number; y: number; w: number; h: number; }
export interface HeliState {
  phase: HeliPhase;
  x: number;            // world distance scrolled (units)
  y: number; vy: number;
  score: number;        // floor(x / 10)
  best: number;
  speed: number;
  segments: Segment[];  // ring window, index via segmentAt
  obstacles: Obstacle[];
  rng: () => number;
}
export const WORLD = { w: 160, h: 90, heliX: 40, heliW: 9, heliH: 5 } as const;
export function createInitialState(rng?: () => number, best?: number): HeliState; // phase 'ready'
export function startRun(s: HeliState): HeliState;   // -> 'playing', y centered
export function step(s: HeliState, dt: number, thrust: boolean): HeliState; // mutates + returns s
export function segmentAt(s: HeliState, worldX: number): Segment;
export function corridorGapAt(x: number): number;     // base gap before jitter; monotonic non-increasing, >= MIN_GAP
export const MIN_GAP: number;
```

Physics: `vy += (thrust ? -260 : 170) * dt`, clamp `|vy| <= 95`; `y += vy*dt`; `x += speed*dt`; `speed = min(130, 55 + x/90)`. Terrain: segments of width 8 world units, random-walk center ± jitter scaled by rng, gap from `corridorGapAt` (62 → MIN_GAP 34 by x=6000). Obstacles after x>400 every 340–520 units, block 6×18 inside corridor. Crash: heli AABB (centered at heliX, y) intersects ceiling/floor of any overlapping segment or an obstacle → phase 'crashed', best updated.

**Steps:**
- [ ] Write engine.test.ts covering: ready state ignores step physics; startRun begins playing; gravity increases y (falls) without thrust over 1s of 60 steps; thrust decreases y; crash on floor when never thrusting long enough (run steps until phase crashed, assert crashed and y near floor of its segment); corridorGapAt monotonic non-increasing sampled at 0..8000 step 250 and always ≥ MIN_GAP; segments cover heli window (segmentAt returns valid segment with ceiling < floor for xs across 0..3000); obstacles all inside corridor bounds when generated with seeded rng (mulberry-style seeded fn in test); score = floor(x/10); determinism: two states with identical seeded rng and identical step sequence produce identical x/y/score; best persists through crash (crash with score 42 → best ≥ 42).
- [ ] Run — fails (module missing).
- [ ] Implement engine. Run — passes.
- [ ] Commit `feat: helicopter cave-flyer engine with deterministic terrain`.

### Task 6: Helicopter component, page, route

**Files:**
- Create: `src/games/helicopter/HelicopterGame.tsx`, `HelicopterGame.css`
- Create: `src/pages/HelicopterPage.tsx` (+ shared `src/pages/GamePages.css`)
- Modify: `src/App.tsx` (route `/games/helicopter`)
- Test: `src/pages/HelicopterPage.test.tsx`

**Interfaces:**
- Consumes: entire Task 5 engine API.
- Produces: `HelicopterGame` (no props) — arena `div.heli-arena` containing `<canvas aria-label="Helicopter game area">`, DOM HUD (`Score`, `Best` in mono), overlay states: ready (`Tap, click, or hold space to fly`, button `Start`), crashed (`Run over.` + final score + button `Fly again`). Guards `canvas.getContext('2d')` null (jsdom). rAF loop only while playing; `visibilitychange` + blur pause → ready-style paused overlay with `Resume`. localStorage `biszaal.helicopter.best`.
- `HelicopterPage`: `.world-dark` page — back link `All games` → `/games`, H1 `Helicopter`, sub line, `<HelicopterGame />`, controls hint line, mono note `Mobile version — coming to the App Store`, privacy link.

**Steps:**
- [ ] Write HelicopterPage.test.tsx: renders H1 `Helicopter`, a `Start` button, `Best` HUD label, back link to `/games` (MemoryRouter).
- [ ] Run — fails. Implement component + page + route + CSS (arena in `.shell` frame; canvas DPR-scaled; amber HUD).
- [ ] Run — passes; full suite passes.
- [ ] Commit `feat: playable helicopter game page`.

### Task 7: Ludo board geometry (TDD)

**Files:**
- Create: `src/games/ludo/board.ts`
- Test: `src/games/ludo/board.test.ts`

**Interfaces (produced, authoritative):**

```ts
export type LudoColor = 'red' | 'green' | 'yellow' | 'blue';
export const COLORS: readonly LudoColor[]; // ['red','green','yellow','blue'] = turn order
export interface Cell { x: number; y: number; } // 15×15 grid, 0-indexed
export const RING: readonly Cell[];             // 52 cells, RING[0] = red start (1,6)
export const START_OFFSET: Record<LudoColor, number>; // red 0, green 13, yellow 26, blue 39
export const SAFE_RING: ReadonlySet<number>;    // {0,8,13,21,26,34,39,47}
export const HOME_COLUMN: Record<LudoColor, readonly Cell[]>; // 5 cells each (progress 51..55)
export const HOME_POINT: Record<LudoColor, Cell>;  // center-triangle anchor (progress 56)
export const BASE_ORIGIN: Record<LudoColor, Cell>; // red(0,0) green(9,0) yellow(9,9) blue(0,9)
export const BASE_SPOTS: Record<LudoColor, readonly Cell[]>; // 4 pad centers (fractional ok)
export function progressToCell(color: LudoColor, progress: number): Cell; // 0..56 (throws on -1)
```

Ring walk (clockwise; rotated so red start is index 0): `(1,6)…(5,6)`, `(6,5)…(6,0)`, `(7,0)`, `(8,0)…(8,5)`, `(9,6)…(14,6)`, `(14,7)`, `(14,8)…(9,8)`, `(8,9)…(8,14)`, `(7,14)`, `(6,14)…(6,9)`, `(5,8)…(0,8)`, `(0,7)`, `(0,6)`. Home columns: red `(1,7)…(5,7)`, green `(7,1)…(7,5)`, yellow `(13,7)…(9,7)`, blue `(7,13)…(7,9)`.

**Steps:**
- [ ] Write board.test.ts: RING has 52 unique cells; consecutive cells (and wrap) are within Chebyshev distance 1; every ring cell lies in the cross arms (6≤x≤8 xor 6≤y≤8) and outside center 3×3; `RING[START_OFFSET[c]]` equals the four documented start cells and each is in SAFE_RING; progress 50 for each color lands on that color's tip cell adjacent to its `HOME_COLUMN[c][0]`; home columns are 5 in-bounds cells ending adjacent to `HOME_POINT[c]`; `progressToCell(c, 51+i) === HOME_COLUMN[c][i]`, `progressToCell(c,56) === HOME_POINT[c]`.
- [ ] Run — fails. Implement board.ts (explicit walk builder, not hand-typed 52 literals). Run — passes.
- [ ] Commit `feat: ludo board geometry with verified 52-cell ring`.

### Task 8: Ludo rules engine (TDD)

**Files:**
- Create: `src/games/ludo/engine.ts`
- Test: `src/games/ludo/engine.test.ts`

**Interfaces (produced, authoritative):**

```ts
import { LudoColor } from './board';
export type PlayerKind = 'human' | 'cpu';
export interface LudoPlayer { color: LudoColor; kind: PlayerKind; }
export type LudoEvent =
  | { type: 'capture'; by: LudoColor; victim: LudoColor; count: number }
  | { type: 'home'; color: LudoColor }
  | { type: 'forfeit'; color: LudoColor }        // triple six
  | { type: 'win'; color: LudoColor };
export interface LudoState {
  players: LudoPlayer[];                 // 2–4, unique colors, array order = turn order
  tokens: Record<LudoColor, number[]>;   // 4 entries; -1 base, 0..55 track, 56 home
  current: number;                       // players index
  dice: number | null;                   // null = must roll
  sixStreak: number;
  winner: LudoColor | null;
  event: LudoEvent | null;               // set by the transition that produced it
}
export function createGame(players: LudoPlayer[]): LudoState;
export function ringIndexOf(color: LudoColor, progress: number): number | null; // null unless 0..50
export function roll(state: LudoState, rng?: () => number): LudoState;  // immutable
export function legalMoves(state: LudoState): number[];                 // token indexes
export function applyMove(state: LudoState, tokenIndex: number): LudoState; // immutable
export function aiChooseMove(state: LudoState): number;                 // requires legalMoves nonempty
```

Rules encoded (from spec): 6 exits base to progress 0; overshoot of 56 is illegal; capture on landing at a ring cell holding **exactly one** opponent token and cell not in SAFE_RING (victim → -1); own/multi stacks coexist; extra roll after moving on a 6 (dice→null, current unchanged); non-6 move advances turn and resets sixStreak; third consecutive 6 on roll → `forfeit`, dice cleared, turn advances; roll with zero legal moves → dice cleared, turn advances (streak resets); all four at 56 → `winner`, `win` event, dice null; `roll`/`applyMove` throw on out-of-turn misuse (roll when dice set, move when dice null, illegal token). AI order: (1) move winning a token to 56, (2) capture, (3) enter home column (result ≥ 51 from < 51), (4) escape threat (token on non-safe ring cell with any opponent 1–6 ring steps behind), (5) leave base on 6, (6) furthest-progress token.

**Steps:**
- [ ] Write engine.test.ts (seeded/fixed dice via `rng: () => k`): needs-6-to-exit (dice 3 with all base → no legal moves, turn passes); exit on 6 → progress 0 & extra roll (current unchanged, dice null); movement adds dice; capture sends single opponent home & not on safe cell (construct state literal with green token on red's path); no capture on SAFE_RING cell; no capture of stacked pair; exact roll into 56 (55 + 2 illegal for that token, 55 + 1 legal); home token immovable; triple-six forfeits (two prior sixStreak, roll 6 → event forfeit, next player); win sets winner and win event; ringIndexOf null for base/home-column; aiChooseMove prefers capture over plain advance (state with both options), prefers finishing token, escapes threatened token when no capture, only ever returns a member of legalMoves across 200 seeded random games driven to completion (integration loop — also asserts games terminate and winner set).
- [ ] Run — fails. Implement engine.ts. Run — passes.
- [ ] Commit `feat: ludo rules engine with capture, safe cells, and cpu heuristic`.

### Task 9: Ludo UI, page, route

**Files:**
- Create: `src/games/ludo/LudoBoard.tsx` (pure SVG view: props `{ state: LudoState; movable: number[]; onTokenClick(color, index): void }`)
- Create: `src/games/ludo/LudoGame.tsx` + `LudoGame.css` (setup screen + match loop + dice + CPU autoplay timers + banners)
- Create: `src/pages/LudoPage.tsx`
- Modify: `src/App.tsx` (route `/games/ludo`)
- Test: `src/pages/LudoPage.test.tsx`

**Behavior:** setup: player count 2/3/4, per-slot Human/CPU toggle (defaults: 1 human vs 1 CPU), `Start game` button. Match: SVG board 600×600 viewBox 15×15 cells; token discs with CSS transform transitions; movable tokens pulse + clickable (aria-labels `Move red token 2`); dice button `Roll` (mono die face) disabled out of human turn; CPU turns: roll after 650ms, move after further 700ms via useEffect timers (cleared on unmount); banners: `Red — roll the dice`, `Green is thinking…`, capture/forfeit toasts from `state.event`; win overlay `Red wins.` + `Play again` (back to setup). Pass-and-play: consecutive human turns just hand the dice over via banner.

**Steps:**
- [ ] Write LudoPage.test.tsx: renders H1 `Ludo`, `Start game` button present after choosing defaults, clicking it shows `Roll` button and turn banner containing `— roll`.
- [ ] Run — fails. Implement board/game/page/route/CSS (dark shell arena like Helicopter; board surface warm off-white core inside dark bezel).
- [ ] Run — passes; full suite passes.
- [ ] Commit `feat: playable ludo game with cpu and pass-and-play`.

### Task 10: Legal reskin, 404, final chrome

**Files:**
- Modify: `src/pages/LegalPages.css` (new tokens/typography; content untouched)
- Create: `src/pages/NotFound.tsx`
- Modify: `src/App.tsx` (route `path="*"`)
- Test: `src/pages/NotFound.test.tsx`

**Copy:** H1 `Page not found.`; line `That address doesn't exist. Try one of these instead.`; links `Go home` → `/`, `Enter the arcade` → `/games`.

**Steps:**
- [ ] NotFound.test: render at bogus route via App (or MemoryRouter) → H1 + both links.
- [ ] Run — fails. Implement + route. Run — passes.
- [ ] Reskin LegalPages.css; verify GamePrivacyPolicy tests still pass.
- [ ] Commit `feat: branded 404 and reskinned legal pages`.

### Task 11: Verification pass

- [ ] `CI=true npx react-scripts test --watchAll=false` — full suite green.
- [ ] `npx react-scripts build` — clean production build (warnings addressed).
- [ ] Start dev server; Playwright: navigate `/`, `/games`, `/games/helicopter`, `/games/ludo`, `/privacy`, `/games/ludo/privacy`, bogus route; screenshot desktop (1440×900) and mobile (390×844) for `/` and `/games` + both game pages; play a helicopter run (pointer hold) and a ludo roll+move; check console for errors.
- [ ] Fix everything found; re-run suite + build.
- [ ] Commit `polish: verification fixes from browser pass`.

## Self-Review

- **Spec coverage:** two worlds/tokens (T1), nav+footer+skip link (T2), home sections + integrity deletions (T3), games landing (T4), helicopter engine/page (T5–6), ludo geometry/rules/UI (T7–9), legal reskin + 404 + meta (T1, T10), verification (T11). Doorway component (spec §Home 7) in T3. Meta/manifest in T1. ✓
- **Placeholder scan:** none — copy strings, interfaces, and test behaviors are concrete. Presentational listings deliberately structural per header note. ✓
- **Type consistency:** `HeliState/step/startRun` names match T5↔T6; `LudoState/roll/legalMoves/applyMove/aiChooseMove` match T8↔T9; `RING/START_OFFSET/SAFE_RING/progressToCell` match T7↔T8 (`ringIndexOf` lives in engine, uses START_OFFSET). `isGamesWorld` exported for T2 tests. ✓
