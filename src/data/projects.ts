import expenzezIcon from '../assets/expenzez-icon.png';
import itrackhabitIcon from '../assets/itrackhabit-icon.png';
import helicopterIcon from '../assets/helicopter-icon.png';
import ludoIcon from '../assets/ludo-icon.svg';

/**
 * Single source of truth for the four shipped products — used by the homepage
 * proof strip and the /projects page.
 *
 * Every claim here has to be defensible. Two constraints worth remembering:
 * Expenzez is NOT "free" (its privacy page documents a Pro subscription and
 * AdMob ads) and must not mention Open Banking (the same page states it does
 * not connect to your bank).
 */

export type ProjectKind = 'app' | 'game';

export interface ProjectLink {
  label: string;
  href: string;
  /** Drives target/rel and the ↗ vs → orb glyph. */
  external?: boolean;
  /** Renders as the accent pill; everything else is a text link. */
  primary?: boolean;
}

export interface ProjectEntry {
  slug: string;
  name: string;
  kind: ProjectKind;
  tagline: string;
  description: string;
  /** Mono chips. Facts only — no metrics, no superlatives. */
  meta: string[];
  icon: string;
  iconAlt: string;
  /** Only where an already-approved claim exists. Never invent one. */
  status?: string;
  links: ProjectLink[];
}

/** Shared with Games.tsx so the two pages can't drift apart. */
export const HELICOPTER_APP_STORE =
  'https://apps.apple.com/us/app/helicopter-game-cave-edition/id6786880982';
export const LUDO_APP_STORE =
  'https://apps.apple.com/gb/app/ludo-classic-board-game/id6788536072';
export const LUDO_PLAY_STORE =
  'https://play.google.com/store/apps/details?id=com.biszaal.mobile';

export const projects: ProjectEntry[] = [
  {
    slug: 'expenzez',
    name: 'Expenzez',
    kind: 'app',
    tagline: 'An expense tracker for the UK.',
    description:
      'Manual entry, CSV import and export, custom categories and clean monthly ' +
      'analytics. Built with React Native, so iOS and Android stay in step.',
    meta: ['Personal finance', 'iOS & Android', 'Free tier · Pro subscription'],
    icon: expenzezIcon,
    iconAlt: 'Expenzez app icon',
    links: [
      {
        label: 'App Store',
        href: 'https://apps.apple.com/us/app/expenzez/id6751338089',
        external: true,
        primary: true,
      },
      {
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.biszaaltech.expenzez',
        external: true,
      },
      { label: 'Website', href: 'https://expenzez.com', external: true },
      { label: 'Privacy policy', href: '/apps/expenzez/privacy' },
    ],
  },
  {
    slug: 'itrackhabit',
    name: 'iTrackHabit',
    kind: 'app',
    tagline: 'Habits, tracked entirely on your device.',
    description:
      'Streaks, timers, achievements and local insights — no account, no server, ' +
      'nothing leaves your phone.',
    meta: ['Habits', 'iOS & Android', 'Offline by design'],
    icon: itrackhabitIcon,
    iconAlt: 'iTrackHabit app icon',
    // No status chip and no store links: the listing isn't live yet, and
    // "coming soon" would be a promise about a date we haven't made.
    // TODO(user): add App Store / Play Store links once the listing is live.
    links: [{ label: 'Privacy policy', href: '/apps/itrackhabit/privacy' }],
  },
  {
    slug: 'helicopter',
    name: 'Helicopter',
    kind: 'game',
    tagline: 'Thread the cave. Beat your best.',
    description:
      'Hold to climb, release to dive. The cave narrows, the blocks close in, and ' +
      'the only score that matters is the one run further than last time.',
    meta: ['Arcade', '1 player', 'Global leaderboard'],
    icon: helicopterIcon,
    iconAlt: 'Helicopter game icon: a white helicopter flying through a dark cave',
    links: [
      { label: 'App Store', href: HELICOPTER_APP_STORE, external: true, primary: true },
      { label: 'In the arcade', href: '/games' },
      { label: 'Privacy policy', href: '/games/helicopter/privacy' },
    ],
  },
  {
    slug: 'ludo',
    name: 'Ludo',
    kind: 'game',
    tagline: 'The classic board game with sharper teeth.',
    description:
      'Roll, race, and send your rivals home. Face the computer, pass-and-play, or ' +
      'take friends on in online multiplayer — captures, safe squares, and all.',
    meta: ['Board', '2–4 players', 'iOS & Android'],
    icon: ludoIcon,
    iconAlt: 'Ludo game icon: colourful pawns and a die beneath a golden crown',
    links: [
      { label: 'App Store', href: LUDO_APP_STORE, external: true, primary: true },
      { label: 'Google Play', href: LUDO_PLAY_STORE, external: true },
      { label: 'In the arcade', href: '/games' },
      { label: 'Privacy policy', href: '/games/ludo/privacy' },
    ],
  },
];
