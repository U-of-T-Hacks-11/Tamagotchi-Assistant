import React, { useState, useEffect } from 'react';
import './Character.css';
import happyRight from './images/c10.png';
import happyLeft from './images/c1.png';
import stop from './images/c6.png';
import dead from './images/c9.png';
import Health from './Health'


export const Character = ({currentHealthImageIndex, setCurrentHealthImageIndex}) => {
    const [position, setPosition] = useState(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [direction, setDirection] = useState(1); // 1 for moving right, -1 for moving left
    const [isStopped, setIsStopped] = useState(false);

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
        const characterWidth = 100;
        const stopPosition = screenWidth - 100;
    
        const moveCharacter = () => {
          // Randomly decide whether to stop or move
          const shouldStop = Math.random() < 0.2; // 10% chance to stop
    
          if (shouldStop) {
            setIsStopped(true);
            setTimeout(() => {
              // After stopping for a few seconds, change direction randomly
              const newDirection = Math.random() < 0.5 ? 1 : -1;
              setDirection(newDirection);
              setIsStopped(false);
            }, 500);  
          } else {
            // Update the position based on the current direction
            const newPosition = position + direction * 20;
            
            // Check if the character is close to the edge
            const closeToEdge = newPosition < 50 || newPosition > stopPosition - 50;

            if (closeToEdge) {
                // Higher chance to change direction when close to the edge
                const changeDirection = Math.random() < 0.9; // 90% chance
                if (changeDirection) {
                    const newDirection = Math.random() < 0.5 ? 1 : -1;
                    setDirection(newDirection);
                }
            }

            if (currentHealthImageIndex === 4) {
                // Set a different image when health is dead
                // You can replace 'newDeadImage' with the actual image you want to use
                // Example: const newDeadImage = require('./images/newDeadImage.png');
                //const newDeadImage = dead;
                return dead;
            }
      
            //setPosition((prevPosition) => prevPosition + direction );
            if (newPosition >= 0 && newPosition + characterWidth <= screenWidth) {
                setPosition(newPosition);
            }   
          }
        }
    
        const intervalId = setInterval(moveCharacter, 700);
    
        const handleResize = () => {
          setScreenWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          clearInterval(intervalId);
          window.removeEventListener('resize', handleResize);
        };
      }, [position, screenWidth, direction, isStopped, currentHealthImageIndex]);

    const characterImage = isStopped ? stop : direction === 1 ? happyRight : happyLeft;

    return (
        <div className="character" style={{ left: `${position}px` }}>
            <Health currentHealthImageIndex={currentHealthImageIndex} setCurrentHealthImageIndex={setCurrentHealthImageIndex}/>
            <img
                src={characterImage}
                alt="Character"
            />
        </div>
    );
};

export default Character;
