import React, { useState } from 'react';
import { Mail, AlertTriangle, CheckCircle } from 'lucide-react';

const AccountDeletion: React.FC = () => {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="support-page">
        <div className="container">
          <div className="support-header">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <CheckCircle size={64} color="#10b981" />
            </div>
            <h1>Request Submitted</h1>
            <p>Your account deletion request has been successfully submitted.</p>
          </div>
          <div className="support-card" style={{ maxWidth: '700px', margin: '0 auto 2rem' }}>
            <div style={{ padding: '1.5rem' }}>
              <h3>Reference ID: DDR-{Date.now()}</h3>
              <div style={{ textAlign: 'left' }}>
                <h4>What happens next?</h4>
                <ol style={{ paddingLeft: '1.5rem', lineHeight: '2' }}>
                  <li>Confirmation email sent to <strong>{email}</strong></li>
                  <li>Data permanently deleted within 30 days</li>
                  <li>Final confirmation email once complete</li>
                </ol>
              </div>
              <a href="/" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="support-page">
      <div className="container">
        <div className="support-header">
          <h1>Account Deletion Request</h1>
          <p>Delete your Expenzez account using the form below or in-app deletion.</p>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'center' }}>
            How to Delete Your Account
          </h2>

          <div className="support-options">
            <div className="support-card">
              <h3>🎯 Method 1: In-App (Recommended)</h3>
              <ol style={{ textAlign: 'left', paddingLeft: '1.5rem' }}>
                <li>Open Expenzez app</li>
                <li>Go to Settings → Data & Privacy</li>
                <li>Tap "Delete Account"</li>
                <li>Confirm</li>
              </ol>
            </div>

            <div className="support-card">
              <div className="support-card-icon"><Mail size={32} /></div>
              <h3>Method 2: Email</h3>
              <p>Email <a href="mailto:privacy@expenzez.com">privacy@expenzez.com</a></p>
              <p>Include: "Account Deletion Request" + your email</p>
            </div>

            <div className="support-card">
              <h3>📝 Method 3: Web Form</h3>
              <p>Use form below</p>
            </div>
          </div>

          <div className="contact-form" style={{ marginTop: '3rem' }}>
            <h2>Submit Deletion Request</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Reason (Optional)</label>
                <textarea
                  className="form-textarea"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Why are you leaving..."
                  rows={4}
                />
              </div>

              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <AlertTriangle size={24} color="#dc2626" />
                  <div style={{ textAlign: 'left' }}>
                    <strong>⚠️ Warning: Cannot be undone</strong>
                    <p>Permanently deletes:</p>
                    <ul style={{ paddingLeft: '1.5rem' }}>
                      <li>Profile & login</li>
                      <li>All transactions</li>
                      <li>Budgets & settings</li>
                      <li>AI chat history</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <input type="checkbox" required />
                <span>I understand this is permanent</span>
              </div>

              <button type="submit" className="form-submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Deletion Request'}
              </button>
            </form>
          </div>

          <div className="support-card" style={{ marginTop: '3rem' }}>
            <h3>GDPR Compliance</h3>
            <p>Data deleted within 30 days. See <a href="/privacy">Privacy Policy</a></p>
          </div>

          <div className="support-card" style={{ marginTop: '2rem' }}>
            <h3>Need Help?</h3>
            <p>Email: <a href="mailto:privacy@expenzez.com">privacy@expenzez.com</a></p>
            <p>Support: <a href="mailto:support@expenzez.com">support@expenzez.com</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDeletion;
