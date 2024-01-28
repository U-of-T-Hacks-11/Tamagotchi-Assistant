import React, { useState, useEffect } from 'react';
import './Character.css';
import happyRight from './images/c10.png';
import happyLeft from './images/c1.png';
import Health from './Health';

export const Character = ({ currentHealthImageIndex, setCurrentHealthImageIndex }) => {
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
        const characterWidth = 150;
        const minPosition = 0;
        const maxPosition = screenWidth;

        // Check if the health bar has reached index 4
        if (currentHealthImageIndex === 4) {
            setIsStopped(true);
            return; // Stop moving
        }

        const intervalId = setInterval(() => {
            // Check if the character has reached the right or left edge of the screen
            if (direction === 1 && position + characterWidth > maxPosition) {
                // Move to the left edge and change direction to -1
                setPosition(maxPosition - characterWidth);
                setDirection(-1);
            } else if (direction === -1 && position < minPosition) {
                // Move to the right edge and change direction to 1
                setPosition(minPosition);
                setDirection(1);
            } else {
                // Update the position based on the current direction
                setPosition((prevPosition) => (prevPosition + direction*0.5));
            }
        }, 800); // Increase the interval delay for slower movement

        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener('resize', handleResize);
        };
    }, [position, screenWidth, direction, currentHealthImageIndex]);

    return (
        <div className="character" style={{ left: `${position + 175}px` }}>
            <Health currentHealthImageIndex={currentHealthImageIndex} setCurrentHealthImageIndex={setCurrentHealthImageIndex} />
            <img src={direction === 1 ? happyRight : happyLeft} alt="Character" />
        </div>
    );
};

export default Character;
