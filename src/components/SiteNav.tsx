import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo';
import './SiteNav.css';

/** The dark "games world" covers the arcade pages, not the legal sub-pages. */
export function isGamesWorld(pathname: string): boolean {
  return /^\/games(\/(helicopter|ludo|cascade))?\/?$/.test(pathname);
}

interface NavItem {
  to: string;
  label: string;
  end?: boolean;
  /**
   * Anchors on the home page. They render as plain <Link>, never <NavLink>:
   * NavLink's isActive ignores the hash, so on `/` every hash item would claim
   * aria-current="page" and three pills would light up at once.
   */
  hash?: boolean;
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
        { to: '/#services', label: 'Services', hash: true },
        { to: '/projects', label: 'Projects' },
        { to: '/#contact', label: 'Contact', hash: true },
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
          <Logo size={22} />
          {games ? 'Biszaal Games' : 'Biszaal Tech'}
        </Link>

        <div className="nav-links">
          {items.map((item) =>
            item.hash ? (
              <Link key={item.to + item.label} to={item.to} className="nav-link">
                {item.label}
              </Link>
            ) : (
              <NavLink key={item.to + item.label} to={item.to} end={item.end} className="nav-link">
                {item.label}
              </NavLink>
            )
          )}
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
        {items.map((item, i) => {
          const className = `nav-overlay-link nav-overlay-link-${i + 1}`;
          return item.hash ? (
            <Link
              key={item.to + item.label}
              to={item.to}
              className={className}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ) : (
            <NavLink
              key={item.to + item.label}
              to={item.to}
              end={item.end}
              className={className}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default SiteNav;
