import './App.css'
import Switcher from './components/Switcher'
import Character from './pages/Character'
import React, { useState, useEffect } from 'react';

function App() {
  const [charSelect, setCharacter] = useState(1);
  const [currentHealthImageIndex, setCurrentHealthImageIndex] = useState(0);
  const feedCharacter = () => {
    console.log(currentHealthImageIndex)
    setCurrentHealthImageIndex(currentHealthImageIndex === 0 ? 0 : currentHealthImageIndex - 1);
  }
  console.log(charSelect)
  return (
    <main>
      <div className='size'>
        <Switcher feedCharacter={feedCharacter} charSelect={charSelect} setCharacter={setCharacter}  />
        <Character charSelect={charSelect} setCharacter={setCharacter} currentHealthImageIndex={currentHealthImageIndex} setCurrentHealthImageIndex={setCurrentHealthImageIndex}/>
      </div>
    </main>
  )
}

export default App;