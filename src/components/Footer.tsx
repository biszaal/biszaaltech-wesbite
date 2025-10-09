import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-company">
            <h3>BISZAAL TECH LTD</h3>
            <p>Company Number: 16693100</p>
            <p>Registered in England and Wales</p>
            <p>Registered Office: 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ</p>
          </div>
          
          <div className="footer-links">
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms of Service</Link>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 BISZAAL TECH LTD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;