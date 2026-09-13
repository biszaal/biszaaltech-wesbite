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
    ['/games/cascade', true],
    ['/games/helicopter/privacy', false],
    ['/games/ludo/privacy', false],
    ['/games/cascade/privacy', false],
    ['/projects', false],
  ])('%s -> %s', (path, expected) => {
    expect(isGamesWorld(path)).toBe(expected);
  });
});

test('renders tech wordmark with the four light-world links on the home route', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <SiteNav />
    </MemoryRouter>
  );
  const nav = screen.getByRole('navigation');
  expect(within(nav).getByText('Biszaal Tech')).toBeInTheDocument();
  expect(within(nav).getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  expect(within(nav).getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects');
  expect(within(nav).getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/#services');
  expect(within(nav).getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/#contact');
  expect(within(nav).getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
  // Hash items must stay plain <Link>: NavLink ignores the hash, so making them
  // NavLinks would light up three pills at once on `/`.
  expect(within(nav).getByRole('link', { name: 'Services' })).not.toHaveAttribute('aria-current');
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
