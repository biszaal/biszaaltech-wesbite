import React from 'react';
import { useReveal } from '../hooks/useReveal';
import './FAQ.css';

const faqs = [
  {
    question: 'Is my financial data secure with Expenzez?',
    answer:
      'Yes. Data is encrypted in transit and at rest, and the upcoming Open Banking integration will be PSD2-compliant. Security is a design constraint, not a feature.',
  },
  {
    question: 'How do I add my transactions?',
    answer:
      'Two ways today: quick manual entry for individual transactions, and CSV upload for bulk imports from bank statements. Open Banking will add automatic imports.',
  },
  {
    question: 'Is Expenzez really free?',
    answer:
      'The core product — manual entry, CSV import, and analytics — is free. If premium features arrive later, they will be additions, not paywalls around what you already use.',
  },
  {
    question: 'Can I use it on Android?',
    answer:
      'Expenzez is on iOS today. The Android version is in development on the same React Native codebase, so the two will stay in step.',
  },
  {
    question: 'How does categorisation work?',
    answer:
      'Assign categories at entry or during CSV import, create your own custom ones, and reports follow suit. Smarter automatic categorisation is on the roadmap.',
  },
  {
    question: 'Can I get my data out?',
    answer:
      'Always. Export everything as CSV for your accountant, a backup, or another tool. Your data stays yours.',
  },
];

const FAQ: React.FC = () => {
  const headRef = useReveal<HTMLDivElement>();
  const listRef = useReveal<HTMLDivElement>();

  return (
    <section className="faq">
      <div className="container">
        <div className="faq-head reveal" ref={headRef}>
          <span className="eyebrow">Questions</span>
          <h2>Asked and answered.</h2>
        </div>

        <div className="faq-grid reveal reveal-delay-1" ref={listRef}>
          {faqs.map((faq) => (
            <div key={faq.question} className="faq-item">
              <h4>{faq.question}</h4>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
