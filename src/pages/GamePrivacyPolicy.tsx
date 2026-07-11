import React from 'react';
import './LegalPages.css';

interface GamePrivacyPolicyProps {
  gameName: string;
}

const GamePrivacyPolicy: React.FC<GamePrivacyPolicyProps> = ({ gameName }) => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>{gameName} Privacy Policy</h1>
        <p className="last-updated">Last updated: July 5, 2026</p>

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
          <p>
            {gameName} does not currently collect any personal information. Your game progress,
            settings, and high scores are stored locally on your device only and are never
            transmitted to us or any third party. No account, sign-in, or personal details are
            required to play.
          </p>
        </section>

        <section>
          <h2>3. Third-Party Services</h2>
          {/* Update this section before integrating AdMob or any analytics SDK into this game. */}
          <p>
            {gameName} does not currently integrate any third-party advertising, analytics, or
            tracking services. Should we introduce services such as advertising (for example,
            Google AdMob) or analytics in a future update, we will update this policy in advance
            of that change, and the current version will always be published at this page.
          </p>
        </section>

        <section>
          <h2>4. Children's Privacy</h2>
          <p>
            {gameName} does not knowingly collect any personal information from children or any
            other user, regardless of age. If we introduce any data collection in the future, we
            will take appropriate steps to comply with applicable children's privacy laws,
            including COPPA and UK data protection requirements.
          </p>
        </section>

        <section>
          <h2>5. Data Security</h2>
          <p>
            Because {gameName} stores data locally on your device rather than on our servers,
            your game data remains under your control at all times. We still follow reasonable
            security practices in how we develop and maintain the app.
          </p>
        </section>

        <section>
          <h2>6. Your Rights</h2>
          <p>Under UK data protection law, you have the right to:</p>
          <ul>
            <li>Request access to any personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
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
