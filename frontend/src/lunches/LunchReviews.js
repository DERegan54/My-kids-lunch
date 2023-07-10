import React from 'react';
import LunchReviewCardList from './LunchReviewCardList';

const LunchReviews = ({id, reviews}) => {

    console.log("id: ", id)
    console.log("reviews: ", reviews)

    return (
        <div className="LunchReviews">
            <div className='LunchReviews-reviews'>
                <br></br>
                <LunchReviewCardList id={id} reviews={reviews} />
            </div>
        </div>
    );   
}

export default LunchReviews;