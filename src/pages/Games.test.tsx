import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Games from './Games';

test('showcases both games with status and privacy links', () => {
  render(
    <MemoryRouter>
      <Games />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: 'Press start.' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Helicopter' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Ludo' })).toBeInTheDocument();

  expect(screen.getAllByText('Coming soon to the App Store')).toHaveLength(2);

  const privacyLinks = screen.getAllByRole('link', { name: 'Privacy policy' });
  expect(privacyLinks.map((l) => l.getAttribute('href'))).toEqual(
    expect.arrayContaining(['/games/helicopter/privacy', '/games/ludo/privacy'])
  );
});

test('shows the real game icons', () => {
  render(
    <MemoryRouter>
      <Games />
    </MemoryRouter>
  );
  expect(screen.getByAltText(/white helicopter flying through a dark cave/i)).toBeInTheDocument();
  expect(screen.getByAltText(/pawns and a die beneath a golden crown/i)).toBeInTheDocument();
});
