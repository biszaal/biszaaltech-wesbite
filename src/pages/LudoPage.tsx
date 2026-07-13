import React from 'react';
import { Link } from 'react-router-dom';
import LudoGame from '../games/ludo/LudoGame';
import ludoIcon from '../assets/ludo-icon.svg';
import './GamePages.css';

const LudoPage: React.FC = () => {
  return (
    <main id="main" className="world-dark game-page">
      <div className="container">
        <div className="game-page-head">
          <Link to="/games" className="text-link game-page-back">← All games</Link>
          <h1>
            <img src={ludoIcon} alt="" aria-hidden="true" className="game-page-logo" />
            Ludo
          </h1>
          <p className="game-page-sub">
            Roll, race, and send your rivals home. Captures, safe squares, and an
            exact roll to finish — play the computer or pass the screen around.
          </p>
        </div>

        <div className="game-page-arena">
          <LudoGame />
        </div>

        <div className="game-page-notes">
          <p className="mono-meta">Online multiplayer — in the mobile app, coming to the App Store</p>
          <Link to="/games/ludo/privacy" className="text-link">Privacy policy</Link>
        </div>
      </div>
    </main>
  );
};

export default LudoPage;
