import React, {useState, useEffect, useContext} from 'react';
import MklApi from '../api';


const LunchReviewCard = ({review}) => {
    const {reviewText, userId, lunchId} = review
    const [lunch, setLunch] = useState([]);
    const [reviewer, setReviewer] = useState([]);

    useEffect(() => {
        async function getUsername() {
            let reviewer = await MklApi.getUsername(userId);
            setReviewer(reviewer);
        }
        getUsername(userId);
    }, [userId])

    useEffect(() => {
        async function getLunch() {
            let lunch = await MklApi.getLunch(lunchId);
            setLunch(lunch);
        }
        getLunch();
    }, [lunchId])

    console.log(reviewer);

    return (
        <div className='LunchReviewCard'>
            <div className='lunchReviewCard-reviews'>
                <p><b>Lunch: </b>{lunch.title}</p>
                <p><b>Review comments: </b>{`${reviewText}`}</p>
                <p><b>Reviewed by: </b>{`${reviewer}`}</p>
            </div>
            <hr></hr>
        </div>
    );
}

export default LunchReviewCard;