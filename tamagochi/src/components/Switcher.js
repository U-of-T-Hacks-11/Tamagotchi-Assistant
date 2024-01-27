import React, { useState } from 'react';
import Chat from '../pages/Chat';
import Home from '../pages/Home';
import Timer from '../pages/Timer';

// Sample components
// const ComponentA = () => <div>Component A</div>;
// const ComponentB = () => <div>Component B</div>;
// const ComponentC = () => <div>Component C</div>;

const Switcher = () => {
  const [currentComponent, setCurrentComponent] = useState(<Home />);

  const handleButtonClick = (component) => {
    switch (component) {
      case 'home':
        setCurrentComponent(<Home />);
        break;
      case 'timer':
        setCurrentComponent(<Timer />);
        break;
      case 'chat':
        setCurrentComponent(<Chat />);
        break;
      default:
        setCurrentComponent(null);
    }
  };

  return (
    <div className="App">
      <div>
        <button onClick={() => handleButtonClick('home')}>Home</button>
        <button onClick={() => handleButtonClick('timer')}>Timer</button>
        <button onClick={() => handleButtonClick('chat')}>Chat</button>
      </div>
      <div>
        {currentComponent}
      </div>
    </div>
  );
};

export default Switcher;