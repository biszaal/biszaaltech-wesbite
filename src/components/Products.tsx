import React from 'react';
import './Products.css';

const Products: React.FC = () => {
  const features = [
    {
      title: "Transaction Tracking",
      description: "Monitor your spending patterns with clear categorization and organization"
    },
    {
      title: "Smart Analytics",
      description: "Gain insights into your financial habits through intuitive charts and reports"
    },
    {
      title: "Budget Planning",
      description: "Set and track budgets to help manage your financial goals effectively"
    },
    {
      title: "Secure Design",
      description: "Built with security best practices to protect your financial information"
    },
    {
      title: "User-Friendly Interface",
      description: "Clean, intuitive design that makes financial management straightforward"
    },
    {
      title: "Modern Technology",
      description: "Developed using contemporary web technologies for a smooth user experience"
    }
  ];

  return (
    <section id="products" className="products">
      <div className="products-container">
        <h2 className="products-title">Our Products</h2>
        
        <div className="product-showcase">
          <div className="product-main-card">
            <div className="product-header">
              <div className="product-logo">
                <h3>Expenzez</h3>
                <span className="product-tagline">Smart Expense Tracking for the Modern Consumer</span>
              </div>
              <div className="product-image-placeholder">
                <div className="app-mockup">
                  <div className="phone-frame">
                    <div className="screen">
                      <div className="app-header">
                        <div className="status-bar"></div>
                        <h4>Expenzez</h4>
                      </div>
                      <div className="dashboard">
                        <div className="balance-card">
                          <span>Total Balance</span>
                          <strong>£2,847.32</strong>
                        </div>
                        <div className="spending-chart"></div>
                        <div className="recent-transactions">
                          <div className="transaction"></div>
                          <div className="transaction"></div>
                          <div className="transaction"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="product-description-detailed">
              <p className="lead-description">
                Expenzez is our fintech application designed to help UK consumers better understand and manage their finances. 
                We're building modern tools that aim to provide users with clearer insights into their spending patterns 
                and financial health through intuitive design and thoughtful features.
              </p>
            </div>
          </div>
          
          <div className="features-grid">
            <h3 className="features-title">Key Features</h3>
            <div className="features-list">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-icon">
                    <div className="icon-placeholder"></div>
                  </div>
                  <div className="feature-content">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="technology-stack">
            <h3 className="tech-title">Built With Modern Technology</h3>
            <div className="tech-grid">
              <div className="tech-item">
                <span className="tech-name">React Native</span>
                <span className="tech-description">Cross-platform mobile development</span>
              </div>
              <div className="tech-item">
                <span className="tech-name">Node.js</span>
                <span className="tech-description">Scalable backend infrastructure</span>
              </div>
              <div className="tech-item">
                <span className="tech-name">Open Banking API</span>
                <span className="tech-description">PSD2-compliant bank connections</span>
              </div>
              <div className="tech-item">
                <span className="tech-name">Machine Learning</span>
                <span className="tech-description">AI-powered categorization</span>
              </div>
              <div className="tech-item">
                <span className="tech-name">AWS Cloud</span>
                <span className="tech-description">Enterprise-grade hosting</span>
              </div>
              <div className="tech-item">
                <span className="tech-name">PostgreSQL</span>
                <span className="tech-description">Secure data management</span>
              </div>
            </div>
          </div>
          
          <div className="product-cta-section">
            <a 
              href="https://expenzez.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="product-button primary"
            >
              Visit Expenzez Website
            </a>
            <a 
              href="https://apps.apple.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="product-button secondary"
            >
              Download iOS App
            </a>
            <a 
              href="https://play.google.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="product-button secondary"
            >
              Download Android App
            </a>
          </div>
        </div>
        
        <div className="future-roadmap">
          <h3 className="roadmap-title">What's Next</h3>
          <p className="roadmap-description">
            Expenzez represents our commitment to building helpful financial tools. We're focused on creating 
            a solid foundation for personal finance management, with plans to expand features based on user 
            feedback and needs. Our goal is to develop a comprehensive platform that genuinely helps users 
            make better financial decisions.
          </p>
          
          <div className="upcoming-features">
            <div className="upcoming-item">
              <span className="upcoming-title">Enhanced Analytics</span>
              <span className="upcoming-status">In Development</span>
            </div>
            <div className="upcoming-item">
              <span className="upcoming-title">Improved User Experience</span>
              <span className="upcoming-status">Ongoing</span>
            </div>
            <div className="upcoming-item">
              <span className="upcoming-title">Additional Features</span>
              <span className="upcoming-status">Planning Phase</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;