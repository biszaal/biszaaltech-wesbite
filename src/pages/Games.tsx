import React from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { HELICOPTER_APP_STORE, LUDO_APP_STORE, LUDO_PLAY_STORE } from '../data/projects';
import helicopterIcon from '../assets/helicopter-icon.png';
import ludoIcon from '../assets/ludo-icon.svg';
import './Games.css';
import Seo from '../components/Seo';

interface GameEntry {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  meta: string[];
  icon: string;
  iconAlt: string;
  artClass: string;
  /** Set once the game is on a store — the status chip only shows while both are unset. */
  appStoreUrl?: string;
  playStoreUrl?: string;
}

const games: GameEntry[] = [
  {
    slug: 'helicopter',
    name: 'Helicopter',
    tagline: 'Thread the cave. Beat your best.',
    description:
      'Hold to climb, release to dive. The cave narrows, the blocks close in, and ' +
      'the only score that matters is the one run further than last time.',
    meta: ['Arcade', '1 player', 'Global leaderboard'],
    icon: helicopterIcon,
    iconAlt: 'Helicopter game icon: a white helicopter flying through a dark cave',
    artClass: 'game-art--heli',
    appStoreUrl: HELICOPTER_APP_STORE,
  },
  {
    slug: 'ludo',
    name: 'Ludo',
    tagline: 'The classic board game with sharper teeth.',
    description:
      'Roll, race, and send your rivals home. Face the computer, pass-and-play, or ' +
      'take friends on in online multiplayer — captures, safe squares, and all.',
    meta: ['Board', '2–4 players', 'Online multiplayer'],
    icon: ludoIcon,
    iconAlt: 'Ludo game icon: colourful pawns and a die beneath a golden crown',
    artClass: 'game-art--ludo',
    appStoreUrl: LUDO_APP_STORE,
    playStoreUrl: LUDO_PLAY_STORE,
  },
];

const Games: React.FC = () => {
  const headRef = useReveal<HTMLDivElement>();

  return (
    <main id="main" className="world-dark games-page">
      <Seo title="Biszaal Games — Biszaal Tech" canonical="https://www.biszaaltech.com/games" />
      <section className="games-hero">
        <div className="container games-hero-inner reveal" ref={headRef}>
          <span className="eyebrow">Biszaal Games</span>
          <h1>Press start.</h1>
          <p className="games-hero-sub mono-meta">
            Original mobile games from Biszaal Tech. Helicopter is on the App Store,
            and Ludo is out on both the App Store and Google Play.
          </p>
        </div>
      </section>

      <section className="games-list container" aria-label="Games">
        {games.map((game, i) => (
          <GameRow key={game.slug} game={game} flip={i % 2 === 1} />
        ))}
      </section>

      <section className="games-crossband container">
        <p>
          We build software for other people too.{' '}
          <Link to="/" className="text-link">Visit Biszaal Tech</Link>
        </p>
      </section>
    </main>
  );
};

const GameRow: React.FC<{ game: GameEntry; flip: boolean }> = ({ game, flip }) => {
  const ref = useReveal<HTMLElement>();

  return (
    <article className={`shell game-row reveal${flip ? ' game-row--flip' : ''}`} ref={ref}>
      <div className="shell-core game-row-core">
        <div className={`game-art ${game.artClass}`}>
          <img src={game.icon} alt={game.iconAlt} className="game-icon" />
        </div>
        <div className="game-info">
          <h2 className="game-name">{game.name}</h2>
          <p className="game-tagline">{game.tagline}</p>
          <p className="game-desc">{game.description}</p>
          <p className="mono-meta game-meta">{game.meta.join(' · ')}</p>
          <div className="game-actions">
            {game.appStoreUrl && (
              <a
                href={game.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-btn pill-btn--accent"
              >
                Download on the App Store
                <span className="btn-orb" aria-hidden="true">↗</span>
              </a>
            )}
            {game.playStoreUrl && (
              <a
                href={game.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Get it on Google Play
              </a>
            )}
            {!game.appStoreUrl && !game.playStoreUrl && (
              <span className="game-status">Coming soon to the App Store</span>
            )}
            <Link to={`/games/${game.slug}/privacy`} className="text-link">
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Games;
