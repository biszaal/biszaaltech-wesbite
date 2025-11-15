import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './FAQ.css';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is my financial data secure with Expenzez?",
      answer: "Absolutely. We use bank-level encryption to protect your data. Your information is encrypted both in transit and at rest. We're building with security as a top priority, and our upcoming Open Banking integration will be PSD2-compliant, ensuring the highest level of security standards."
    },
    {
      question: "How do I add my transactions to Expenzez?",
      answer: "Currently, Expenzez offers two ways to add transactions: manual entry for quick individual transactions, and CSV upload for bulk imports from your bank statements. We're also working on Open Banking integration which will allow automatic transaction imports directly from your bank."
    },
    {
      question: "What makes Expenzez different from other expense trackers?",
      answer: "Expenzez focuses on simplicity and ease of use with a beautiful, intuitive interface. We're building specifically for the UK market with features tailored to local needs. Our platform uses modern technology for speed and reliability, and we're committed to adding features based on real user feedback."
    },
    {
      question: "Is Open Banking integration available?",
      answer: "Open Banking integration is coming soon! We're currently in the MVP phase with manual entry and CSV upload capabilities. Once launched, Open Banking will allow automatic transaction imports directly from your UK bank accounts through secure, PSD2-compliant connections."
    },
    {
      question: "Is there a free plan available?",
      answer: "Yes! Expenzez is currently free to use with core expense tracking features including manual entry, CSV uploads, and analytics. We're focused on building a great product first, and will introduce premium features in the future based on user needs."
    },
    {
      question: "Can I use Expenzez on both iOS and Android?",
      answer: "Expenzez is currently available on iOS, with the Android version coming soon. Both apps are built with React Native, ensuring a consistent, native experience across platforms when the Android version launches."
    },
    {
      question: "How does transaction categorization work?",
      answer: "Expenzez uses smart categorization to organize your expenses. You can assign categories when entering transactions manually or during CSV import. We're continuously improving our categorization features to make expense tracking even more effortless."
    },
    {
      question: "Can I export my financial data?",
      answer: "Yes, you can export your transaction data in CSV format, making it easy to share with accountants, create backups, or use in other financial tools. We're also working on adding PDF export options for reports and summaries."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq">
      <div className="faq-container">
        <div className="faq-header">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-lead">
            Got questions? We've got answers. Here are the most common questions about Expenzez.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? 'active' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className="faq-icon"
                  size={20}
                  style={{
                    transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 200ms ease-out'
                  }}
                />
              </button>
              <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-footer">
          <p>Still have questions?</p>
          <a href="#contact" className="faq-contact-button">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
