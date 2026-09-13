import React from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import Seo from '../components/Seo';
import GamesDoorway from '../components/GamesDoorway';
import { projects, ProjectEntry, ProjectLink } from '../data/projects';
import './Projects.css';

const Projects: React.FC = () => {
  const headRef = useReveal<HTMLDivElement>();

  return (
    <main id="main" className="projects-page">
      <Seo title="Our work — Biszaal Tech" canonical="https://www.biszaaltech.com/projects" />

      <section className="projects-hero">
        <div className="container projects-hero-inner reveal" ref={headRef}>
          <span className="eyebrow">Our work</span>
          <h1>Built and shipped.</h1>
          <p className="projects-hero-sub">
            Five products we designed, built and put in front of real people — two
            apps and three games, all made in London.
          </p>
        </div>
      </section>

      <section className="projects-list container" aria-label="Projects">
        {projects.map((project, i) => (
          <ProjectRow key={project.slug} project={project} flip={i % 2 === 1} />
        ))}
      </section>

      <GamesDoorway />

      <section className="projects-crossband container">
        <p>
          Want something like this?{' '}
          <Link to="/#contact" className="text-link">Start a project</Link>
        </p>
      </section>
    </main>
  );
};

const ProjectAction: React.FC<{ link: ProjectLink }> = ({ link }) => {
  const className = link.primary ? 'pill-btn pill-btn--accent' : 'text-link';
  const body = link.primary ? (
    <>
      {link.label}
      <span className="btn-orb" aria-hidden="true">{link.external ? '↗' : '→'}</span>
    </>
  ) : (
    link.label
  );

  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {body}
    </a>
  ) : (
    <Link to={link.href} className={className}>{body}</Link>
  );
};

const ProjectRow: React.FC<{ project: ProjectEntry; flip: boolean }> = ({ project, flip }) => {
  const ref = useReveal<HTMLElement>();

  return (
    <article className={`shell project-row reveal${flip ? ' project-row--flip' : ''}`} ref={ref}>
      <div className="shell-core project-row-core">
        <div className="project-art">
          <img src={project.icon} alt={project.iconAlt} className="project-icon" />
        </div>
        <div className="project-info">
          <h2 className="project-name">{project.name}</h2>
          <p className="project-tagline">{project.tagline}</p>
          <p className="project-desc">{project.description}</p>
          <p className="mono-meta project-meta">{project.meta.join(' · ')}</p>
          <div className="project-actions">
            {project.status && <span className="project-status">{project.status}</span>}
            {project.links.map((link) => (
              <ProjectAction key={link.label} link={link} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Projects;
