import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import InvertalkLanding from './InvertalkLanding';

function renderPage() {
  return render(
    <MemoryRouter>
      <InvertalkLanding />
    </MemoryRouter>
  );
}

test('shows the game without claiming a store listing or a release date', () => {
  renderPage();
  expect(screen.getByRole('heading', { name: 'Say it backwards.' })).toBeInTheDocument();
  expect(screen.getByText('Not on the stores yet.')).toBeInTheDocument();
  expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /App Store|Google Play/ })).not.toBeInTheDocument();
});

test('makes only claims the privacy policy backs', () => {
  renderPage();
  expect(screen.getByText('No ads, no in-app purchases, no sign-up.')).toBeInTheDocument();
  expect(screen.getAllByText(/never uploaded/i).length).toBeGreaterThan(0);
});

test('has support contact and links to the privacy policy and arcade', () => {
  renderPage();
  expect(screen.getByRole('link', { name: 'biszaalgames@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:biszaalgames@gmail.com'
  );
  expect(screen.getByRole('link', { name: 'Privacy policy' })).toHaveAttribute(
    'href',
    '/games/invertalk/privacy'
  );
  expect(screen.getByRole('link', { name: 'More Biszaal games' })).toHaveAttribute('href', '/games');
});
