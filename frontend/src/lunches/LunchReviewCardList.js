import React from 'react';
import LunchReviewCard from "../lunches/LunchReviewCard";

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