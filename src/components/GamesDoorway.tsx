import React from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import helicopterIcon from '../assets/helicopter-icon.png';
import ludoIcon from '../assets/ludo-icon.svg';
import './GamesDoorway.css';

const GamesDoorway: React.FC = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="doorway">
      <div className="container">
        <div className="shell doorway-shell world-dark reveal" ref={ref}>
          <div className="shell-core doorway-core">
            <div className="doorway-copy">
              <span className="eyebrow">Biszaal Games</span>
              <h2>We also make games.</h2>
              <p>
                Two originals — a cave-flying arcade run and a fresh take on Ludo.
                Helicopter is on the App Store now.
              </p>
              <Link to="/games" className="pill-btn pill-btn--accent doorway-cta">
                See the games
                <span className="btn-orb" aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="doorway-art" aria-hidden="true">
              <img src={helicopterIcon} alt="" className="doorway-chip doorway-chip--heli" />
              <img src={ludoIcon} alt="" className="doorway-chip doorway-chip--ludo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamesDoorway;
