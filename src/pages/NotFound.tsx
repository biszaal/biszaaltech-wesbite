import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound: React.FC = () => {
  return (
    <main id="main" className="not-found">
      <div className="container not-found-inner">
        <p className="not-found-code mono-meta">404</p>
        <h1>Page not found.</h1>
        <p className="not-found-line">That address doesn't exist. Try one of these instead.</p>
        <div className="not-found-actions">
          <Link to="/" className="pill-btn pill-btn--accent">
            Go home
            <span className="btn-orb" aria-hidden="true">→</span>
          </Link>
          <Link to="/games" className="text-link">Enter the arcade</Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
