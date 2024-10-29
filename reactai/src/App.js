import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, About, Events, Contact, Blog } from "./views";
import Layout from './Layout/Layout';  // Layout component wrapping everything
import './App.css';  // Link to App.css
import 'leaflet/dist/leaflet.css';  // Import Leaflet CSS globally


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Static routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events/*" element={<Events />} />  {/* Add the "/*" here to handle child routes */}
          <Route path="/contact" element={<Contact />} />
          
          {/* Blog listing and dynamic blog post details */}
          <Route path="/blog/*" element={<Blog />} />  {/* Keep dynamic routing for blog */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
