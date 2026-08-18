import React from 'react';
import './LegalPages.css';

interface GameDeleteAccountProps {
  /** Name as it appears on the store listing, so the page is verifiably about that app. */
  gameName: string;
  /** Store listing title, when it differs from the name used elsewhere on this site. */
  storeName?: string;
  /** Android package / iOS bundle id, shown so a reviewer can match the listing. */
  bundleId?: string;
  lastUpdated?: string;
}

/** What deleting the account removes, in the order a player would think of it. */
const deleted: string[] = [
  'Your email address and password, if you saved an account',
  'Your username, display name, avatar, and dice skin',
  'Your coin and gem balances, and the transaction history behind them',
  'Cosmetic items and entitlements unlocked or purchased on the account',
  'The in-app purchase records we hold for the account',
  'Your friends, pending friend requests, friend code, and blocked players',
  'Your match statistics and win/loss record',
  'Push notification tokens for every device signed in to the account',
  'Your online presence, and any room invites you sent or received',
];

/** Anything that outlives the deletion, with the window it survives for. */
const retained: Array<{ what: string; how_long: string }> = [
  {
    what:
      'Match records shared with other players, which keep an anonymous player identifier and no ' +
      'name, email, or contact detail',
    how_long: 'Up to 24 hours for a room nobody finished; up to 7 days for a completed match',
  },
  {
    what: 'Encrypted database backups that may still contain a copy. They are never used to restore a deleted account',
    how_long: 'Up to 30 days, after which the backup expires',
  },
  {
    what:
      'Payment and transaction records held by Google Play or the Apple App Store. These are the ' +
      "stores' records, not ours, and we cannot delete them",
    how_long: 'As required by their own legal and tax obligations',
  },
];

const GameDeleteAccount: React.FC<GameDeleteAccountProps> = ({
  gameName,
  storeName,
  bundleId,
  lastUpdated = 'August 19, 2026',
}) => (
  <main id="main" className="legal-page">
    <div className="legal-container">
      <h1>Delete your {gameName} account</h1>
      <p className="last-updated">Last updated: {lastUpdated}</p>

      <section>
        <p>
          This page explains how to delete your account and associated data in {gameName}
          {storeName ? ` (listed as "${storeName}")` : ''}, developed by BISZAAL TECH LTD
          {bundleId ? ` (${bundleId})` : ''}. Deletion is permanent and cannot be undone.
        </p>
      </section>

      <section>
        <h2>1. Delete it yourself, in the game</h2>
        <p>
          This is the fastest route and takes effect immediately. It works whether you saved an
          account with an email address or have been playing as a guest.
        </p>
        <ol>
          <li>Open {gameName} on your device.</li>
          <li>
            On the home screen, tap <strong>Account</strong> in the dock along the bottom.
          </li>
          <li>
            Scroll to the bottom of the Account screen and tap <strong>Delete account</strong>.
          </li>
          <li>
            Read the confirmation, then tap <strong>Delete</strong>.
          </li>
        </ol>
        <p>
          Your account and the data listed below are erased from our servers straight away, and the
          game returns to a fresh guest player on that device.
        </p>
      </section>

      <section>
        <h2>2. Or ask us to delete it for you</h2>
        <p>
          If you have already uninstalled the game, email{' '}
          <a href="mailto:hello@biszaaltech.com">hello@biszaaltech.com</a> with the subject{' '}
          <strong>Delete my {gameName} account</strong>, sending it from the email address on the
          account so we can confirm it is yours. We complete the deletion within 30 days and write
          back when it is done.
        </p>
        <p>
          If you never saved an account and played only as a guest, include the username and friend
          code shown on your Account screen — without them we have no way to identify which guest
          account is yours.
        </p>
      </section>

      <section>
        <h2>3. What is deleted</h2>
        <p>Deleting your account removes all of the following from our servers:</p>
        <ul>
          {deleted.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>
          In-game chat and reactions are relayed live between players in a room and are never
          written to our database, so there is nothing left to delete once a match ends.
        </p>
      </section>

      <section>
        <h2>4. What is kept, and for how long</h2>
        <div className="legal-table-scroll">
          <table className="legal-table">
            <thead>
              <tr>
                <th scope="col">Data</th>
                <th scope="col">Retention period</th>
              </tr>
            </thead>
            <tbody>
              {retained.map((row) => (
                <tr key={row.what}>
                  <td>{row.what}</td>
                  <td>{row.how_long}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>5. Before you delete</h2>
        <p>
          Deleting your account is irreversible. Coins, gems, and anything you bought are lost with
          it, are not refundable, and cannot be moved to a new account or restored later.
        </p>
        <p>
          If you only want to play on a different device, you do not need to delete anything — use{' '}
          <strong>Save account</strong> on the Account screen, then <strong>Sign in</strong> on the
          new device, and your progress and purchases come with you.
        </p>
      </section>

      <section>
        <h2>6. Contact us</h2>
        <p>For any question about deleting your account or the data we hold:</p>
        <div className="contact-info">
          <p><strong>BISZAAL TECH LTD</strong></p>
          <p>Email: hello@biszaaltech.com</p>
          <p>Address: 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ</p>
        </div>
        <p>
          Our full privacy policy for this game is at{' '}
          <a href="/games/ludo/privacy">biszaaltech.com/games/ludo/privacy</a>.
        </p>
      </section>
    </div>
  </main>
);

export default GameDeleteAccount;
