import React from 'react';
import './LegalPages.css';

interface GamePrivacyPolicyProps {
  gameName: string;
  dataPractices: 'local-only' | 'online-multiplayer';
  /** Serves ads through Google AdMob (advertising identifier, consent, ATT). */
  hasAds?: boolean;
  /** Sells optional in-app purchases (processed by the app stores via RevenueCat). */
  hasInAppPurchases?: boolean;
  /** Registers a device push token to deliver room invites and friend requests. */
  hasPushNotifications?: boolean;
  /** Path to this game's account deletion page, when it has one (Play requires it). */
  deleteAccountPath?: string;
  /** Shown to players; only bump it for the game whose practices actually changed. */
  lastUpdated?: string;
}

const GamePrivacyPolicy: React.FC<GamePrivacyPolicyProps> = ({
  gameName,
  dataPractices,
  hasAds = false,
  hasInAppPurchases = false,
  hasPushNotifications = false,
  deleteAccountPath,
  lastUpdated = 'July 28, 2026',
}) => {
  const isOnline = dataPractices === 'online-multiplayer';

  // Sections are numbered as they render, so a section that only applies to one
  // variant (data retention, below) doesn't leave a gap in the other.
  let sectionNumber = 0;
  const next = () => (sectionNumber += 1);

  return (
    <main id="main" className="legal-page">
      <div className="legal-container">
        <h1>{gameName} Privacy Policy</h1>
        <p className="last-updated">Last updated: {lastUpdated}</p>

        <section>
          <h2>{next()}. Introduction</h2>
          <p>
            BISZAAL TECH LTD ("we," "our," or "us") develops {gameName}. This privacy policy
            explains what information {gameName} collects (if any), how it is used, and your
            rights regarding that information.
          </p>
        </section>

        <section>
          <h2>{next()}. Information We Collect</h2>
          {isOnline ? (
            <>
              <p>
                To play {gameName} online with other players, we create an anonymous account for
                you. By default this account is not linked to your name, email address, or phone
                number.
              </p>
              <p>
                You choose a username (up to 20 characters) and an avatar, both of which are
                visible to other players you interact with. Usernames are unique, and other players
                can find you by entering your exact username or the friend code shown in the game —
                so please don't use your full name or anything else you would rather not share.
                Your username can be changed once.
              </p>
              <p>
                If you add friends within the game, we store the connection between your account
                and theirs, along with the status of that request, and your friends can see when
                you were last active in the game. If you invite someone to a game room, we store
                the room code, the entry stake, and both accounts involved until the invite is
                accepted, declined, or expires.
              </p>
              <p>
                {gameName} includes in-game virtual currencies (coins and gems) and cosmetic items.
                We store your balances, the items and entitlements linked to your account, your
                daily-bonus streak, and a record of rewarded ads you have chosen to watch so that
                daily reward limits can be applied fairly.
              </p>
              {hasPushNotifications && (
                <p>
                  If you allow notifications, we store a push token issued by your device's
                  operating system, which platform it came from (iOS or Android), and the account it
                  belongs to, so we can tell you when a friend invites you to a room or sends you a
                  friend request. We ask for permission at the point it becomes useful rather than
                  at first launch, and the game works normally if you decline. Turning notifications
                  off in the game (Settings › Notifications) deletes the token from our servers.
                </p>
              )}
              <p>
                Saving your account is optional. If you choose to save it — so your progress carries
                to a new device — you provide an email address and password, which we store so you
                can sign back in. You can otherwise keep playing as a guest indefinitely without
                providing them. So that reinstalling the game doesn't cost you your progress, a
                sign-in token is also kept in your device's secure storage (the iOS Keychain or
                Android Keystore). On iOS that storage can outlive deleting the app, which means
                reinstalling returns you to the same account rather than a new one; deleting your
                account in the game clears it.
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
          <h2>{next()}. Third-Party Services</h2>
          {isOnline ? (
            <>
              <p>
                {gameName} uses Supabase, a third-party backend and database provider, to store the
                account, profile, friend, room-invite, currency, and entitlement data described
                above, and to synchronize real-time game state between players.
              </p>
              {hasPushNotifications && (
                <p>
                  Notifications are delivered through Expo's push notification service, which hands
                  the message to Apple's or Google's notification system for delivery to your
                  device. Expo receives the push token and the contents of the notification (for
                  example, that a named player has invited you to a room). No other account data is
                  shared with them.
                </p>
              )}
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
                {hasPushNotifications && (
                  <>
                    ,{' '}
                    <a href="https://expo.dev/privacy" target="_blank" rel="noreferrer">Expo</a>
                  </>
                )}
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
          <h2>{next()}. Children's Privacy</h2>
          {isOnline ? (
            <p>
              {gameName} is not directed to children under 13 (or the minimum age required in your
              country), and we do not knowingly collect personal information from children beyond
              the self-chosen username and avatar described above.
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
          <h2>{next()}. Data Security</h2>
          {isOnline ? (
            <p>
              Account, profile, friend, room-invite, currency, and entitlement data is protected
              using Supabase's row-level security, which restricts each player to their own data
              and the game state they are actively part of.
              {hasPushNotifications
                ? ' Push tokens are stored so that only our server can read them — no other player' +
                  ' can see or send to your device.'
                : ''}
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

        {isOnline && (
          <section>
            <h2>{next()}. How Long We Keep Your Data</h2>
            <p>
              Your account and the profile, friend, currency, and entitlement data attached to it
              are kept until you delete your account or ask us to delete them. That includes the
              record of your coin and gem transactions and any purchases, which we keep for as long
              as the account exists so we can answer a question about where a balance went.
            </p>
            <p>
              Match data is kept only as long as it is useful, and is then deleted automatically:
              individual moves are removed 24 hours after they are played, finished games 7 days
              after they end, and a game abandoned part-way through is cleared a day after the last
              move (any entry stake is refunded when that happens). Rooms nobody started go sooner —
              within 15 minutes for a quick match, and within a day for a private room. The record
              of a rewarded ad you chose to watch is removed after 7 days.
              {hasPushNotifications
                ? ' A push token is removed as soon as you turn notifications off, when your device' +
                  ' reports that it no longer accepts them, or with your account.'
                : ''}
            </p>
            <p>
              You can delete your account from the Account screen inside the game, which removes the
              account and the data linked to it.
              {deleteAccountPath && (
                <>
                  {' '}Our <a href={deleteAccountPath}>account deletion page</a> sets out the steps,
                  what is deleted, and what is kept afterwards.
                </>
              )}
            </p>
          </section>
        )}

        <section>
          <h2>{next()}. Your Rights and Choices</h2>
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
          {hasPushNotifications && (
            <p>
              You can turn notifications off at any time in the game under Settings › Notifications,
              or in your device's notification settings. Doing it in the game also deletes the push
              token we hold for that device.
            </p>
          )}
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
          <h2>{next()}. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time — for example, if we change the
            third-party services {gameName} uses. We will post any changes on this page with an
            updated "Last updated" date.
          </p>
        </section>

        <section>
          <h2>{next()}. Contact Us</h2>
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
