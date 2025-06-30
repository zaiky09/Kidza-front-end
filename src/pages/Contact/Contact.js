import React, { useState } from 'react';
import './Contact.css';
// import WhatsappIcon from '../../components/WhatsappIcon';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent. We will get back to you shortly.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="contact-section">
      <h2>Contact Us</h2>

      <div className="contact-wrapper">
        <div className="contact-info">
          <div>
            <Mail color="gold" size={20} /> kidzaltd@gmail.com
          </div>
          <div>
            <Phone color="gold" size={20} /> +254 716455754
          </div>
          <div>
            <MapPin color="gold" size={20} /> Nairobi, Kenya
          </div>
          <div className="info">
            <h3>Operating Hours</h3>
          </div>
          <div>
            <Clock color="gold" size={20} /> Mon - Fri: 8:00 AM – 6:00 PM
          </div>
          <div>
            <Clock color="gold" size={20} /> Saturday: 9:00 AM – 1:00 PM
          </div>
          <div>
            <Clock color="gold" size={20} /> Sunday: Closed
          </div>        
        </div>

        

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>

      {/* <div className="contact-wrapper">
        <div className="contact-info">
          <h3>Operating Hours</h3>
          <ul>
            <li>Mon - Fri: 8:00 AM – 6:00 PM</li>
            <li>Saturday: 9:00 AM – 4:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>

        <div className="contact-form">
          <h3>Frequently Asked Questions</h3>

          <details>
            <summary>How long does delivery take?</summary>
            <p>Typically 24–72 hours depending on location and package.</p>
          </details>

          <details>
            <summary>Can I track my order?</summary>
            <p>Yes. We provide real-time tracking for all deliveries.</p>
          </details>

          <details>
            <summary>Do you offer farm produce delivery?</summary>
            <p>Absolutely! We connect rural farmers with urban clients.</p>
          </details>

          <details>
            <summary>What payment options do you accept?</summary>
            <p>We accept M-Pesa, credit cards, and secure online transfers.</p>
          </details>
        </div>
      </div> */}

      {/* <a
        href="https://wa.me/254712345678?text=Hello%20Kidza%20Enterprise,%20I%20would%20like%20to%20make%20an%20inquiry."
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsappIcon size={20} color="white" />
        Chat with us on WhatsApp
      </a> */}

    </section>
  );
}

export default Contact;
