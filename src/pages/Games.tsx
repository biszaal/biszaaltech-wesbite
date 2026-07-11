import React from 'react';
import { Link } from 'react-router-dom';
import './Games.css';

interface Game {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  mockupClass: string;
}

const games: Game[] = [
  {
    slug: 'helicopter',
    name: 'Helicopter Game',
    tagline: 'A fast-paced arcade flying challenge',
    description:
      'Steer your chopper through tight canyons and dodge obstacles in this pick-up-and-play ' +
      'arcade game. Simple one-tap controls, endless runs, and a focus on pure reflexes.',
    mockupClass: 'helicopter-mockup',
  },
  {
    slug: 'ludo',
    name: 'Ludo Game',
    tagline: 'The classic board game, reimagined',
    description:
      'Roll the dice and race your tokens home in this modern take on the timeless family ' +
      'favorite. Play solo against the computer or pass-and-play with friends.',
    mockupClass: 'ludo-mockup',
  },
];

const Games: React.FC = () => {
  return (
    <section className="games">
      <div className="games-container">
        <h1 className="games-title">Our Games</h1>
        <div className="games-grid">
          {games.map((game) => (
            <div className="game-card" key={game.slug}>
              <div className={`game-mockup ${game.mockupClass}`}></div>
              <div className="game-info">
                <h2 className="game-name">{game.name}</h2>
                <p className="game-tagline">{game.tagline}</p>
                <p className="game-description">{game.description}</p>
                <span className="game-status">Coming Soon</span>
                <Link to={`/games/${game.slug}/privacy`} className="game-privacy-link">
                  Privacy Policy
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Games;
