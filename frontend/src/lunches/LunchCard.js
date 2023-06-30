import React, {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import UserContext from '../users/UserContext';


const LunchCard = ({id, title, description, protein, carb, fruit, vegetable, fat, sweet, beverage}) => {
    const {hasAddedToFavorites, addToFavorites, currentUser} = useContext(UserContext);
    const [favorited, setFavorited] = useState();

    const userFavoritedLunches = currentUser.favorites;

    console.log(typeof userFavoritedLunches)

    useEffect(() => {
        setFavorited(hasAddedToFavorites(id));
    }, [id, hasAddedToFavorites]);

    async function handleAddFavorite(evt) {
        if (hasAddedToFavorites(id)) return;
        addToFavorites(id);
        setFavorited(true);
    }

    return (
        <div className='LunchCard'>
                <h3>{title}</h3>
                <p>{description}</p>
                <button className='LunchCard-linkToDetailsButton'><Link to={`/lunches/${id}/nutrition`}>See Nutrition Information</Link></button>
                <button className='LunchCard-linkToReviewsButton'><Link to={`/lunches/${id}/reviews`}>See Reviews for this lunch</Link></button>
                <button className='LunchCard-linkToReviewForm'><Link to={`/lunches/${id}/addreview`}>Review this Lunch</Link></button>
                {/* <button 
                    className='LunchCard-addFavoriteButton'
                    onClick={handleAddFavorite}
                    disable={favorited}>
                        {favorited || userFavoritedLunches.includes(id) ? "This lunch is a favorite!" : "Add Lunch to Favorites"}
                </button> */}
        </div>
    );
}

export default LunchCard;