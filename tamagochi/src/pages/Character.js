import React, { useState, useEffect } from 'react';
import './Character.css';
import happyRight from './images/c10.png';
import happyLeft from './images/c1.png';

export const Character = () => {
    const [position, setPosition] = useState(0);
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
        const characterWidth = 100;
        const intervalId = setInterval(() => {
            // Check if the character has reached the right or left edge of the screen
            if (position > screenWidth) {
                // Move to the left edge and change direction to -1
                setPosition(characterWidth);
                setDirection(-1);
            } else if (position <= 0) {
                // Move to the right edge and change direction to 1
                setPosition(screenWidth - characterWidth);
                setDirection(1);
            } else {
                // Update the position based on the current direction
                setPosition((prevPosition) => prevPosition + direction * 10);
            }
        }, 100);

        return () => {
            clearInterval(intervalId);
        };
    }, [position, screenWidth, direction]);

    return (
        <div className="character" style={{ left: `${position}px` }}>
            <img
                src={direction === 1 ? happyRight : happyLeft}
                alt="Character"
            />
        </div>
    );
};

export default Character;
