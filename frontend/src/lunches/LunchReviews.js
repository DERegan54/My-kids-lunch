import React from 'react';
import LunchReviewCard from './LunchReviewCard';

const LunchReviews = ({lunchReviews}) => {    
    return (
        <div className="LunchReviews">
            {lunchReviews.length
                ? (
                    <div className='LunchReviews-reviews'>
                        {lunchReviews.map((lunchReview) => (
                            <LunchReviewCard key={lunchReview.id} lunchReview={lunchReview} />
                        ))}      
                    </div>
                ) : (
                    <h4>No reviews on this lunch yet.</h4>
            )}       
        </div>
    );   
}

export default LunchReviews;