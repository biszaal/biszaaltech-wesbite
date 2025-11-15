import React from 'react';
import { Receipt, TrendingUp, Target, ShieldCheck, Smartphone, Zap } from 'lucide-react';
import './Products.css';

const Products: React.FC = () => {
  const features = [
    {
      title: "Manual Entry",
      description: "Quick and easy manual transaction entry to track all your expenses",
      icon: Receipt
    },
    {
      title: "CSV Upload",
      description: "Import your bank statements via CSV for bulk transaction management",
      icon: TrendingUp
    },
    {
      title: "Smart Analytics",
      description: "Gain insights into your financial habits through intuitive charts and reports",
      icon: Target
    },
    {
      title: "Secure Design",
      description: "Built with security best practices to protect your financial information",
      icon: ShieldCheck
    },
    {
      title: "User-Friendly Interface",
      description: "Clean, intuitive design that makes financial management straightforward",
      icon: Smartphone
    },
    {
      title: "Modern Technology",
      description: "Developed using contemporary web technologies for a smooth user experience",
      icon: Zap
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
                Currently featuring manual transaction entry and CSV upload capabilities, we're building a comprehensive platform
                that provides users with clearer insights into their spending patterns and financial health through intuitive design
                and thoughtful features.
              </p>
            </div>
          </div>
          
          <div className="features-grid">
            <h3 className="features-title">Key Features</h3>
            <div className="features-list">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="feature-item">
                    <div className="feature-icon">
                      <IconComponent size={28} strokeWidth={1.5} />
                    </div>
                    <div className="feature-content">
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                );
              })}
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
                <span className="tech-name">CSV Processing</span>
                <span className="tech-description">Bulk transaction imports</span>
              </div>
              <div className="tech-item">
                <span className="tech-name">Smart Categorization</span>
                <span className="tech-description">Intelligent expense organization</span>
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
              href="https://apps.apple.com/us/app/expenzez/id6751338089"
              target="_blank"
              rel="noopener noreferrer"
              className="product-button secondary"
            >
              Download iOS App
            </a>
            <button
              className="product-button secondary disabled"
              disabled
            >
              Android App - Coming Soon
            </button>
          </div>
        </div>
        
        <div className="future-roadmap">
          <h3 className="roadmap-title">What's Next</h3>
          <p className="roadmap-description">
            Expenzez represents our commitment to building helpful financial tools. We've launched with manual entry
            and CSV upload as our MVP, providing a solid foundation for personal finance management. Our roadmap
            focuses on expanding capabilities based on user feedback to create a comprehensive platform that genuinely
            helps users make better financial decisions.
          </p>

          <div className="upcoming-features">
            <div className="upcoming-item">
              <span className="upcoming-title">Open Banking Integration</span>
              <span className="upcoming-status">Coming Soon</span>
            </div>
            <div className="upcoming-item">
              <span className="upcoming-title">Android App Launch</span>
              <span className="upcoming-status">In Development</span>
            </div>
            <div className="upcoming-item">
              <span className="upcoming-title">Enhanced Analytics</span>
              <span className="upcoming-status">Planning Phase</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;