import React from 'react';
import {
  BASE_ORIGIN,
  BASE_SPOTS,
  COLORS,
  HOME_COLUMN,
  LudoColor,
  RING,
  SAFE_RING,
  START_OFFSET,
  progressToCell,
} from './board';
import { LudoState } from './engine';

/** Token palette lifted from the Ludo app icon. */
export const TOKEN_FILL: Record<LudoColor, string> = {
  red: '#ff4757',
  green: '#2ed573',
  yellow: '#ffc93c',
  blue: '#3e8bff',
};

const TOKEN_EDGE: Record<LudoColor, string> = {
  red: '#c21830',
  green: '#14913f',
  yellow: '#ee8e00',
  blue: '#1d5ad6',
};

const BOARD_BG = '#f2f0e8';
const CELL_BG = '#fbfaf6';
const LINE = 'rgba(25, 23, 19, 0.22)';

interface LudoBoardProps {
  state: LudoState;
  movable: number[];
  onTokenClick: (index: number) => void;
}

interface TokenSpot {
  color: LudoColor;
  index: number;
  cx: number;
  cy: number;
  movable: boolean;
}

function tokenSpots(state: LudoState, movable: number[]): TokenSpot[] {
  const currentColor = state.players[state.current].color;
  const raw: TokenSpot[] = [];

  for (const player of state.players) {
    state.tokens[player.color].forEach((progress, index) => {
      let cell;
      if (progress === -1) {
        cell = BASE_SPOTS[player.color][index];
      } else {
        cell = progressToCell(player.color, progress);
      }
      raw.push({
        color: player.color,
        index,
        cx: cell.x + 0.5,
        cy: cell.y + 0.5,
        movable: player.color === currentColor && movable.includes(index),
      });
    });
  }

  // Fan out tokens sharing a cell so stacks stay readable.
  const groups = new Map<string, TokenSpot[]>();
  for (const spot of raw) {
    const key = `${spot.cx.toFixed(2)},${spot.cy.toFixed(2)}`;
    const group = groups.get(key) ?? [];
    group.push(spot);
    groups.set(key, group);
  }
  for (const group of Array.from(groups.values())) {
    if (group.length < 2) continue;
    group.forEach((spot, i) => {
      spot.cx += (i - (group.length - 1) / 2) * 0.26;
      spot.cy -= i * 0.06;
    });
  }
  return raw;
}

const LudoBoard: React.FC<LudoBoardProps> = ({ state, movable, onTokenClick }) => {
  const spots = tokenSpots(state, movable);

  return (
    <svg
      viewBox="0 0 15 15"
      className="ludo-board"
      role="img"
      aria-label="Ludo board"
    >
      <rect x="0" y="0" width="15" height="15" rx="0.6" fill={BOARD_BG} />

      {/* Ring cells */}
      {RING.map((cell, i) => {
        const startColor = COLORS.find((c) => START_OFFSET[c] === i);
        const fill = startColor ? TOKEN_FILL[startColor] : CELL_BG;
        return (
          <rect
            key={`ring-${i}`}
            x={cell.x}
            y={cell.y}
            width="1"
            height="1"
            fill={fill}
            stroke={LINE}
            strokeWidth="0.03"
          />
        );
      })}

      {/* Star safe cells (skip coloured start cells) */}
      {Array.from(SAFE_RING).map((i) => {
        if (COLORS.some((c) => START_OFFSET[c] === i)) return null;
        const cell = RING[i];
        return (
          <text
            key={`star-${i}`}
            x={cell.x + 0.5}
            y={cell.y + 0.72}
            textAnchor="middle"
            fontSize="0.55"
            fill="rgba(25, 23, 19, 0.45)"
            aria-hidden="true"
          >
            ★
          </text>
        );
      })}

      {/* Home columns */}
      {COLORS.map((color) =>
        HOME_COLUMN[color].map((cell, i) => (
          <rect
            key={`col-${color}-${i}`}
            x={cell.x}
            y={cell.y}
            width="1"
            height="1"
            fill={TOKEN_FILL[color]}
            opacity="0.85"
            stroke={LINE}
            strokeWidth="0.03"
          />
        ))
      )}

      {/* Bases */}
      {COLORS.map((color) => {
        const origin = BASE_ORIGIN[color];
        return (
          <g key={`base-${color}`}>
            <rect
              x={origin.x + 0.15}
              y={origin.y + 0.15}
              width="5.7"
              height="5.7"
              rx="0.55"
              fill={TOKEN_FILL[color]}
              stroke={TOKEN_EDGE[color]}
              strokeWidth="0.06"
            />
            <rect
              x={origin.x + 1}
              y={origin.y + 1}
              width="4"
              height="4"
              rx="0.4"
              fill={CELL_BG}
            />
            {BASE_SPOTS[color].map((spot, i) => (
              <circle
                key={`pad-${color}-${i}`}
                cx={spot.x + 0.5}
                cy={spot.y + 0.5}
                r="0.42"
                fill={BOARD_BG}
                stroke={LINE}
                strokeWidth="0.04"
              />
            ))}
          </g>
        );
      })}

      {/* Centre home triangles */}
      <g stroke={LINE} strokeWidth="0.03">
        <polygon points="6,6 7.5,7.5 6,9" fill={TOKEN_FILL.red} />
        <polygon points="6,6 7.5,7.5 9,6" fill={TOKEN_FILL.green} />
        <polygon points="9,6 7.5,7.5 9,9" fill={TOKEN_FILL.yellow} />
        <polygon points="6,9 7.5,7.5 9,9" fill={TOKEN_FILL.blue} />
      </g>

      {/* Tokens */}
      {spots.map((spot) => {
        const label = `Move ${spot.color} token ${spot.index + 1}`;
        return (
          <g key={`token-${spot.color}-${spot.index}`} className="ludo-token-group">
            {spot.movable && (
              <circle
                className="ludo-halo"
                cx={spot.cx}
                cy={spot.cy}
                r="0.46"
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.09"
              />
            )}
            <circle
              className={`ludo-token${spot.movable ? ' ludo-token--movable' : ''}`}
              cx={spot.cx}
              cy={spot.cy}
              r="0.34"
              fill={TOKEN_FILL[spot.color]}
              stroke={spot.movable ? '#ffffff' : TOKEN_EDGE[spot.color]}
              strokeWidth={spot.movable ? 0.09 : 0.06}
              role={spot.movable ? 'button' : undefined}
              aria-label={spot.movable ? label : undefined}
              tabIndex={spot.movable ? 0 : undefined}
              onClick={spot.movable ? () => onTokenClick(spot.index) : undefined}
              onKeyDown={
                spot.movable
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onTokenClick(spot.index);
                      }
                    }
                  : undefined
              }
            />
            <circle
              cx={spot.cx - 0.09}
              cy={spot.cy - 0.11}
              r="0.09"
              fill="rgba(255, 255, 255, 0.65)"
              pointerEvents="none"
            />
          </g>
        );
      })}
    </svg>
  );
};

export default LudoBoard;
