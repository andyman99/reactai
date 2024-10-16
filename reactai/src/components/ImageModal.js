import React, { useState } from 'react';

const ImageModal = ({ images, selectedIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const { file, title, description } = images[currentIndex].fields;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
