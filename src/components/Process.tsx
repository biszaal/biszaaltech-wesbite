import React from 'react';
import { useReveal } from '../hooks/useReveal';
import './Process.css';

interface Step {
  title: string;
  body: string;
}

/**
 * Deliberately no durations and no delivery guarantees — those would be
 * commitments about how the studio operates, not facts. Each line describes
 * what the step is, not what it promises.
 */
const steps: Step[] = [
  {
    title: 'We talk it through',
    body:
      'You tell us what you are trying to build. We ask the awkward questions early, ' +
      'while they are still cheap.',
  },
  {
    title: 'We design the screens',
    body: 'Wireframes first, then the interface. You see it before it gets built.',
  },
  {
    title: 'We build it',
    body:
      'Design and engineering in the same room, so what got drawn is what gets ' +
      'written.',
  },
  {
    title: 'We ship and hand over',
    body:
      'Store submission, deployment, and the repository and accounts in your name.',
  },
];

const Process: React.FC = () => {
  const headRef = useReveal<HTMLDivElement>();
  const listRef = useReveal<HTMLOListElement>();

  return (
    <section id="process" className="process">
      <div className="container">
        <div className="process-head reveal" ref={headRef}>
          <span className="eyebrow">How we work</span>
          <h2>Here's how it goes.</h2>
        </div>

        <ol className="process-list reveal reveal-delay-1" ref={listRef}>
          {steps.map((step, i) => (
            <li key={step.title} className="process-item">
              <span className="mono-meta process-index">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="process-copy">
                <h3 className="process-name">{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
