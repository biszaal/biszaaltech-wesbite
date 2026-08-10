import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

test('renders a Games link pointing to /games', () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
  const gamesLink = screen.getByRole('link', { name: 'Games' });
  expect(gamesLink).toHaveAttribute('href', '/games');
});

test('links each app privacy policy separately from the website one', () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
  expect(screen.getByRole('link', { name: 'Website privacy policy' })).toHaveAttribute(
    'href',
    '/privacy'
  );
  expect(screen.getByRole('link', { name: 'Expenzez privacy policy' })).toHaveAttribute(
    'href',
    '/apps/expenzez/privacy'
  );
  expect(screen.getByRole('link', { name: 'iTrackHabit privacy policy' })).toHaveAttribute(
    'href',
    '/apps/itrackhabit/privacy'
  );
});
