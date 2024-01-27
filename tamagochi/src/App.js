import './App.css'
import Switcher from './components/Switcher'
import Character from './pages/Character'
import React, { useState, useEffect } from 'react';

function App() {
  const [currentHealthImageIndex, setCurrentHealthImageIndex] = useState(0);
  const feedCharacter = () => {
    console.log(currentHealthImageIndex)
    setCurrentHealthImageIndex(currentHealthImageIndex === 0 ? 0 : currentHealthImageIndex - 1);
  }

  return (
<<<<<<< HEAD
    <div className='App'>
      <Switcher feedCharacter={feedCharacter} />
      <Character currentHealthImageIndex={currentHealthImageIndex} setCurrentHealthImageIndex={setCurrentHealthImageIndex}/>
    </div>
=======
    <main>
      <div className='App'>
        <Switcher feedCharacter={feedCharacter} />
        <Character currentHealthImageIndex={currentHealthImageIndex} setCurrentHealthImageIndex={setCurrentHealthImageIndex}/>
      </div>
    </main>
    
>>>>>>> fce6a6f9a5b494ff30c7cfed8ba2ef46725eb35e
  )
}

export default App;
