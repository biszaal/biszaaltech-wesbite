import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HelicopterPage from './HelicopterPage';

test('renders the helicopter game shell with HUD and start control', () => {
  render(
    <MemoryRouter>
      <HelicopterPage />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { level: 1, name: 'Helicopter' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
  expect(screen.getByText('Best')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /All games/ })).toHaveAttribute('href', '/games');
});
