import React from 'react';
import { Header, Footer, Sidebar } from "../components/index"

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
