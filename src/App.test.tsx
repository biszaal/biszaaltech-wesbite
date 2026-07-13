import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';

test('renders the home page hero headline', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { level: 1, name: /Know where every pound goes/i })
  ).toBeInTheDocument();
});

test('navigates from the nav to the games page and a game privacy policy', () => {
  render(<App />);

  const primaryNav = screen.getByRole('navigation', { name: 'Primary' });
  fireEvent.click(within(primaryNav).getByRole('link', { name: 'Games' }));
  expect(screen.getByRole('heading', { name: 'Press start.' })).toBeInTheDocument();

  const helicopterHeading = screen.getByRole('heading', { name: 'Helicopter' });
  const helicopterRow = helicopterHeading.closest('.game-row') as HTMLElement;
  const privacyLink = within(helicopterRow).getByRole('link', { name: 'Privacy policy' });

  fireEvent.click(privacyLink);
  expect(
    screen.getByRole('heading', { name: 'Helicopter Game Privacy Policy' })
  ).toBeInTheDocument();
});
