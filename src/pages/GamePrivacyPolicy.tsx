import React from 'react';
import './LegalPages.css';

interface GamePrivacyPolicyProps {
  gameName: string;
  dataPractices: 'local-only' | 'online-multiplayer';
}

const GamePrivacyPolicy: React.FC<GamePrivacyPolicyProps> = ({ gameName, dataPractices }) => {
  const isOnline = dataPractices === 'online-multiplayer';

  return (
    <main id="main" className="legal-page">
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
          {isOnline ? (
            <p>
              {gameName} does not knowingly collect any personal information from children or any
              other user, regardless of age, beyond the self-chosen display name and avatar
              described above. We take appropriate steps to comply with applicable children's
              privacy laws, including COPPA and UK data protection requirements, for the
              information we do collect, and will do so for any further data collection we
              introduce in the future.
            </p>
          ) : (
            <p>
              {gameName} does not knowingly collect any personal information from children or any
              other user, regardless of age. If we introduce any data collection in the future, we
              will take appropriate steps to comply with applicable children's privacy laws,
              including COPPA and UK data protection requirements.
            </p>
          )}
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
    </main>
  );
};

export default GamePrivacyPolicy;
