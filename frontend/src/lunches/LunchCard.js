import React, {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import MklApi from '../api';
import UserContext from '../users/UserContext';
import LunchReviews from './LunchReviews';
import {VscHeart} from "react-icons/vsc";
import {VscHeartFilled} from "react-icons/vsc";


const LunchCard = ({lunch, reviews }) => {  
    const {currentUser, userFavoriteIds, isFavorited, addFavorite, removeFavorite} = useContext(UserContext)
    const [lunchReviews, setLunchReviews] = useState([]);
    const [favorited, setFavorited] = useState();

    useEffect(() => {
        function getLunchReviews(reviews) {
            setLunchReviews(reviews.filter((lunchReview) => lunchReview.lunchId === lunch.id));
        }
        getLunchReviews(reviews);
    }, [reviews]);

    const currentUserFavorites = currentUser.favorites;

    useEffect(() => {
        setFavorited(isFavorited(lunch.id));
    }, [lunch.id, isFavorited]);

    async function handleToggleFavorite(evt) {
        if (isFavorited(lunch.id)) {
            removeFavorite(lunch.id);
            setFavorited(false);
        } else if (!isFavorited(lunch.id)) {
          addFavorite(lunch.id);
          setFavorited(true);
        }
    }

    console.log("lunch: ", lunch)
    console.log("favorited: ", favorited)
    console.log("isFavorited: ", isFavorited(lunch.id))
    
    
    // console.log("reviews: ", reviews)
    // console.log("lunch.id: ", lunch.id);
    // console.log("lunchReviews: ", lunchReviews)
    // console.log("userFavorites: ", userFavorites)
    // const userFavorites = currentUser.favorites;
 
    
    return (
        <div className='LunchCard'>
            <div className='LunchCard-lunches'>
                <div className='LunchCard-lunchInfo'>
                    <br></br>
                    <div>
                        <b>{`${lunch.title}`} </b>
                        {favorited || currentUserFavorites.includes(lunch.id) ? (<VscHeartFilled onClick={handleToggleFavorite} />) : (<VscHeart onClick={handleToggleFavorite} />)  }   
                    </div>
                    <br></br>
                    <br></br>
                    <span>{`${lunch.description}`}</span>
                    <br></br>
                    <button className='LunchCard-linkToDetailsButton'><Link to={`/lunches/${lunch.id}/details`}>See Lunch Details</Link></button>
                    <button className='LunchCard-linkToReviewForm'><Link to={`/lunches/${lunch.id}/addreview`}>Add comments for this Lunch</Link></button>
                </div>
                <br></br>
                <hr></hr>
                <br></br>
                <div className="LunchCard-comments">
                    <br></br>
                    <span><b>User Comments: </b></span>
                    <br></br>
                    <br></br>
                    <LunchReviews lunchId={lunch.id} lunchReviews={lunchReviews} />
                </div>      
            </div>       
        </div>
    );
}

export default LunchCard;