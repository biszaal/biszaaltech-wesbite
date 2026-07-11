# Games Page + Privacy Policies Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new `/games` page showcasing two unreleased mobile games ("Helicopter Game" and "Ludo Game") plus a public privacy policy page per game, reachable from the site footer.

**Architecture:** Two new page components (`Games.tsx`, `GamePrivacyPolicy.tsx`) added under `src/pages/`, wired into `src/App.tsx`'s existing `react-router-dom` `<Routes>`, with a new "Games" link added to `src/components/Footer.tsx`. `GamePrivacyPolicy` is a single component parameterized by a `gameName` prop and a `dataPractices: 'local-only' | 'online-multiplayer'` prop, reused for both games' routes rather than duplicated per-game files — the `dataPractices` variant switches only the "Information We Collect" and "Third-Party Services" section content; everything else (structure, rights, contact) is shared.

**Tech Stack:** React 19 + TypeScript (Create React App / `react-scripts` 5.0.1), `react-router-dom` v7, Jest + React Testing Library (already configured via `react-scripts test`).

## Global Constraints

- No app store / Play Store links or download buttons anywhere on the games page — both games are pre-release ("Coming Soon" status only).
- No new image/screenshot assets — game mockups are CSS-only placeholders.
- Privacy policy pages reuse the existing `src/pages/LegalPages.css` stylesheet — do not create a new stylesheet for them.
- Company/contact details in any legal content must exactly match what's already used in `src/pages/PrivacyPolicy.tsx` and `src/components/Footer.tsx`: `BISZAAL TECH LTD`, `hello@biszaaltech.com`, `71-75 Shelton Street, Covent Garden, London, WC2H 9JQ`.
- "Last updated" date for the new privacy policy pages: `July 10, 2026` (implementation date; the design was drafted July 5 but publication is happening July 10).
- Do not modify `src/pages/Home.tsx`, `src/components/Hero.tsx`, `src/components/About.tsx`, or `src/components/Products.tsx`.
- Do not build a dynamic/data-driven `/games/:slug` route or a shared game-data array module — with only two games, two explicit `<Route>` entries in `App.tsx` is simpler (YAGNI).
- **Data-practices accuracy (updated 2026-07-10):** Helicopter Game (`com.biszaal.helicopter`) has no backend — it only uses on-device `AsyncStorage`, so its policy uses the `local-only` variant (no accounts, no data leaves the device). Ludo Game (`com.biszaal.mobile`) already has a real Supabase backend wired up (anonymous auth, a `profiles` table with display name + avatar, a `friendships` table, and a `room_invites` table — see the `ludo` repo's `supabase/migrations/`), even though online play is still marked "planned" in its README. Its policy must use the `online-multiplayer` variant and disclose: an anonymous Supabase account, the user-chosen display name and avatar, friend connections, room invites, and that Supabase (a third-party backend provider) hosts this data. Ludo has no analytics or ad SDKs in its dependencies today, so "no third-party analytics/ads" still holds for both games — only the account/profile/multiplayer disclosure differs.

---

## Task 1: Fix pre-existing broken test infrastructure

The installed `react-router-dom@7.8.2` has a stale `main` field (`./dist/main.js`) that doesn't exist in its published `dist/` output (it only ships `index.js`/`index.mjs`). Jest 27 (bundled by `react-scripts` 5) resolves via `main`, not the `exports` map, so **any test that imports `App.tsx` currently fails to run at all** with `Cannot find module 'react-router-dom'`. This is fixed upstream in `react-router-dom@7.18.1`, which corrects `main` to `./dist/index.js`. This must be fixed before any new tests can run.

Additionally, `src/App.test.tsx` still contains the original Create React App boilerplate test (`renders learn react link`), which asserts text that no longer exists anywhere in the app. It fails on content grounds even once the module resolution is fixed, and doesn't test anything real.

**Files:**
- Modify: `package.json`, `package-lock.json` (via `npm install`)
- Modify: `src/App.test.tsx:1-9` (replace the stale test)

**Interfaces:**
- Produces: a working `CI=true npx react-scripts test --watchAll=false` command that other tasks' test runs depend on.

- [ ] **Step 1: Confirm the test suite is currently broken**

Run: `CI=true npx react-scripts test --watchAll=false`
Expected: FAIL — `Cannot find module 'react-router-dom' from 'src/App.tsx'`

- [ ] **Step 2: Upgrade react-router-dom**

Run: `npm install react-router-dom@^7.18.1`

- [ ] **Step 3: Replace the stale App.test.tsx with a real smoke test**

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the home page hero headline', () => {
  render(<App />);
  expect(
    screen.getByText(/Building Intelligent Software for Modern Life/i)
  ).toBeInTheDocument();
});
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `CI=true npx react-scripts test --watchAll=false`
Expected: PASS — 1 test suite, 1 test passed, no module resolution errors

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/App.test.tsx
git commit -m "fix: upgrade react-router-dom to unbreak test suite module resolution"
```

---

## Task 2: Shared GamePrivacyPolicy page component

**Files:**
- Create: `src/pages/GamePrivacyPolicy.tsx`
- Test: `src/pages/GamePrivacyPolicy.test.tsx`
- (Reuses existing `src/pages/LegalPages.css` — no new stylesheet)

**Interfaces:**
- Consumes: nothing new (renders plain JSX; relies on `LegalPages.css` classes `legal-page`, `legal-container`, `last-updated`, `contact-info` already defined)
- Produces: `GamePrivacyPolicy` — `React.FC<{ gameName: string; dataPractices: 'local-only' | 'online-multiplayer' }>`, default export from `src/pages/GamePrivacyPolicy.tsx`. Later tasks (Task 4) import this and pass `gameName="Helicopter Game" dataPractices="local-only"` / `gameName="Ludo Game" dataPractices="online-multiplayer"`.

- [ ] **Step 1: Write the failing test**

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import GamePrivacyPolicy from './GamePrivacyPolicy';

test('renders the local-only policy heading and body for a game with no backend', () => {
  render(<GamePrivacyPolicy gameName="Helicopter Game" dataPractices="local-only" />);
  expect(
    screen.getByRole('heading', { name: 'Helicopter Game Privacy Policy' })
  ).toBeInTheDocument();
  expect(
    screen.getByText(/does not currently collect any personal information/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/hello@biszaaltech\.com/)).toBeInTheDocument();
});

test('renders the online-multiplayer policy content for a game with a backend', () => {
  render(<GamePrivacyPolicy gameName="Ludo Game" dataPractices="online-multiplayer" />);
  expect(
    screen.getByRole('heading', { name: 'Ludo Game Privacy Policy' })
  ).toBeInTheDocument();
  expect(screen.getByText(/anonymous account/i)).toBeInTheDocument();
  expect(screen.getByText(/choose a display name/i)).toBeInTheDocument();
  expect(screen.getByText(/uses Supabase/)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `CI=true npx react-scripts test src/pages/GamePrivacyPolicy.test.tsx --watchAll=false`
Expected: FAIL — `Cannot find module './GamePrivacyPolicy'`

- [ ] **Step 3: Implement GamePrivacyPolicy.tsx**

```tsx
import React from 'react';
import './LegalPages.css';

