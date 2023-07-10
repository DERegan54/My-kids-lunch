import React, {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import MklApi from '../api';
import UserContext from '../users/UserContext';
import {VscHeart} from "react-icons/vsc";
import {VscHeartFilled} from "react-icons/vsc";

const LunchCard = ({id, title, description, protein, carb, fruit, vegetable, fat, sweet}) => {
    const {currentUser} = useContext(UserContext);
    const [isFavorite, setIsFavorite] = useState([]);
    const [userFavorites, setUserFavorites] = useState([]);
    const [favoriteId, setFavoriteId] = useState()
    
    console.log("userFavorites: ", userFavorites);
    console.log("favoriteId: ", favoriteId)
    console.log("favId: ", favId)

    let userId = currentUser.id;
    useEffect(() => {
        async function getUserFavorites() {
            let userFavoritesRes = await MklApi.findAllFavoritesOnUser(userId);
            setUserFavorites(userFavoritesRes);
        }
        getUserFavorites(userId);
    }, [userId]);

    let favId;
    useEffect(() => {
        function getFavoriteId(id) {
            for(let favorite of userFavorites) {
                if (favorite.lunchId === id) {
                    favId = favorite.id;
                    return favId;
                }
            }
        }
        console.log("favId: ", favId)
        getFavoriteId(favId)
        setFavoriteId(favId)
    }, [id])

    const handleFavoriteChange = () => {
        let data = {
            userId: currentUser.id,
            lunchId: id,
            isFavorite: false ? true : false
        }
        MklApi.updateFavorite(favoriteId, data);
        setIsFavorite(data.isFavorite);
    }
    console.log("isFavorite: ", isFavorite)
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
        </div>
    );
}

export default LunchCard;