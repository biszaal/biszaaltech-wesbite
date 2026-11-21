import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { detectPlatform } from '../utils/platform';
import { LUDO_APP_STORE, LUDO_PLAY_STORE } from '../data/projects';
import ludoIcon from '../assets/ludo-icon.svg';
import Seo from '../components/Seo';
import './LudoLanding.css';

/**
 * The landing page behind the Instagram ad. Two jobs, in this order: show the
 * game, then get the visitor into the right store.
 *
 * Nothing on this page may claim a price. The store listings decide that, and
 * the privacy page already documents rewarded ads and gem packs — see the
 * "content integrity" rules in DESIGN.md.
 */

/** Seconds on the clock before a phone is sent to its store. */
const REDIRECT_SECONDS = 3;

/**
 * Set before the countdown starts, not after it fires, so returning with the
 * back button lands on the page instead of bouncing straight back out.
 */
const SESSION_KEY = 'ludo-store-redirect';

/** sessionStorage throws outright in some private-browsing modes. */
function readRedirected(): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function markRedirected(): void {
  try {
    window.sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    /* no session storage: the countdown simply runs again on a return visit */
  }
}

interface Feature {
  title: string;
  body: string;
}

/**
 * Every line here is backed by something already shipped — the modes in
 * data/projects.ts, and the account data enumerated on the delete-account and
 * privacy pages. Do not add a feature the game cannot be shown to have.
 */
const features: Feature[] = [
  {
    title: 'Online multiplayer.',
    body:
      'Open a room and invite friends, or add them by friend code and play whoever ' +
      'is online.',
  },
  {
    title: 'Or nobody at all.',
    body:
      'Face the computer on your own, or pass one phone around the table for ' +
      'two to four players.',
  },
  {
    title: 'The rules you know.',
    body:
      'Captures send a piece all the way home, safe squares protect the ones ' +
      'that get there, and the board plays it straight.',
  },
  {
    title: 'Pieces worth playing with.',
    body:
      'Avatars and dice skins, unlocked with the coins and gems you collect as ' +
      'you play.',
  },
  {
    title: 'A record that sticks.',
    body:
      'Match statistics and a win/loss record, kept on your account rather than ' +
      'reset every time you close the app.',
  },
  {
    title: 'An account is optional.',
    body:
      'Play without one. Save one and your progress, friends and unlocks follow ' +
      'you to your next phone.',
  },
];

/** The app's friend-code alphabet: six characters, no O/0/I/1. */
const FRIEND_CODE = /^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{6}$/;

/**
 * The Play link with an install referrer, which Google Play hands back to the
 * app on its first launch. A friend's code in it records who invited the new
 * player, with nothing to type; otherwise it just says the install came from
 * this page.
 */
function playStoreUrl(friend: string | null): string {
  const referrer = friend
    ? `utm_source=invite&utm_medium=friend&friend=${friend}`
    : 'utm_source=website&utm_medium=landing';
  return `${LUDO_PLAY_STORE}&referrer=${encodeURIComponent(referrer)}`;
}

