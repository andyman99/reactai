import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, About, Events, Contact, Blog } from "./views";
import './App.css';  // Link to App.css
import 'leaflet/dist/leaflet.css';  // Import Leaflet CSS globally
import { Header, Footer, Sidebar } from "./components";  // Import Header, Footer, and Sidebar components



function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {/* Static routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events/*" element={<Events />} />  {/* Add the "/*" here to handle child routes */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog/*" element={<Blog />} />  {/* Keep dynamic routing for blog */}
        </Routes>
      </main>
      <Sidebar />
      <Footer />
    </Router>
  );
}

export default App;
