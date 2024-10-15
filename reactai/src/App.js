import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Blog from './pages/Blog';  // Blog component that shows cards
import Layout from './components/Layout';  // Layout component wrapping everything
import './App.css';  // Link to App.css

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Static routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Blog listing and dynamic blog post details */}
          <Route path="/blog/*" element={<Blog />} />  {/* Dynamic routing handled inside Blog */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
