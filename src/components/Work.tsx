import React from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { projects } from '../data/projects';
import './Work.css';

const Work: React.FC = () => {
  const headRef = useReveal<HTMLDivElement>();
  const listRef = useReveal<HTMLOListElement>();

  return (
    <section id="work" className="work">
      <div className="container">
        <div className="work-head reveal" ref={headRef}>
          <span className="eyebrow">Proof</span>
          <h2>Five we built ourselves.</h2>
          <p className="work-lead">
            Two apps and three games — designed, built, submitted and maintained by
            the same people who would build yours.
          </p>
        </div>

        <ol className="work-list reveal reveal-delay-1" ref={listRef}>
          {projects.map((project) => (
            <li key={project.slug} className="work-item">
              <img src={project.icon} alt="" className="work-chip" aria-hidden="true" />
              <div className="work-item-copy">
                <h3 className="work-name">{project.name}</h3>
                <p className="work-tagline">{project.tagline}</p>
              </div>
              <span className="mono-meta work-kind">
                {project.kind === 'app' ? 'App' : 'Game'}
              </span>
            </li>
          ))}
        </ol>

        <Link to="/projects" className="pill-btn pill-btn--accent work-cta">
          See the work
          <span className="btn-orb" aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
};

export default Work;
