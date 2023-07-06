import React, {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import MklApi from '../api';
import UserContext from '../users/UserContext';
import {VscHeart} from "react-icons/vsc";
import {VscHeartFilled} from "react-icons/vsc";



const LunchCard = ({id, title, description, protein, carb, fruit, vegetable, fat, sweet, favorite}) => {
    const {currentUser} = useContext(UserContext);
    const [isFavorited, setIsFavorited] = useState(favorite);
    
    
    const handleFavoritedChange = () => {
        let data = {favorite: !favorite};
        MklApi.updateLunch(id, data);
        setIsFavorited(isFavorited => !isFavorited);
    }

    console.log(isFavorited);

    return (
        <div className='LunchCard'>
            <div className='LunchCard-lunches'>
                <p>
                    <b>{`${title}`} </b>
                    {isFavorited ? (
                        <VscHeartFilled onClick={handleFavoritedChange} />
                    ) : (
                        <VscHeart onClick={handleFavoritedChange} />  
                    )}  
                </p>
                <p>{`${description}`}</p>
                <button className='LunchCard-linkToDetailsButton'><Link to={`/lunches/${id}/nutrition`}>See Nutrition Information</Link></button>
                <button className='LunchCard-linkToReviewsButton'><Link to={`/lunches/${id}/reviews`}>See Reviews for this lunch</Link></button>
                <button className='LunchCard-linkToReviewForm'><Link to={`/lunches/${id}/addreview`}>Review this Lunch</Link></button>
                <br></br>        
            </div>
            <hr></hr>            
        </div>
    );
}

export default LunchCard;