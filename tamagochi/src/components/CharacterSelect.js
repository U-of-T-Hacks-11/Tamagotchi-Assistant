import React, { useState } from 'react'
import happyRight from '../pages/images/c10.png';
import sadRight from '../pages/images/c21.png';
import './CharSelect.css';

import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
// Sample components
// const ComponentA = () => <div>Component A</div>;
// const ComponentB = () => <div>Component B</div>;
// const ComponentC = () => <div>Component C</div>;

export const CharacterSelect = ({ charSelect, setCharacter }) => {
  console.log(charSelect);
  return (
    <div class='charAlign'>
      <FaAngleDoubleLeft onClick={() => {setCharacter(charSelect === 1 ? 0 : charSelect + 1); console.log(charSelect)}} />
      {charSelect === 0 ? <img className='charScreen' src={happyRight} alt='happyRight' /> : <img className='charScreen' src={sadRight} alt='sadRight' />}
      <FaAngleDoubleRight onClick={() => setCharacter(charSelect === 1 ? 0 : charSelect + 1)} />
    </div>
  );

};

export default CharacterSelect
