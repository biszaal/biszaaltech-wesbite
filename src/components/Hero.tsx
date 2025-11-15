import React from 'react';
import { Users, Download, Star, TrendingUp } from 'lucide-react';
import './Hero.css';

const Hero: React.FC = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { icon: Users, value: "10,000+", label: "Active Users" },
    { icon: Download, value: "50,000+", label: "Downloads" },
    { icon: Star, value: "4.8/5", label: "User Rating" },
    { icon: TrendingUp, value: "£2M+", label: "Tracked Expenses" }
  ];

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

        <div className="hero-stats">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="hero-stat">
                <IconComponent className="stat-icon" size={24} strokeWidth={1.5} />
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;