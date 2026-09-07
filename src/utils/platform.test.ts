import { detectPlatform } from './platform';

const nav = (userAgent: string, maxTouchPoints = 0) =>
  ({ userAgent, maxTouchPoints } as Navigator);

test('recognises iPhone and Android', () => {
  expect(
    detectPlatform(nav('Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15'))
  ).toBe('ios');
  expect(detectPlatform(nav('Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36'))).toBe(
    'android'
  );
});

test('recognises iPadOS behind its desktop user agent', () => {
  const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/17.0 Safari/605.1.15';
  expect(detectPlatform(nav(ua, 5))).toBe('ios');
  // The same agent on a real Mac has no touch points and must stay 'other'.
  expect(detectPlatform(nav(ua, 0))).toBe('other');
});

test('never redirects a crawler, including Googlebot on Android', () => {
  expect(
    detectPlatform(
      nav(
        'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 ' +
          '(KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1)'
      )
    )
  ).toBe('other');
  expect(detectPlatform(nav('facebookexternalhit/1.1'))).toBe('other');
});

test('falls back to other for desktop and empty agents', () => {
  expect(detectPlatform(nav('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126'))).toBe('other');
  expect(detectPlatform(nav(''))).toBe('other');
});
