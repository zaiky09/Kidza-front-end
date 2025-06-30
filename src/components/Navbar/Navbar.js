import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Menu, X } from 'lucide-react';
import './Navbar.css';
import logo from '../../assets/k(Brochure).png';

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-left">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Kidza Enterprise Logo" className="logo fade-in-logo" />
        </Link>
      </div>

      <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} color="gold" /> : <Menu size={28} color="gold" />}
      </div>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/features" onClick={() => setMenuOpen(false)}>Features</Link></li>
        <li><Link to="/catalog" onClick={() => setMenuOpen(false)}>Catalog</Link></li>
        <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
        <li><Link to="/cart" onClick={() => setMenuOpen(false)}>Cart 🛒</Link></li>
        {/* <li>
          <Link to="/order" className="order-link">
            Order {!isLoggedIn && <Lock size={14} />}
          </Link>
        </li> */}
        {isLoggedIn ? (
          <li><button onClick={() => { handleLogout(); setMenuOpen(false); }} className="logout-btn">Logout</button></li>
        ) : (
          <>
            <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
      <li><Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link></li>
          </>
        )}
      </ul>

    </nav>
  );
}

export default Navbar;
