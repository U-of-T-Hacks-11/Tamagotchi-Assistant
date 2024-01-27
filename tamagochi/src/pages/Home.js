import './Home.css';
import React from 'react';
import logo from '../pages/images/tamagochiLogo.png';

export default function Home(){
    return(
        <div>
            <div className="container">
                <h1 className='title-heading'>Meet Your </h1>
                <img src={logo} alt="Header Image" />
            </div>
        </div>
    )
}