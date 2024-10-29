import React, { useState } from 'react';
import './Carousel.css';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Carousel controls
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (images.length === 0) return <p>No images available.</p>;

  return (
    <div className="carousel">
      <button onClick={prevImage} className="carousel-button">❮</button>
      <div className="carousel-image-container">
        <img 
          src={images[currentIndex].fields.file.url} 
          alt={images[currentIndex].fields.title || `Slide ${currentIndex + 1}`} 
          className="carousel-image" 
        />
      </div>
      <button onClick={nextImage} className="carousel-button">❯</button>
    </div>
  );
};

export default Carousel;
