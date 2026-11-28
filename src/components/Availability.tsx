import React from 'react';
import { useReveal } from '../hooks/useReveal';
import './Availability.css';

const Availability: React.FC = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="availability" className="availability">
      <div className="container availability-inner reveal" ref={ref}>
        <span className="eyebrow">Availability</span>
        <h2>Available for select builds.</h2>
        <p className="availability-line">
          Biszaal Tech is an independent studio run by Bishal Aryal. A small number of
          new projects are taken on at a time — an app, a website or a backend, from a
          first sketch to the store listing. Work is remote, from anywhere.
        </p>
        <a
          href="mailto:biszaaltech@gmail.com?subject=Project%20enquiry"
          className="pill-btn pill-btn--accent"
        >
          Enquire about a build
          <span className="btn-orb" aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
};

export default Availability;
