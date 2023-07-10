import React, {useState, useEffect} from 'react';
import MklApi from '../api';

const LunchReviewCard = ({review}) => {
    const [reviewer, setReviewer] = useState();
    const [lunch, setLunch] = useState();
    
    useEffect(() => {
        async function getUsername() {
            let reviewer = await MklApi.getUsername(review.userId);
            setReviewer(reviewer);
        }
        review && getUsername();
    }, [review.userId])
    console.log("reviewer: ", reviewer);

    useEffect(() => {
        async function getLunch() {
            let lunchRes = await MklApi.getLunch(review.lunchId);
            setLunch(lunchRes);
        }
        review && getLunch();
    }, [review.lunchId])
    console.log("lunch: ", lunch);
    

    return (
        <div className='LunchReviewCard'>
            <div className='lunchReviewCard-reviews'>
                {/* <p>{`${review.reviewText}`}</p>
                <p>~ {`${reviewer.firstName || reviewer.username}`}</p> */}
            </div>
        </div>
    );
}

export default LunchReviewCard;