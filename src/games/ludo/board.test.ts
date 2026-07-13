import {
  COLORS,
  RING,
  START_OFFSET,
  SAFE_RING,
  HOME_COLUMN,
  HOME_POINT,
  BASE_ORIGIN,
  BASE_SPOTS,
  progressToCell,
  Cell,
  LudoColor,
} from './board';

const chebyshev = (a: Cell, b: Cell) => Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));

/** A ring cell must sit in the cross arms: inside columns 6–8 xor rows 6–8, never the centre 3×3. */
const inArms = (c: Cell) => {
  const inVertical = c.x >= 6 && c.x <= 8;
  const inHorizontal = c.y >= 6 && c.y <= 8;
  return (inVertical || inHorizontal) && !(inVertical && inHorizontal && c.x === 7 && c.y === 7);
};

test('ring has 52 unique, connected cells inside the board arms', () => {
  expect(RING).toHaveLength(52);

  const seen = new Set(RING.map((c) => `${c.x},${c.y}`));
  expect(seen.size).toBe(52);

  RING.forEach((cell, i) => {
    expect(cell.x).toBeGreaterThanOrEqual(0);
    expect(cell.x).toBeLessThanOrEqual(14);
    expect(cell.y).toBeGreaterThanOrEqual(0);
    expect(cell.y).toBeLessThanOrEqual(14);
    expect(inArms(cell)).toBe(true);
    const next = RING[(i + 1) % 52];
    expect(chebyshev(cell, next)).toBe(1);
  });
});

test('start cells sit at the documented offsets and are safe', () => {
  expect(RING[START_OFFSET.red]).toEqual({ x: 1, y: 6 });
  expect(RING[START_OFFSET.green]).toEqual({ x: 8, y: 1 });
  expect(RING[START_OFFSET.yellow]).toEqual({ x: 13, y: 8 });
  expect(RING[START_OFFSET.blue]).toEqual({ x: 6, y: 13 });

  expect(START_OFFSET.red).toBe(0);
  expect(START_OFFSET.green).toBe(13);
  expect(START_OFFSET.yellow).toBe(26);
  expect(START_OFFSET.blue).toBe(39);

  for (const color of COLORS) {
    expect(SAFE_RING.has(START_OFFSET[color])).toBe(true);
    expect(SAFE_RING.has((START_OFFSET[color] + 8) % 52)).toBe(true);
  }
  expect(SAFE_RING.size).toBe(8);
});

test('each colour walks 51 ring cells then enters its own home column', () => {
  for (const color of COLORS) {
    const lastRing = progressToCell(color, 50);
    const firstHome = HOME_COLUMN[color][0];
    expect(chebyshev(lastRing, firstHome)).toBe(1);

    expect(HOME_COLUMN[color]).toHaveLength(5);
    HOME_COLUMN[color].forEach((cell, i) => {
      expect(progressToCell(color, 51 + i)).toEqual(cell);
      expect(cell.x).toBeGreaterThanOrEqual(1);
      expect(cell.x).toBeLessThanOrEqual(13);
      expect(cell.y).toBeGreaterThanOrEqual(1);
      expect(cell.y).toBeLessThanOrEqual(13);
      if (i > 0) expect(chebyshev(HOME_COLUMN[color][i - 1], cell)).toBe(1);
    });

    const lastColumn = HOME_COLUMN[color][4];
    expect(chebyshev(lastColumn, HOME_POINT[color])).toBeLessThanOrEqual(2);
    expect(progressToCell(color, 56)).toEqual(HOME_POINT[color]);
  }
});

test('home columns never overlap the ring or each other', () => {
  const ringSet = new Set(RING.map((c) => `${c.x},${c.y}`));
  const seen = new Set<string>();
  for (const color of COLORS) {
    for (const cell of HOME_COLUMN[color]) {
      const key = `${cell.x},${cell.y}`;
      expect(ringSet.has(key)).toBe(false);
      expect(seen.has(key)).toBe(false);
      seen.add(key);
    }
  }
});

test('bases sit in the four corners with four pads each', () => {
  expect(BASE_ORIGIN.red).toEqual({ x: 0, y: 0 });
  expect(BASE_ORIGIN.green).toEqual({ x: 9, y: 0 });
  expect(BASE_ORIGIN.yellow).toEqual({ x: 9, y: 9 });
  expect(BASE_ORIGIN.blue).toEqual({ x: 0, y: 9 });

  for (const color of COLORS) {
    expect(BASE_SPOTS[color]).toHaveLength(4);
    for (const spot of BASE_SPOTS[color]) {
      expect(spot.x).toBeGreaterThanOrEqual(BASE_ORIGIN[color].x);
      expect(spot.x).toBeLessThanOrEqual(BASE_ORIGIN[color].x + 6);
      expect(spot.y).toBeGreaterThanOrEqual(BASE_ORIGIN[color].y);
      expect(spot.y).toBeLessThanOrEqual(BASE_ORIGIN[color].y + 6);
    }
  }
});

test('progressToCell walks the ring relative to each start offset', () => {
  for (const color of COLORS) {
    for (let p = 0; p <= 50; p++) {
      expect(progressToCell(color, p)).toEqual(RING[(START_OFFSET[color] + p) % 52]);
    }
  }
  expect(() => progressToCell('red' as LudoColor, -1)).toThrow();
  expect(() => progressToCell('red' as LudoColor, 57)).toThrow();
});
