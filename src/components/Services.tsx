import React from 'react';
import { useReveal } from '../hooks/useReveal';
import './Services.css';

interface Service {
  glyph: string;
  title: string;
  body: string;
  /** Two of the four span the full four columns — the 4+2 / 2+4 pinwheel. */
  wide?: boolean;
}

const services: Service[] = [
  {
    glyph: '⧉',
    title: 'Mobile apps',
    body:
      'iOS and Android from one codebase, or native where it matters. We have taken ' +
      'our own apps through App Store and Play Store review, so the boring parts — ' +
      'signing, privacy labels, store listings — are handled.',
    wide: true,
  },
  {
    glyph: '▦',
    title: 'Websites & web apps',
    body:
      'Marketing sites, dashboards and web apps. Fast, accessible, and built to be ' +
      'edited later without a rewrite.',
  },
  {
    glyph: '⇄',
    title: 'Backend, APIs & cloud',
    body:
      'The part users never see: APIs, databases, auth, payments and the hosting ' +
      'that keeps them up.',
  },
  {
    glyph: '✎',
    title: 'Product design',
    body:
      'Wireframes, interface design and the small decisions that make software feel ' +
      'considered. Design and engineering sit in the same room, so what gets drawn ' +
      'is what gets built.',
    wide: true,
  },
];

const Services: React.FC = () => {
  const headRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="services-head reveal" ref={headRef}>
          <span className="eyebrow">What we do</span>
          <h2>From first sketch to the store listing.</h2>
          <p className="services-lead">
            Design, build and ship — one small team, so nothing gets lost in the
            handover between the people who draw it and the people who write it.
          </p>
        </div>

        <div className="bento reveal" ref={gridRef}>
          {services.map((service) => (
            <article
              key={service.title}
              className={`shell bento-card${service.wide ? ' bento-card--wide' : ''}`}
            >
              <div className="shell-core bento-core">
                <span className="bento-glyph" aria-hidden="true">{service.glyph}</span>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
