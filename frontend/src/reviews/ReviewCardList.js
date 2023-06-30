import React from 'react';
import ReviewCard from './ReviewCard';

const ReviewCardList = ({reviews}) => {
    return (
        <div className='ReviewCardList'>
            {reviews.map(review => (
                <ReviewCard
                    key={review.id}
                    id={review.id}
                    text={review.reviewText}
                />    
            ))}
        </div>
    );
}

export default ReviewCardList;