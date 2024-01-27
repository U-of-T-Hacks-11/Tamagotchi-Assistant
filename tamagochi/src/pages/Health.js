import React, { useState, useEffect } from 'react';
import './Health.css';
import healthFull from './images/healthFull.png';

export const Health = () => {
  const [position, setPosition] = useState(0); // Start position outside the screen
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [direction, setDirection] = useState(1); // 1 for moving right, -1 for moving left

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const healthBarWidth = 100; // Set the width of your health bar image

    const intervalId = setInterval(() => {
      // Check if the health bar has reached the right or left edge of the screen
      if (position + healthBarWidth > screenWidth) {
        // Move to the left edge and change direction to -1
        setPosition(healthBarWidth);
        setDirection(-1);
      } else if (position <= 0) {
        // Move to the right edge and change direction to 1
        setPosition(healthBarWidth);
        setDirection(1);
      } else {
        // Update the position based on the current direction
        setPosition((prevPosition) => prevPosition + direction);
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [position, screenWidth, direction]);

  return (
    <div className="health" style={{ left: `${position}px` }}>
      <img src={healthFull} alt="health" />
    </div>
  );
};

export default Health;

