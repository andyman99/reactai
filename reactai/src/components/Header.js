import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);  // State for toggling mobile menu

  const isActive = (path) => location.pathname === path;

  // Toggle the mobile menu open/close
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
      <Link to="/" onClick={() => setMobileMenuOpen(false)}>
          <h1 className="logo">Heiersmed'n MC Touring</h1>
      </Link>
        <nav>
          <button className="hamburger" onClick={toggleMobileMenu}>
            &#9776; {/* Hamburger Icon */}
          </button>
          <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
            <li className={isActive('/') ? 'active' : ''}>
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>Hjem</Link>
            </li>
            <li className={isActive('/about') ? 'active' : ''}>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)}>Om oss</Link>
            </li>
            <li className={isActive('/events') ? 'active' : ''}>
              <Link to="/events" onClick={() => setMobileMenuOpen(false)}>Arrangement</Link>
            </li>
            <li className={isActive('/contact') ? 'active' : ''}>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Kontakt</Link>
            </li>
            <li className={isActive('/blog') ? 'active' : ''}>
              <Link to="/blog" onClick={() => setMobileMenuOpen(false)}>Blogg</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
