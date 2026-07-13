import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LudoPage from './LudoPage';

test('renders setup and starts a match with a roll button', () => {
  render(
    <MemoryRouter>
      <LudoPage />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { level: 1, name: 'Ludo' })).toBeInTheDocument();

  const start = screen.getByRole('button', { name: 'Start game' });
  fireEvent.click(start);

  expect(screen.getByRole('button', { name: /Roll/ })).toBeInTheDocument();
  expect(screen.getByText(/— roll/)).toBeInTheDocument();
});

test('links back to the games listing', () => {
  render(
    <MemoryRouter>
      <LudoPage />
    </MemoryRouter>
  );
  expect(screen.getByRole('link', { name: /All games/ })).toHaveAttribute('href', '/games');
});
