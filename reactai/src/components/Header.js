import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation(); // React Router hook to get current location

  // Determine if the current route matches the link
  const isActive = (path) => location.pathname === path;

  return (
    <header>
      <h1>Heiersmed'n MC Touring</h1>
      <nav>
        <ul>
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
    </header>
  );
};

export default Header;
