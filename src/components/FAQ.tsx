import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './FAQ.css';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is my financial data secure with Expenzez?",
      answer: "Absolutely. We use bank-level encryption and comply with PSD2 regulations. Your data is encrypted both in transit and at rest, and we never store your banking credentials. We use secure Open Banking APIs to connect to your accounts, ensuring the highest level of security."
    },
    {
      question: "How does Expenzez connect to my bank account?",
      answer: "Expenzez uses Open Banking APIs that are PSD2-compliant. This means we connect securely to your bank through regulated channels. You authenticate directly with your bank, and we receive read-only access to your transaction data. We never see or store your banking passwords."
    },
    {
      question: "What makes Expenzez different from other expense trackers?",
      answer: "Expenzez combines intelligent categorization powered by machine learning, beautiful and intuitive design, and comprehensive analytics. We focus on the UK market specifically, ensuring compatibility with UK banks and understanding of local financial patterns. Our platform is built with modern technology for speed and reliability."
    },
    {
      question: "Do I need to manually enter all my transactions?",
      answer: "No! When you connect your bank account via Open Banking, your transactions are automatically imported and categorized. You can also manually add cash transactions or expenses from accounts you prefer not to connect."
    },
    {
      question: "Is there a free trial or free plan available?",
      answer: "We offer a comprehensive free tier that includes core expense tracking features. Premium features like advanced analytics, custom categories, and export functionality are available in our paid plans. Visit our website for current pricing details."
    },
    {
      question: "Can I use Expenzez on both iOS and Android?",
      answer: "Yes! Expenzez is built with React Native, providing native apps for both iOS and Android platforms. The experience is optimized for each platform while maintaining consistent features across devices."
    },
    {
      question: "How does the AI categorization work?",
      answer: "Our machine learning algorithms analyze transaction descriptions, merchant information, and amounts to automatically categorize your expenses. The system learns from your corrections and becomes more accurate over time, adapting to your specific spending patterns."
    },
    {
      question: "Can I export my financial data?",
      answer: "Yes, you can export your transaction data and reports in various formats including CSV and PDF. This feature is available in our premium plans, making it easy to share with accountants or use in other financial tools."
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
