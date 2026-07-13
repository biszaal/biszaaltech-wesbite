import React, { useEffect, useMemo, useState } from 'react';
import { COLORS, LudoColor } from './board';
import {
  LudoPlayer,
  LudoState,
  PlayerKind,
  aiChooseMove,
  applyMove,
  createGame,
  legalMoves,
  roll,
} from './engine';
import LudoBoard, { TOKEN_FILL } from './LudoBoard';
import './LudoGame.css';

const SETUP_KEY = 'biszaal.ludo.setup';
const CPU_ROLL_DELAY = 650;
const CPU_MOVE_DELAY = 700;

/** Colour line-ups per player count: opposite corners for two players. */
const LINE_UPS: Record<number, LudoColor[]> = {
  2: ['red', 'yellow'],
  3: ['red', 'green', 'yellow'],
  4: [...COLORS],
};

interface SetupConfig {
  count: number;
  kinds: PlayerKind[];
}

const DEFAULT_SETUP: SetupConfig = { count: 2, kinds: ['human', 'cpu', 'cpu', 'cpu'] };

function loadSetup(): SetupConfig {
  try {
    const raw = window.localStorage.getItem(SETUP_KEY);
    if (!raw) return DEFAULT_SETUP;
    const parsed = JSON.parse(raw);
    if (
      typeof parsed?.count === 'number' &&
      parsed.count >= 2 &&
      parsed.count <= 4 &&
      Array.isArray(parsed.kinds) &&
      parsed.kinds.length === 4 &&
      parsed.kinds.every((k: unknown) => k === 'human' || k === 'cpu')
    ) {
      return parsed as SetupConfig;
    }
    return DEFAULT_SETUP;
  } catch {
    return DEFAULT_SETUP;
  }
}

function saveSetup(config: SetupConfig): void {
  try {
    window.localStorage.setItem(SETUP_KEY, JSON.stringify(config));
  } catch {
    // Storage denied — setup just won't persist.
  }
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function eventText(state: LudoState): string | null {
  const e = state.event;
  if (!e) return null;
  switch (e.type) {
    case 'capture':
      return `${cap(e.by)} captured ${e.victim}${e.count > 1 ? ` ×${e.count}` : ''}.`;
    case 'home':
      return `${cap(e.color)} got a token home.`;
    case 'forfeit':
      return `Three sixes — ${e.color} forfeits the turn.`;
    case 'win':
      return null; // the win overlay handles it
  }
}

const DIE_PIPS: Record<number, Array<[number, number]>> = {
  1: [[50, 50]],
  2: [[30, 30], [70, 70]],
  3: [[28, 28], [50, 50], [72, 72]],
  4: [[32, 32], [68, 32], [32, 68], [68, 68]],
  5: [[30, 30], [70, 30], [50, 50], [30, 70], [70, 70]],
  6: [[32, 26], [68, 26], [32, 50], [68, 50], [32, 74], [68, 74]],
};

const DieFace: React.FC<{ value: number | null }> = ({ value }) => (
  <svg viewBox="0 0 100 100" className="ludo-die" aria-hidden="true">
    <rect x="4" y="4" width="92" height="92" rx="20" fill="#fbfaf6" stroke="rgba(25,23,19,0.3)" strokeWidth="3" />
    {value !== null &&
      DIE_PIPS[value].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="9" fill="#191713" />
      ))}
    {value === null && (
      <text x="50" y="62" textAnchor="middle" fontSize="40" fill="rgba(25,23,19,0.35)">?</text>
    )}
  </svg>
);

