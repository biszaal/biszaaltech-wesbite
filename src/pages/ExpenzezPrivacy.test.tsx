import React from 'react';
import { render, screen } from '@testing-library/react';
import ExpenzezPrivacy from './ExpenzezPrivacy';

test('renders the Expenzez policy heading and controller details', () => {
  render(<ExpenzezPrivacy />);
  expect(
    screen.getByRole('heading', { name: 'Expenzez Privacy Policy' })
  ).toBeInTheDocument();
  expect(screen.getByText(/16693100/)).toBeInTheDocument();
  expect(screen.getAllByText(/privacy@expenzez\.com/).length).toBeGreaterThan(0);
});

test('keeps the disclosures that make it a UK GDPR policy', () => {
  render(<ExpenzezPrivacy />);
  expect(screen.getByText(/does not connect to your bank/)).toBeInTheDocument();
  expect(screen.getByText(/We do not sell your personal data/)).toBeInTheDocument();
  expect(screen.getByText(/sent to our AI\s+processor, OpenAI/)).toBeInTheDocument();
  expect(screen.getByText(/Expenzez Pro subscribers do not see any ads/)).toBeInTheDocument();
});

test('renders the legal-basis table with a row per purpose', () => {
  render(<ExpenzezPrivacy />);
  expect(screen.getByRole('columnheader', { name: 'Purpose' })).toBeInTheDocument();
  expect(screen.getByRole('columnheader', { name: 'Legal basis' })).toBeInTheDocument();
  // 9 purposes plus the header row.
  expect(screen.getAllByRole('row')).toHaveLength(10);
});
