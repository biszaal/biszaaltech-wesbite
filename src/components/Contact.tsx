import React, { useState } from 'react';
import './Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    alert('Thank you for your message. We will get back to you soon!');
  };

  return (
    <section className="contact">
      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
            <div className="contact-email">
              <strong>Email:</strong> hello@biszaaltech.com
            </div>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;