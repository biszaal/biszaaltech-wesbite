import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Projects from './Projects';

const renderPage = () =>
  render(
    <MemoryRouter>
      <Projects />
    </MemoryRouter>
  );

test('lists all four shipped products', () => {
  renderPage();
  ['Expenzez', 'iTrackHabit', 'Helicopter', 'Ludo'].forEach((name) => {
    expect(screen.getByRole('heading', { name })).toBeInTheDocument();
  });
});

test('Expenzez links to both stores, safely', () => {
  renderPage();
  const row = screen.getByRole('heading', { name: 'Expenzez' }).closest('.project-row') as HTMLElement;

  const appStore = within(row).getByRole('link', { name: /App Store/ });
  expect(appStore).toHaveAttribute('href', 'https://apps.apple.com/us/app/expenzez/id6751338089');
  expect(appStore).toHaveAttribute('rel', 'noopener noreferrer');

  expect(within(row).getByRole('link', { name: 'Google Play' })).toHaveAttribute(
    'href',
    'https://play.google.com/store/apps/details?id=com.biszaaltech.expenzez'
  );
});

test('Helicopter points at the same App Store URL the arcade uses', () => {
  renderPage();
  const row = screen.getByRole('heading', { name: 'Helicopter' }).closest('.project-row') as HTMLElement;
  expect(within(row).getByRole('link', { name: /App Store/ })).toHaveAttribute(
    'href',
    'https://apps.apple.com/us/app/helicopter-game-cave-edition/id6786880982'
  );
});

/**
 * Ludo is the only product with an approved "coming soon" claim. iTrackHabit is
 * unreleased but we have no date, so it must never acquire a status chip.
 */
test('only Ludo carries a coming-soon status', () => {
  renderPage();
  expect(screen.getAllByText(/coming soon/i)).toHaveLength(1);

  const row = screen.getByRole('heading', { name: 'iTrackHabit' }).closest('.project-row') as HTMLElement;
  expect(within(row).queryByText(/coming soon/i)).not.toBeInTheDocument();
});

test('iTrackHabit advertises no store listing', () => {
  renderPage();
  const row = screen.getByRole('heading', { name: 'iTrackHabit' }).closest('.project-row') as HTMLElement;
  within(row)
    .getAllByRole('link')
    .forEach((link) => {
      expect(link.getAttribute('href')).not.toMatch(/apps\.apple\.com|play\.google\.com/);
    });
  expect(within(row).getByRole('link', { name: 'Privacy policy' })).toHaveAttribute(
    'href',
    '/apps/itrackhabit/privacy'
  );
});

test('both games cross-link into the arcade', () => {
  renderPage();
  ['Helicopter', 'Ludo'].forEach((name) => {
    const row = screen.getByRole('heading', { name }).closest('.project-row') as HTMLElement;
    expect(within(row).getByRole('link', { name: /In the arcade/ })).toHaveAttribute('href', '/games');
  });
});
