import './App.css'
import Switcher from './components/Switcher'
import Character from './pages/Character'
import Feed from './pages/Feed'
import happyRight from './pages/images/c10.png'
import React, { useState, useEffect } from 'react';
import Chat from './pages/Chat';

function App() {



  return (
    <div className='App'>
      <Switcher />
      <Character />
      <Chat />
    </div>
  )
}

export default App;
