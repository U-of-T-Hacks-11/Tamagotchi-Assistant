import './App.css'
import Switcher from './components/Switcher'
import Character from './pages/Character'
//import Feed from './pages/Feed'
import React, { useState, useEffect } from 'react';
import Chat from './pages/Chat';

function App() {
  const [currentHealthImageIndex, setCurrentHealthImageIndex] = useState(0);
  const feedCharacter = () => {
    console.log(currentHealthImageIndex)
    setCurrentHealthImageIndex(currentHealthImageIndex === 0 ? 0 : currentHealthImageIndex - 1);
  }

  return (
    <main>
      <div className='App'>
        <Switcher feedCharacter={feedCharacter} />
        <Character currentHealthImageIndex={currentHealthImageIndex} setCurrentHealthImageIndex={setCurrentHealthImageIndex}/>
      </div>
    </main>
    
  )
}

export default App;
