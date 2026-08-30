import React from 'react';

interface SeoProps {
  title: string;
  canonical: string;
}

/**
 * Per-route <title> and canonical only.
 *
 * React 19 adopts an existing <title> and overwrites it, so this correctly
 * replaces the static one in index.html. <meta> does NOT behave that way — React
 * appends a second tag unless every attribute matches — so description, og:* and
 * twitter:* all stay in index.html, which is also the only thing social scrapers
 * ever see: none of them run JavaScript.
 */
const Seo: React.FC<SeoProps> = ({ title, canonical }) => (
  <>
    <title>{title}</title>
    <link rel="canonical" href={canonical} />
  </>
);

export default Seo;
