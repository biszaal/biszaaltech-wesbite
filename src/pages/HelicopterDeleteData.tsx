import React from 'react';
import './LegalPages.css';

/**
 * Data deletion page for Cave Helicopter. Google Play asks for a web page where
 * players can request deletion, reachable from inside the app (Settings › Delete
 * my leaderboard data opens it). The game's only server-side data is the optional
 * leaderboard entry, so this is much smaller than Ludo's account page.
 */
const deleted: string[] = [
  'Your leaderboard username',
  'Your best score, and the distance, duration and time of the run behind it',
  'The anonymous account the leaderboard created for you, which holds no name, email or phone number',
];

const HelicopterDeleteData: React.FC = () => (
  <main id="main" className="legal-page">
    <div className="legal-container">
      <h1>Delete your Cave Helicopter leaderboard data</h1>
      <p className="last-updated">Last updated: November 20, 2026</p>

      <section>
        <p>
          This page explains how to delete your data from Cave Helicopter, listed as "Cave
          Helicopter Game" on Google Play and "Helicopter Game: Cave Edition" on the App Store
          (com.biszaal.helicopter), developed by Bishal Aryal, trading as Biszaal Tech.
        </p>
        <p>
          The game keeps your settings, coins, helicopters and personal best on your device. The
          only thing it ever stores on our servers is your entry on the online leaderboard, and
          only if you claimed a leaderboard username. If you never claimed one, there is nothing of
          yours on our servers to delete, and uninstalling the game removes everything.
        </p>
      </section>

      <section>
        <h2>1. Ask us to delete it</h2>
        <p>
          Email <a href="mailto:biszaaltech@gmail.com">biszaaltech@gmail.com</a> with the subject{' '}
          <strong>Delete my Cave Helicopter data</strong>, and include your username exactly as it
          appears on the leaderboard. There is no sign-in behind a leaderboard name, so if you
          still have the game installed, add the rank shown beside your name — that is how we
          check the entry is yours.
        </p>
        <p>
          You can reach this page from the game too: <strong>Settings</strong> ›{' '}
          <strong>Delete my leaderboard data</strong>. We complete the deletion within 30 days and
          write back when it is done.
        </p>
      </section>

      <section>
        <h2>2. What is deleted</h2>
        <ul>
          {deleted.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>
          The data on your device is yours to remove: uninstalling the game deletes it, or{' '}
          <strong>Settings</strong> › <strong>Reset</strong> clears your best run.
        </p>
      </section>

      <section>
        <h2>3. What is kept</h2>
        <p>
          Nothing is kept on purpose. A copy can remain in the routine backups of our database
          provider, Supabase, until those backups expire, at most 30 days after the deletion. They
          are never used to restore a deleted entry.
        </p>
      </section>

      <section>
        <h2>4. More information</h2>
        <p>
          The <a href="/games/helicopter/privacy">Cave Helicopter privacy policy</a> describes
          everything the game collects and why.
        </p>
      </section>
    </div>
  </main>
);

export default HelicopterDeleteData;
