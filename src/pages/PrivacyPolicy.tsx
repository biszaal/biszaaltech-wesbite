import React from 'react';
import './LegalPages.css';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: January 1, 2025</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            BISZAAL TECH LTD ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
            This privacy policy explains how we collect, use, and protect your information when you visit our website.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <h3>Information you provide to us:</h3>
          <ul>
            <li>Contact information (name, email address) when you fill out our contact form</li>
            <li>Any other information you choose to provide when contacting us</li>
          </ul>
          
          <h3>Information we collect automatically:</h3>
          <ul>
            <li>IP address and browser information</li>
            <li>Pages visited and time spent on our website</li>
            <li>Referral source (how you found our website)</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2>4. Information Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share your information only:
          </p>
          <ul>
            <li>With your explicit consent</li>
            <li>To comply with legal requirements</li>
            <li>To protect our rights and prevent fraud</li>
          </ul>
        </section>

        <section>
          <h2>5. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against unauthorized access, 
            alteration, disclosure, or destruction.
          </p>
        </section>

        <section>
          <h2>6. Your Rights</h2>
          <p>Under UK data protection law, you have the right to:</p>
          <ul>
            <li>Request access to your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Request data portability</li>
          </ul>
        </section>

        <section>
          <h2>7. Cookies</h2>
          <p>
            Our website may use cookies to enhance your browsing experience. You can choose to disable cookies 
            through your browser settings, though this may affect website functionality.
          </p>
        </section>

        <section>
          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any changes by posting 
            the new policy on this page with an updated "Last updated" date.
          </p>
        </section>

        <section>
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our data practices, please contact us at:
          </p>
          <div className="contact-info">
            <p><strong>BISZAAL TECH LTD</strong></p>
            <p>Email: hello@biszaaltech.com</p>
            <p>Address: 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;