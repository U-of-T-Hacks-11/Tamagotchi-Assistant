import './App.css'
import Switcher from './components/Switcher'
import Character from './pages/Character'
import happyRight from './pages/images/c10.png'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chat from './pages/Chat';

function App() {



  return (
    <div className='App'>
      {/* <img src={happyRight} alt='' /> */}
      <Switcher />
      <Character />
      <Chat />
    </div>
  )
}

export default App;
