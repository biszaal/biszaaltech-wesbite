import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SiteNav, { isGamesWorld } from './SiteNav';

describe('isGamesWorld', () => {
  test.each([
    ['/', false],
    ['/privacy', false],
    ['/terms', false],
    ['/games', true],
    ['/games/helicopter', true],
    ['/games/ludo', true],
    ['/games/helicopter/privacy', false],
    ['/games/ludo/privacy', false],
  ])('%s -> %s', (path, expected) => {
    expect(isGamesWorld(path)).toBe(expected);
  });
});

test('renders tech wordmark with Home and Games links on the home route', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <SiteNav />
    </MemoryRouter>
  );
  const nav = screen.getByRole('navigation');
  expect(within(nav).getByText('Biszaal Tech')).toBeInTheDocument();
  expect(within(nav).getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  expect(within(nav).getByRole('link', { name: 'Games' })).toHaveAttribute('href', '/games');
  expect(within(nav).getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
});

test('renders games wordmark and dark-world links on /games', () => {
  render(
    <MemoryRouter initialEntries={['/games']}>
      <SiteNav />
    </MemoryRouter>
  );
  const nav = screen.getByRole('navigation');
  expect(within(nav).getByText('Biszaal Games')).toBeInTheDocument();
  expect(within(nav).getByRole('link', { name: 'All games' })).toHaveAttribute('aria-current', 'page');
  expect(within(nav).getByRole('link', { name: 'Biszaal Tech' })).toHaveAttribute('href', '/');
});
