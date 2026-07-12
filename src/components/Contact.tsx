import React from 'react';
import { useReveal } from '../hooks/useReveal';
import './Contact.css';

const Contact: React.FC = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="contact" className="contact">
      <div className="container contact-inner reveal" ref={ref}>
        <span className="eyebrow">Contact</span>
        <h2>Say hello.</h2>
        <p className="contact-line">
          Questions about Expenzez, the games, or working with us — one email
          reaches the whole studio.
        </p>
        <a href="mailto:hello@biszaaltech.com" className="pill-btn contact-pill">
          hello@biszaaltech.com
          <span className="btn-orb" aria-hidden="true">✉</span>
        </a>
      </div>
    </section>
  );
};

export default Contact;
