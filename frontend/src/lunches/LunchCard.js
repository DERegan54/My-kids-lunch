import React, {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import MklApi from '../api';
import UserContext from '../users/UserContext';
import LunchReviews from './LunchReviews';
import {VscHeart} from "react-icons/vsc";
import {VscHeartFilled} from "react-icons/vsc";

const LunchCard = ({id, title, description, protein, carb, fruit, vegetable, fat, sweet}) => {
    const {currentUser} = useContext(UserContext);
    const [isFavorite, setIsFavorite] = useState([]);
    const [userFavorites, setUserFavorites] = useState([]);
    const [favoriteId, setFavoriteId] = useState();
    const [reviews, setReviews] = useState([]);
    

    useEffect(() => {
        async function getReviews(){
            let reviewsRes = await MklApi.getAllReviews(id);
            setReviews(reviewsRes);
        }
        getReviews();
    }, [id]);

    console.log("userFavorites: ", userFavorites);
    console.log("favoriteId: ", favoriteId)
    console.log("favId: ", favId)
    console.log("reviews: ", reviews)

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
                <div className='LunchCard-lunchInfo'>
                    <br></br>
                    <span>
                        <b>{`${title}`} </b>
                        {isFavorite ? (
                            <VscHeartFilled onClick={handleFavoriteChange} />
                        ) : (
                            <VscHeart onClick={handleFavoriteChange} />  
                        )}  
                    </span>
                    <br></br>
                    <br></br>
                    <span>{`${description}`}</span>
                    <button className='LunchCard-linkToDetailsButton'><Link to={`/lunches/${id}/nutrition`}>See Nutrition Information</Link></button>
                    <button className='LunchCard-linkToReviewForm'><Link to={`/lunches/${id}/addreview`}>Add comments for this Lunch</Link></button>
                </div>
                <br></br>
                <hr></hr>
                <br></br>
                <div className="LunchCard-comments">
                    <span><b>User Comments: </b></span>
                    <br></br>
                    <LunchReviews id={id} reviews={reviews} />
                </div>      
            </div>       
        </div>
    );
}

export default LunchCard;