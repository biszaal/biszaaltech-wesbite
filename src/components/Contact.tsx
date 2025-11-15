import React, { useState } from 'react';
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';
import './Contact.css';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    // Reset submit status when user modifies the form
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission (in production, this would be an API call)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Form submitted:', formData);

      // Success
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
            <div className="contact-details">
              <div className="contact-detail-item">
                <Mail size={20} />
                <div>
                  <strong>Email</strong>
                  <a href="mailto:hello@biszaaltech.com">hello@biszaaltech.com</a>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {submitStatus === 'success' && (
              <div className="form-message success">
                <CheckCircle size={20} />
                <span>Thank you! Your message has been sent successfully.</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="form-message error">
                <AlertCircle size={20} />
                <span>Something went wrong. Please try again later.</span>
              </div>
            )}

            <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
              <label htmlFor="name">
                <User size={16} />
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                disabled={isSubmitting}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
              <label htmlFor="email">
                <Mail size={16} />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                disabled={isSubmitting}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
              <label htmlFor="message">
                <MessageSquare size={16} />
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us how we can help you..."
                disabled={isSubmitting}
              ></textarea>
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;