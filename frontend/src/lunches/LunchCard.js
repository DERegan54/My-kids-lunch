import React, {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';


const LunchCard = ({id, title, description, protein, carb, fruit, vegetable, fat, sweet, beverage}) => {
    return (
        <div className='LunchCard'>
                <h3>{title}</h3>
                <p>{description}</p>
                <button className='LunchCard-linkToDetailsButton'><Link to={`/lunches/${id}`}>See Nutrition Information</Link></button>
                <button className='LunchCard-addFavoriteButton'>Add Lunch to Favorites</button>
                <br></br>
                <button className='LunchCard-linkToReviewForm'><Link to={`/lunches/${id}/addreview`}>Review this Lunch</Link></button>
        </div>
    );
}

export default LunchCard;