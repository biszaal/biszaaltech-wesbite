import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router doesn't scroll to `location.hash` on its own. `location.key`
 * is in the dependency list so clicking the same anchor twice re-fires.
 *
 * scrollIntoView() is called with no options on purpose: `html { scroll-behavior:
 * smooth }` already handles the easing in App.css, and it is already switched
 * off inside the prefers-reduced-motion block. Passing behavior: 'smooth' here
 * would bypass that.
 */
const ScrollToHash: React.FC = () => {
  const { hash, key } = useLocation();

  useEffect(() => {
    if (!hash) return;
    document.querySelector(hash)?.scrollIntoView();
  }, [hash, key]);

  return null;
};

export default ScrollToHash;
