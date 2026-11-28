import React from 'react';
import { useReveal } from '../hooks/useReveal';
import './Contact.css';

const Contact: React.FC = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="contact" className="contact">
      <div className="container contact-inner reveal" ref={ref}>
        <span className="eyebrow">Contact</span>
        <h2>Start a project.</h2>
        <p className="contact-line">
          Tell us what you're trying to build — an app, a website, or something
          that doesn't have a name yet. One message reaches the whole studio.
        </p>
        <div className="contact-actions">
          <a href="mailto:biszaaltech@gmail.com" className="pill-btn contact-pill">
            biszaaltech@gmail.com
            <span className="btn-orb" aria-hidden="true">✉</span>
          </a>
          <a
            href="https://wa.me/447506369422"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn contact-pill"
          >
            WhatsApp · +44 7506 369422
            <span className="btn-orb" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