const LudoLanding: React.FC = () => {
  const [params] = useSearchParams();
  const rawRoom = params.getAll('room');
  const invite = rawRoom.length === 1 && /^[A-Za-z0-9]{4}$/.test(rawRoom[0]) ? rawRoom[0].toUpperCase() : null;
  const rawFriend = params.getAll('friend');
  const friend =
    rawFriend.length === 1 && FRIEND_CODE.test(rawFriend[0].toUpperCase()) ? rawFriend[0].toUpperCase() : null;
  const playUrl = playStoreUrl(friend);
  const heroRef = useReveal<HTMLDivElement>();
  const featuresRef = useReveal<HTMLDivElement>();
  const closeRef = useReveal<HTMLDivElement>();

  const platform = useMemo(() => detectPlatform(), []);
  const isAndroid = platform === 'android';
  const storeUrl = isAndroid ? playUrl : LUDO_APP_STORE;
  // The App Store carries no referrer, so an iPhone visitor with a friend's
  // code stays here long enough to see it.
  const friendNeedsCode = friend !== null && !isAndroid;
  const storeLabel = isAndroid ? 'Google Play' : 'the App Store';

  /** null = no countdown running, either never started or cancelled. */
  const [countdown, setCountdown] = useState<number | null>(null);
  const cancel = useCallback(() => setCountdown(null), []);

  useEffect(() => {
    // Desktop, unrecognised agents and bots get the page and nothing else.
    if (invite || friendNeedsCode || platform === 'other' || readRedirected()) return;
    markRedirected();
    setCountdown(REDIRECT_SECONDS);
  }, [platform, invite, friendNeedsCode]);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      window.location.href = storeUrl;
      return;
    }
    const timer = window.setTimeout(
      () => setCountdown((n) => (n === null ? null : n - 1)),
      1000
    );
    return () => window.clearTimeout(timer);
  }, [countdown, storeUrl]);

  const appStore = (
    <a
      href={LUDO_APP_STORE}
      target="_blank"
      rel="noopener noreferrer"
      className={isAndroid ? 'text-link' : 'pill-btn pill-btn--accent'}
      onClick={cancel}
    >
      Download on the App Store
      {!isAndroid && <span className="btn-orb" aria-hidden="true">↗</span>}
    </a>
  );

  const playStore = (
    <a
      href={playUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={isAndroid ? 'pill-btn pill-btn--accent' : 'text-link'}
      onClick={cancel}
    >
      Get it on Google Play
      {isAndroid && <span className="btn-orb" aria-hidden="true">↗</span>}
    </a>
  );

  return (
    <main id="main" className="world-dark ludo-page">
      <Seo
        title="Ludo Classic: Board Game — Biszaal Games"
        canonical="https://www.biszaaltech.com/games/ludo"
      />

      {invite && (
        <section className="container" aria-labelledby="invite-heading" style={{ paddingTop: '2rem' }}>
          <h1 id="invite-heading">You’re invited to play Ludo</h1>
          <p>Room code: <strong>{invite}</strong>. Keep this code if you need to install the game first.</p>
          <a className="pill-btn pill-btn--accent" href={`ludobiszaal://join/${invite}`}>Open room in Ludo</a>
          <p>If Ludo doesn’t open, install it below, then choose Friends room and enter the code.</p>
          <p>The room may expire before you join. Ask your friend for a new code if needed.</p>
        </section>
      )}
      {friendNeedsCode && (
        <section className="container" aria-labelledby="friend-heading" style={{ paddingTop: '2rem' }}>
          <h1 id="friend-heading">Your friend wants to play Ludo with you</h1>
          <p>Their friend code: <strong>{friend}</strong></p>
          <p>Install Ludo below, then open Friends › Add friend and enter this code.</p>
        </section>
      )}
      <section className="ludo-hero">
        <div className="container ludo-hero-inner reveal" ref={heroRef}>
          <div className="ludo-hero-art">
            <img
              src={ludoIcon}
              alt="Ludo game icon: colourful pawns and a die beneath a golden crown"
              className="ludo-icon"
            />
          </div>
          <div className="ludo-hero-copy">
            <span className="eyebrow">Biszaal Games</span>
            <h1>Roll. Race. Send them home.</h1>
            <p className="ludo-lead">
              Ludo Classic is the board game you already know how to play, with
              online multiplayer, a computer opponent and pass-and-play on one
              phone. Out now on iOS and Android.
            </p>
            <p className="mono-meta ludo-hero-meta">Board · 2–4 players · iOS &amp; Android</p>
            <div className="ludo-actions">
              {isAndroid ? (
                <>
                  {playStore}
                  {appStore}
                </>
              ) : (
                <>
                  {appStore}
                  {playStore}
                </>
              )}
            </div>
            <p className="ludo-smallprint">
              Contains ads and optional in-app purchases.
            </p>
          </div>
        </div>
      </section>

      <section className="ludo-features">
        <div className="container ludo-features-inner reveal" ref={featuresRef}>
          <h2>What you get.</h2>
          <ul className="ludo-feature-grid">
            {features.map((feature) => (
              <li key={feature.title} className="shell ludo-feature">
                <div className="shell-core ludo-feature-core">
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ludo-close">
        <div className="container ludo-close-inner reveal" ref={closeRef}>
          <h2>Get the board out.</h2>
          <div className="ludo-actions ludo-actions--centred">
            {isAndroid ? (
              <>
                {playStore}
                {appStore}
              </>
            ) : (
              <>
                {appStore}
                {playStore}
              </>
            )}
          </div>
          <p className="ludo-links">
            <Link to="/games/ludo/privacy" className="text-link">Privacy policy</Link>
            <Link to="/games/ludo/delete-account" className="text-link">Delete your account</Link>
            <Link to="/games" className="text-link">More Biszaal games</Link>
          </p>
        </div>
      </section>

      {countdown !== null && (
        <div className="ludo-redirect">
          <div className="container ludo-redirect-inner">
            {/*
              role="alert" announces once when the bar appears. The ticking
              number is hidden from it so a screen reader is not read a fresh
              countdown every second.
            */}
            <p className="mono-meta ludo-redirect-text" role="alert">
              Opening {storeLabel}
              {countdown > 0 && <span aria-hidden="true"> in {countdown}</span>}…
            </p>
            <button type="button" className="ludo-redirect-cancel" onClick={cancel}>
              Stay on this page
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default LudoLanding;
