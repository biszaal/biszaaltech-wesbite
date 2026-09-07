import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LudoLanding from './LudoLanding';

const APP_STORE = 'https://apps.apple.com/gb/app/ludo-classic-board-game/id6788536072';
const PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.biszaal.mobile';

const DESKTOP = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126';
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15';
const ANDROID = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36';

const realLocation = window.location;
let assigned: string;

function setUserAgent(ua: string) {
  Object.defineProperty(window.navigator, 'userAgent', { value: ua, configurable: true });
}

/**
 * One second per call. React batches the state update from each timer into a
 * microtask, so the next tick is only scheduled once act() has flushed it —
 * advancing 3000ms in a single act would fire the first timer and stop.
 */
function tick(seconds: number) {
  for (let i = 0; i < seconds; i += 1) {
    act(() => {
      jest.advanceTimersByTime(1000);
    });
  }
}

function renderPage() {
  return render(
    <MemoryRouter>
      <LudoLanding />
    </MemoryRouter>
  );
}

beforeEach(() => {
  jest.useFakeTimers();
  window.sessionStorage.clear();
  assigned = '';
  // jsdom refuses real navigation, so stand in a plain object we can read back.
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: {
      ...realLocation,
      get href() {
        return assigned;
      },
      set href(url: string) {
        assigned = url;
      },
    },
  });
});

afterEach(() => {
  jest.useRealTimers();
  Object.defineProperty(window, 'location', { configurable: true, value: realLocation });
  setUserAgent(DESKTOP);
});

test('a desktop visitor gets the page, both stores and no redirect', () => {
  setUserAgent(DESKTOP);
  renderPage();

  expect(screen.getByRole('heading', { name: 'Roll. Race. Send them home.' })).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /Download on the App Store/ })[0]).toHaveAttribute(
    'href',
    APP_STORE
  );
  expect(screen.getAllByRole('link', { name: /Get it on Google Play/ })[0]).toHaveAttribute(
    'href',
    PLAY_STORE
  );

  expect(screen.queryByRole('button', { name: /stay on this page/i })).not.toBeInTheDocument();

  tick(10);
  expect(assigned).toBe('');
});

test('an iPhone counts down and is sent to the App Store', () => {
  setUserAgent(IPHONE);
  renderPage();

  expect(screen.getByText(/Opening the App Store/)).toBeInTheDocument();

  tick(3);
  expect(assigned).toBe(APP_STORE);
});

test('an Android visitor leads with Google Play and is sent there', () => {
  setUserAgent(ANDROID);
  renderPage();

  // The visitor's own store is the accent pill; the other stays a text link.
  expect(screen.getAllByRole('link', { name: /Get it on Google Play/ })[0]).toHaveClass(
    'pill-btn',
    'pill-btn--accent'
  );
  expect(screen.getAllByRole('link', { name: /Download on the App Store/ })[0]).toHaveClass(
    'text-link'
  );

  tick(3);
  expect(assigned).toBe(PLAY_STORE);
});

test('"stay on this page" cancels the redirect for good', () => {
  setUserAgent(IPHONE);
  renderPage();

  fireEvent.click(screen.getByRole('button', { name: /stay on this page/i }));

  tick(10);
  expect(assigned).toBe('');
  expect(screen.queryByText(/Opening the App Store/)).not.toBeInTheDocument();
});

test('coming back within the session does not redirect again', () => {
  setUserAgent(IPHONE);
  const first = renderPage();
  expect(screen.getByRole('button', { name: /stay on this page/i })).toBeInTheDocument();
  first.unmount();

  renderPage();
  expect(screen.queryByRole('button', { name: /stay on this page/i })).not.toBeInTheDocument();

  tick(10);
  expect(assigned).toBe('');
});

test('links on to the privacy and delete-account pages', () => {
  setUserAgent(DESKTOP);
  renderPage();

  expect(screen.getByRole('link', { name: 'Privacy policy' })).toHaveAttribute(
    'href',
    '/games/ludo/privacy'
  );
  expect(screen.getByRole('link', { name: 'Delete your account' })).toHaveAttribute(
    'href',
    '/games/ludo/delete-account'
  );
});
