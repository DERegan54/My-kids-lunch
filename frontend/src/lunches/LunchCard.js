import React, {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';


const LunchCard = ({id, title, description, protein, carb, fruit, vegetable, fat, sweet, beverage}) => {
    return (
        <div className='LunchCard'>
                <p>{title}</p>
                <p>{description}</p>
                <button className='LunchCard-linkToDetailsButton'><Link to={`/lunches/${id}`}>See Nutrition Info</Link></button>
        </div>
    );
}

export default LunchCard;