import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Games from './Games';

test('lists both games with play and privacy links', () => {
  render(
    <MemoryRouter>
      <Games />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: 'Press start.' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Helicopter' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Ludo' })).toBeInTheDocument();

  const playLinks = screen.getAllByRole('link', { name: /Play now/ });
  expect(playLinks.map((l) => l.getAttribute('href'))).toEqual(
    expect.arrayContaining(['/games/helicopter', '/games/ludo'])
  );

  const privacyLinks = screen.getAllByRole('link', { name: 'Privacy policy' });
  expect(privacyLinks.map((l) => l.getAttribute('href'))).toEqual(
    expect.arrayContaining(['/games/helicopter/privacy', '/games/ludo/privacy'])
  );
});

test('shows the games are also coming to mobile', () => {
  render(
    <MemoryRouter>
      <Games />
    </MemoryRouter>
  );
  expect(screen.getAllByText(/coming to the App Store/i).length).toBeGreaterThanOrEqual(2);
});
