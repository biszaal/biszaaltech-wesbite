import React from 'react';
import { Link } from 'react-router-dom';
import HelicopterGame from '../games/helicopter/HelicopterGame';
import helicopterIcon from '../assets/helicopter-icon.png';
import './GamePages.css';

const HelicopterPage: React.FC = () => {
  return (
    <main id="main" className="world-dark game-page">
      <div className="container">
        <div className="game-page-head">
          <Link to="/games" className="text-link game-page-back">← All games</Link>
          <h1>
            <img
              src={helicopterIcon}
              alt=""
              aria-hidden="true"
              className="game-page-logo"
            />
            Helicopter
          </h1>
          <p className="game-page-sub">
            Thread the cave for as long as you can. The corridor tightens and the
            blocks bite — one touch ends the run.
          </p>
        </div>

        <div className="game-page-arena">
          <HelicopterGame />
        </div>

        <div className="game-page-notes">
          <p className="mono-meta">Mobile version — coming to the App Store</p>
          <Link to="/games/helicopter/privacy" className="text-link">Privacy policy</Link>
        </div>
      </div>
    </main>
  );
};

export default HelicopterPage;
