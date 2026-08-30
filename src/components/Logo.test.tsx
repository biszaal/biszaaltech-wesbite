import React from 'react';
import { render } from '@testing-library/react';
import Logo from './Logo';

test('renders the mark on the 48-unit grid at the requested size', () => {
  const { container } = render(<Logo size={22} />);
  const svg = container.querySelector('svg') as SVGElement;
  expect(svg).toHaveAttribute('viewBox', '0 0 48 48');
  expect(svg).toHaveAttribute('width', '22');
  expect(svg).toHaveAttribute('height', '22');
});

/**
 * Regression guard: the lockups put the mark next to the words "Biszaal Tech",
 * and SiteNav.test.tsx finds the wordmark by text content. A <title> here would
 * add "Biszaal Tech" twice and break that lookup.
 */
test('is decorative — no title element, hidden from the accessibility tree', () => {
  const { container } = render(<Logo />);
  expect(container.querySelector('title')).toBeNull();
  expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
});

test('the default variant is bare — the letterform with no container', () => {
  const { container } = render(<Logo />);
  expect(container.querySelector('rect')).toBeNull();
  expect(container.querySelector('path')).toHaveAttribute('stroke', 'currentColor');
});

test('the field variant reverses the letter out of a full-bleed gradient square', () => {
  const { container } = render(<Logo variant="field" />);
  const rect = container.querySelector('rect') as SVGElement;
  expect(rect).toHaveAttribute('width', '48');
  expect(rect.getAttribute('fill')).toMatch(/^url\(#/);
  expect(container.querySelector('path')).toHaveAttribute('stroke', 'var(--paper)');
  // Inset per Apple's app-icon guidance, so the mask cannot clip the letter.
  expect(container.querySelector('g')).toHaveAttribute('transform', expect.stringContaining('scale(0.8)'));
});

test('two field marks on one page do not share a gradient id', () => {
  const { container } = render(
    <>
      <Logo variant="field" />
      <Logo variant="field" />
    </>
  );
  const [a, b] = Array.from(container.querySelectorAll('linearGradient'));
  expect(a.id).not.toBe(b.id);
});
