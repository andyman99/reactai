import React from 'react';
import RandomProgressBar from './ProgressBar';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Heiersmed'n.</p>
        <p>Kontakt oss: info@heiersmednmc.no</p>
        <p>Telefon: +47 123 45 678</p>
      </div>
      <RandomProgressBar/ >
    </footer>
  );
};

export default Footer;
