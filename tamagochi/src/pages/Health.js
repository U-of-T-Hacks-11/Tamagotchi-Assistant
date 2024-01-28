import React, { useState, useEffect } from 'react';
import './Health.css';
import healthFull from './images/healthFull.png';
import health2 from './images/health2.png';
import health3 from './images/health3.png';
import health4 from './images/health4.png';
import healthDead from './images/healthDead.png';


export const Health = ({ characterPosition, onButtonPress, currentHealthImageIndex, setCurrentHealthImageIndex }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [healthImages] = useState([healthFull, health2, health3, health4, healthDead]);
    const height = 75 - (currentHealthImageIndex * 15)


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentHealthImageIndex((prevIndex) => (prevIndex < 4 ? prevIndex + 1 : 4));
        }, 15000);

        return () => {
            clearInterval(intervalId);
        };
    }, [currentHealthImageIndex, healthImages]);

    return (
        <div className="health" style={{ left: `${characterPosition}px` }}>
            <img src={healthImages[currentHealthImageIndex]} width={height * 30} height={30} alt="health" />

        </div>
    );
};

export default Health;
