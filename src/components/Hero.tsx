import React from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import './Hero.css';

const facts = ['Founded 2025', 'Independent studio', 'Remote worldwide', 'iOS · Android · Web'];

const Hero: React.FC = () => {
  const copyRef = useReveal<HTMLDivElement>();
  const visualRef = useReveal<HTMLDivElement>();

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy reveal" ref={copyRef}>
          <span className="eyebrow">Biszaal Tech · Bishal Aryal</span>
          <h1 className="hero-headline">
            We build the <em>software</em> you have in mind.
          </h1>
          <p className="hero-sub">
            An independent software studio run by Bishal Aryal. We build mobile apps,
            websites, backends and the design that holds them together — for people
            with an idea and businesses with a problem.
          </p>
          <div className="hero-actions">
            <Link to="/#contact" className="pill-btn pill-btn--accent">
              Start a project
              <span className="btn-orb" aria-hidden="true">→</span>
            </Link>
            <Link to="/projects" className="text-link">
              See what we've built
            </Link>
          </div>
        </div>

        {/* Two surfaces, one system — a website and an app, drawn as wireframes.
            Pure DOM: no image assets, no invented UI, no numbers. */}
        <div className="hero-visual reveal reveal-delay-2" ref={visualRef}>
          <div
            className="hero-stage"
            role="img"
            aria-label="A website layout and a mobile app screen, drawn as wireframes"
          >
            <div className="shell hero-window">
              <div className="shell-core hero-window-core">
                <div className="hero-chrome" aria-hidden="true">
                  <span className="hero-chrome-tab" />
                  <span className="hero-chrome-bar" />
                </div>
                <div className="hero-wire" aria-hidden="true">
                  <span className="hero-wire-band hero-wire-band--accent" />
                  <span className="hero-wire-line hero-wire-line--long" />
                  <span className="hero-wire-line hero-wire-line--short" />
                  <div className="hero-wire-row">
                    <span className="hero-wire-tile" />
                    <span className="hero-wire-tile" />
                    <span className="hero-wire-tile" />
                  </div>
                </div>
              </div>
            </div>

            <div className="shell hero-handset">
              <div className="shell-core hero-handset-core" aria-hidden="true">
                <span className="hero-handset-notch" />
                <span className="hero-wire-band hero-wire-band--solid" />
                <span className="hero-wire-line hero-wire-line--long" />
                <div className="hero-wire-stack">
                  <span className="hero-wire-card" />
                  <span className="hero-wire-card" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <ul className="hero-facts" aria-label="Studio facts">
          {facts.map((fact) => (
            <li key={fact} className="mono-meta">{fact}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Hero;
