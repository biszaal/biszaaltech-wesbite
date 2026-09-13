import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CascadeLanding from './CascadeLanding';

function renderPage() {
  return render(
    <MemoryRouter>
      <CascadeLanding />
    </MemoryRouter>
  );
}

test('shows the game and says plainly that it is not on a store yet', () => {
  renderPage();

  expect(screen.getByRole('heading', { name: 'One token at a time.' })).toBeInTheDocument();
  expect(screen.getByText('Coming soon to the App Store')).toBeInTheDocument();

  // No store listing exists yet, so the page must not link to one or offer to redirect.
  expect(screen.queryByRole('link', { name: /Download on the App Store/ })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /stay on this page/i })).not.toBeInTheDocument();
});

test('lists what the shipped game actually does', () => {
  renderPage();

  expect(screen.getByRole('heading', { name: '100 hand-built levels.' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Anchors that never move.' })).toBeInTheDocument();
  expect(screen.getByText(/No ads, no in-app purchases, no sign-up/)).toBeInTheDocument();
});

test('works as the App Store support URL', () => {
  renderPage();

  expect(screen.getByRole('heading', { name: 'Support.' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'biszaalgames@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:biszaalgames@gmail.com'
  );
  expect(screen.getByRole('heading', { name: 'How to play.' })).toBeInTheDocument();
});

test('links on to the privacy policy and the other games', () => {
  renderPage();

  expect(screen.getByRole('link', { name: 'Privacy policy' })).toHaveAttribute(
    'href',
    '/games/cascade/privacy'
  );
  expect(screen.getByRole('link', { name: 'More Biszaal games' })).toHaveAttribute('href', '/games');
});
