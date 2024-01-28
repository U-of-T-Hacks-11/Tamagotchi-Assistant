import './Home.css';
import React, {useState} from 'react';
import logo from '../pages/images/tamagochiLogo.png';
import CharacterSelect from '../components/CharacterSelect';

const Home = ({charSelect, setCharacter}) =>{
    console.log(charSelect, setCharacter);
    return(
        <div>
            <div className="container">
                <h1 className='title-heading'>Meet Your </h1>
                <img src={logo}  alt="Header Image" />
                <h1 className='title-heading'>Study AI</h1>
            </div>
            <CharacterSelect charSelect={charSelect} setCharacter={setCharacter}/>
        </div>
    );
}
export default Home;