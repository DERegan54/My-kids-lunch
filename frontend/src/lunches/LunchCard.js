import React, {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import MklApi from '../api';
import UserContext from '../users/UserContext';
import {VscHeart} from "react-icons/vsc";
import {VscHeartFilled} from "react-icons/vsc";



const LunchCard = ({id, title, description, protein, carb, fruit, vegetable, fat, sweet}) => {
    const {hasFavoritedLunch, addFavorite, currentUser} = useContext(UserContext);
    const [isFavorite, setIsFavorite] = useState([]);
    
    const handleFavoriteChange = () => {
        let data = {
            userId: currentUser.id,
            lunchId: id,
            isFavorite: true ? false : true
        }
        MklApi.updateFavorite(id, data);
        setIsFavorite(data.isFavorite);
    }

    console.log(isFavorite);

    return (
        <div className='LunchCard'>
            <div className='LunchCard-lunches'>
                <p>
                    <b>{`${title}`} </b>
                    {isFavorite ? (
                        <VscHeartFilled onClick={handleFavoriteChange} />
                    ) : (
                        <VscHeart onClick={handleFavoriteChange} />  
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