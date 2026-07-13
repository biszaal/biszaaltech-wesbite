/**
 * Ludo rules engine. Pure and immutable: `roll` and `applyMove` return new
 * states, so the UI can render transitions and tests can assert snapshots.
 *
 * Rules encoded (classic, no-blockade digital variant):
 * - a six leaves base; a six grants another roll; a third consecutive six
 *   forfeits the turn
 * - landing on exactly one opponent token on a non-safe ring cell captures it
 * - stacks (two or more tokens on one cell) cannot be captured
 * - the home column is colour-private; the final cell needs an exact roll
 * - first player with all four tokens home wins
 */

import { COLORS, LudoColor, SAFE_RING, START_OFFSET } from './board';

export type PlayerKind = 'human' | 'cpu';

export interface LudoPlayer {
  color: LudoColor;
  kind: PlayerKind;
}

export type LudoEvent =
  | { type: 'capture'; by: LudoColor; victim: LudoColor; count: number }
  | { type: 'home'; color: LudoColor }
  | { type: 'forfeit'; color: LudoColor }
  | { type: 'win'; color: LudoColor };

export interface LudoState {
  players: LudoPlayer[];
  tokens: Record<LudoColor, number[]>; // -1 base, 0..55 track, 56 home
  current: number;
  dice: number | null;
  sixStreak: number;
  winner: LudoColor | null;
  event: LudoEvent | null;
}

export function createGame(players: LudoPlayer[]): LudoState {
  if (players.length < 2 || players.length > 4) {
    throw new Error('Ludo needs 2–4 players');
  }
  if (new Set(players.map((p) => p.color)).size !== players.length) {
    throw new Error('player colours must be unique');
  }
  const tokens = {} as Record<LudoColor, number[]>;
  for (const color of COLORS) {
    tokens[color] = [-1, -1, -1, -1];
  }
  return {
    players,
    tokens,
    current: 0,
    dice: null,
    sixStreak: 0,
    winner: null,
    event: null,
  };
}

export function ringIndexOf(color: LudoColor, progress: number): number | null {
  if (progress < 0 || progress > 50) return null;
  return (START_OFFSET[color] + progress) % 52;
}

function currentColor(state: LudoState): LudoColor {
  return state.players[state.current].color;
}

function nextPlayer(state: LudoState): number {
  return (state.current + 1) % state.players.length;
}

export function legalMoves(state: LudoState): number[] {
  if (state.dice === null || state.winner) return [];
  const color = currentColor(state);
  const moves: number[] = [];
  state.tokens[color].forEach((progress, index) => {
    if (progress === 56) return;
    if (progress === -1) {
      if (state.dice === 6) moves.push(index);
      return;
    }
    if (progress + state.dice! <= 56) moves.push(index);
  });
  return moves;
}

export function roll(state: LudoState, rng: () => number = Math.random): LudoState {
  if (state.winner || state.dice !== null) return state;

  const value = Math.min(6, Math.max(1, Math.floor(rng() * 6) + 1));
  const streak = value === 6 ? state.sixStreak + 1 : 0;

  if (value === 6 && streak >= 3) {
    return {
      ...state,
      dice: null,
      sixStreak: 0,
      current: nextPlayer(state),
      event: { type: 'forfeit', color: currentColor(state) },
    };
  }

  const rolled: LudoState = { ...state, dice: value, sixStreak: streak, event: null };
  if (legalMoves(rolled).length === 0) {
    return {
      ...rolled,
      dice: null,
      sixStreak: 0,
      current: nextPlayer(state),
    };
  }
  return rolled;
}

export function applyMove(state: LudoState, tokenIndex: number): LudoState {
  if (state.winner) throw new Error('game is over');
  if (state.dice === null) throw new Error('roll before moving');
  if (!legalMoves(state).includes(tokenIndex)) {
    throw new Error(`token ${tokenIndex} cannot move`);
  }

  const color = currentColor(state);
  const dice = state.dice;
  const tokens: Record<LudoColor, number[]> = { ...state.tokens, [color]: [...state.tokens[color]] };

  const from = tokens[color][tokenIndex];
  const to = from === -1 ? 0 : from + dice;
  tokens[color][tokenIndex] = to;

  let event: LudoEvent | null = null;

  // Capture: exactly one opponent token on a non-safe ring cell.
  const landedRing = ringIndexOf(color, to);
  if (landedRing !== null && !SAFE_RING.has(landedRing)) {
    let captured = 0;
    let victim: LudoColor | null = null;
    for (const player of state.players) {
      if (player.color === color) continue;
      const theirs = state.tokens[player.color]
        .map((p, i) => ({ p, i }))
        .filter(({ p }) => ringIndexOf(player.color, p) === landedRing);
      if (theirs.length === 1) {
        tokens[player.color] = [...tokens[player.color]];
        tokens[player.color][theirs[0].i] = -1;
        captured += 1;
        victim = victim ?? player.color;
      }
    }
    if (captured > 0 && victim) {
      event = { type: 'capture', by: color, victim, count: captured };
    }
  }

  if (to === 56) {
    event = { type: 'home', color };
  }

  if (tokens[color].every((p) => p === 56)) {
    return {
      ...state,
      tokens,
      dice: null,
      winner: color,
      event: { type: 'win', color },
    };
  }

  const extraRoll = dice === 6;
  return {
    ...state,
    tokens,
    dice: null,
    current: extraRoll ? state.current : nextPlayer(state),
    sixStreak: extraRoll ? state.sixStreak : 0,
    event,
  };
}

function isThreatened(state: LudoState, color: LudoColor, progress: number): boolean {
  const myRing = ringIndexOf(color, progress);
  if (myRing === null || SAFE_RING.has(myRing)) return false;
  for (const player of state.players) {
    if (player.color === color) continue;
    for (const theirProgress of state.tokens[player.color]) {
      const theirRing = ringIndexOf(player.color, theirProgress);
      if (theirRing === null) continue;
      const steps = (myRing - theirRing + 52) % 52;
      if (steps >= 1 && steps <= 6) return true;
    }
  }
  return false;
}

export function aiChooseMove(state: LudoState): number {
  const moves = legalMoves(state);
  if (moves.length === 0) throw new Error('no legal moves to choose from');
  const color = currentColor(state);
  const dice = state.dice!;

  let bestMove = moves[0];
  let bestScore = -Infinity;

  for (const index of moves) {
    const from = state.tokens[color][index];
    const to = from === -1 ? 0 : from + dice;
    let score = to; // baseline: prefer advancing the furthest token

    if (to === 56) score += 1000;

    const landedRing = ringIndexOf(color, to);
    if (landedRing !== null && !SAFE_RING.has(landedRing)) {
      for (const player of state.players) {
        if (player.color === color) continue;
        const singles = state.tokens[player.color].filter(
          (p) => ringIndexOf(player.color, p) === landedRing
        );
        if (singles.length === 1) score += 900;
      }
    }

    if (from >= 0 && from < 51 && to >= 51) score += 800;

    if (from >= 0 && isThreatened(state, color, from)) {
      score += 700;
      if (landedRing !== null && SAFE_RING.has(landedRing)) score += 50;
    }

    if (from === -1) score += 600;

    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  }
  return bestMove;
}
