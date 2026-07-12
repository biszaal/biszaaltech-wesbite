import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';

test('renders the home page hero headline', () => {
  render(<App />);
  expect(
    screen.getByText(/Building Intelligent Software for Modern Life/i)
  ).toBeInTheDocument();
});

test('navigates from the nav to the games page and a game privacy policy', () => {
  render(<App />);

  const primaryNav = screen.getByRole('navigation', { name: 'Primary' });
  fireEvent.click(within(primaryNav).getByRole('link', { name: 'Games' }));
  expect(screen.getByRole('heading', { name: 'Our Games' })).toBeInTheDocument();

  const helicopterHeading = screen.getByRole('heading', { name: 'Helicopter Game' });
  const helicopterCard = helicopterHeading.closest('.game-card') as HTMLElement;
  const privacyLink = within(helicopterCard).getByRole('link', { name: 'Privacy Policy' });

  fireEvent.click(privacyLink);
  expect(
    screen.getByRole('heading', { name: 'Helicopter Game Privacy Policy' })
  ).toBeInTheDocument();
});
