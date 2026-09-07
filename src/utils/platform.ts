export type Platform = 'ios' | 'android' | 'other';

/**
 * Crawlers, link unfurlers and headless renderers. Googlebot's smartphone
 * agent contains "Android", so without this guard we would auto-redirect the
 * indexer away from the page it came to index.
 */
const BOT = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|embedly|preview|lighthouse|headless/i;

/**
 * Which mobile store a visitor should be sent to, from the user agent alone.
 *
 * User-agent sniffing is unreliable by nature, so everything downstream of this
 * treats 'other' as "show both stores and don't redirect" — the safe answer for
 * desktop, bots and anything we fail to recognise.
 */
export function detectPlatform(nav: Navigator = navigator): Platform {
  const ua = nav.userAgent || '';
  if (BOT.test(ua)) return 'other';
  if (/android/i.test(ua)) return 'android';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  // iPadOS 13+ reports a desktop Safari agent; touch points are the only tell.
  if (/Macintosh/.test(ua) && (nav.maxTouchPoints ?? 0) > 1) return 'ios';
  return 'other';
}
