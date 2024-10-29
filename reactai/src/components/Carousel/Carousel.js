import React, { useEffect, useState } from 'react';
import * as contentful from 'contentful';
import './Carousel.css'; // Ensure Carousel CSS is placed in the css folder

const Carousel = ({ contentType }) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const client = contentful.createClient({
      space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
      accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
    });

    // Fetch images from the specified Contentful table
    client.getEntries({
      content_type: contentType,
    })
    .then((response) => {
      // Flatten and store images from the 'images' field
      const imageArray = response.items.flatMap((item) => 
        item.fields.images ? item.fields.images.map((img) => img.fields.file.url) : []
      );
      setImages(imageArray);
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
    });
  }, [contentType]);

  // Carousel controls
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Render only if there are images available
  if (images.length === 0) return <p>No images available.</p>;

  return (
    <div className="carousel">
      <button onClick={prevImage} className="carousel-button">❮</button>
      <div className="carousel-image-container">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="carousel-image" />
      </div>
      <button onClick={nextImage} className="carousel-button">❯</button>
    </div>
  );
};

export default Carousel;
