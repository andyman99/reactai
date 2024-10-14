import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation(); // React Router hook to get current location

  // Determine if the current route matches the link
  const isActive = (path) => location.pathname === path;

  return (
    <header>
      <nav>
        <ul>
          <li className={isActive('/') ? 'active' : ''}>
            <Link to="/">Home</Link>
          </li>
          <li className={isActive('/about') ? 'active' : ''}>
            <Link to="/about">About Us</Link>
          </li>
          <li className={isActive('/events') ? 'active' : ''}>
            <Link to="/events">Events</Link>
          </li>
          <li className={isActive('/contact') ? 'active' : ''}>
            <Link to="/contact">Contact</Link>
          </li>
          <li className={isActive('/blog') ? 'active' : ''}>
            <Link to="/blog">Blog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
