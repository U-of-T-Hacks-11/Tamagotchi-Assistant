import './App.css'
import Switcher from './components/Switcher'
import Character from './pages/Character'
import Feed from './pages/Feed'
import happyRight from './pages/images/c10.png'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chat from './pages/Chat';

function App() {
  const [currentHealthImageIndex, setCurrentHealthImageIndex] = useState(0);
  const feedCharacter = () => {
    console.log(currentHealthImageIndex)
    setCurrentHealthImageIndex(currentHealthImageIndex === 0 ? 0 : currentHealthImageIndex - 1);
  }

  return (
    <div className='App'>
      <Switcher feedCharacter={feedCharacter} />
      <Character currentHealthImageIndex={currentHealthImageIndex} setCurrentHealthImageIndex={setCurrentHealthImageIndex}/>
      <Chat />
    </div>
  )
}

export default App;
