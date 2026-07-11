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
  expect(screen.getByText(/choose a display name/i)).toBeInTheDocument();
  expect(screen.getByText(/uses Supabase/)).toBeInTheDocument();
});
