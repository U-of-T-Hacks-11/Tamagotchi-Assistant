import React, { useState } from 'react'
import Chat from '../pages/Chat'
import Home from '../pages/Home'
import Timer from '../pages/Timer'
import Feed from '../pages/Feed'
import hungerBar from '../pages/images/hungerBar.png'
import { FaHome, FaHourglassHalf } from 'react-icons/fa'
import { BsChatLeftTextFill } from "react-icons/bs";
import './Switcher.css';

// Sample components
// const ComponentA = () => <div>Component A</div>;
// const ComponentB = () => <div>Component B</div>;
// const ComponentC = () => <div>Component C</div>;

const Switcher = ({ feedCharacter }) => {
  const [currentComponent, setCurrentComponent] = useState(<Home />)

  const handleButtonClick = (component) => {
    switch (component) {
      case 'home':
        setCurrentComponent(<Home />)
        break
      case 'timer':
        setCurrentComponent(<Timer />)
        break
      case 'chat':
        setCurrentComponent(<Chat />)
        break
      case 'feed':
        feedCharacter()
        break

      default:
        setCurrentComponent(null)
    }
  }

  return (
    <div className='App'>
      <div>
        <div className = 'center-buttons'>
          <button className = 'button-icon' onClick={() => handleButtonClick('home')}>
            <FaHome />
          </button>
          <button className = 'button-icon' onClick={() => handleButtonClick('timer')}>
            <FaHourglassHalf />
          </button>
          <button className = 'button-icon' onClick={() => handleButtonClick('chat')}>
            <BsChatLeftTextFill />
          </button>
          <button className = 'button-icon' onClick={() => handleButtonClick('chat')}>
            <BsChatLeftTextFill />
          </button>
          <button className = 'button-icon' onClick={() => handleButtonClick('chat')}>
            <BsChatLeftTextFill />
          </button>
        </div>
        <button
          onClick={() => handleButtonClick('feed')}
          style={{
            position: 'absolute',
            bottom: '30px',
            right: '30px',
            fontSize: '18px',
            padding: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.0)',
            borderRadius: 10,
            borderColor: 'rgba(14, 51, 19, 0.74)',
            borderWidth: '4px',
          }}
        >
          <img
            src={hungerBar}
            alt='Hunger Bar'
            style={{ width: '50px', height: '50px' }}
          />
        </button>
      </div>
      <div>{currentComponent}</div>
    </div>
  )
}

export default Switcher
