import React, { useEffect, useState } from 'react';
import './Hero.css';

import img1 from '../../assets/Supply3.jpg';
import img2 from '../../assets/Supply2.jpg';
import img3 from '../../assets/Supply1.jpg';
import img4 from '../../assets/Supply4.jpg';
import img5 from '../../assets/Supply5.jpg';
import img6 from '../../assets/Supply6.jpg'; // Add as many as you like

const images = [img1, img2, img3, img4, img5, img6];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${images[currentIndex]})` }}
    >
      <div className="overlay">
        <h2>Welcome to Kidza Enterprise Ltd</h2>
        <p>Seamlessly connect and deliver across your city.</p>
        <a href="/order" className="hero-btn">Order Now</a>
      </div>
    </section>
  );
}

export default Hero;
