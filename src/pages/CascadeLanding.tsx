import React from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import cascadeIcon from '../assets/cascade-icon.png';
import Seo from '../components/Seo';
import './CascadeLanding.css';

/**
 * Cascade's page, and the support URL on its App Store listing.
 *
 * Unlike the Ludo page this is not an ad landing: the game is not on a store yet, so there
 * is no store to redirect to and no store link to show. Add the App Store link, and move the
 * status line to "Out now", in the same change that adds `appStoreUrl` on the games page.
 *
 * Every feature line is something the shipped 1.0 build does - see "content integrity" in
 * DESIGN.md. It has no ads, purchases or account, which the privacy page also states.
 */

const SUPPORT_EMAIL = 'biszaalgames@gmail.com';

interface Item {
  title: string;
  body: string;
}

const features: Item[] = [
  {
    title: '100 hand-built levels.',
    body:
      'Ten chapters across two worlds, each introducing one new idea on a gentle board ' +
      'before testing it on a hard one.',
  },
  {
    title: 'Face-down tokens.',
    body:
      'Some tokens stay hidden until you dig down to them, so you plan around what you ' +
      'cannot see yet.',
  },
  {
    title: 'Anchors that never move.',
    body:
      'An anchored token fixes its lane’s colour from the first move, and the board has to ' +
      'be solved around it.',
  },
  {
    title: 'Every move counts.',
    body:
      'Solve in fewer moves for more stars. Undo freely, restart any time, and take a hint ' +
      'when you are stuck.',
  },
  {
    title: 'A daily puzzle.',
    body: 'One board a day, the same for everyone, and it works with no connection at all.',
  },
  {
    title: 'Made for everyone.',
    body:
      'A colourblind-friendly palette with shape cues, and every lane described aloud to ' +
      'VoiceOver.',
  },
];

const steps: string[] = [
  'Every lane should end up holding a single colour.',
  'Tap a lane to lift its top token, then tap another lane to drop it there.',
  'A token can only land on an empty lane, or on a token of the same colour.',
  'One tap-pair moves exactly one token. The fewer moves you use, the more stars you earn.',
];

const questions: Item[] = [
  {
    title: 'Is my progress saved?',
    body: 'Yes, on your device, after every level you solve.',
  },
  {
    title: 'Can I move my progress to a new phone?',
    body: 'Not yet. Progress is stored only on the device you play on.',
  },
  {
    title: 'How do I start over?',
    body: 'Settings, then Reset everything. This cannot be undone.',
  },
  {
    title: 'Do I need an internet connection?',
    body: 'No. Every level, including the daily puzzle, works fully offline.',
  },
  {
    title: 'Are there ads or in-app purchases?',
    body: 'No.',
  },
];

const CascadeLanding: React.FC = () => {
  const heroRef = useReveal<HTMLDivElement>();
  const featuresRef = useReveal<HTMLDivElement>();
  const playRef = useReveal<HTMLDivElement>();
  const supportRef = useReveal<HTMLDivElement>();

  return (
    <main id="main" className="world-dark cascade-page">
      <Seo
        title="Cascade: Colour Sorting — Biszaal Games"
        canonical="https://www.biszaaltech.com/games/cascade"
      />

      <section className="cascade-hero">
        <div className="container cascade-hero-inner reveal" ref={heroRef}>
          <div className="cascade-hero-art">
            <img
              src={cascadeIcon}
              alt="Cascade game icon: three dark lanes holding green, orange and blue discs"
              className="cascade-icon"
            />
          </div>
          <div className="cascade-hero-copy">
            <span className="eyebrow">Biszaal Games</span>
            <h1>One token at a time.</h1>
            <p className="cascade-lead">
              Cascade is a calm colour-sorting puzzle. Every lane should end up one colour, you move
              a single token at a time, and the fewer moves it takes, the better you played.
            </p>
            <p className="mono-meta cascade-hero-meta">Puzzle · 1 player · iPhone &amp; iPad</p>
            <p className="cascade-status">Coming soon to the App Store</p>
            <p className="cascade-smallprint">No ads, no in-app purchases, no account.</p>
          </div>
        </div>
      </section>

      <section className="cascade-features">
        <div className="container cascade-section-inner reveal" ref={featuresRef}>
          <h2>What you get.</h2>
          <ul className="cascade-grid">
            {features.map((item) => (
              <li key={item.title} className="shell cascade-card">
                <div className="shell-core cascade-card-core">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cascade-play">
        <div className="container cascade-section-inner reveal" ref={playRef}>
          <h2>How to play.</h2>
          <ol className="cascade-steps">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="cascade-support" id="support">
        <div className="container cascade-section-inner reveal" ref={supportRef}>
          <h2>Support.</h2>
          <p className="cascade-support-lead">
            Stuck, found a bug, or have an idea? Email{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-link">
              {SUPPORT_EMAIL}
            </a>{' '}
            and we will get back to you.
          </p>
          <ul className="cascade-grid cascade-grid--faq">
            {questions.map((item) => (
              <li key={item.title} className="shell cascade-card">
                <div className="shell-core cascade-card-core">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="cascade-links">
            <Link to="/games/cascade/privacy" className="text-link">Privacy policy</Link>
            <Link to="/games" className="text-link">More Biszaal games</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default CascadeLanding;
