import React from 'react';
import './LegalPages.css';

/**
 * Privacy policy for Invertalk (iOS/Android), at /games/invertalk/privacy.
 *
 * Written from the app's shipped behaviour (repo: github.com/biszaal/invertalk):
 * - audio is recorded, reversed and played on the device and never uploaded; temp files are
 *   deleted after each game, on retry/new phrase/leaving, and at the next launch;
 * - analytics is PostHog (US cloud, free plan: 1-year retention) with an allowlist of events,
 *   no replay, no autocapture, no GeoIP, no person profiles and the device name blanked
 *   (src/analytics/ in the app repo). The PostHog project must have "Discard client IP data"
 *   switched on, because section 4 says so.
 * If the app's analytics, host region or audio handling change, rewrite this page before the
 * build ships.
 */
const CONTACT_EMAIL = 'biszaalgames@gmail.com';

const InvertalkPrivacy: React.FC = () => {
  return (
    <main id="main" className="legal-page">
      <div className="legal-container">
        <h1>Invertalk Privacy Policy</h1>
        <p className="last-updated">Last updated: November 24, 2026</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            BISZAAL TECH LTD ("we," "our," or "us") develops Invertalk, a party game for two people
            sharing one phone, on iOS and Android. This privacy policy explains what the app does
            with your voice and with other information, and what rights you have.
          </p>
          <p>
            The short version: your voice never leaves your phone unless you choose to share a
            recording. There is no account and we never ask for your name or email. We collect a
            small amount of anonymous usage data to learn whether the game works, and it never
            includes your voice or the words you choose.
          </p>
        </section>

        <section>
          <h2>2. Your Voice and the Phrases You Choose</h2>
          <ul>
            <li>
              <strong>Microphone.</strong> Invertalk uses the microphone only while you are recording
              a phrase or an imitation. It asks for permission first and never records in the
              background.
            </li>
            <li>
              <strong>Processed on your phone.</strong> Recording, reversing and playing audio all
              happen on your device. Your recordings are never uploaded to us or to anyone else.
            </li>
            <li>
              <strong>Temporary.</strong> Recordings are kept briefly in the app's private storage
              and deleted when a game ends, when you retry or pick a new phrase, when you leave the
              game, and when the app next starts.
            </li>
            <li>
              <strong>Phrases stay private.</strong> The phrase you pick or type stays on your phone.
              It is never sent to us, never included in analytics, and never added to anything you
              share.
            </li>
            <li>
              <strong>Sharing is your choice.</strong> If you tap "Share the reveal", your phone's
              share menu opens with that one audio clip. What happens next is up to you and the app
              you share to, whose own privacy policy then applies.
            </li>
          </ul>
        </section>

        <section>
          <h2>3. Information Stored Only on Your Device</h2>
          <ul>
            <li>
              The date you agreed to the in-app recording notice, so the app doesn't ask again. You
              can read the notice again at any time in Settings.
            </li>
            <li>A random analytics identifier (see section 4) and any events waiting to be sent.</li>
          </ul>
          <p>Deleting the app removes all of this from your phone.</p>
        </section>

        <section>
          <h2>4. Anonymous Usage Analytics</h2>
          <p>
            We use PostHog (PostHog, Inc.) to understand how the game is used, for example whether
            people finish a challenge or share a result. This helps us fix problems and decide what
            to improve.
          </p>
          <h3>What is sent</h3>
          <ul>
            <li>
              A random identifier created by the app. It is not your name, email, phone number or
              advertising ID, and it is not linked to any account (there are no accounts).
            </li>
            <li>
              Game events: the recording notice was shown, accepted or declined; you started a
              challenge (with the id of a built-in phrase, or just "custom" for your own phrase,
              never the words); microphone permission was granted or denied; a recording finished
              (its length, sample rate, channel count and audio format) or was interrupted; reversing
              a recording succeeded or failed (how long it took and an error code); a challenge
              reached the reveal; the share menu was opened and closed; and the app hit an
              unexpected error (a short error code and the screen name).
            </li>
            <li>
              Basic app and device details that PostHog adds automatically: app version, operating
              system and version, device manufacturer and model, language and region setting, and
              time zone.
            </li>
          </ul>
          <h3>What is never sent</h3>
          <p>
            Your voice or any audio, the phrase you chose, anything you type, your device's name,
            your contacts, or your location. We have switched off PostHog's session recording,
            automatic tap tracking and location lookup, and we have configured our PostHog project
            to discard IP addresses.
          </p>
          <p>
            We do not use analytics for advertising, we do not track you across other apps or
            websites, and we do not sell or rent any data.
          </p>
        </section>

        <section>
          <h2>5. Where Data Is Processed and How Long It Is Kept</h2>
          <p>
            PostHog processes the analytics data for us on servers in the United States. It keeps
            analytics events for one year. Expired events are then removed in PostHog's monthly
            clean-up, which can take up to about two months longer, and PostHog's backups hold
            them for about two weeks.
          </p>
        </section>

        <section>
          <h2>6. Permissions</h2>
          <ul>
            <li>
              <strong>Microphone:</strong> to record the phrase and the imitation. You can turn it
              off at any time in your phone's settings; the game then can't record.
            </li>
            <li>
              <strong>Internet:</strong> only to send the anonymous analytics described in section 4.
            </li>
          </ul>
          <p>
            Invertalk does not use your camera, photos, contacts or location, and it shows no ads.
          </p>
        </section>

        <section>
          <h2>7. Children</h2>
          <p>
            Invertalk is a general-audience party game with original, family-friendly phrases. It
            does not ask anyone for personal information, has no chat or accounts, and shows no
            ads. The only data that leaves the phone is the anonymous usage data in section 4.
          </p>
        </section>

        <section>
          <h2>8. Your Choices and Rights</h2>
          <ul>
            <li>To stop recording, turn off microphone access in your phone's settings.</li>
            <li>
              To delete everything stored on your phone, delete the app. This removes the consent
              record, the analytics identifier and any recordings still on the device.
            </li>
            <li>
              Analytics data is anonymous and not linked to you, so we usually cannot find a
              particular person's data. If you have a question or a request, contact us and we will
              help where we can.
            </li>
          </ul>
          <p>
            Depending on where you live, including the UK and the EU, you may have rights to
            access, correct or delete personal data, or to object to its use. For the anonymous
            analytics we rely on our legitimate interest in keeping the game working and improving
            it. If you are unhappy with how we handle your data, you can complain to the
            Information Commissioner's Office (
            <a href="https://ico.org.uk" target="_blank" rel="noreferrer">ico.org.uk</a>) or your
            local supervisory authority.
          </p>
        </section>

        <section>
          <h2>9. Changes to This Policy</h2>
          <p>
            If we change how Invertalk handles information, we will update this page and its "Last
            updated" date. If the change is significant, the app will ask for your agreement again
            before you next record.
          </p>
        </section>

        <section>
          <h2>10. Contact Us</h2>
          <p>If you have any questions about this privacy policy, please contact us at:</p>
          <div className="contact-info">
            <p><strong>BISZAAL TECH LTD</strong></p>
            <p>Email: {CONTACT_EMAIL}</p>
            <p>Address: 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default InvertalkPrivacy;
