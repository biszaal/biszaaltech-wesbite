import React, { useId } from 'react';
import './Logo.css';

interface LogoProps {
  /** Rendered edge length in px. */
  size?: number;
  /**
   * `bare` — the letterform alone, no container. This is the mark, and what the
   * site uses everywhere.
   * `field` — the letter reversed out of a full-bleed square, for the places
   * that demand a square asset (favicon, app tile, avatar).
   */
  variant?: 'bare' | 'field';
  className?: string;
}

/**
 * The B as one unbroken stroke, drawn on a 48-unit grid the way you would draw
 * it by hand without lifting the pen: down the spine, up, around the upper
 * bowl, back across the waist, around the lower bowl, closed along the
 * baseline. The doubled waist segment is what a single stroke does, and the
 * round joins make it read as intentional.
 *
 * The upper bowl reaches x 31 and the lower reaches x 34; that 3-unit
 * difference is the waist, and it is what stops the mark reading as a rounded
 * rectangle.
 */
const OUTLINE = 'M14 38 V10 H24 A7 7 0 0 1 24 24 H14 H27 A7 7 0 0 1 27 38 Z';
const STROKE = 5.5;

/**
 * Icon-field geometry, per Apple's app-icon guidance:
 *
 * - The letter is scaled to 80% and nudged 0.75 units right. At full size it
 *   sat close enough to the corners to risk clipping once the system applies
 *   its rounded mask ("keep primary content centred to avoid truncation"), and
 *   a B is left-heavy, so geometric centring reads as off-centre.
 * - The ground is a subtle top-to-bottom light-to-dark gradient rather than a
 *   flat fill, which is what responds to the system's own lighting effects.
 *
 * Both stops are existing tokens (--accent -> --accent-deep), so the icon still
 * inverts to amber in the dark world. Paper on the darkest stop is 8.7:1.
 */
const FIELD_SCALE = 0.8;
const FIELD_NUDGE_X = 0.75;

/**
 * Colour comes from tokens, so the mark inverts inside `.world-dark` with no
 * code path of its own.
 *
 * Always decorative — in the nav and footer it sits beside the words "Biszaal
 * Tech". It deliberately renders no <title>.
 */
const Logo: React.FC<LogoProps> = ({ size = 32, variant = 'bare', className }) => {
  const field = variant === 'field';
  // Scoped so the field variant stays safe to render more than once per page.
  const gradientId = useId();

  return (
    <svg
      className={className ? `logo-mark ${className}` : 'logo-mark'}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      {field && (
        <>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="currentColor" />
              <stop offset="1" stopColor="var(--accent-deep)" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="48" height="48" fill={`url(#${gradientId})`} />
        </>
      )}
      <g
        transform={
          field
            ? `translate(${24 + FIELD_NUDGE_X} 24) scale(${FIELD_SCALE}) translate(-24 -24)`
            : undefined
        }
      >
        <path
          d={OUTLINE}
          fill="none"
          stroke={field ? 'var(--paper)' : 'currentColor'}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default Logo;
