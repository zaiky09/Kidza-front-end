import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Features from './pages/Features/Features';
import Contact from './pages/Contact/Contact';
import Order from './pages/Order/Order';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Quote from './pages/Quote/Quote';
import ProtectedRoute from './components/ProtectedRoute';
import WhatsappIcon from './components/WhatsappIcon';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-center" autoClose={2500} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          }
        />
      </Routes>

      <div className="whatsapp-tooltip-container">
        
        <a
          href="https://wa.me/254712345678?text=Hi%20Kidza%20Enterprise,%20I%20have%20an%20inquiry."
          className="whatsapp-float"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsappIcon size={20} color="white" />
          
        </a>
        <div className="whatsapp-tooltip">Need help? Chat with our team</div>
      </div>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Kidza Enterprise Ltd. All rights reserved.</p>
      </footer>
    </Router>
  );
}

export default App;
