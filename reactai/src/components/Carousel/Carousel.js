import React, { useState, useEffect } from 'react';
import * as contentful from 'contentful';
import {ImageModal} from '../'; // Reuse the provided ImageModal
import './Carousel.css';

const Carousel = ({ postId }) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const client = contentful.createClient({
      space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
      accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
    });

    // Fetch images for the specified postId from the carousel table
    client.getEntries({
      content_type: 'carousel',
      'sys.id': postId,
    })
    .then((response) => {
      if (response.items.length > 0) {
        setImages(response.items[0].fields.images);
      }
    })
    .catch((error) => {
      console.error("Error fetching carousel images:", error);
    });
  }, [postId]);

  // Timer to change images every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [images.length]);

  // Manual Navigation Handlers
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Open and close modal handlers
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (images.length === 0) return <p>No images available.</p>;

  return (
    <div className="carousel">
      {/* Left and Right Arrows for Navigation */}
      <button onClick={prevImage} className="carousel-arrow left-arrow">❮</button>
      <div className="carousel-image-container" onClick={openModal}>
        <img
          src={images[currentIndex].fields.file.url}
          alt={images[currentIndex].fields.title || 'Carousel Image'}
          className="carousel-image"
        />
      </div>
      <button onClick={nextImage} className="carousel-arrow right-arrow">❯</button>

      {/* Image Indicators */}
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {isModalOpen && (
        <ImageModal
          images={images}
          selectedIndex={currentIndex}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Carousel;
