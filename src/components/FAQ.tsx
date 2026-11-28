import React from 'react';
import { useReveal } from '../hooks/useReveal';
import './FAQ.css';

const faqs = [
  {
    question: 'What kinds of projects do you take on?',
    answer: 'Mobile apps, websites and web apps, backends and APIs, and the product design around them. Whole builds, or one piece of a build that has stalled.',
  },
  {
    question: 'Who owns the code?',
    answer: 'You do. The repository, the accounts and the deployment are yours from day one and stay yours — including if you take the work elsewhere.',
  },
  {
    question: 'Do you handle App Store and Play Store submission?',
    answer: 'Yes. We have taken our own apps through App Store and Google Play review, so signing, privacy labels, store listings and the review back-and-forth are all part of the job.',
  },
  {
    question: 'Where are you based, and do you work remotely?',
    answer: 'Biszaal Tech is an independent studio run by Bishal Aryal, who is relocating to New Zealand. Work is remote, so where you are matters much less than whether we can get a clear picture of what you need.',
  },
  {
    question: 'What do you build with?',
    answer: 'React Native for mobile, so iOS and Android stay in step, with the web and backend stack chosen to fit the project rather than our habits.',
  },
  {
    question: 'Can I see something you have built?',
    answer: 'Five products of our own — one app and four games, all on the projects page, all shipped by the same person who would build yours.',
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
