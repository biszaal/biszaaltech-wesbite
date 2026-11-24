import React from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import invertalkIcon from '../assets/invertalk-icon.png';
import Seo from '../components/Seo';
import './InvertalkLanding.css';

/**
 * Invertalk's page, and the support URL for its App Store and Google Play listings.
 *
 * Not on a store yet, so there is no store button and no "coming soon": the hero states
 * that plainly (see "content integrity" in DESIGN.md). When the listings go live, swap the
 * status chip for the store links, as on the Cascade page.
 *
 * Every line below is something the 1.0 build does, and the privacy claims match
 * InvertalkPrivacy.tsx: recordings are processed on the phone, never uploaded and deleted
 * after each game; no ads, no purchases, no account; anonymous usage analytics only.
 */

const SUPPORT_EMAIL = 'biszaalgames@gmail.com';

interface Item {
  title: string;
  body: string;
}

const features: Item[] = [
  {
    title: 'Two players, one phone.',
    body: 'Pass the phone between turns. No accounts, no online lobby, nothing to set up.',
  },
  {
    title: 'Hear it backwards.',
    body: 'Your phrase is recorded and played in reverse, ready for your friend to copy.',
  },
  {
    title: 'The reveal.',
    body:
      'Their attempt is flipped forwards, so everyone hears what they really said. Replay it, ' +
      'compare it with the original, or try again.',
  },
  {
    title: 'Your own phrases.',
    body: 'Pick an original, family-friendly starter phrase or type your own.',
  },
  {
    title: 'Recordings stay on your phone.',
    body: 'Audio is processed on the device, never uploaded, and deleted when the game ends.',
  },
  {
    title: 'Share a favourite.',
    body: 'Send a reveal through your phone’s share menu, as an audio clip.',
  },
];

const steps: string[] = [
  'Player 1 picks a phrase and records it.',
  'Invertalk plays the recording backwards.',
  'Hand the phone to Player 2, without showing them the phrase.',
  'Player 2 copies the backwards sound as closely as they can.',
  'The reveal flips their attempt forwards. Spot on, or wonderfully wrong.',
];

const questions: Item[] = [
  {
    title: 'Is my voice uploaded anywhere?',
    body:
      'No. Recordings are processed on your phone and never uploaded. They leave the phone ' +
      'only if you share a reveal yourself.',
  },
  {
    title: 'Why does it need the microphone?',
    body: 'To record the phrase and the imitation. Nothing is recorded in the background.',
  },
  {
    title: 'Do I need an internet connection?',
    body: 'No. Recording, reversing and the reveal all work offline.',
  },
  {
    title: 'Is there a score?',
    body: 'No. There is no scoring or judging. The reveal is the point.',
  },
  {
    title: 'Are there ads or in-app purchases?',
    body: 'No.',
  },
];

const InvertalkLanding: React.FC = () => {
  const heroRef = useReveal<HTMLDivElement>();
  const featuresRef = useReveal<HTMLDivElement>();
  const playRef = useReveal<HTMLDivElement>();
  const supportRef = useReveal<HTMLDivElement>();

  return (
    <main id="main" className="world-dark invertalk-page">
      <Seo title="Invertalk — Biszaal Games" canonical="https://www.biszaaltech.com/games/invertalk" />

      <section className="invertalk-hero">
        <div className="container invertalk-hero-inner reveal" ref={heroRef}>
          <div className="invertalk-hero-art">
            <img
              src={invertalkIcon}
              alt="Invertalk game icon: a white speech bubble holding a sound wave and its reflection"
              className="invertalk-icon"
            />
          </div>
          <div className="invertalk-hero-copy">
            <span className="eyebrow">Biszaal Games</span>
            <h1>Say it backwards.</h1>
            <p className="invertalk-lead">
              Invertalk is a party game for two people and one phone. One of you says a phrase,
              the other copies it played backwards, and the reveal flips their attempt forwards.
            </p>
            <p className="mono-meta invertalk-hero-meta">Party · 2 players · iOS &amp; Android</p>
            <p className="invertalk-availability">Not on the stores yet.</p>
            <p className="invertalk-smallprint">No ads, no in-app purchases, no sign-up.</p>
          </div>
        </div>
      </section>

      <section className="invertalk-features">
        <div className="container invertalk-section-inner reveal" ref={featuresRef}>
          <h2>What you get.</h2>
          <ul className="invertalk-grid">
            {features.map((item) => (
              <li key={item.title} className="shell invertalk-card">
                <div className="shell-core invertalk-card-core">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="invertalk-play">
        <div className="container invertalk-section-inner reveal" ref={playRef}>
          <h2>How to play.</h2>
          <ol className="invertalk-steps">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="invertalk-support" id="support">
        <div className="container invertalk-section-inner reveal" ref={supportRef}>
          <h2>Support.</h2>
          <p className="invertalk-support-lead">
            Found a bug or have an idea? Email{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-link">
              {SUPPORT_EMAIL}
            </a>{' '}
            and we will get back to you.
          </p>
          <ul className="invertalk-grid invertalk-grid--faq">
            {questions.map((item) => (
              <li key={item.title} className="shell invertalk-card">
                <div className="shell-core invertalk-card-core">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="invertalk-links">
            <Link to="/games/invertalk/privacy" className="text-link">Privacy policy</Link>
            <Link to="/games" className="text-link">More Biszaal games</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default InvertalkLanding;
