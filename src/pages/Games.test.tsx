import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Games from './Games';

test('renders both games with Coming Soon status and privacy policy links', () => {
  render(
    <MemoryRouter>
      <Games />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: 'Our Games' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Helicopter Game' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Ludo Game' })).toBeInTheDocument();
  expect(screen.getAllByText('Coming Soon')).toHaveLength(2);

  const privacyLinks = screen.getAllByRole('link', { name: 'Privacy Policy' });
  const hrefs = privacyLinks.map((link) => link.getAttribute('href'));
  expect(hrefs).toContain('/games/helicopter/privacy');
  expect(hrefs).toContain('/games/ludo/privacy');
});
