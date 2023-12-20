import React, { useState, useEffect } from 'react';

const Slideshow = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Auto-increment the index to show the next image every 3 seconds
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="w-full mx-auto md:px-8 mb-8 md:mb-0">
      <img
        className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-primary-40 object-cover"
        src={images[currentImageIndex]?.filePath}
        alt={images[currentImageIndex]?.name}
      />
    </div>
  );
};

export default Slideshow;
