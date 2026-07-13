import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  createInitialState,
  startRun,
  step,
  segmentAt,
  HeliState,
  WORLD,
  SEG_W,
} from './engine';
import './HelicopterGame.css';

const BEST_KEY = 'biszaal.helicopter.best';

function loadBest(): number {
  try {
    return Number(window.localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveBest(best: number): void {
  try {
    window.localStorage.setItem(BEST_KEY, String(best));
  } catch {
    // Private browsing or storage denied — the run still works.
  }
}

type UiPhase = 'ready' | 'playing' | 'paused' | 'crashed';

interface Spark {
  x: number;
  y: number;
  age: number;
}

/** Rounded-rect path without relying on ctx.roundRect (TS 4.9 / older Safari). */
function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function draw(ctx: CanvasRenderingContext2D, s: HeliState, sparks: Spark[], cssW: number, cssH: number) {
  const sx = cssW / WORLD.w;
  const sy = cssH / WORLD.h;

  // Cave background, echoing the app icon's near-black gradient.
  const bg = ctx.createLinearGradient(0, 0, 0, cssH);
  bg.addColorStop(0, '#0d0d12');
  bg.addColorStop(1, '#060608');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, cssW, cssH);

  const x0 = s.x;
  const x1 = s.x + WORLD.w;

  // Terrain — filled bands with stalactite/stalagmite spikes like the icon.
  ctx.fillStyle = '#15151d';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  for (let wx = Math.floor(x0 / SEG_W) * SEG_W; wx <= x1 + SEG_W; wx += SEG_W) {
    const seg = segmentAt(s, wx);
    if (!seg) continue;
    const px = (wx - x0) * sx;
    const py = seg.ceiling * sy;
    ctx.lineTo(px, py);
    ctx.lineTo(px + (SEG_W / 2) * sx, py + 5 * sy);
    ctx.lineTo(px + SEG_W * sx, py);
  }
  ctx.lineTo(cssW, 0);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(0, cssH);
  for (let wx = Math.floor(x0 / SEG_W) * SEG_W; wx <= x1 + SEG_W; wx += SEG_W) {
    const seg = segmentAt(s, wx);
    if (!seg) continue;
    const px = (wx - x0) * sx;
    const py = seg.floor * sy;
    ctx.lineTo(px, py);
    ctx.lineTo(px + (SEG_W / 2) * sx, py - 5 * sy);
    ctx.lineTo(px + SEG_W * sx, py);
  }
  ctx.lineTo(cssW, cssH);
  ctx.closePath();
  ctx.fill();

  // Obstacles — amber blocks.
  ctx.fillStyle = 'rgba(232, 163, 61, 0.92)';
  for (const ob of s.obstacles) {
    if (ob.x + ob.w < x0 || ob.x > x1) continue;
    ctx.fillRect((ob.x - x0) * sx, ob.y * sy, ob.w * sx, ob.h * sy);
  }

  // Spark trail.
  for (const spark of sparks) {
    const alpha = Math.max(0, 1 - spark.age * 2.2);
    if (alpha <= 0) continue;
    ctx.fillStyle = `rgba(245, 189, 92, ${alpha * 0.8})`;
    const r = (1.4 - spark.age) * sx;
    ctx.beginPath();
    ctx.arc((spark.x - x0) * sx, spark.y * sy, Math.max(0.5, r), 0, Math.PI * 2);
    ctx.fill();
  }

  // Helicopter — white rounded silhouette like the icon.
  const hx = WORLD.heliX * sx;
  const hy = s.y * sy;
  const w = WORLD.heliW * sx;
  const h = WORLD.heliH * sy;

  ctx.fillStyle = '#e7e9ee';
  // tail boom
  ctx.fillRect(hx - w * 0.78, hy - h * 0.16, w * 0.5, h * 0.3);
  // tail fin
  roundedRect(ctx, hx - w * 0.86, hy - h * 0.52, w * 0.16, h * 0.5, 2);
  ctx.fill();
  // body
  roundedRect(ctx, hx - w * 0.34, hy - h * 0.42, w * 0.78, h * 0.84, Math.min(8, h * 0.42));
  ctx.fill();
  // window
  ctx.fillStyle = '#0d0d12';
  roundedRect(ctx, hx + w * 0.14, hy - h * 0.2, w * 0.22, h * 0.34, 2);
  ctx.fill();
  // rotor
  ctx.strokeStyle = '#e7e9ee';
  ctx.lineWidth = Math.max(1.5, h * 0.12);
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(hx - w * 0.55, hy - h * 0.72);
  ctx.lineTo(hx + w * 0.62, hy - h * 0.72);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(hx + w * 0.06, hy - h * 0.72);
  ctx.lineTo(hx + w * 0.06, hy - h * 0.42);
  ctx.stroke();
  // skids
  ctx.beginPath();
  ctx.moveTo(hx - w * 0.3, hy + h * 0.56);
  ctx.lineTo(hx + w * 0.42, hy + h * 0.56);
  ctx.stroke();
}

const HelicopterGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const arenaRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<HeliState>(createInitialState(Math.random, loadBest()));
  const thrustRef = useRef(false);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number | undefined>(undefined);
  const sparksRef = useRef<Spark[]>([]);

  const [ui, setUi] = useState<UiPhase>('ready');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => stateRef.current.best);

  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const arena = arenaRef.current;
    if (!canvas || !arena) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return; // jsdom / very old browsers

    const cssW = arena.clientWidth;
    const cssH = arena.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw(ctx, stateRef.current, sparksRef.current, cssW, cssH);
  }, []);

  const stopLoop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    lastRef.current = undefined;
  }, []);

  const loop = useCallback(
    (t: number) => {
      const s = stateRef.current;
      const dt = lastRef.current === undefined ? 1 / 60 : Math.min((t - lastRef.current) / 1000, 1 / 20);
      lastRef.current = t;

      step(s, dt, thrustRef.current);

      const sparks = sparksRef.current;
      if (thrustRef.current && s.phase === 'playing') {
        sparks.push({ x: s.x + WORLD.heliX - WORLD.heliW * 0.8, y: s.y + 1.5, age: 0 });
      }
      for (const spark of sparks) spark.age += dt;
      sparksRef.current = sparks.filter((sp) => sp.age < 0.5).slice(-40);

      renderFrame();
      setScore(s.score);

      if (s.phase === 'crashed') {
        saveBest(s.best);
        setBest(s.best);
        setUi('crashed');
        stopLoop();
        return;
      }
      rafRef.current = requestAnimationFrame(loop);
    },
    [renderFrame, stopLoop]
  );

  const begin = useCallback(() => {
    startRun(stateRef.current);
    sparksRef.current = [];
    setScore(0);
    setUi('playing');
    stopLoop();
    rafRef.current = requestAnimationFrame(loop);
  }, [loop, stopLoop]);

  const resume = useCallback(() => {
    setUi('playing');
    stopLoop();
    rafRef.current = requestAnimationFrame(loop);
  }, [loop, stopLoop]);

  // Pause when the tab loses focus mid-run.
  useEffect(() => {
    const pauseIfPlaying = () => {
      if (stateRef.current.phase === 'playing') {
        setUi((current) => {
          if (current !== 'playing') return current;
          stopLoop();
          thrustRef.current = false;
          return 'paused';
        });
      }
    };
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') pauseIfPlaying();
    };
    window.addEventListener('blur', pauseIfPlaying);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('blur', pauseIfPlaying);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [stopLoop]);

  // Keyboard thrust.
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        thrustRef.current = true;
      }
    };
    const onUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        thrustRef.current = false;
      }
    };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, []);

  // Initial paint + cleanup.
  useEffect(() => {
    renderFrame();
    return stopLoop;
  }, [renderFrame, stopLoop]);

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    thrustRef.current = true;
  };
  const onPointerUp = () => {
    thrustRef.current = false;
  };

  return (
    <div className="heli-game">
      <div className="heli-hud" aria-live="off">
        <div className="heli-hud-item">
          <span className="mono-meta">Score</span>
          <span className="heli-hud-value">{score}</span>
        </div>
        <div className="heli-hud-item">
          <span className="mono-meta">Best</span>
          <span className="heli-hud-value">{best}</span>
        </div>
      </div>

      <div className="shell heli-shell">
        <div
          className="shell-core heli-arena"
          ref={arenaRef}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <canvas ref={canvasRef} className="heli-canvas" aria-label="Helicopter game area" />

          {ui !== 'playing' && (
            <div className="heli-overlay">
              {ui === 'ready' && (
                <>
                  <p className="heli-overlay-title">Hold to climb. Release to dive.</p>
                  <p className="mono-meta">Tap and hold, click and hold, or hold space</p>
                  <button className="pill-btn pill-btn--accent" onClick={begin}>
                    Start
                    <span className="btn-orb" aria-hidden="true">▶</span>
                  </button>
                </>
              )}
              {ui === 'paused' && (
                <>
                  <p className="heli-overlay-title">Paused.</p>
                  <button className="pill-btn pill-btn--accent" onClick={resume}>
                    Resume
                    <span className="btn-orb" aria-hidden="true">▶</span>
                  </button>
                </>
              )}
              {ui === 'crashed' && (
                <>
                  <p className="heli-overlay-title">Run over.</p>
                  <p className="mono-meta">
                    Score {score}
                    {score >= best && score > 0 ? ' — new best' : ` · Best ${best}`}
                  </p>
                  <button className="pill-btn pill-btn--accent" onClick={begin}>
                    Fly again
                    <span className="btn-orb" aria-hidden="true">↺</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelicopterGame;
