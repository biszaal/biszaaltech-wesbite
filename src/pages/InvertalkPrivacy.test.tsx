import React from 'react';
import { render, screen } from '@testing-library/react';
import InvertalkPrivacy from './InvertalkPrivacy';

test('renders the Invertalk policy heading and contact details', () => {
  render(<InvertalkPrivacy />);
  expect(screen.getByRole('heading', { name: 'Invertalk Privacy Policy' })).toBeInTheDocument();
  expect(screen.getByText('Bishal Aryal, trading as Biszaal Tech')).toBeInTheDocument();
  expect(screen.getByText(/biszaalgames@gmail\.com/)).toBeInTheDocument();
});

test('states that voice and phrases stay on the device', () => {
  render(<InvertalkPrivacy />);
  expect(screen.getByText(/recordings are never uploaded/i)).toBeInTheDocument();
  expect(screen.getByText(/deleted when a game ends/i)).toBeInTheDocument();
  expect(screen.getByText(/phrase you pick or type stays on your phone/i)).toBeInTheDocument();
});

test('describes the anonymous analytics the app actually ships', () => {
  render(<InvertalkPrivacy />);
  expect(screen.getAllByText(/PostHog/).length).toBeGreaterThan(0);
  expect(screen.getByRole('heading', { name: 'What is never sent' })).toBeInTheDocument();
  expect(screen.getByText(/discard IP addresses/i)).toBeInTheDocument();
  expect(screen.getByText(/one year/i)).toBeInTheDocument();
  expect(screen.getByText(/do not sell or rent/i)).toBeInTheDocument();
});
