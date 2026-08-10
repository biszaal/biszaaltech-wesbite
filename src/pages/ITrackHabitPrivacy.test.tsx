import React from 'react';
import { render, screen } from '@testing-library/react';
import ITrackHabitPrivacy from './ITrackHabitPrivacy';

test('renders the iTrackHabit policy heading and contact details', () => {
  render(<ITrackHabitPrivacy />);
  expect(
    screen.getByRole('heading', { name: 'iTrackHabit Privacy Policy' })
  ).toBeInTheDocument();
  expect(screen.getByText(/hello@biszaaltech\.com/)).toBeInTheDocument();
});

test('states the offline-only position the app actually ships with', () => {
  render(<ITrackHabitPrivacy />);
  expect(screen.getByText(/We do not collect any personal information/)).toBeInTheDocument();
  expect(screen.getByText(/no account to\s+create/i)).toBeInTheDocument();
  expect(screen.getByText(/no advertising, no analytics or tracking SDKs/i)).toBeInTheDocument();
});

test('covers the on-device features that touch sensitive surfaces', () => {
  render(<ITrackHabitPrivacy />);
  // Local reminders, biometric app lock, and user-initiated export.
  expect(screen.getByText(/We do not operate a push server/)).toBeInTheDocument();
  expect(screen.getByText(/never receive or store them/)).toBeInTheDocument();
  expect(screen.getByText(/standard share sheet/)).toBeInTheDocument();
});