const LudoGame: React.FC = () => {
  const [setup, setSetup] = useState<SetupConfig>(loadSetup);
  const [state, setState] = useState<LudoState | null>(null);
  const [lastRoll, setLastRoll] = useState<number | null>(null);
  const [passNote, setPassNote] = useState<string | null>(null);

  const colors = LINE_UPS[setup.count];

  const begin = () => {
    saveSetup(setup);
    const players: LudoPlayer[] = colors.map((color, i) => ({
      color,
      kind: setup.kinds[i],
    }));
    setLastRoll(null);
    setPassNote(null);
    setState(createGame(players));
  };

  const doRoll = () => {
    setState((prev) => {
      if (!prev) return prev;
      const next = roll(prev);
      if (next.dice !== null) {
        setLastRoll(next.dice);
        setPassNote(null);
      } else if (next.current !== prev.current && next.event === null) {
        setLastRoll(null);
        setPassNote(`No moves for ${prev.players[prev.current].color} — turn passes.`);
      } else {
        setLastRoll(null);
        setPassNote(null);
      }
      return next;
    });
  };

  const doMove = (tokenIndex: number) => {
    setState((prev) => {
      if (!prev || prev.dice === null) return prev;
      setPassNote(null);
      return applyMove(prev, tokenIndex);
    });
  };

  // CPU turns play themselves on gentle delays.
  useEffect(() => {
    if (!state || state.winner) return;
    const player = state.players[state.current];
    if (player.kind !== 'cpu') return;

    const timer = window.setTimeout(() => {
      if (state.dice === null) {
        doRoll();
      } else {
        doMove(aiChooseMove(state));
      }
    }, state.dice === null ? CPU_ROLL_DELAY : CPU_MOVE_DELAY);

    return () => window.clearTimeout(timer);
  }, [state]);

  const movable = useMemo(() => {
    if (!state || state.winner) return [];
    if (state.players[state.current].kind !== 'human') return [];
    return legalMoves(state);
  }, [state]);

  if (!state) {
    return (
      <div className="ludo-setup shell">
        <div className="shell-core ludo-setup-core">
          <h2 className="ludo-setup-title">Set up the match</h2>

          <fieldset className="ludo-field">
            <legend className="mono-meta">Players</legend>
            <div className="ludo-choice-row">
              {[2, 3, 4].map((n) => (
                <button
                  key={n}
                  className={`ludo-chip${setup.count === n ? ' is-active' : ''}`}
                  onClick={() => setSetup({ ...setup, count: n })}
                  aria-pressed={setup.count === n}
                >
                  {n}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="ludo-field">
            <legend className="mono-meta">Seats</legend>
            <div className="ludo-seats">
              {colors.map((color, i) => (
                <div key={color} className="ludo-seat">
                  <span className="ludo-seat-dot" style={{ background: TOKEN_FILL[color] }} />
                  <span className="ludo-seat-name">{cap(color)}</span>
                  <div className="ludo-choice-row">
                    {(['human', 'cpu'] as PlayerKind[]).map((kind) => (
                      <button
                        key={kind}
                        className={`ludo-chip${setup.kinds[i] === kind ? ' is-active' : ''}`}
                        onClick={() => {
                          const kinds = [...setup.kinds] as PlayerKind[];
                          kinds[i] = kind;
                          setSetup({ ...setup, kinds });
                        }}
                        aria-pressed={setup.kinds[i] === kind}
                      >
                        {kind === 'human' ? 'Human' : 'CPU'}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </fieldset>

          <button className="pill-btn pill-btn--accent ludo-start" onClick={begin}>
            Start game
            <span className="btn-orb" aria-hidden="true">▶</span>
          </button>
          <p className="mono-meta ludo-setup-note">
            Pass-and-play: give every seat a human and share the screen.
          </p>
        </div>
      </div>
    );
  }

  const player = state.players[state.current];
  const isHuman = player.kind === 'human';
  const banner = state.winner
    ? `${cap(state.winner)} wins.`
    : state.dice === null
      ? isHuman
        ? `${cap(player.color)} — roll the dice`
        : `${cap(player.color)} is thinking…`
      : isHuman
        ? `${cap(player.color)} — choose a token`
        : `${cap(player.color)} is thinking…`;
  const note = passNote ?? eventText(state);

  return (
    <div className="ludo-game">
      <div className="ludo-status">
        <span className="ludo-turn-dot" style={{ background: TOKEN_FILL[player.color] }} />
        <span className="ludo-banner">{banner}</span>
      </div>

      <div className="shell ludo-shell">
        <div className="shell-core ludo-arena">
          <LudoBoard state={state} movable={movable} onTokenClick={doMove} />

          {state.winner && (
            <div className="ludo-overlay">
              <p className="ludo-overlay-title">{cap(state.winner)} wins.</p>
              <button className="pill-btn pill-btn--accent" onClick={() => setState(null)}>
                Play again
                <span className="btn-orb" aria-hidden="true">↺</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="ludo-controls">
        <DieFace value={state.dice ?? lastRoll} />
        <button
          className="pill-btn pill-btn--accent"
          onClick={doRoll}
          disabled={!isHuman || state.dice !== null || Boolean(state.winner)}
        >
          Roll
          <span className="btn-orb" aria-hidden="true">⚄</span>
        </button>
        <button className="text-link ludo-quit" onClick={() => setState(null)}>
          New match
        </button>
      </div>

      <p className="mono-meta ludo-note" aria-live="polite">{note ?? ' '}</p>
    </div>
  );
};

export default LudoGame;
