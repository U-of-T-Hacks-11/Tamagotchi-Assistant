import React, { useState } from 'react';
import Chat from '../pages/Chat';
import Home from '../pages/Home';
import Timer from '../pages/Timer';
import Feed from '../pages/Feed';
import hungerBar from '../pages/images/hungerBar.png';
import { FaHome, FaHourglassHalf, FaSave } from "react-icons/fa";
import Notes from '../pages/Notes';
// Sample components
// const ComponentA = () => <div>Component A</div>;
// const ComponentB = () => <div>Component B</div>;
// const ComponentC = () => <div>Component C</div>;

const Switcher = ({feedCharacter}) => {
  const [currentComponent, setCurrentComponent] = useState(<Home />);


  const handleButtonClick = (component) => {
    switch (component) {
      case 'home':
        setCurrentComponent(<Home />);
        break;
      case 'timer':
        setCurrentComponent(<Timer />);
        break;
      case 'feed':
        feedCharacter();
        break;
      case 'notes':
        setCurrentComponent(<Notes />);
        break;
      default:
        setCurrentComponent(null);
    }
  };

  return (
    <div className="App">
      <div>
        <button onClick={() => handleButtonClick('home')}><FaHome /></button>
        <button onClick={() => handleButtonClick('timer')}><FaHourglassHalf /></button>
        <button onClick={() => handleButtonClick('notes')}><FaSave /></button>
        <button 
          onClick={() => handleButtonClick('feed')}
          style={{ position: 'absolute', bottom: 20, right: 10 , fontSize: '18px', padding: '8px'}}
          >feed</button>
      </div>
      <div>
        {currentComponent}
      </div>
    </div>
  );
};

export default Switcher;