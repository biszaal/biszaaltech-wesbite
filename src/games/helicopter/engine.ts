/**
 * Helicopter cave-flyer engine. Pure TypeScript, no DOM: the canvas component
 * renders whatever this produces, and tests drive it deterministically via an
 * injected RNG.
 *
 * World units: a 160×90 viewport window; y grows downward. The helicopter sits
 * at a fixed screen x (WORLD.heliX) while `state.x` scrolls the world past it.
 */

export type HeliPhase = 'ready' | 'playing' | 'crashed';

export interface Segment {
  ceiling: number;
  floor: number;
}

export interface Obstacle {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface HeliState {
  phase: HeliPhase;
  x: number;
  y: number;
  vy: number;
  score: number;
  best: number;
  speed: number;
  segStart: number; // world index of segments[0]
  segments: Segment[];
  obstacles: Obstacle[];
  nextObstacleX: number;
  centre: number; // terrain random-walk state
  rng: () => number;
}

export const WORLD = { w: 160, h: 90, heliX: 40, heliW: 9, heliH: 5 } as const;

export const MIN_GAP = 34;

const SEG_W = 8;
const START_GAP = 62;
const NARROW_BY_X = 6000;
const GRAVITY = 170;
const THRUST = -260;
const MAX_VY = 95;
const BASE_SPEED = 55;
const MAX_SPEED = 130;
const OBSTACLE_FROM_X = 400;
const OBSTACLE_W = 6;
const EDGE_MARGIN = 4;

export function corridorGapAt(x: number): number {
  const t = Math.min(1, Math.max(0, x / NARROW_BY_X));
  return START_GAP - (START_GAP - MIN_GAP) * t;
}

function pushSegment(s: HeliState): void {
  const index = s.segStart + s.segments.length;
  const gap = Math.max(MIN_GAP, corridorGapAt(index * SEG_W) - s.rng() * 4);

  s.centre += (s.rng() - 0.5) * 10;
  const minCentre = gap / 2 + EDGE_MARGIN;
  const maxCentre = WORLD.h - gap / 2 - EDGE_MARGIN;
  s.centre = Math.min(maxCentre, Math.max(minCentre, s.centre));

  s.segments.push({ ceiling: s.centre - gap / 2, floor: s.centre + gap / 2 });
}

function ensureTerrain(s: HeliState): void {
  const neededIndex = Math.floor((s.x + WORLD.w * 2) / SEG_W);
  while (s.segStart + s.segments.length <= neededIndex) {
    pushSegment(s);
  }
  // Prune far-behind terrain and obstacles.
  const keepFrom = Math.floor(Math.max(0, s.x - WORLD.w) / SEG_W);
  while (s.segStart < keepFrom && s.segments.length > 1) {
    s.segments.shift();
    s.segStart++;
  }
  s.obstacles = s.obstacles.filter((ob) => ob.x + ob.w > s.x - WORLD.w / 2);
}

function spawnObstacles(s: HeliState): void {
  while (s.nextObstacleX < s.x + WORLD.w * 1.5) {
    const spawnX = s.nextObstacleX;
    s.nextObstacleX += 340 + s.rng() * 180;
    if (spawnX < OBSTACLE_FROM_X) continue;

    const seg = segmentAt(s, spawnX + OBSTACLE_W / 2);
    if (!seg) continue;
    const gap = seg.floor - seg.ceiling;
    const h = Math.min(18, gap - 16);
    if (h <= 4) continue;
    const yMin = seg.ceiling + 3;
    const yMax = seg.floor - 3 - h;
    const y = yMin + (yMax - yMin) * s.rng();
    s.obstacles.push({ x: spawnX, y, w: OBSTACLE_W, h });
  }
}

export function segmentAt(s: HeliState, worldX: number): Segment | undefined {
  const index = Math.floor(worldX / SEG_W) - s.segStart;
  return s.segments[index];
}

export function createInitialState(rng: () => number = Math.random, best = 0): HeliState {
  const s: HeliState = {
    phase: 'ready',
    x: 0,
    y: WORLD.h / 2,
    vy: 0,
    score: 0,
    best,
    speed: BASE_SPEED,
    segStart: 0,
    segments: [],
    obstacles: [],
    nextObstacleX: OBSTACLE_FROM_X + 80,
    centre: WORLD.h / 2,
    rng,
  };
  ensureTerrain(s);
  return s;
}

export function startRun(s: HeliState): HeliState {
  s.phase = 'playing';
  s.x = 0;
  s.y = WORLD.h / 2;
  s.vy = 0;
  s.score = 0;
  s.speed = BASE_SPEED;
  s.segStart = 0;
  s.segments = [];
  s.obstacles = [];
  s.nextObstacleX = OBSTACLE_FROM_X + 80;
  s.centre = WORLD.h / 2;
  ensureTerrain(s);
  return s;
}

function collides(s: HeliState): boolean {
  const heliWX = s.x + WORLD.heliX;
  const left = heliWX - WORLD.heliW / 2;
  const right = heliWX + WORLD.heliW / 2;
  const top = s.y - WORLD.heliH / 2;
  const bottom = s.y + WORLD.heliH / 2;

  for (let wx = left; wx <= right + SEG_W; wx += SEG_W) {
    const seg = segmentAt(s, Math.min(wx, right));
    if (!seg) continue;
    if (top <= seg.ceiling || bottom >= seg.floor) return true;
  }

  for (const ob of s.obstacles) {
    if (right >= ob.x && left <= ob.x + ob.w && bottom >= ob.y && top <= ob.y + ob.h) {
      return true;
    }
  }
  return false;
}

export function step(s: HeliState, dt: number, thrust: boolean): HeliState {
  if (s.phase !== 'playing') return s;

  s.vy += (thrust ? THRUST : GRAVITY) * dt;
  s.vy = Math.min(MAX_VY, Math.max(-MAX_VY, s.vy));
  s.y += s.vy * dt;
  s.x += s.speed * dt;
  s.speed = Math.min(MAX_SPEED, BASE_SPEED + s.x / 90);
  s.score = Math.floor(s.x / 10);

  ensureTerrain(s);
  spawnObstacles(s);

  if (collides(s)) {
    s.phase = 'crashed';
    s.best = Math.max(s.best, s.score);
  }
  return s;
}
