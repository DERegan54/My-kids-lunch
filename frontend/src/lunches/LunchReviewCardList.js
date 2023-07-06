import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import MklApi from '../api';
import LunchReviewCard from "./LunchReviewCard";

const LunchReviewCardList = ({reviews}) => {
    return (
        <div className='LunchReviewCardList'>
            {reviews.map(review => (
                <LunchReviewCard 
                    key={review.id}
                    id={review.id}
                    reviewText={review.reviewText}
                    userId={review.userId}
                    lunchId={review.lunchId}
                />
            ))}
        </div>
    );
}

export default LunchReviewCardList;