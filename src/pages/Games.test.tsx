import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Games from './Games';

test('showcases every game with its status and privacy links', () => {
  render(
    <MemoryRouter>
      <Games />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: 'Press start.' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Helicopter' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Ludo' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Cascade' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Invertalk' })).toBeInTheDocument();

  // Invertalk isn't on a store yet, so it alone carries a status chip — a fact, never a
  // "coming soon" promise about a date nobody has agreed to (DESIGN.md, content integrity).
  expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument();
  expect(screen.getAllByText('Not on the stores yet')).toHaveLength(1);

  const storeLinks = screen.getAllByRole('link', { name: /Download on the App Store/ });
  expect(storeLinks.map((l) => l.getAttribute('href'))).toEqual([
    'https://apps.apple.com/us/app/helicopter-game-cave-edition/id6786880982',
    'https://apps.apple.com/gb/app/ludo-classic-board-game/id6788536072',
    'https://apps.apple.com/gb/app/cascade-colour-sorting/id6810394977',
  ]);
  storeLinks.forEach((l) => expect(l).toHaveAttribute('rel', 'noopener noreferrer'));

  // Ludo is the only one we can claim is on Google Play.
  const play = screen.getByRole('link', { name: /Get it on Google Play/ });
  expect(play).toHaveAttribute('href', 'https://play.google.com/store/apps/details?id=com.biszaal.mobile');
  expect(play).toHaveAttribute('rel', 'noopener noreferrer');

  const privacyLinks = screen.getAllByRole('link', { name: 'Privacy policy' });
  expect(privacyLinks.map((l) => l.getAttribute('href'))).toEqual(
    expect.arrayContaining([
      '/games/helicopter/privacy',
      '/games/ludo/privacy',
      '/games/cascade/privacy',
      '/games/invertalk/privacy',
    ])
  );

  expect(screen.getByRole('link', { name: 'About Cascade' })).toHaveAttribute(
    'href',
    '/games/cascade'
  );
  expect(screen.getByRole('link', { name: 'About Invertalk' })).toHaveAttribute(
    'href',
    '/games/invertalk'
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
  expect(screen.getByAltText(/green, orange and blue discs/i)).toBeInTheDocument();
  expect(screen.getByAltText(/lowercase i beside a saffron upside-down i/i)).toBeInTheDocument();
});
