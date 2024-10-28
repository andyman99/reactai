import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar'; // Import the Sidebar component

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <Sidebar /> {/* Include the Sidebar here */}
      <Footer />
    </div>
  );
};

export default Layout;
