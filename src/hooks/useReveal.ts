import { useEffect, useRef } from 'react';

/**
 * Adds the `is-visible` class to the referenced element once it enters the
 * viewport, driving the `.reveal` entry transitions defined in App.css.
 * When IntersectionObserver is unavailable (older browsers, jsdom) the
 * element is marked visible immediately so content is never hidden.
 */
export function useReveal<T extends HTMLElement>(): React.RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
