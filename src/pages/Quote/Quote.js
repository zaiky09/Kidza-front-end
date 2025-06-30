import React, { useState } from 'react';
import './Quote.css';

function Quote() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    service: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Quote submitted:', formData);
    alert('Thank you! We will get back to you shortly.');
    setFormData({ name: '', company: '', email: '', service: '', message: '' });
  };

  return (
    <section className="quote-section">
      <h2>Request a Quote</h2>
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
          <option value="farm-supply">City-to-Farm Supply</option>
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
      </form>
    </section>
  );
}

export default Quote;
