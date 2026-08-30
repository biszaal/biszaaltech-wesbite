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
    text: 'Clear language, honest scope, and software that does what it says. Nothing is dressed up.',
  },
  {
    title: 'Built to be handed over',
    text: 'Conventional structure, real documentation, and your name on the repo. '
      + 'Another developer should be able to pick it up without ringing us.',
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
          <h2>A small studio that ships its own software.</h2>
          <p>
            BISZAAL TECH LTD was founded in 2025 on a simple principle: technology
            should simplify life, not complicate it. We build software for other
            people, and we build our own — the same standard applies to both.
          </p>
          <p>
            We stay deliberately small and hands-on — design and engineering
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
