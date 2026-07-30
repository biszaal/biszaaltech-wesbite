import React from 'react';
import './LegalPages.css';

interface GamePrivacyPolicyProps {
  gameName: string;
  dataPractices: 'local-only' | 'online-multiplayer';
  /** Serves ads through Google AdMob (advertising identifier, consent, ATT). */
  hasAds?: boolean;
  /** Sells optional in-app purchases (processed by the app stores via RevenueCat). */
  hasInAppPurchases?: boolean;
}

const GamePrivacyPolicy: React.FC<GamePrivacyPolicyProps> = ({
  gameName,
  dataPractices,
  hasAds = false,
  hasInAppPurchases = false,
}) => {
  const isOnline = dataPractices === 'online-multiplayer';

  return (
    <main id="main" className="legal-page">
      <div className="legal-container">
        <h1>{gameName} Privacy Policy</h1>
        <p className="last-updated">Last updated: July 28, 2026</p>

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
                you. By default this account is not linked to your name, email address, or phone
                number.
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
                {gameName} includes in-game virtual currencies (coins and gems) and cosmetic items.
                We store your balances and the items and entitlements linked to your account so
                they are available when you return.
              </p>
              <p>
                Saving your account is optional. If you choose to save it — so your progress carries
                to a new device — you provide an email address and password, which we store so you
                can sign back in. You can otherwise keep playing as a guest indefinitely without
                providing them.
              </p>
              {hasAds && (
                <p>
                  When ads are shown, our advertising partner (Google AdMob) may access your
                  device's advertising identifier and limited device, network, and usage
                  information to deliver and measure those ads. See "Third-Party Services" below,
                  including the choices available to you.
                </p>
              )}
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
          {isOnline ? (
            <>
              <p>
                {gameName} uses Supabase, a third-party backend and database provider, to store the
                account, profile, friend, room-invite, currency, and entitlement data described
                above, and to synchronize real-time game state between players.
              </p>
              {hasInAppPurchases && (
                <p>
                  Optional in-app purchases (gem packs) are processed by the Apple App Store or
                  Google Play and managed through RevenueCat, a purchase-infrastructure provider.
                  Your payment is handled entirely by the app store — we never receive or store your
                  card or payment details. RevenueCat receives the purchase receipt and an
                  app-assigned account identifier so the purchase can be credited to your account.
                </p>
              )}
              {hasAds && (
                <>
                  <p>
                    {gameName} shows ads through Google AdMob. To do this, AdMob and Google may
                    collect and process your device's advertising identifier and limited device,
                    network, and usage information to select, deliver, cap, and measure ads and to
                    detect invalid activity. Depending on your consent and settings, ads may be
                    personalized (interest-based) or non-personalized.
                  </p>
                  <p>
                    In the UK and EEA we present Google's consent form (via Google's User Messaging
                    Platform) before ads are requested, and on iOS the system App Tracking
                    Transparency prompt asks whether apps may track you. You can change these
                    choices at any time (see "Your Rights and Choices").
                  </p>
                </>
              )}
              <p>
                You can review each provider's privacy practices:{' '}
                <a href="https://supabase.com/privacy" target="_blank" rel="noreferrer">Supabase</a>
                {hasAds && (
                  <>
                    ,{' '}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                      Google / AdMob
                    </a>
                  </>
                )}
                {hasInAppPurchases && (
                  <>
                    ,{' '}
                    <a href="https://www.revenuecat.com/privacy" target="_blank" rel="noreferrer">
                      RevenueCat
                    </a>
                  </>
                )}
                .
              </p>
            </>
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
              {gameName} is not directed to children under 13 (or the minimum age required in your
              country), and we do not knowingly collect personal information from children beyond
              the self-chosen display name and avatar described above.
              {hasAds
                ? ' Advertising is provided by Google AdMob; we do not knowingly enable personalized' +
                  ' (interest-based) advertising for children.'
                : ''}{' '}
              We take appropriate steps to comply with applicable children's privacy laws, including
              COPPA and UK data protection requirements, for the information we collect.
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
              Account, profile, friend, room-invite, currency, and entitlement data is protected
              using Supabase's row-level security, which restricts each player to their own data
              and the game state they are actively part of.
              {hasInAppPurchases
                ? ' Payments are handled by the Apple App Store or Google Play and are never' +
                  ' processed on our servers.'
                : ''}{' '}
              We follow reasonable security practices in how we develop and maintain the app.
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
          <h2>6. Your Rights and Choices</h2>
          <p>Under UK and EU data protection law, you have the right to:</p>
          <ul>
            <li>Request access to any personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>
              Request deletion of your data
              {isOnline
                ? ', including your account, saved email, profile, friend connections, currency balances, and room invites'
                : ''}
            </li>
            <li>Object to processing of your data</li>
            <li>Request data portability</li>
          </ul>
          {hasAds && (
            <p>
              You can also control ad personalization at any time: on iOS, through Settings ›
              Privacy &amp; Security › Tracking (App Tracking Transparency); on Android, by resetting
              or deleting your advertising ID in your device settings; and, in the UK and EEA, by
              reopening the in-app consent options. Choosing non-personalized ads does not remove
              ads — it makes them non-interest-based.
            </p>
          )}
        </section>

        <section>
          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time — for example, if we change the
            third-party services {gameName} uses. We will post any changes on this page with an
            updated "Last updated" date.
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
