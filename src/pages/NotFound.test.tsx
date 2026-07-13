import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import NotFound from './NotFound';

test('renders the 404 page with routes back to both worlds', () => {
  render(
    <MemoryRouter initialEntries={['/definitely-not-a-page']}>
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { level: 1, name: 'Page not found.' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Go home/ })).toHaveAttribute('href', '/');
  expect(screen.getByRole('link', { name: /Enter the arcade/ })).toHaveAttribute('href', '/games');
});
