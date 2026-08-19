import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import GamePrivacyPolicy from './GamePrivacyPolicy';

test('renders the local-only policy heading and body for a game with no backend', () => {
  render(<GamePrivacyPolicy gameName="Helicopter Game" dataPractices="local-only" />);
  expect(
    screen.getByRole('heading', { name: 'Helicopter Game Privacy Policy' })
  ).toBeInTheDocument();
  expect(
    screen.getByText(/does not currently collect any personal information/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/hello@biszaaltech\.com/)).toBeInTheDocument();
});

test('renders the online-multiplayer policy content for a game with a backend', () => {
  render(<GamePrivacyPolicy gameName="Ludo Game" dataPractices="online-multiplayer" />);
  expect(
    screen.getByRole('heading', { name: 'Ludo Game Privacy Policy' })
  ).toBeInTheDocument();
  expect(screen.getByText(/anonymous account/i)).toBeInTheDocument();
  expect(screen.getByText(/choose a username/i)).toBeInTheDocument();
  expect(screen.getByText(/uses Supabase/)).toBeInTheDocument();
});

test('keeps section numbering contiguous in both variants', () => {
  const numbering = (): string[] =>
    screen
      .getAllByRole('heading', { level: 2 })
      .map((h) => (h.textContent ?? '').split('.')[0]);

  const { unmount } = render(
    <GamePrivacyPolicy gameName="Helicopter Game" dataPractices="local-only" />
  );
  // No retention section for a game that stores nothing off-device.
  expect(numbering()).toEqual(['1', '2', '3', '4', '5', '6', '7', '8']);
  unmount();

  render(<GamePrivacyPolicy gameName="Ludo Game" dataPractices="online-multiplayer" />);
  expect(numbering()).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
  cleanup();

  // A leaderboard keeps data on our servers too, so it earns the same section.
  render(<GamePrivacyPolicy gameName="Helicopter Game" dataPractices="online-leaderboard" />);
  expect(numbering()).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
});

test('renders the leaderboard policy for a game whose only backend is a public board', () => {
  render(
    <GamePrivacyPolicy
      gameName="Helicopter Game"
      storeName="Helicopter Game: Cave Edition"
      dataPractices="online-leaderboard"
      lastUpdated="August 19, 2026"
    />
  );

  // The store listing title, so a reviewer can match the policy to the app.
  expect(
    screen.getByText(/develops Helicopter Game \(listed on the App Store as "Helicopter Game: Cave Edition"\)/)
  ).toBeInTheDocument();

  // Opt-in, what a username is, and what a submitted run carries.
  expect(screen.getByText(/Playing Helicopter Game collects nothing/)).toBeInTheDocument();
  expect(screen.getByText(/taking part is your choice/)).toBeInTheDocument();
  expect(screen.getByText(/3 to 16 letters, numbers, or\s+underscores/)).toBeInTheDocument();
  expect(screen.getByText(/never claim a username, nothing about your play leaves your device/))
    .toBeInTheDocument();

  // Supabase is the only processor, and the removal route is spelled out.
  expect(screen.getByRole('link', { name: 'Supabase' })).toHaveAttribute(
    'href',
    'https://supabase.com/privacy'
  );
  expect(screen.getByText(/no analytics or\s+tracking services, and no in-app purchases/))
    .toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: 'hello@biszaaltech.com' }).length).toBeGreaterThan(0);

  // None of the multiplayer game's disclosures leak into this variant.
  expect(screen.queryByText(/AdMob/)).not.toBeInTheDocument();
  expect(screen.queryByText(/RevenueCat/)).not.toBeInTheDocument();
  expect(screen.queryByText(/push token/)).not.toBeInTheDocument();
});

test('discloses ads and in-app purchases when those flags are set (Ludo)', () => {
  render(
    <GamePrivacyPolicy
      gameName="Ludo Game"
      dataPractices="online-multiplayer"
      hasAds
      hasInAppPurchases
    />
  );
  // Advertising via Google AdMob, with the UMP consent + ATT disclosure.
  expect(screen.getByText(/shows ads through Google AdMob/)).toBeInTheDocument();
  expect(screen.getByText(/User Messaging Platform/)).toBeInTheDocument();
  // In-app purchases handled by the stores via RevenueCat.
  expect(screen.getByText(/managed through RevenueCat/)).toBeInTheDocument();
  // Optional saved account (email/password) is disclosed.
  expect(screen.getByText(/email address and password/)).toBeInTheDocument();
});

test('discloses push notifications, retention, and account recovery (Ludo)', () => {
  render(
    <GamePrivacyPolicy
      gameName="Ludo Game"
      dataPractices="online-multiplayer"
      hasAds
      hasInAppPurchases
      hasPushNotifications
      lastUpdated="August 16, 2026"
    />
  );
  expect(screen.getByText(/Last updated: August 16, 2026/)).toBeInTheDocument();
  // The push token, who it goes to, and how to stop it.
  expect(screen.getByText(/store a push token/)).toBeInTheDocument();
  expect(screen.getByText(/Expo's push notification service/)).toBeInTheDocument();
  // Stated once where the token is described, once under the player's choices.
  expect(screen.getAllByText(/Settings › Notifications/)).toHaveLength(2);
  // A reinstall recovers the same account, so say where the token lives.
  expect(screen.getByText(/iOS Keychain or\s+Android Keystore/)).toBeInTheDocument();
  // Retention windows and in-app deletion.
  expect(
    screen.getByRole('heading', { name: '6. How Long We Keep Your Data' })
  ).toBeInTheDocument();
  // Retention windows must track the reaper in migration 0038, not the 0021 ones.
  expect(screen.getByText(/moves are removed 24 hours after they are played/)).toBeInTheDocument();
  expect(screen.getByText(/finished games 7 days\s+after they end/)).toBeInTheDocument();
  expect(screen.getByText(/within 15 minutes for a quick match/)).toBeInTheDocument();
  expect(screen.getByText(/delete your account from the Account screen/)).toBeInTheDocument();
});

test('leaves the local-only policy untouched by the online-game flags', () => {
  render(<GamePrivacyPolicy gameName="Helicopter Game" dataPractices="local-only" />);
  expect(screen.getByText(/Last updated: July 28, 2026/)).toBeInTheDocument();
  expect(screen.queryByText(/push token/)).not.toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: /How Long We Keep Your Data/ })).not.toBeInTheDocument();
});

test('links to the deletion page only for a game that has one', () => {
  const { unmount } = render(
    <GamePrivacyPolicy
      gameName="Ludo Game"
      dataPractices="online-multiplayer"
      deleteAccountPath="/games/ludo/delete-account"
    />
  );
  expect(screen.getByRole('link', { name: 'account deletion page' })).toHaveAttribute(
    'href',
    '/games/ludo/delete-account'
  );
  unmount();

  // A game without its own deletion page must not borrow another game's link.
  render(<GamePrivacyPolicy gameName="Ludo Game" dataPractices="online-multiplayer" />);
  expect(screen.queryByRole('link', { name: 'account deletion page' })).not.toBeInTheDocument();
});
