import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './SiteNav.css';

/** The dark "games world" covers the arcade pages, not the legal sub-pages. */
export function isGamesWorld(pathname: string): boolean {
  return /^\/games(\/(helicopter|ludo))?\/?$/.test(pathname);
}

interface NavItem {
  to: string;
  label: string;
  end?: boolean;
}

const SiteNav: React.FC = () => {
  const { pathname } = useLocation();
  const games = isGamesWorld(pathname);
  const [open, setOpen] = useState(false);

  const items: NavItem[] = games
    ? [
        { to: '/games', label: 'All games', end: true },
        { to: '/', label: 'Biszaal Tech', end: true },
      ]
    : [
        { to: '/', label: 'Home', end: true },
        { to: '/games', label: 'Games' },
      ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <nav
      className={`site-nav${games ? ' world-dark site-nav--dark' : ''}${open ? ' is-open' : ''}`}
      aria-label="Primary"
    >
      <div className="site-nav-pill">
        <Link className="nav-wordmark" to={games ? '/games' : '/'}>
          <span className="wordmark-dot" aria-hidden="true" />
          {games ? 'Biszaal Games' : 'Biszaal Tech'}
        </Link>

        <div className="nav-links">
          {items.map((item) => (
            <NavLink key={item.to + item.label} to={item.to} end={item.end} className="nav-link">
              {item.label}
            </NavLink>
          ))}
        </div>

        <button
          className="nav-burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      <div className="nav-overlay" aria-hidden={!open}>
        {items.map((item, i) => (
          <NavLink
            key={item.to + item.label}
            to={item.to}
            end={item.end}
            className={`nav-overlay-link nav-overlay-link-${i + 1}`}
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default SiteNav;
