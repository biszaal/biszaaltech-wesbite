import React from 'react';
import { render, screen } from '@testing-library/react';
import HelicopterDeleteData from './HelicopterDeleteData';

test('names the app as both stores list it, the package, and the developer', () => {
  render(<HelicopterDeleteData />);
  expect(
    screen.getByRole('heading', { name: 'Delete your Cave Helicopter leaderboard data' })
  ).toBeInTheDocument();
  // Play checks the page refers to the app or developer shown on the listing.
  expect(screen.getAllByText(/Cave Helicopter Game/).length).toBeGreaterThan(0);
  expect(screen.getByText(/com\.biszaal\.helicopter/)).toBeInTheDocument();
  expect(screen.getByText(/BISZAAL TECH LTD/)).toBeInTheDocument();
});

test('gives a deletion request route and the in-app way to reach it', () => {
  render(<HelicopterDeleteData />);
  const mailto = screen.getByRole('link', { name: 'hello@biszaaltech.com' });
  expect(mailto).toHaveAttribute('href', 'mailto:hello@biszaaltech.com');
  expect(screen.getByText('Delete my leaderboard data')).toBeInTheDocument();
});

test('states what is deleted and how long backups keep a copy', () => {
  render(<HelicopterDeleteData />);
  expect(screen.getByText('Your leaderboard username')).toBeInTheDocument();
  expect(screen.getByText(/at most 30 days/)).toBeInTheDocument();
});
