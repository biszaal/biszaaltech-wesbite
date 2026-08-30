import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';

test('renders the home page hero headline', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { level: 1, name: /We build the software you have in mind/i })
  ).toBeInTheDocument();
});

test('navigates from the nav to the projects page and a game privacy policy', () => {
  render(<App />);

  const primaryNav = screen.getByRole('navigation', { name: 'Primary' });
  fireEvent.click(within(primaryNav).getByRole('link', { name: 'Projects' }));
  expect(screen.getByRole('heading', { level: 1, name: 'Built and shipped.' })).toBeInTheDocument();

  const helicopterHeading = screen.getByRole('heading', { name: 'Helicopter' });
  const helicopterRow = helicopterHeading.closest('.project-row') as HTMLElement;
  const privacyLink = within(helicopterRow).getByRole('link', { name: 'Privacy policy' });

  fireEvent.click(privacyLink);
  expect(
    screen.getByRole('heading', { name: 'Helicopter Game Privacy Policy' })
  ).toBeInTheDocument();
});

/** The footer is the route into the arcade now that the nav no longer carries it. */
test('reaches the games page from the footer', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: 'Games' }));
  expect(screen.getByRole('heading', { name: 'Press start.' })).toBeInTheDocument();
});

test('sets a per-route document title', () => {
  render(<App />);
  expect(document.title).toMatch(/Biszaal Tech/);
});
