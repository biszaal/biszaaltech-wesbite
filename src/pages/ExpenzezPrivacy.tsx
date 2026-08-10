import React from 'react';
import './LegalPages.css';

interface Basis {
  purpose: string;
  basis: string;
}

const legalBases: Basis[] = [
  {
    purpose: 'Creating and running your account; storing and displaying the data you enter',
    basis: 'Performance of our contract with you',
  },
  {
    purpose: 'Categorising transactions and generating AI-powered insights and budgeting tools',
    basis: 'Performance of our contract / our legitimate interest in providing core features',
  },
  {
    purpose: 'Verifying you are 18 or over',
    basis: 'Legal obligation / legitimate interest in operating an 18+ service',
  },
  {
    purpose: 'Analytics and crash reporting',
    basis: 'Your consent (which you can withdraw at any time)',
  },
  {
    purpose: 'Showing ads in the free version of the app',
    basis:
      'Our legitimate interest in offering a free, ad-supported tier (non-personalised ads); your consent (personalised ads)',
  },
  {
    purpose: 'Account security, preventing fraud and abuse',
    basis: 'Our legitimate interest in keeping the Service secure',
  },
  {
    purpose: 'Service emails (e.g. verification, security, important updates)',
    basis: 'Performance of our contract',
  },
  { purpose: 'Optional marketing messages', basis: 'Your consent' },
  { purpose: 'Meeting legal and regulatory obligations', basis: 'Legal obligation' },
];

/**
 * Privacy policy for the Expenzez app.
 *
 * Ported from expenzez-website/src/pages/PrivacyPolicy.tsx so that every
 * Biszaal Tech app has its policy on one domain. The two must be kept in step —
 * if one is edited, edit the other.
 */
