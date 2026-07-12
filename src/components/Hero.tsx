import React from 'react';
import { useReveal } from '../hooks/useReveal';
import './Hero.css';

const facts = ['Founded 2025', 'London, UK', 'Company № 16693100', 'Free on iOS'];

const Hero: React.FC = () => {
  const copyRef = useReveal<HTMLDivElement>();
  const mockRef = useReveal<HTMLDivElement>();

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy reveal" ref={copyRef}>
          <span className="eyebrow">Biszaal Tech · London</span>
          <h1 className="hero-headline">
            Know where every <em>pound</em> goes.
          </h1>
          <p className="hero-sub">
            Expenzez is our free expense tracker built in London — manual entry, CSV
            import, and clean analytics that make sense of your spending. Available
            now on iOS.
          </p>
          <div className="hero-actions">
            <a
              href="https://expenzez.com"
              target="_blank"
              rel="noopener noreferrer"
              className="pill-btn pill-btn--accent"
            >
              Open Expenzez
              <span className="btn-orb" aria-hidden="true">↗</span>
            </a>
            <a
              href="https://apps.apple.com/us/app/expenzez/id6751338089"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Download for iOS
            </a>
          </div>
        </div>

        <div className="hero-visual reveal reveal-delay-2" ref={mockRef}>
          <div className="shell phone-shell">
            <div className="shell-core phone-core" role="img" aria-label="Preview of the Expenzez app dashboard">
              <div className="phone-notch" />
              <div className="phone-app-title mono-meta">Expenzez</div>
              <div className="phone-balance">
                <span className="phone-balance-label mono-meta">Total balance</span>
                <span className="phone-balance-value">£2,847.32</span>
              </div>
              <div className="phone-chart">
                <span style={{ height: '34%' }} />
                <span style={{ height: '58%' }} />
                <span style={{ height: '42%' }} />
                <span style={{ height: '78%' }} />
                <span style={{ height: '52%' }} />
                <span style={{ height: '66%' }} />
                <span style={{ height: '88%' }} />
              </div>
              <div className="phone-rows">
                <div className="phone-row">
                  <span className="phone-row-dot" />
                  <span className="phone-row-name">Groceries</span>
                  <span className="phone-row-amt">−£54.20</span>
                </div>
                <div className="phone-row">
                  <span className="phone-row-dot" />
                  <span className="phone-row-name">Transport</span>
                  <span className="phone-row-amt">−£12.65</span>
                </div>
                <div className="phone-row">
                  <span className="phone-row-dot" />
                  <span className="phone-row-name">Salary</span>
                  <span className="phone-row-amt phone-row-amt--in">+£2,150.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <ul className="hero-facts" aria-label="Company facts">
          {facts.map((fact) => (
            <li key={fact} className="mono-meta">{fact}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Hero;
