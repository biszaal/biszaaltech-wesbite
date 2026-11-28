import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { isGamesWorld } from './SiteNav';
import Logo from './Logo';
import './Footer.css';

const Footer: React.FC = () => {
  const { pathname } = useLocation();
  const games = isGamesWorld(pathname);

  return (
    <footer className={`site-footer${games ? ' world-dark' : ''}`}>
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="footer-wordmark">
            <Logo size={20} />
            {games ? 'Biszaal Games' : 'Biszaal Tech'}
          </span>
          <p className="footer-line">
            {games
              ? 'Original games, made by Bishal Aryal.'
              : 'Websites, apps and custom software, made by Bishal Aryal.'}
          </p>
        </div>

        <nav className="footer-links" aria-label="Footer">
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/projects" className="footer-link">Projects</Link>
          <Link to="/games" className="footer-link">Games</Link>
          <Link to="/#contact" className="footer-link">Contact</Link>
          <Link to="/privacy" className="footer-link">Website privacy policy</Link>
          <Link to="/apps/expenzez/privacy" className="footer-link">Expenzez privacy policy</Link>
          <Link to="/apps/itrackhabit/privacy" className="footer-link">iTrackHabit privacy policy</Link>
          <Link to="/terms" className="footer-link">Terms of service</Link>
        </nav>

        <div className="footer-company mono-meta">
          <p>Biszaal Tech · Bishal Aryal</p>
          <p>Independent studio · available worldwide, remotely</p>
          <p>
            <a href="mailto:biszaaltech@gmail.com" className="footer-email">biszaaltech@gmail.com</a>
          </p>
          <p>
            <a
              href="https://wa.me/447506369422"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-email"
            >
              WhatsApp · +44 7506 369422
            </a>
          </p>
        </div>
      </div>

      <div className="container footer-bottom">
        <p className="mono-meta">© 2026 Bishal Aryal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
