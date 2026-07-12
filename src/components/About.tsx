import React from 'react';
import { useReveal } from '../hooks/useReveal';
import './About.css';

const values = [
  {
    title: 'Security first',
    text: 'User data is protected by default — encryption in transit and at rest, and no data resale, ever.',
  },
  {
    title: 'Plain and honest',
    text: 'Clear pricing, clear language, and products that do what they say. Nothing is dressed up.',
  },
  {
    title: 'Built to be used',
    text: 'We ship small, useful features and improve them from real feedback rather than roadmap theatre.',
  },
];

const About: React.FC = () => {
  const leftRef = useReveal<HTMLDivElement>();
  const rightRef = useReveal<HTMLDivElement>();

  return (
    <section className="about">
      <div className="container about-grid">
        <div className="about-story reveal" ref={leftRef}>
          <span className="eyebrow">The company</span>
          <h2>A small London studio with a product habit.</h2>
          <p>
            BISZAAL TECH LTD was founded in 2025 on a simple principle: technology
            should simplify life, not complicate it. We started with Expenzez, a
            free expense tracker for UK consumers, because money is where clarity
            matters most.
          </p>
          <p>
            We stay deliberately small and product-focused — design and engineering
            in one room, shipping software we'd want to use ourselves.
          </p>
        </div>

        <div className="about-values reveal reveal-delay-1" ref={rightRef}>
          {values.map((value) => (
            <div key={value.title} className="about-value">
              <h4>{value.title}</h4>
              <p>{value.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
