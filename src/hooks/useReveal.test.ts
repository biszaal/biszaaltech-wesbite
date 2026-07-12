import React from 'react';
import { render } from '@testing-library/react';
import { useReveal } from './useReveal';

function Probe() {
  const ref = useReveal<HTMLDivElement>();
  return React.createElement('div', { ref, 'data-testid': 'probe', className: 'reveal' });
}

test('marks the element visible immediately when IntersectionObserver is unavailable', () => {
  expect(typeof (window as any).IntersectionObserver).toBe('undefined');
  const { getByTestId } = render(React.createElement(Probe));
  expect(getByTestId('probe').classList.contains('is-visible')).toBe(true);
});