interface GamePrivacyPolicyProps {
  gameName: string;
  dataPractices: 'local-only' | 'online-multiplayer';
}

const GamePrivacyPolicy: React.FC<GamePrivacyPolicyProps> = ({ gameName, dataPractices }) => {
  const isOnline = dataPractices === 'online-multiplayer';

  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>{gameName} Privacy Policy</h1>
        <p className="last-updated">Last updated: July 10, 2026</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            BISZAAL TECH LTD ("we," "our," or "us") develops {gameName}. This privacy policy
            explains what information {gameName} collects (if any), how it is used, and your
            rights regarding that information.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          {isOnline ? (
            <>
              <p>
                To play {gameName} online with other players, we create an anonymous account for
                you. This account is not linked to your name, email address, or phone number.
              </p>
              <p>
                You may choose a display name (up to 20 characters) and an avatar, both of which
                are visible to other players you interact with. If you add friends within the
                game, we store the connection between your account and theirs, along with the
                status of that request. If you invite someone to a game room, we store the room
                code and both accounts involved until the invite is accepted, declined, or
                expires.
              </p>
              <p>
                Local, pass-and-play games on a single device do not require an account and are
                never transmitted to us.
              </p>
            </>
          ) : (
            <p>
              {gameName} does not currently collect any personal information. Your game progress,
              settings, and high scores are stored locally on your device only and are never
              transmitted to us or any third party. No account, sign-in, or personal details are
              required to play.
            </p>
          )}
        </section>

        <section>
          <h2>3. Third-Party Services</h2>
          {/* Update this section before integrating AdMob or any analytics SDK into this game. */}
          {isOnline ? (
            <p>
              {gameName} uses Supabase, a third-party backend and database provider, to store the
              account, profile, friend, and room-invite data described above, and to synchronize
              real-time game state between players. We do not currently integrate any advertising
              or analytics SDKs. Should we introduce such services in the future, we will update
              this policy in advance of that change, and the current version will always be
              published at this page.
            </p>
          ) : (
            <p>
              {gameName} does not currently integrate any third-party advertising, analytics, or
              tracking services. Should we introduce services such as advertising (for example,
              Google AdMob) or analytics in a future update, we will update this policy in advance
              of that change, and the current version will always be published at this page.
            </p>
          )}
        </section>

        <section>
          <h2>4. Children's Privacy</h2>
          <p>
            {gameName} does not knowingly collect any personal information from children or any
            other user, regardless of age
            {isOnline
              ? ' beyond the self-chosen display name and avatar described above'
              : ''}
            . If we introduce any further data collection in the future, we will take appropriate
            steps to comply with applicable children's privacy laws, including COPPA and UK data
            protection requirements.
          </p>
        </section>

        <section>
          <h2>5. Data Security</h2>
          {isOnline ? (
            <p>
              Account, profile, friend, and room-invite data is protected using Supabase's
              row-level security, which restricts each player to their own data and the game
              state they are actively part of. We follow reasonable security practices in how we
              develop and maintain the app.
            </p>
          ) : (
            <p>
              Because {gameName} stores data locally on your device rather than on our servers,
              your game data remains under your control at all times. We still follow reasonable
              security practices in how we develop and maintain the app.
            </p>
          )}
        </section>

        <section>
          <h2>6. Your Rights</h2>
          <p>Under UK data protection law, you have the right to:</p>
          <ul>
            <li>Request access to any personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>
              Request deletion of your data{isOnline ? ', including your account, profile, friend connections, and room invites' : ''}
            </li>
            <li>Object to processing of your data</li>
            <li>Request data portability</li>
          </ul>
        </section>

        <section>
          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time, including if {gameName} begins
            using third-party services such as advertising or analytics. We will post any
            changes on this page with an updated "Last updated" date.
          </p>
        </section>

        <section>
          <h2>8. Contact Us</h2>
          <p>If you have any questions about this privacy policy, please contact us at:</p>
          <div className="contact-info">
            <p><strong>BISZAAL TECH LTD</strong></p>
            <p>Email: hello@biszaaltech.com</p>
            <p>Address: 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GamePrivacyPolicy;
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `CI=true npx react-scripts test src/pages/GamePrivacyPolicy.test.tsx --watchAll=false`
Expected: PASS — 2 tests passed

- [ ] **Step 5: Commit**

```bash
git add src/pages/GamePrivacyPolicy.tsx src/pages/GamePrivacyPolicy.test.tsx
git commit -m "feat: add shared GamePrivacyPolicy page component"
```

---

## Task 3: Games listing page

**Files:**
- Create: `src/pages/Games.tsx`
- Create: `src/pages/Games.css`
- Test: `src/pages/Games.test.tsx`

**Interfaces:**
- Consumes: `Link` from `react-router-dom` (already a project dependency, fixed in Task 1)
- Produces: `Games` — `React.FC`, default export from `src/pages/Games.tsx`, rendering two game cards with `Link` elements pointing to `/games/helicopter/privacy` and `/games/ludo/privacy`. Task 4 imports this as the element for the `/games` route.

- [ ] **Step 1: Write the failing test**

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Games from './Games';

test('renders both games with Coming Soon status and privacy policy links', () => {
  render(
    <MemoryRouter>
      <Games />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: 'Our Games' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Helicopter Game' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Ludo Game' })).toBeInTheDocument();
  expect(screen.getAllByText('Coming Soon')).toHaveLength(2);

  const privacyLinks = screen.getAllByRole('link', { name: 'Privacy Policy' });
  const hrefs = privacyLinks.map((link) => link.getAttribute('href'));
  expect(hrefs).toContain('/games/helicopter/privacy');
  expect(hrefs).toContain('/games/ludo/privacy');
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `CI=true npx react-scripts test src/pages/Games.test.tsx --watchAll=false`
Expected: FAIL — `Cannot find module './Games'`

- [ ] **Step 3: Implement Games.css**

```css
.games {
  padding: var(--spacing-5xl) var(--spacing-xl);
  background: var(--bg-gradient);
  position: relative;
}

.games-container {
  max-width: 1280px;
  margin: 0 auto;
}

.games-title {
  font-size: clamp(var(--font-size-3xl), 4vw, var(--font-size-4xl));
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-5xl);
  letter-spacing: -0.035em;
  text-align: center;
  position: relative;
}

.games-title::after {
  content: '';
  position: absolute;
  bottom: -1rem;
  left: 50%;
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, var(--color-gold), var(--color-silver));
  transform: translateX(-50%);
  border-radius: var(--radius-full);
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--spacing-3xl);
}

.game-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-accent);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transition: var(--transition-base);
}

.game-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.game-mockup {
  height: 180px;
  position: relative;
  overflow: hidden;
}

.helicopter-mockup {
  background: linear-gradient(180deg, #7ec8e3 0%, #cdeffd 100%);
}

.helicopter-mockup::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70px;
  height: 24px;
  background: var(--bg-dark);
  border-radius: var(--radius-full);
  transform: translate(-50%, -50%);
}

.helicopter-mockup::before {
  content: '';
  position: absolute;
  top: calc(50% - 12px);
  left: 50%;
  width: 90px;
  height: 3px;
  background: var(--color-secondary);
  transform: translateX(-50%);
}

.ludo-mockup {
  background-color: var(--bg-tertiary);
  background-image:
    linear-gradient(45deg, var(--color-gold) 25%, transparent 25%),
    linear-gradient(-45deg, var(--color-gold) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, var(--color-silver) 75%),
    linear-gradient(-45deg, transparent 75%, var(--color-silver) 75%);
  background-size: 40px 40px;
  background-position: 0 0, 0 20px, 20px -20px, -20px 0px;
}

.game-info {
  padding: var(--spacing-xl);
}

.game-name {
  font-size: var(--font-size-2xl);
  margin-bottom: 0.5rem;
}

.game-tagline {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: var(--font-size-base);
}

.game-description {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

.game-status {
  display: inline-block;
  padding: 0.35rem 0.9rem;
  border-radius: var(--radius-full);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-light);
  color: var(--text-muted);
  font-size: var(--font-size-sm);
  font-weight: 500;
  margin-bottom: 1rem;
}

.game-privacy-link {
  display: block;
  margin-top: 1rem;
  color: var(--text-primary);
  font-weight: 500;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .games {
    padding: 5rem 1rem;
  }

  .games-grid {
    gap: 2rem;
  }
}
```

- [ ] **Step 4: Implement Games.tsx**

```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Games.css';

interface Game {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  mockupClass: string;
}

const games: Game[] = [
  {
    slug: 'helicopter',
    name: 'Helicopter Game',
    tagline: 'A fast-paced arcade flying challenge',
    description:
      'Steer your chopper through tight canyons and dodge obstacles in this pick-up-and-play ' +
      'arcade game. Simple one-tap controls, endless runs, and a focus on pure reflexes.',
    mockupClass: 'helicopter-mockup',
  },
  {
    slug: 'ludo',
    name: 'Ludo Game',
    tagline: 'The classic board game, reimagined',
    description:
      'Roll the dice and race your tokens home in this modern take on the timeless family ' +
      'favorite. Play solo against the computer or pass-and-play with friends.',
    mockupClass: 'ludo-mockup',
  },
];

const Games: React.FC = () => {
  return (
    <section className="games">
      <div className="games-container">
        <h1 className="games-title">Our Games</h1>
        <div className="games-grid">
          {games.map((game) => (
            <div className="game-card" key={game.slug}>
              <div className={`game-mockup ${game.mockupClass}`}></div>
              <div className="game-info">
                <h2 className="game-name">{game.name}</h2>
                <p className="game-tagline">{game.tagline}</p>
                <p className="game-description">{game.description}</p>
                <span className="game-status">Coming Soon</span>
                <Link to={`/games/${game.slug}/privacy`} className="game-privacy-link">
                  Privacy Policy
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Games;
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `CI=true npx react-scripts test src/pages/Games.test.tsx --watchAll=false`
Expected: PASS — 1 test passed

- [ ] **Step 6: Commit**

```bash
git add src/pages/Games.tsx src/pages/Games.css src/pages/Games.test.tsx
git commit -m "feat: add Games listing page with placeholder mockups"
```

---

## Task 4: Wire routes into App.tsx and add Footer nav link

**Files:**
- Modify: `src/App.tsx:1-24`
- Modify: `src/components/Footer.tsx:17-20`
- Test: `src/components/Footer.test.tsx` (new)
- Modify: `src/App.test.tsx` (add integration test)

**Interfaces:**
- Consumes: `Games` (Task 3, default export of `src/pages/Games.tsx`), `GamePrivacyPolicy` (Task 2, default export of `src/pages/GamePrivacyPolicy.tsx`, props `gameName: string`, `dataPractices: 'local-only' | 'online-multiplayer'`)
- Produces: live routes `/games`, `/games/helicopter/privacy`, `/games/ludo/privacy`; a "Games" link in the footer with `href="/games"`.

- [ ] **Step 1: Write the failing Footer test**

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

test('renders a Games link pointing to /games', () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
  const gamesLink = screen.getByRole('link', { name: 'Games' });
  expect(gamesLink).toHaveAttribute('href', '/games');
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `CI=true npx react-scripts test src/components/Footer.test.tsx --watchAll=false`
Expected: FAIL — unable to find a link with name `Games`

- [ ] **Step 3: Add the Games link to Footer.tsx**

In `src/components/Footer.tsx`, update the `footer-links` block:

```tsx
          <div className="footer-links">
            <Link to="/games" className="footer-link">Games</Link>
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms of Service</Link>
          </div>
```

- [ ] **Step 4: Run the Footer test to verify it passes**

Run: `CI=true npx react-scripts test src/components/Footer.test.tsx --watchAll=false`
Expected: PASS — 1 test passed

- [ ] **Step 5: Wire the routes into App.tsx**

Replace the full contents of `src/App.tsx`:

```tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Games from './pages/Games';
import GamePrivacyPolicy from './pages/GamePrivacyPolicy';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/games" element={<Games />} />
          <Route
            path="/games/helicopter/privacy"
            element={<GamePrivacyPolicy gameName="Helicopter Game" dataPractices="local-only" />}
          />
          <Route
            path="/games/ludo/privacy"
            element={<GamePrivacyPolicy gameName="Ludo Game" dataPractices="online-multiplayer" />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
```

- [ ] **Step 6: Add an end-to-end navigation test to App.test.tsx**

Add this test to `src/App.test.tsx` (keep the existing hero-headline test from Task 1 in place too):

```tsx
test('navigates from the footer to the games page and a game privacy policy', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('link', { name: 'Games' }));
  expect(screen.getByRole('heading', { name: 'Our Games' })).toBeInTheDocument();

  const helicopterHeading = screen.getByRole('heading', { name: 'Helicopter Game' });
  const helicopterCard = helicopterHeading.closest('.game-card') as HTMLElement;
  const privacyLink = within(helicopterCard).getByRole('link', { name: 'Privacy Policy' });

  fireEvent.click(privacyLink);
  expect(
    screen.getByRole('heading', { name: 'Helicopter Game Privacy Policy' })
  ).toBeInTheDocument();
});
```

Scoping the click to the Helicopter card via `.closest('.game-card')` avoids depending on DOM ordering between the two game cards and the footer's own "Privacy Policy" link (there are three links with that same accessible name once the Games page is showing).

Update the top of `src/App.test.tsx` to import `fireEvent` and `within` alongside `render` and `screen`:

```tsx
import { render, screen, fireEvent, within } from '@testing-library/react';
```

- [ ] **Step 7: Run the full test suite to verify everything passes**

Run: `CI=true npx react-scripts test --watchAll=false`
Expected: PASS — all test suites green (App, GamePrivacyPolicy, Games, Footer)

- [ ] **Step 8: Build the app to confirm there are no compile errors**

Run: `npm run build`
Expected: `Compiled successfully.`

- [ ] **Step 9: Commit**

```bash
git add src/App.tsx src/App.test.tsx src/components/Footer.tsx src/components/Footer.test.tsx
git commit -m "feat: wire up /games routes and add footer navigation link"
```
