import {
  createInitialState,
  startRun,
  step,
  segmentAt,
  corridorGapAt,
  MIN_GAP,
  WORLD,
  HeliState,
} from './engine';

/** Deterministic RNG (mulberry32) so terrain and obstacles are reproducible. */
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

function playFrames(s: HeliState, frames: number, thrust: boolean): HeliState {
  for (let i = 0; i < frames; i++) step(s, 1 / 60, thrust);
  return s;
}

test('ready state ignores physics steps', () => {
  const s = createInitialState(seeded(1));
  const y0 = s.y;
  const x0 = s.x;
  step(s, 1 / 60, false);
  expect(s.phase).toBe('ready');
  expect(s.y).toBe(y0);
  expect(s.x).toBe(x0);
});

test('startRun switches to playing with the heli centred', () => {
  const s = startRun(createInitialState(seeded(1)));
  expect(s.phase).toBe('playing');
  expect(s.y).toBeGreaterThan(WORLD.h * 0.3);
  expect(s.y).toBeLessThan(WORLD.h * 0.7);
});

test('without thrust the heli falls (y grows downward)', () => {
  const s = startRun(createInitialState(seeded(2)));
  const y0 = s.y;
  playFrames(s, 30, false);
  expect(s.y).toBeGreaterThan(y0);
});

test('with thrust the heli climbs', () => {
  const s = startRun(createInitialState(seeded(3)));
  const y0 = s.y;
  playFrames(s, 30, true);
  expect(s.y).toBeLessThan(y0);
});

test('never thrusting ends in a crash', () => {
  const s = startRun(createInitialState(seeded(4)));
  playFrames(s, 60 * 30, false); // up to 30 seconds
  expect(s.phase).toBe('crashed');
});

test('corridor narrows monotonically and never below MIN_GAP', () => {
  let prev = Infinity;
  for (let x = 0; x <= 8000; x += 250) {
    const gap = corridorGapAt(x);
    expect(gap).toBeLessThanOrEqual(prev);
    expect(gap).toBeGreaterThanOrEqual(MIN_GAP);
    prev = gap;
  }
});

test('segments exist and stay sane across the first 3000 units', () => {
  const s = startRun(createInitialState(seeded(5)));
  playFrames(s, 60 * 20, true); // drive forward (alternating handled below)
  for (let x = 0; x <= s.x + WORLD.w; x += 16) {
    const seg = segmentAt(s, x);
    if (!seg) continue; // pruned history is fine
    expect(seg.ceiling).toBeGreaterThanOrEqual(0);
    expect(seg.floor).toBeLessThanOrEqual(WORLD.h);
    expect(seg.floor - seg.ceiling).toBeGreaterThanOrEqual(MIN_GAP - 0.001);
  }
});

test('obstacles spawn inside the corridor', () => {
  const s = startRun(createInitialState(seeded(6)));
  // Alternate thrust to survive as long as possible while distance accrues.
  for (let i = 0; i < 60 * 40 && s.phase === 'playing'; i++) {
    step(s, 1 / 60, s.y > WORLD.h / 2);
  }
  expect(s.obstacles.length).toBeGreaterThan(0);
  for (const ob of s.obstacles) {
    const seg = segmentAt(s, ob.x + ob.w / 2);
    if (!seg) continue;
    expect(ob.y).toBeGreaterThanOrEqual(seg.ceiling - 0.001);
    expect(ob.y + ob.h).toBeLessThanOrEqual(seg.floor + 0.001);
  }
});

test('score is distance divided by ten', () => {
  const s = startRun(createInitialState(seeded(7)));
  for (let i = 0; i < 120 && s.phase === 'playing'; i++) {
    step(s, 1 / 60, s.y > WORLD.h / 2);
  }
  expect(s.score).toBe(Math.floor(s.x / 10));
});

test('identical seeds and inputs give identical runs', () => {
  const a = startRun(createInitialState(seeded(42)));
  const b = startRun(createInitialState(seeded(42)));
  for (let i = 0; i < 300; i++) {
    const thrust = i % 7 < 3;
    step(a, 1 / 60, thrust);
    step(b, 1 / 60, thrust);
  }
  expect(a.x).toBe(b.x);
  expect(a.y).toBe(b.y);
  expect(a.score).toBe(b.score);
  expect(a.phase).toBe(b.phase);
});

test('best score updates on crash', () => {
  const s = startRun(createInitialState(seeded(8), 3));
  for (let i = 0; i < 60 * 60 && s.phase === 'playing'; i++) {
    step(s, 1 / 60, s.y > WORLD.h / 2);
  }
  expect(s.phase).toBe('crashed');
  expect(s.best).toBe(Math.max(3, s.score));
});
