import React, { useState, useEffect } from 'react';
import './Character.css';

const Character = () => {
    const [position, setPosition] = useState(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
        const intervalId = setInterval(() => {
            // Check if the character has reached the right edge of the screen
            if (position + 75 < screenWidth) {
                setPosition((prevPosition) => prevPosition + 5);
            }
        }, 50);

        return () => {
            clearInterval(intervalId);
        };
    }, [position, screenWidth]);

    return (
        <div className="character" style={{ left: `${position}px` }}>
            {/* Your character image */}
            <img src="/images/c1.png" alt="Character" />
        </div>
    );
};

export default Character;
