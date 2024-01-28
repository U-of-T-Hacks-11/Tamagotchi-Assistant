import React, { useState, useEffect } from 'react';
import './Character.css';
import happyRight from './images/c10.png';
import happyLeft from './images/c1.png';
import sadRight from './images/c21.png';
import sadLeft from './images/c22.png';
import Health from './Health';

export const Character = ({ charSelect, setCharacter, currentHealthImageIndex, setCurrentHealthImageIndex }) => {
    const [position, setPosition] = useState(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [direction, setDirection] = useState(1); // 1 for moving right, -1 for moving left
    const [isStopped, setIsStopped] = useState(false);
    const [charVal, setCharVal] = useState(charSelect);
    console.log(charVal)
    
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

        if (currentHealthImageIndex === 4) {
            setIsStopped(true);
            return;
        }

        const intervalId = setInterval(() => {
            if (direction === 1 && position + characterWidth > maxPosition) {
                setPosition(maxPosition - characterWidth);
                setDirection(-1);
            } else if (direction === -1 && position < minPosition) {
                setPosition(minPosition);
                setDirection(1);
            } else {
                setPosition((prevPosition) => (prevPosition + direction*0.5));
            }
        }, 800);

        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener('resize', handleResize);
        };
    }, [position, screenWidth, direction, currentHealthImageIndex]);

    if (charVal === 0) {
      return (
        <div className="character" style={{ left: `${position + 175}px` }}>
            <Health currentHealthImageIndex={currentHealthImageIndex} setCurrentHealthImageIndex={setCurrentHealthImageIndex} />
            <img src={direction === 1 ? happyRight : happyLeft} alt="Character" />
        </div>
    )}

    else if (charVal === 1) {
      return (
      <div className="character" style={{ left: `${position + 175}px` }}>
          <Health currentHealthImageIndex={currentHealthImageIndex} setCurrentHealthImageIndex={setCurrentHealthImageIndex} />
          <img src={direction === 1 ? sadRight : sadLeft} alt="Character" />
      </div>
    )}
    
};

export default Character;