const ExpenzezPrivacy: React.FC = () => {
  return (
    <main id="main" className="legal-page">
      <div className="legal-container">
        <h1>Expenzez Privacy Policy</h1>
        <p className="last-updated">Last updated: August 10, 2026</p>

        <section>
          <h2>1. Who we are</h2>
          <p>
            Expenzez is an expense-tracking mobile application operated by{' '}
            <strong>BISZAAL TECH LTD</strong> ("Expenzez", "we", "our", or "us"). We are the data
            controller responsible for your personal data under the UK General Data Protection
            Regulation (UK GDPR) and the Data Protection Act 2018.
          </p>
          <div className="contact-info">
            <p><strong>Controller:</strong> BISZAAL TECH LTD (registered in England and Wales)</p>
            <p><strong>Company number:</strong> 16693100</p>
            <p><strong>Registered office:</strong> 71-75 Shelton Street, London, WC2H 9JQ, United Kingdom</p>
            <p><strong>ICO registration number:</strong> ZC055545</p>
            <p>
              <strong>Privacy contact:</strong>{' '}
              <a href="mailto:privacy@expenzez.com">privacy@expenzez.com</a>
            </p>
          </div>
          <p>
            This policy explains what personal data we collect, why, the legal bases we rely on, who
            we share it with, how long we keep it, and the rights you have. By "Service" we mean the
            Expenzez mobile app and related websites and support channels.
          </p>
        </section>

        <section>
          <h2>2. What Expenzez does (and does not) do</h2>
          <p>
            Expenzez is a tool that helps you record and understand your own spending. You add data
            manually or by importing a CSV file (for example, a statement you have exported from
            your bank).{' '}
            <strong>
              Expenzez does not connect to your bank, does not access your bank accounts, and never
              moves money.
            </strong>{' '}
            We are not a bank, payment service, or regulated financial adviser, and we do not provide
            regulated financial advice.
          </p>
        </section>

        <section>
          <h2>3. Information we collect</h2>

          <h3>3.1 Account and identity information</h3>
          <ul>
            <li>Name and username</li>
            <li>Email address</li>
            <li>Date of birth (used to confirm you are 18 or over)</li>
            <li>Phone number (optional, used for account security if you provide it)</li>
            <li>Address (optional)</li>
          </ul>

          <h3>3.2 Financial information you enter</h3>
          <p>This is data you choose to add or import. It can include:</p>
          <ul>
            <li>Transaction amounts, dates, descriptions and merchant names</li>
            <li>Categories you assign, budgets and savings goals</li>
            <li>Balances and spending summaries derived from the data you enter</li>
          </ul>
          <p>
            Transaction descriptions can sometimes reveal sensitive details about you (for example, a
            payment to a place of worship or a medical clinic). We only process this data to provide
            the Service and we do not use it to infer or record special category data about you.
          </p>

          <h3>3.3 Subscription and billing information</h3>
          <p>
            Paid subscriptions (Expenzez Pro) are purchased and billed through the Apple App Store or
            Google Play and managed via RevenueCat. We receive your subscription status (for example,
            active or expired) but{' '}
            <strong>we do not receive or store your card or payment details</strong>; those are
            handled by Apple, Google and their payment processors.
          </p>

          <h3>3.4 Device and usage information</h3>
          <ul>
            <li>Device type, operating system and app version</li>
            <li>
              App-usage analytics (screens viewed, features used), <strong>only if you consent</strong>
            </li>
            <li>
              Crash and diagnostic reports, <strong>only if you consent</strong>
            </li>
            <li>
              Advertising identifiers (such as the Apple IDFA or the Google Advertising ID) and
              limited ad-interaction data, used by our advertising partner to show ads in the free
              version of the app (see section 7).{' '}
              <strong>Expenzez Pro subscribers do not see ads.</strong>
            </li>
          </ul>
          <p>
            Analytics and crash reporting are switched <strong>off by default</strong>. You can turn
            them on or off at any time in the app under{' '}
            <strong>Settings → Data &amp; Privacy</strong>, and via the cookie banner on our website.
          </p>
        </section>

        <section>
          <h2>4. Why we use your data and our legal bases</h2>
          <p>Under UK GDPR we must have a lawful basis for each use of your data:</p>
          <div className="legal-table-scroll">
            <table className="legal-table">
              <thead>
                <tr>
                  <th scope="col">Purpose</th>
                  <th scope="col">Legal basis</th>
                </tr>
              </thead>
              <tbody>
                {legalBases.map((row) => (
                  <tr key={row.purpose}>
                    <td>{row.purpose}</td>
                    <td>{row.basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>5. AI features and automated processing</h2>
          <p>
            To categorise transactions and produce insights, some of the text you enter (such as
            transaction descriptions or questions you ask the in-app assistant) is sent to our AI
            processor, OpenAI, for processing. This processing is done to provide the feature you
            have requested; OpenAI does not use API data to train its models.
          </p>
          <p>
            Our insights and recommendations are produced by automated analysis (profiling) of the
            data you enter, but they are provided for information only and{' '}
            <strong>do not constitute financial advice</strong>. We do not make any decision about
            you that produces legal effects or similarly significant effects solely by automated
            means.
          </p>
        </section>

        <section>
          <h2>6. Who we share your data with</h2>
          <p>
            <strong>We do not sell your personal data.</strong> We share it only with service
            providers who process it on our behalf under contract, and only as needed to run the
            Service:
          </p>
          <ul>
            <li>
              <strong>Amazon Web Services (AWS)</strong>: secure cloud hosting and database storage
              (London / UK region)
            </li>
            <li>
              <strong>OpenAI</strong>: AI transaction categorisation and insights (United States)
            </li>
            <li>
              <strong>Google / Firebase</strong>: app analytics and (where used) sign-in and address
              lookup (only with your consent for analytics)
            </li>
            <li>
              <strong>Sentry</strong>: crash and error diagnostics (only with your consent)
            </li>
            <li>
              <strong>RevenueCat, Apple and Google</strong>: subscription management and billing
            </li>
            <li>
              <strong>Google AdMob</strong>: advertising in the free version of the app (see section
              7)
            </li>
          </ul>
          <p>
            We may also disclose data where required by law, to protect our rights or users' safety,
            or in connection with a business sale or reorganisation.
          </p>
        </section>

        <section>
          <h2>7. Advertising</h2>
          <p>
            The free version of Expenzez is supported by ads. We use <strong>Google AdMob</strong> to
            show ads in the app. <strong>Expenzez Pro subscribers do not see any ads.</strong>
          </p>
          <p>
            To show ads, Google AdMob and its partners may collect and use a mobile advertising
            identifier (the Apple IDFA on iOS or the Google Advertising ID on Android), together with
            limited information about your device and how you interact with ads. Google acts as an
            independent controller for ad delivery and measurement; see Google's{' '}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
            >
              policies
            </a>{' '}
            for details.{' '}
            <strong>
              We never share the financial data you enter with advertisers, and your transactions are
              never used to target ads.
            </strong>
          </p>
          <p><strong>Your choices:</strong></p>
          <ul>
            <li>
              <strong>Personalised vs non-personalised ads.</strong> In the UK and EEA we ask for your
              consent (via Google's consent prompt) before showing personalised ads. If you decline,
              you will still see ads, but they will be non-personalised.
            </li>
            <li>
              <strong>iOS App Tracking Transparency.</strong> On iOS we ask permission before using
              your advertising identifier (IDFA). If you decline, ads are non-personalised. You can
              change this under <strong>iOS Settings → Privacy &amp; Security → Tracking</strong>.
            </li>
            <li>
              <strong>Android.</strong> You can reset or delete your Advertising ID, or opt out of ad
              personalisation, under <strong>Android Settings → Privacy → Ads</strong>.
            </li>
            <li>
              <strong>Remove ads entirely.</strong> Upgrade to Expenzez Pro to use the app with no
              ads.
            </li>
          </ul>
        </section>

        <section>
          <h2>8. International data transfers</h2>
          <p>
            Your data is stored in the United Kingdom. However, some of our service providers
            (including OpenAI, Google, Sentry and RevenueCat) process data in the United States or
            other countries outside the UK. Where data is transferred outside the UK, we rely on
            appropriate safeguards, such as the UK International Data Transfer Agreement (IDTA), the
            EU Standard Contractual Clauses with the UK Addendum, or the UK Extension to the EU–US
            Data Privacy Framework where the provider is certified.
          </p>
        </section>

        <section>
          <h2>9. How long we keep your data</h2>
          <p>
            We keep your personal data for as long as your account is active. When you delete your
            account, we permanently delete your personal data and the financial data you entered,
            normally immediately and in any event within 30 days, except for limited records (such as
            records of a transaction or information we are legally required to retain) which we keep
            only for as long as the law requires.
          </p>
        </section>

        <section>
          <h2>10. How we protect your data</h2>
          <ul>
            <li>Encryption of data in transit (TLS) and at rest</li>
            <li>Optional PIN and biometric (Face ID / fingerprint) lock on your device</li>
            <li>Access controls limiting who can access systems and data</li>
            <li>Filtering of sensitive values out of diagnostic logs</li>
          </ul>
          <p>
            No method of transmission or storage is completely secure, but we take reasonable steps
            to protect your information.
          </p>
        </section>

        <section>
          <h2>11. Your rights</h2>
          <p>Under UK GDPR you have the right to:</p>
          <ul>
            <li>Access a copy of your personal data</li>
            <li>Have inaccurate data corrected</li>
            <li>Have your data erased (you can delete your account in the app, or contact us)</li>
            <li>Restrict or object to processing</li>
            <li>Data portability</li>
            <li>
              Withdraw consent at any time (for example, for analytics) without affecting prior
              processing
            </li>
          </ul>
          <p>
            To exercise any of these rights, contact{' '}
            <a href="mailto:privacy@expenzez.com">privacy@expenzez.com</a>. We will respond within one
            month.
          </p>
          <p>
            You also have the right to complain to the Information Commissioner's Office (ICO), the
            UK data protection regulator, at{' '}
            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a> or
            on 0303 123 1113. We would, however, appreciate the chance to address your concerns
            first.
          </p>
        </section>

        <section>
          <h2>12. Children</h2>
          <p>
            Expenzez is intended only for adults. You must be <strong>18 or over</strong> to create
            an account, and we ask for your date of birth at sign-up to confirm this. The Service is
            not directed at children, and we do not knowingly collect personal data from anyone under
            18. If you believe a person under 18 has provided us with personal data, please contact{' '}
            <a href="mailto:privacy@expenzez.com">privacy@expenzez.com</a> and we will delete it.
          </p>
        </section>

        <section>
          <h2>13. Cookies and similar technologies</h2>
          <p>
            Our website uses only essential cookies by default. Analytics cookies are set only after
            you accept them via the cookie banner. In the app, analytics and crash-reporting
            identifiers are used only if you opt in under{' '}
            <strong>Settings → Data &amp; Privacy</strong>. You can change your choice at any time.
            In the free version of the app, advertising identifiers are also used to show ads; see
            section 7. Expenzez Pro removes ads.
          </p>
        </section>

        <section>
          <h2>14. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will post the updated version
            here and change the "Last updated" date. Where changes are significant, we will take
            reasonable steps to notify you.
          </p>
        </section>

        <section>
          <h2>15. Contact us</h2>
          <div className="contact-info">
            <p><strong>Company:</strong> BISZAAL TECH LTD</p>
            <p>
              <strong>Privacy &amp; data requests:</strong>{' '}
              <a href="mailto:privacy@expenzez.com">privacy@expenzez.com</a>
            </p>
            <p>
              <strong>General support:</strong>{' '}
              <a href="mailto:support@expenzez.com">support@expenzez.com</a>
            </p>
            <p><strong>Address:</strong> 71-75 Shelton Street, London, WC2H 9JQ, United Kingdom</p>
          </div>
        </section>

        <section>
          <div className="contact-info">
            <p>
              <strong>Regulatory note:</strong> Expenzez, operated by BISZAAL TECH LTD, complies with
              the UK GDPR and the Data Protection Act 2018. Expenzez is an expense-tracking tool; it
              is not a bank or a regulated financial service and does not provide regulated financial
              advice.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ExpenzezPrivacy;
