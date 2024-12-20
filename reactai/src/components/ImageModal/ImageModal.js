import React, { useState, useEffect } from 'react';
import "./ImageModal.css"

const ImageModal = ({ images, selectedIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);

  // Handle Next Image
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Handle Previous Image
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Handle keyboard navigation (arrow keys)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrevious();
      } else if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex]);

  // Handle touch swiping
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.changedTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      // Swiped left (next)
      handleNext();
    }

    if (touchStartX - touchEndX < -50) {
      // Swiped right (previous)
      handlePrevious();
    }
  };

  const { file, title, description } = images[currentIndex].fields;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button className="modal-close" onClick={onClose}>×</button>
        <img src={file.url} alt={title || 'Gallery Image'} className="modal-image" />
        <div className="modal-info">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <button className="modal-prev" onClick={handlePrevious}>‹</button>
        <button className="modal-next" onClick={handleNext}>›</button>
      </div>
    </div>
  );
};

export default ImageModal;
