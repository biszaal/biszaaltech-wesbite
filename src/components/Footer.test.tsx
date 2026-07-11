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
