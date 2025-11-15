import React from 'react';
import { Lightbulb, Shield, Eye, Award } from 'lucide-react';
import './About.css';

const About: React.FC = () => {
  const values = [
    {
      title: "Innovation",
      description: "We leverage cutting-edge technology to solve real-world problems with elegant solutions.",
      icon: Lightbulb
    },
    {
      title: "Security",
      description: "User data protection and privacy are at the core of everything we build and maintain.",
      icon: Shield
    },
    {
      title: "Transparency",
      description: "We believe in clear communication and honest practices with our users and partners.",
      icon: Eye
    },
    {
      title: "Excellence",
      description: "We strive for the highest quality in our products, services, and user experiences.",
      icon: Award
    }
  ];

  const highlights = [
    {
      metric: "2025",
      label: "Established"
    },
    {
      metric: "UK",
      label: "Based"
    },
    {
      metric: "Fintech",
      label: "Focused"
    },
    {
      metric: "SaaS",
      label: "Technology"
    }
  ];

  return (
    <section className="about">
      <div className="about-container">
        <div className="about-header">
          <h2 className="about-title">About BISZAAL TECH</h2>
          <p className="about-lead">
            BISZAAL TECH LTD was founded on the principle that technology should simplify life, not complicate it. 
            We are a product-focused company dedicated to building secure, beautiful, and intelligent software that 
            solves tangible problems for our users.
          </p>
        </div>

        <div className="about-achievements">
          {highlights.map((highlight, index) => (
            <div key={index} className="achievement-item">
              <span className="achievement-metric">{highlight.metric}</span>
              <span className="achievement-label">{highlight.label}</span>
            </div>
          ))}
        </div>

        <div className="about-details">
          <div className="company-story">
            <h3>Our Story</h3>
            <p>
              Founded in 2025 and based in London, BISZAAL TECH LTD was established with a vision to transform how 
              people interact with their finances. We are committed to building innovative financial technology 
              solutions that combine user-centric design with robust engineering.
            </p>
            <p>
              Our approach focuses on creating products that genuinely serve our users' needs. We believe in the 
              power of technology to simplify complex financial processes and provide users with better insights 
              into their financial lives through intuitive, well-designed applications.
            </p>
          </div>

          <div className="company-values">
            <h3>Our Values</h3>
            <div className="values-grid">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={index} className="value-item">
                    <div className="value-icon">
                      <IconComponent size={32} strokeWidth={1.5} />
                    </div>
                    <h4>{value.title}</h4>
                    <p>{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="about-vision">
          <div className="vision-content">
            <h3>Our Vision</h3>
            <p>
              We envision a world where technology seamlessly integrates with daily life to empower better 
              financial decisions. Through our growing suite of fintech solutions, we aim to become the 
              trusted partner for individuals seeking to take control of their financial future.
            </p>
            <div className="vision-stats">
              <div className="vision-stat">
                <span className="stat-title">Security First</span>
                <span className="stat-description">Committed to the highest security standards and best practices</span>
              </div>
              <div className="vision-stat">
                <span className="stat-title">Modern Technology</span>
                <span className="stat-description">Building with contemporary tools and frameworks</span>
              </div>
              <div className="vision-stat">
                <span className="stat-title">User-Centric Design</span>
                <span className="stat-description">Every feature designed with user needs in mind</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;