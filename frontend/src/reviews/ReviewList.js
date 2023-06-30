import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import MklApi from '../api';
import ReviewCardList from './ReviewCardList';

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);

    useEffect( async function getAllReviews() {
        let reviews = await MklApi.getAllReviews();
        setReviews(reviews);
    }, []);

    console.log(reviews)

    // if (!reviews) <Redirect to='/'></Redirect>

    return (
        <div className='ReviewList'>
            <h2 className='ReviewList-h2'>All Lunch Reviews: </h2>
            {reviews.length 
                ? <ReviewCardList reviews={reviews} />
                : <p>Sorry, not reviews were found!</p> 
            }
        </div>
    );
}

export default ReviewList;