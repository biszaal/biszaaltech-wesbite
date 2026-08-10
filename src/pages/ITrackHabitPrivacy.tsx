import React from 'react';
import './LegalPages.css';

/**
 * Privacy policy for the iTrackHabit mobile app (iOS/Android).
 *
 * iTrackHabit v1 ships offline-only — no accounts, no server, on-device SQLite
 * as the source of truth (see `frontend/src/config/runtime.ts` in the app repo).
 * Keep this page in step with that flag: if sync or accounts are ever restored,
 * this policy has to be rewritten before the build ships.
 */
const ITrackHabitPrivacy: React.FC = () => {
  return (
    <main id="main" className="legal-page">
      <div className="legal-container">
        <h1>iTrackHabit Privacy Policy</h1>
        <p className="last-updated">Last updated: August 10, 2026</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            BISZAAL TECH LTD ("we," "our," or "us") develops iTrackHabit, a habit tracker for
            iOS and Android. This privacy policy explains what information the app handles, where
            that information lives, and what rights you have over it.
          </p>
          <p>
            The short version: iTrackHabit works entirely on your device. There is no account to
            create, no server to sign in to, and nothing about your habits is sent to us.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <p>
            <strong>We do not collect any personal information.</strong> iTrackHabit has no user
            accounts, and we operate no server that receives your data. We cannot see your habits,
            your progress, or anything else you enter into the app.
          </p>
          <h3>What the app stores on your device</h3>
          <ul>
            <li>The habits you create — names, icons, categories, schedules, and goals</li>
            <li>Your progress: completions, streaks, timestamps, timer sessions, and any notes</li>
            <li>Achievements and badges you have earned</li>
            <li>App preferences, such as theme, reminder times, and notification settings</li>
          </ul>
          <p>
            All of this is written to a private database on your device (SQLite, plus local app
            storage for settings) inside iTrackHabit's own sandboxed storage, which other apps
            cannot read. It is never transmitted to us or to anyone else.
          </p>
          <h3>What the app does not collect</h3>
          <ul>
            <li>No name, email address, phone number, or contacts</li>
            <li>No location data</li>
            <li>No advertising identifiers or device identifiers</li>
            <li>No usage analytics, crash telemetry, or behavioural tracking</li>
            <li>No health or fitness data from Apple Health or Google Fit</li>
          </ul>
        </section>

        <section>
          <h2>3. How Your Information Is Used</h2>
          <p>
            Everything the app stores is used on your device, by the app, to give you the features
            you asked for: showing your habits and streaks, drawing your charts, awarding
            achievements, and generating the insights and suggestions you see in the app. Those
            insights are calculated locally from your own records — nothing is sent anywhere to be
            analysed, and no artificial-intelligence service outside your device is involved.
          </p>
        </section>

        <section>
          <h2>4. Reminders and Notifications</h2>
          <p>
            If you enable reminders, iTrackHabit schedules notifications through your device's own
            notification system. The reminder text — including your habit names — is prepared and
            delivered on your device. We do not operate a push server, and no notification content
            passes through us or any third party. You can turn reminders off at any time in the
            app or in your device settings.
          </p>
        </section>

        <section>
          <h2>5. App Lock and Biometrics</h2>
          <p>
            You can optionally lock iTrackHabit behind Face ID, Touch ID, or your device's
            fingerprint or screen lock. This check is performed entirely by your operating system,
            which tells the app only whether the unlock succeeded. Your fingerprint, face data, and
            passcode are never shared with the app, and we never receive or store them.
          </p>
        </section>

        <section>
          <h2>6. Exporting and Importing Your Data</h2>
          <p>
            iTrackHabit lets you export your habits, progress, and achievements to a file and
            import them back later. Export happens only when you ask for it: the app writes the
            file locally and hands it to your device's standard share sheet, so you choose where it
            goes — Files, iCloud Drive, email, or another app.
          </p>
          <p>
            Once you send an exported file somewhere, it is governed by that destination's privacy
            practices, not this policy. We never receive a copy.
          </p>
        </section>

        <section>
          <h2>7. Third-Party Services</h2>
          <p>
            iTrackHabit contains no advertising, no analytics or tracking SDKs, no social-media
            integrations, and no in-app purchases. We do not sell, rent, or share your information
            with anyone, because we do not have it.
          </p>
          <p>
            The app is distributed through the Apple App Store and Google Play. Those stores handle
            your download, and they collect their own information about installs and any account
            you hold with them under their own privacy policies —{' '}
            <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noreferrer">Apple</a>{' '}
            and{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google</a>.
            That is separate from the app itself and outside our control.
          </p>
          <p>
            If we ever introduce a feature that sends data off your device — optional cloud sync,
            for example — we will update this policy and make the change clear in the app before it
            takes effect. The current version of this policy is always published on this page.
          </p>
        </section>

        <section>
          <h2>8. Data Retention and Deletion</h2>
          <p>
            Your data stays on your device for as long as you keep the app installed. You can
            delete individual habits and their history inside the app, or reset the app's data from
            its settings. Uninstalling iTrackHabit removes its local database along with it.
          </p>
          <p>
            Because we hold no copy of your data, there is nothing for us to delete on our side and
            nothing we could restore for you — so export a backup first if you want to keep your
            history.
          </p>
        </section>

        <section>
          <h2>9. Children's Privacy</h2>
          <p>
            iTrackHabit does not knowingly collect personal information from children, or from any
            other user, regardless of age. The app is not directed to children under 13, and it
            contains no advertising, no chat, and no other features that would gather information
            about a child. If we introduce any data collection in the future, we will take
            appropriate steps to comply with applicable children's privacy laws, including COPPA
            and UK data protection requirements.
          </p>
        </section>

        <section>
          <h2>10. Data Security</h2>
          <p>
            Because iTrackHabit stores your data on your device instead of on our servers, that
            data stays under your control and is protected by your device's own security — its
            passcode, encryption, and app sandboxing — plus the optional app lock described above.
            We follow reasonable security practices in how we build and maintain the app.
          </p>
        </section>

        <section>
          <h2>11. Your Rights</h2>
          <p>
            Under UK and EU data protection law you have the right to access, correct, delete, and
            port your personal data, and to object to its processing. In iTrackHabit you can
            exercise all of these directly: your data is visible in the app, editable at any time,
            deletable by you, and exportable to a file you own. We hold no personal data about you,
            so there is no request you need to send us in order to do any of it — but if you have a
            question or a complaint, contact us using the details below.
          </p>
          <p>
            You also have the right to lodge a complaint with the UK Information Commissioner's
            Office (
            <a href="https://ico.org.uk" target="_blank" rel="noreferrer">ico.org.uk</a>) or your
            local supervisory authority.
          </p>
        </section>

        <section>
          <h2>12. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time — for example, if iTrackHabit gains
            a feature that changes how data is handled. We will post any changes on this page with
            an updated "Last updated" date.
          </p>
        </section>

        <section>
          <h2>13. Contact Us</h2>
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

export default ITrackHabitPrivacy;
