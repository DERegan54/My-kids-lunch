import React, {useState, useEffect} from 'react';
import MklApi from '../api';

const LunchReviewCard = ({reviewText, userId}) => {
    const [username, setUsername] = useState();

    useEffect(() => {
        async function getUsername(userId) {
            let username = MklApi.getUsername(userId);
            setUsername(username);
        }
        getUsername(userId)
    }, [userId]);
    
    console.log(username);

    return (
        <div className='LunchReviewCard'>
            <div className='lunchReviewCard-reviews'>
                <p>{`${reviewText}`}</p>
                <p>Reviewed by {`${username}`}</p>
            </div>
            <hr></hr>
        </div>
    )
}

export default LunchReviewCard;