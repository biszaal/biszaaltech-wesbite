import {
  createGame,
  roll,
  legalMoves,
  applyMove,
  aiChooseMove,
  ringIndexOf,
  LudoState,
  LudoPlayer,
} from './engine';
import { START_OFFSET } from './board';

const twoPlayers: LudoPlayer[] = [
  { color: 'red', kind: 'human' },
  { color: 'green', kind: 'cpu' },
];

const die = (value: number) => () => (value - 1) / 6 + 0.001;

function seeded(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

test('createGame starts everyone in base with red to roll', () => {
  const s = createGame(twoPlayers);
  expect(s.players).toHaveLength(2);
  expect(s.tokens.red).toEqual([-1, -1, -1, -1]);
  expect(s.tokens.green).toEqual([-1, -1, -1, -1]);
  expect(s.current).toBe(0);
  expect(s.dice).toBeNull();
  expect(s.winner).toBeNull();
});

test('rolling less than six with everyone in base passes the turn', () => {
  const s = createGame(twoPlayers);
  const after = roll(s, die(3));
  expect(after.dice).toBeNull();
  expect(after.current).toBe(1);
  expect(after.tokens.red).toEqual([-1, -1, -1, -1]);
});

test('a six lets a token leave base and grants another roll', () => {
  const s = createGame(twoPlayers);
  const rolled = roll(s, die(6));
  expect(rolled.dice).toBe(6);
  expect(legalMoves(rolled)).toEqual([0, 1, 2, 3]);

  const moved = applyMove(rolled, 0);
  expect(moved.tokens.red[0]).toBe(0);
  expect(moved.current).toBe(0); // extra roll retained
  expect(moved.dice).toBeNull();
});

test('movement adds the dice value to progress', () => {
  let s = createGame(twoPlayers);
  s = { ...s, tokens: { ...s.tokens, red: [4, -1, -1, -1] } };
  s = roll(s, die(3));
  expect(legalMoves(s)).toEqual([0]);
  s = applyMove(s, 0);
  expect(s.tokens.red[0]).toBe(7);
  expect(s.current).toBe(1); // non-six passes the turn
});

test('landing on a single opponent on a plain cell captures it', () => {
  // red progress 5 is ring cell 5; green sits on the same absolute ring cell.
  const greenProgress = (START_OFFSET.red + 5 - START_OFFSET.green + 52) % 52;
  let s = createGame(twoPlayers);
  s = {
    ...s,
    tokens: { ...s.tokens, red: [2, -1, -1, -1], green: [greenProgress, -1, -1, -1] },
  };
  s = roll(s, die(3));
  s = applyMove(s, 0);
  expect(s.tokens.red[0]).toBe(5);
  expect(s.tokens.green[0]).toBe(-1);
  expect(s.event).toEqual({ type: 'capture', by: 'red', victim: 'green', count: 1 });
});

test('no capture on a safe star cell', () => {
  // Ring index 8 (red progress 8) is a star cell.
  const greenProgress = (8 - START_OFFSET.green + 52) % 52;
  let s = createGame(twoPlayers);
  s = {
    ...s,
    tokens: { ...s.tokens, red: [5, -1, -1, -1], green: [greenProgress, -1, -1, -1] },
  };
  s = roll(s, die(3));
  s = applyMove(s, 0);
  expect(s.tokens.red[0]).toBe(8);
  expect(s.tokens.green[0]).toBe(greenProgress); // untouched
  expect(s.event).toBeNull();
});

test('a stacked opponent pair cannot be captured', () => {
  const greenProgress = (START_OFFSET.red + 5 - START_OFFSET.green + 52) % 52;
  let s = createGame(twoPlayers);
  s = {
    ...s,
    tokens: {
      ...s.tokens,
      red: [2, -1, -1, -1],
      green: [greenProgress, greenProgress, -1, -1],
    },
  };
  s = roll(s, die(3));
  s = applyMove(s, 0);
  expect(s.tokens.green[0]).toBe(greenProgress);
  expect(s.tokens.green[1]).toBe(greenProgress);
  expect(s.event).toBeNull();
});

test('the final cell needs an exact roll', () => {
  let s = createGame(twoPlayers);
  s = { ...s, tokens: { ...s.tokens, red: [55, -1, -1, -1] } };

  const overshoot = roll(s, die(2));
  expect(legalMoves(overshoot)).toEqual([]); // 55 + 2 > 56, and base needs a six

  let exact = { ...s };
  exact = roll(exact, die(1));
  expect(legalMoves(exact)).toEqual([0]);
  exact = applyMove(exact, 0);
  expect(exact.tokens.red[0]).toBe(56);
  expect(exact.event).toEqual({ type: 'home', color: 'red' });
});

test('tokens already home never move', () => {
  let s = createGame(twoPlayers);
  s = { ...s, tokens: { ...s.tokens, red: [56, 10, -1, -1] } };
  s = roll(s, die(2));
  expect(legalMoves(s)).toEqual([1]);
});

test('a third consecutive six forfeits the turn', () => {
  let s = createGame(twoPlayers);
  s = { ...s, tokens: { ...s.tokens, red: [0, -1, -1, -1] }, sixStreak: 2 };
  s = roll(s, die(6));
  expect(s.event).toEqual({ type: 'forfeit', color: 'red' });
  expect(s.dice).toBeNull();
  expect(s.current).toBe(1);
  expect(s.sixStreak).toBe(0);
});

test('moving the last token home wins the game', () => {
  let s = createGame(twoPlayers);
  s = { ...s, tokens: { ...s.tokens, red: [56, 56, 56, 54] } };
  s = roll(s, die(2));
  s = applyMove(s, 3);
  expect(s.winner).toBe('red');
  expect(s.event).toEqual({ type: 'win', color: 'red' });
  expect(roll(s, die(3))).toBe(s); // game over — rolling is a no-op
});

test('ringIndexOf maps only track progress to ring cells', () => {
  expect(ringIndexOf('red', -1)).toBeNull();
  expect(ringIndexOf('red', 0)).toBe(START_OFFSET.red);
  expect(ringIndexOf('green', 0)).toBe(START_OFFSET.green);
  expect(ringIndexOf('red', 50)).toBe((START_OFFSET.red + 50) % 52);
  expect(ringIndexOf('red', 51)).toBeNull(); // home column is private
  expect(ringIndexOf('red', 56)).toBeNull();
});

test('the AI prefers a capture over a plain advance', () => {
  const greenProgress = (START_OFFSET.red + 8 - START_OFFSET.green + 52) % 52;
  // red token 0 can capture green (5 + 3 = 8 is NOT safe for green... use plain cell 6)
  const greenOnPlain = (START_OFFSET.red + 6 - START_OFFSET.green + 52) % 52;
  let s = createGame(twoPlayers);
  s = {
    ...s,
    tokens: {
      ...s.tokens,
      red: [3, 20, -1, -1],
      green: [greenOnPlain, -1, -1, -1],
    },
  };
  s = roll(s, die(3));
  expect(legalMoves(s).sort()).toEqual([0, 1]);
  expect(aiChooseMove(s)).toBe(0); // 3 + 3 = 6 captures green
  expect(greenProgress).not.toBe(greenOnPlain);
});

test('the AI finishes a token when it can', () => {
  let s = createGame(twoPlayers);
  s = { ...s, tokens: { ...s.tokens, red: [53, 10, -1, -1] } };
  s = roll(s, die(3));
  expect(legalMoves(s).sort()).toEqual([0, 1]);
  expect(aiChooseMove(s)).toBe(0); // 53 + 3 = 56 finishes
});

test('random games always terminate with a legal winner', () => {
  const players: LudoPlayer[] = [
    { color: 'red', kind: 'cpu' },
    { color: 'green', kind: 'cpu' },
    { color: 'yellow', kind: 'cpu' },
    { color: 'blue', kind: 'cpu' },
  ];
  for (let g = 0; g < 25; g++) {
    const rng = seeded(1000 + g);
    let s = createGame(players);
    let guard = 0;
    while (!s.winner && guard++ < 5000) {
      s = roll(s, rng);
      if (s.winner) break;
      if (s.dice !== null) {
        const moves = legalMoves(s);
        expect(moves.length).toBeGreaterThan(0);
        const choice = aiChooseMove(s);
        expect(moves).toContain(choice);
        s = applyMove(s, choice);
      }
    }
    expect(s.winner).not.toBeNull();
    expect(s.tokens[s.winner!].every((p) => p === 56)).toBe(true);
  }
});
