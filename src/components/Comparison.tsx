import React from 'react';
import { Check, X } from 'lucide-react';
import './Comparison.css';

const Comparison: React.FC = () => {
  const features = [
    {
      feature: "Manual Transaction Entry",
      expenzez: true,
      competitor1: true,
      competitor2: true
    },
    {
      feature: "CSV Import",
      expenzez: true,
      competitor1: false,
      competitor2: true
    },
    {
      feature: "Beautiful, Modern Interface",
      expenzez: true,
      competitor1: false,
      competitor2: true
    },
    {
      feature: "Real-Time Analytics Dashboard",
      expenzez: true,
      competitor1: true,
      competitor2: true
    },
    {
      feature: "Smart Categorization",
      expenzez: true,
      competitor1: true,
      competitor2: false
    },
    {
      feature: "Bank-Level Security",
      expenzez: true,
      competitor1: true,
      competitor2: true
    },
    {
      feature: "iOS App Available",
      expenzez: true,
      competitor1: true,
      competitor2: true
    },
    {
      feature: "Custom Category Creation",
      expenzez: true,
      competitor1: false,
      competitor2: false
    },
    {
      feature: "CSV Export",
      expenzez: true,
      competitor1: true,
      competitor2: false
    },
    {
      feature: "Completely Free",
      expenzez: true,
      competitor1: false,
      competitor2: false
    }
  ];

  return (
    <section className="comparison">
      <div className="comparison-container">
        <div className="comparison-header">
          <h2 className="comparison-title">Why Choose Expenzez?</h2>
          <p className="comparison-lead">
            See how we compare to other expense tracking solutions in the market
          </p>
        </div>

        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="feature-column">Feature</th>
                <th className="brand-column highlight">
                  <div className="brand-header">
                    <span className="brand-name">Expenzez</span>
                    <span className="brand-badge">Our Platform</span>
                  </div>
                </th>
                <th className="brand-column">
                  <span className="brand-name">Competitor A</span>
                </th>
                <th className="brand-column">
                  <span className="brand-name">Competitor B</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((row, index) => (
                <tr key={index}>
                  <td className="feature-name">{row.feature}</td>
                  <td className="feature-value highlight">
                    {row.expenzez ? (
                      <Check className="check-icon" size={20} />
                    ) : (
                      <X className="x-icon" size={20} />
                    )}
                  </td>
                  <td className="feature-value">
                    {row.competitor1 ? (
                      <Check className="check-icon" size={20} />
                    ) : (
                      <X className="x-icon" size={20} />
                    )}
                  </td>
                  <td className="feature-value">
                    {row.competitor2 ? (
                      <Check className="check-icon" size={20} />
                    ) : (
                      <X className="x-icon" size={20} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="comparison-cta">
          <p>Ready to experience the difference?</p>
          <a href="#products" className="comparison-button">
            Try Expenzez Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
