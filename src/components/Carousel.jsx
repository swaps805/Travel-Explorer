import React, { useState } from 'react';
import './styles/Carousel.css';

const Carousel = ({cities}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cities.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cities.length) % cities.length);
  };

  return (
    <div className="carousel-container">
      <button className="carousel-button left" onClick={handlePrev}>&#10094;</button>
      <div className="carousel">
        <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {cities.map((city, index) => (
            <div key={index} className="carousel-item">
              <img src={city.img} alt={city.name} />
              <div className="carousel-text">
                <h3>{city.name}</h3>
                <p>{city.descp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="carousel-button right" onClick={handleNext}>&#10095;</button>
    </div>
  );
};

export default Carousel;
