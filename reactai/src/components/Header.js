import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Heiersmed'n MC Touring</h1>
        <nav>
          <ul className="nav-links">
            <li className={isActive('/') ? 'active' : ''}>
              <Link to="/">Hjem</Link>
            </li>
            <li className={isActive('/about') ? 'active' : ''}>
              <Link to="/about">Om oss</Link>
            </li>
            <li className={isActive('/events') ? 'active' : ''}>
              <Link to="/events">Arrangement</Link>
            </li>
            <li className={isActive('/contact') ? 'active' : ''}>
              <Link to="/contact">Kontakt</Link>
            </li>
            <li className={isActive('/blog') ? 'active' : ''}>
              <Link to="/blog">Blogg</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
