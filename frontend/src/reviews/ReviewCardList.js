import React from 'react';
import ReviewCard from './ReviewCard';

const ReviewCardList = ({reviews}) => {
    return (
        <div className='ReviewCardList'>
            {reviews.map(review => (
                <ReviewCard
                    key={review.id}
                    id={review.id}
                    lunchTitle={review.lunchId.title}
                />    
            ))}
        </div>
    );
}

export default ReviewCardList;