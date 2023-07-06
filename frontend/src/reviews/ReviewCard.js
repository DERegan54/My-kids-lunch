import React, {useState, useEffect, useContext} from 'react';
import MklApi from '../api';


const ReviewCard = ({reviewText, userId, lunchId}) => {
    const [lunch, setLunch] = useState([])

    useEffect(() => {
        async function getLunch() {
            let lunchRes = await MklApi.getLunch(lunchId);
            setLunch(lunchRes);
        }
        getLunch();
    }, [lunchId])


    return (
        <div className='LunchReviewCard'>
            <div className='lunchReviewCard-reviews'>
                <p><b>Lunch: </b>{lunch.title}</p>
                <p><b>Review comments: </b>{`${reviewText}`}</p>
                <p><b>Reviewed by: </b>{`${userId}`}</p>
            </div>
            <hr></hr>
        </div>
    )
}

export default ReviewCard;