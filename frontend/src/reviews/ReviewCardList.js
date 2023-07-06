import React, {useState, useEffect} from 'react';
import ReviewCard from "../reviews/ReviewCard";


const ReviewCardList = ({reviews}) => {
    return (
        <div className='ReviewCardList'>
            {reviews.map(review => (
                <ReviewCard 
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

export default ReviewCardList;