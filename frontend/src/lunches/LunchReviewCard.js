import React from 'react';

const LunchReviewCard = ({reviewText}) => {
    return (
        <div className='LunchReviewCard'>
            <div className='lunchReviewCard-reviews'>
                <p>{`${reviewText}`}</p>
            </div>
            <hr></hr>
        </div>
    )
}

export default LunchReviewCard;