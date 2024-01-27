import React, { useState, useEffect } from 'react';
import './Health.css';
import healthFull from './images/healthFull.png';
import health2 from './images/health2.png';
import health3 from './images/health3.png';
import health4 from './images/health4.png';
import healthDead from './images/healthDead.png';


export const Health = ({ characterPosition }) => {
    const [position] = useState(0); // Start position outside the screen
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [healthImages] = useState([healthFull, health2, health3, health4, healthDead]);
    const [currentHealthImageIndex, setCurrentHealthImageIndex] = useState(0);

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
        //const healthBarWidth = 100; // Set the width of your health bar image

        const intervalId = setInterval(() => {
            setCurrentHealthImageIndex((prevIndex) => (prevIndex + 1) % healthImages.length);
        }, 10000);

        return () => {
            clearInterval(intervalId);
        };
    }, [healthImages]);

    return (
        <div className="health" style={{ left: `${position}px` }}>
            <img src={healthImages[currentHealthImageIndex]} alt="health" />
        </div>
    );
};

export default Health;

