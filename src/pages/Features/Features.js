import React from 'react';
import './Features.css';
import { Truck, MapPin, CreditCard, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Fast Logistics',
    description: 'Reliable and speedy deliveries to any destination.',
    icon: <Truck size={36} color="gold" />,
  },
  {
    title: 'Farm-to-City Supply',
    description: 'Connecting rural farmers with urban markets efficiently.',
    icon: <Leaf size={36} color="gold" />,
  },
  {
    title: 'Real-time Tracking',
    description: 'Track your order every step of the way.',
    icon: <MapPin size={36} color="gold" />,
  },
  {
    title: 'Secure Payments',
    description: 'All transactions are encrypted and protected.',
    icon: <CreditCard size={36} color="gold" />,
  },
];

function Features() {
  return (
    <section className="features-section">
      <motion.h2
        className="features-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Why Choose Kidza Enterprise?
      </motion.h2>

      <div className="features-grid">
        {features.map((feature, index) => (
          <motion.div
            className="feature-card"
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="cta-section"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h3>Ready to simplify your logistics?</h3>
        <Link to="/quote" className="cta-button">
          Get a Quote
        </Link>
      </motion.div>
    </section>
  );
}

export default Features;
