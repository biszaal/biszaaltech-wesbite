import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the home page hero headline', () => {
  render(<App />);
  expect(
    screen.getByText(/Building Intelligent Software for Modern Life/i)
  ).toBeInTheDocument();
});
