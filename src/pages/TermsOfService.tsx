import React from 'react';
import './LegalPages.css';

const TermsOfService: React.FC = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last updated: January 1, 2025</p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using the BISZAAL TECH LTD website ("the Service"), you accept and agree to be bound 
            by the terms and provision of this agreement.
          </p>
        </section>

        <section>
          <h2>2. About the Service</h2>
          <p>
            This website serves as a corporate information portal for BISZAAL TECH LTD, a company registered in 
            England and Wales (Company Number: 16693100). The Service provides information about our company, 
            products, and services.
          </p>
        </section>

        <section>
          <h2>3. Use License</h2>
          <p>
            Permission is granted to temporarily access the materials on BISZAAL TECH LTD's website for personal, 
            non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to reverse engineer any software contained on the website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
          </ul>
        </section>

        <section>
          <h2>4. Disclaimer</h2>
          <p>
            The materials on BISZAAL TECH LTD's website are provided on an 'as is' basis. BISZAAL TECH LTD makes 
            no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, 
            without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, 
            or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section>
          <h2>5. Limitations</h2>
          <p>
            In no event shall BISZAAL TECH LTD or its suppliers be liable for any damages (including, without limitation, 
            damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
            to use the materials on the website, even if BISZAAL TECH LTD or an authorized representative has been 
            notified orally or in writing of the possibility of such damage.
          </p>
        </section>

        <section>
          <h2>6. User Conduct</h2>
          <p>You agree not to use the Service to:</p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Transmit any harmful, threatening, abusive, or defamatory content</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with the proper working of the Service</li>
          </ul>
        </section>

        <section>
          <h2>7. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive 
            property of BISZAAL TECH LTD and its licensors. The Service is protected by copyright, trademark, 
            and other laws.
          </p>
        </section>

        <section>
          <h2>8. Termination</h2>
          <p>
            We may terminate or suspend your access immediately, without prior notice or liability, for any reason 
            whatsoever, including without limitation if you breach the Terms.
          </p>
        </section>

        <section>
          <h2>9. Changes to Terms</h2>
          <p>
            BISZAAL TECH LTD reserves the right, at our sole discretion, to modify or replace these Terms at any time. 
            If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
          </p>
        </section>

        <section>
          <h2>10. Governing Law</h2>
          <p>
            These Terms shall be interpreted and governed in accordance with the laws of England and Wales, 
            without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2>11. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <div className="contact-info">
            <p><strong>BISZAAL TECH LTD</strong></p>
            <p>Email: hello@biszaaltech.com</p>
            <p>Address: 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ</p>
            <p>Company Number: 16693100</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;