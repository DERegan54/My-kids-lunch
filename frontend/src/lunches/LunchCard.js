import React, {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import MklApi from '../api';
import UserContext from '../users/UserContext';
import LunchReviews from './LunchReviews';
import {VscHeart} from "react-icons/vsc";
import {VscHeartFilled} from "react-icons/vsc";


const LunchCard = ({lunch, reviews }) => {  
    const {isFavorited, addFavorite, removeFavorite} = useContext(UserContext)
    const [lunchReviews, setLunchReviews] = useState([]);
    const initialState = isFavorited(lunch.id);
    const [favorited, setFavorited] = useState(initialState);

    // console.log("isFavorited: ", isFavorited);

    useEffect(() => {
        function getLunchReviews(reviews) {
            setLunchReviews(reviews.filter((lunchReview) => lunchReview.lunchId === lunch.id));
        }
        getLunchReviews(reviews);
    }, [reviews]);

    async function handleAddFavorite(evt) {
        if (favorited) return;
        addFavorite(lunch.id)
        setFavorited(true);
    } 

    async function handleRemoveFavorite(evt){
        if(!favorited) return;
        removeFavorite(lunch.id);
        setFavorited(false);
    }

    
    console.log(lunch.title, ':' ,favorited)
    // console.log("isFavorited: ", isFavorited(lunch.id))
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
                        {favorited ? (<VscHeartFilled onClick={handleRemoveFavorite} />) : (<VscHeart onClick={handleAddFavorite} />)  }   
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