import React from 'react';
import { render, screen } from '@testing-library/react';
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
  expect(screen.getByText(/finished games 60 days after they end/)).toBeInTheDocument();
  expect(screen.getByText(/delete your account from the Account screen/)).toBeInTheDocument();
});

test('leaves the local-only policy untouched by the online-game flags', () => {
  render(<GamePrivacyPolicy gameName="Helicopter Game" dataPractices="local-only" />);
  expect(screen.getByText(/Last updated: July 28, 2026/)).toBeInTheDocument();
  expect(screen.queryByText(/push token/)).not.toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: /How Long We Keep Your Data/ })).not.toBeInTheDocument();
});
