import React from 'react';
import { render, screen } from '@testing-library/react';
import GamePrivacyPolicy from './GamePrivacyPolicy';

test('renders the policy heading and body for the given game name', () => {
  render(<GamePrivacyPolicy gameName="Helicopter Game" />);
  expect(
    screen.getByRole('heading', { name: 'Helicopter Game Privacy Policy' })
  ).toBeInTheDocument();
  expect(
    screen.getByText(/does not currently collect any personal information/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/hello@biszaaltech\.com/)).toBeInTheDocument();
});

test('parameterizes correctly for a different game name', () => {
  render(<GamePrivacyPolicy gameName="Ludo Game" />);
  expect(
    screen.getByRole('heading', { name: 'Ludo Game Privacy Policy' })
  ).toBeInTheDocument();
});
