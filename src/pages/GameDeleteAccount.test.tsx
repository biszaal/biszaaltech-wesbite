import React from 'react';
import { render, screen } from '@testing-library/react';
import GameDeleteAccount from './GameDeleteAccount';

const renderPage = () =>
  render(
    <GameDeleteAccount
      gameName="Ludo Game"
      storeName="Ludo: Classic Board Game"
      bundleId="com.biszaal.mobile"
    />
  );

test('names the app, the store listing, and the developer', () => {
  renderPage();
  expect(
    screen.getByRole('heading', { name: 'Delete your Ludo Game account' })
  ).toBeInTheDocument();
  // Play checks the page refers to the app or developer shown on the listing.
  expect(screen.getByText(/Ludo: Classic Board Game/)).toBeInTheDocument();
  expect(screen.getByText(/com\.biszaal\.mobile/)).toBeInTheDocument();
  expect(screen.getAllByText(/BISZAAL TECH LTD/).length).toBeGreaterThan(0);
});

test('gives the in-app steps and a route for players who uninstalled', () => {
  renderPage();
  // The path a player actually walks: home dock, then the button at the bottom.
  expect(screen.getByText(/dock along the bottom/i)).toBeInTheDocument();
  expect(screen.getAllByText('Delete account').length).toBeGreaterThan(0);
  expect(screen.getByText(/already uninstalled the game/i)).toBeInTheDocument();
  const mailto = screen.getByRole('link', { name: 'hello@biszaaltech.com' });
  expect(mailto).toHaveAttribute('href', 'mailto:hello@biszaaltech.com');
});

test('states what is deleted and what is retained, with periods', () => {
  renderPage();
  expect(screen.getByText(/email address and password/i)).toBeInTheDocument();
  expect(screen.getByText(/coin and gem balances/i)).toBeInTheDocument();
  // Every retained row must carry a period, or the disclosure is incomplete.
  expect(screen.getByText(/up to 7 days for a completed match/i)).toBeInTheDocument();
  expect(screen.getByText(/Up to 30 days/i)).toBeInTheDocument();
  expect(screen.getByText(/legal and tax obligations/i)).toBeInTheDocument();
});

test('links back to the privacy policy for the same game', () => {
  renderPage();
  expect(
    screen.getByRole('link', { name: 'biszaaltech.com/games/ludo/privacy' })
  ).toHaveAttribute('href', '/games/ludo/privacy');
});
