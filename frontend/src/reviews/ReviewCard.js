import React from 'react';


const ReviewCard = ({id, reviewText, userId, lunchId}) => {
    return (
        <div className="LunchReviewCard">
          <p>{`${reviewText}`}</p>
        </div>
    );
}

export default ReviewCard;