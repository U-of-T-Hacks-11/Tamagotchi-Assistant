import React, { useState } from 'react'
import happyRight from '../pages/images/c10.png';
import happyLeft from '../pages/images/c1.png';
import sadRight from '../pages/images/c21.png';
import sadLeft from '../pages/images/c22.png';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
// Sample components
// const ComponentA = () => <div>Component A</div>;
// const ComponentB = () => <div>Component B</div>;
// const ComponentC = () => <div>Component C</div>;

export const CharSelect = ({ charSelect={charSelect}, setCharacter={setCharacter} }) => {

  return (
    <>
      <FaAngleDoubleLeft onClick={() => setCharacter(charSelect === 1 ? 0 : charSelect + 1)} />
      <div className='characters'>
        {charSelect === 0 ? <img src={happyLeft} alt='happyLeft' /> : <img src={sadLeft} alt='sadLeft' />}
        {charSelect === 0 ? <img src={happyRight} alt='happyRight' /> : <img src={sadRight} alt='sadRight' />}
      </div>
      <FaAngleDoubleRight onClick={() => setCharacter(charSelect === 1 ? 0 : charSelect + 1)} />
    </>
  );

};

export default CharSelect
