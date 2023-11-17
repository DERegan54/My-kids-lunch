import React from 'react';
import Lunchbox from '../images/clipart-lunch.png';
import './Header.css';

const Header = () => {
    return (
        <div className='Header'>
            <span className='Header-h1'>My Kids' Lunchbox</span>
            <div><img className='Header-lunchbox' src={Lunchbox} alt={"red lunch box"} /></div>
            <h4 className='Header-h4'>...pack a lunch they'll actually eat!</h4>
            <br></br>
        </div>
    );
}

export default Header;