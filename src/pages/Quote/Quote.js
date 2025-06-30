import React, { useState } from 'react';
import './Quote.css';
import { useNavigate } from 'react-router-dom';

function Quote() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    service: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can integrate with a backend or email API here
    console.log('Quote submitted:', formData);

    setSubmitted(true); // Show thank-you message
    setFormData({ name: '', company: '', email: '', service: '', message: '' });
  };

  return (
    <section className="quote-section">
      <h2>Request a Quote</h2>

      {submitted ? (
        <div className="thank-you-message">
          <h3>🎉 Thank you for your request!</h3>
          <p>We’ll be in touch shortly with a personalized quote.</p>

          <div className="thank-you-actions">
            <button className="cta-button" onClick={() => navigate('/catalog')}>
              Continue to Catalog
            </button>
            <button className="cta-button" onClick={() => navigate('/features')}>
              Go Back
            </button>
          </div>
        </div>

      ) : (
        <form onSubmit={handleSubmit} className="quote-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">Select Service</option>
            <option value="logistics">Logistics</option>
            <option value="farm-supply">Farm-to-City Supply</option>
            <option value="city-supply">City-to-Farm Supply</option>
            <option value="custom">Custom Request</option>
          </select>
          <textarea
            name="message"
            rows="4"
            placeholder="Additional details..."
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Send Request</button>
          <button onClick={() => navigate('/features')}>
              Go Back
            </button>
        </form>
      )}
    </section>
  );
}

export default Quote;
