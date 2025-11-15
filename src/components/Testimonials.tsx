import React from 'react';
import { Quote, Star } from 'lucide-react';
import './Testimonials.css';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Freelance Designer",
      location: "London, UK",
      rating: 5,
      text: "Expenzez has completely transformed how I manage my business expenses. The categorization is spot-on and the insights help me make better financial decisions.",
      avatar: "SM"
    },
    {
      name: "James Chen",
      role: "Software Engineer",
      location: "Manchester, UK",
      rating: 5,
      text: "As a tech person, I appreciate the clean interface and smart features. The analytics dashboard gives me exactly what I need without overwhelming complexity.",
      avatar: "JC"
    },
    {
      name: "Emily Thompson",
      role: "Small Business Owner",
      location: "Birmingham, UK",
      rating: 5,
      text: "Managing expenses for my business used to be a headache. Expenzez makes it simple and I love how secure and reliable the platform is.",
      avatar: "ET"
    },
    {
      name: "David Patel",
      role: "Marketing Consultant",
      location: "Bristol, UK",
      rating: 5,
      text: "The budget planning feature is brilliant. I can see exactly where my money goes and set realistic goals. Highly recommend for anyone serious about their finances.",
      avatar: "DP"
    }
  ];

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">What Our Users Say</h2>
          <p className="testimonials-lead">
            Join thousands of satisfied users who trust Expenzez to manage their finances
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-quote-icon">
                <Quote size={24} />
              </div>

              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              <p className="testimonial-text">{testimonial.text}</p>

              <div className="testimonial-author">
                <div className="author-avatar">
                  <span>{testimonial.avatar}</span>
                </div>
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-role">{testimonial.role}</p>
                  <p className="author-location">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonials-cta">
          <p>Ready to take control of your finances?</p>
          <a href="#products" className="testimonials-button">
            Get Started with Expenzez
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
