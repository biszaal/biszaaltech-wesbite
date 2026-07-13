/**
 * Classic 15×15 Ludo board geometry.
 *
 * Coordinates are cell coordinates: a cell occupies [x, x+1) × [y, y+1) and
 * renders centred at (x + 0.5, y + 0.5). Fractional cells are used for base
 * pads and the four home resting points inside the centre square.
 *
 * The main ring is 52 cells walked clockwise and rotated so RING[0] is red's
 * start cell. A token's journey for a colour is progress 0..56:
 *   0..50  → RING[(START_OFFSET[colour] + progress) % 52]
 *   51..55 → HOME_COLUMN[colour][progress - 51]
 *   56     → HOME_POINT[colour]
 */

export type LudoColor = 'red' | 'green' | 'yellow' | 'blue';

export const COLORS: readonly LudoColor[] = ['red', 'green', 'yellow', 'blue'];

export interface Cell {
  x: number;
  y: number;
}

function lane(from: Cell, dx: number, dy: number, count: number): Cell[] {
  const cells: Cell[] = [];
  for (let i = 0; i < count; i++) {
    cells.push({ x: from.x + dx * i, y: from.y + dy * i });
  }
  return cells;
}

/** Clockwise walk starting at the left arm's top lane, (0,6). */
const WALK: Cell[] = [
  ...lane({ x: 0, y: 6 }, 1, 0, 6),   // left arm, top lane →
  ...lane({ x: 6, y: 5 }, 0, -1, 6),  // top arm, left lane ↑
  { x: 7, y: 0 },                     // top tip
  ...lane({ x: 8, y: 0 }, 0, 1, 6),   // top arm, right lane ↓
  ...lane({ x: 9, y: 6 }, 1, 0, 6),   // right arm, top lane →
  { x: 14, y: 7 },                    // right tip
  ...lane({ x: 14, y: 8 }, -1, 0, 6), // right arm, bottom lane ←
  ...lane({ x: 8, y: 9 }, 0, 1, 6),   // bottom arm, right lane ↓
  { x: 7, y: 14 },                    // bottom tip
  ...lane({ x: 6, y: 14 }, 0, -1, 6), // bottom arm, left lane ↑
  ...lane({ x: 5, y: 8 }, -1, 0, 6),  // left arm, bottom lane ←
  { x: 0, y: 7 },                     // left tip
];

/** Rotated so index 0 is red's start cell (1,6). */
export const RING: readonly Cell[] = [...WALK.slice(1), WALK[0]];

export const START_OFFSET: Record<LudoColor, number> = {
  red: 0,
  green: 13,
  yellow: 26,
  blue: 39,
};

/** Start cells plus the four star cells eight steps ahead of each start. */
export const SAFE_RING: ReadonlySet<number> = new Set(
  COLORS.flatMap((c) => [START_OFFSET[c], (START_OFFSET[c] + 8) % 52])
);

export const HOME_COLUMN: Record<LudoColor, readonly Cell[]> = {
  red: lane({ x: 1, y: 7 }, 1, 0, 5),
  green: lane({ x: 7, y: 1 }, 0, 1, 5),
  yellow: lane({ x: 13, y: 7 }, -1, 0, 5),
  blue: lane({ x: 7, y: 13 }, 0, -1, 5),
};

/** Resting spots inside the centre square (fractional cells). */
export const HOME_POINT: Record<LudoColor, Cell> = {
  red: { x: 6.1, y: 7 },
  green: { x: 7, y: 6.1 },
  yellow: { x: 7.9, y: 7 },
  blue: { x: 7, y: 7.9 },
};

export const BASE_ORIGIN: Record<LudoColor, Cell> = {
  red: { x: 0, y: 0 },
  green: { x: 9, y: 0 },
  yellow: { x: 9, y: 9 },
  blue: { x: 0, y: 9 },
};

const BASE_PAD_OFFSETS: Cell[] = [
  { x: 1.5, y: 1.5 },
  { x: 3.5, y: 1.5 },
  { x: 1.5, y: 3.5 },
  { x: 3.5, y: 3.5 },
];

export const BASE_SPOTS: Record<LudoColor, readonly Cell[]> = {
  red: BASE_PAD_OFFSETS.map((o) => ({ x: o.x, y: o.y })),
  green: BASE_PAD_OFFSETS.map((o) => ({ x: o.x + 9, y: o.y })),
  yellow: BASE_PAD_OFFSETS.map((o) => ({ x: o.x + 9, y: o.y + 9 })),
  blue: BASE_PAD_OFFSETS.map((o) => ({ x: o.x, y: o.y + 9 })),
};

export function progressToCell(color: LudoColor, progress: number): Cell {
  if (progress < 0 || progress > 56) {
    throw new Error(`progress out of range: ${progress}`);
  }
  if (progress <= 50) {
    return RING[(START_OFFSET[color] + progress) % 52];
  }
  if (progress <= 55) {
    return HOME_COLUMN[color][progress - 51];
  }
  return HOME_POINT[color];
}
