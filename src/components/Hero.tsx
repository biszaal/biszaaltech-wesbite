import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-floating-elements">
        <div className="floating-dot"></div>
        <div className="floating-dot"></div>
        <div className="floating-dot"></div>
      </div>

      <div className="hero-container">
        <h1 className="hero-headline">
          Building Intelligent Software for Modern Life
        </h1>
        <p className="hero-subheadline">
          At Biszaal Tech, we leverage data and design to create intuitive applications that empower our users.
        </p>
        <button className="hero-cta" onClick={scrollToProducts}>
          See Our Products
        </button>
      </div>
    </section>
  );
};

export default Hero;