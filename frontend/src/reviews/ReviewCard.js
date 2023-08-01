import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import MklApi from '../api';
import UserContext from '../users/UserContext';
import ReviewUpdateForm from './ReviewUpdateForm';

const ReviewCard = ({userReview, lunches}) => {
    const {reviewIds, setReviewIds, removeReview, reviewed, setReviewed} = useContext(UserContext);
    const [showReview, setShowReview] = useState(true)
  

   

    let lunch = (lunches.filter(lunch => lunch.id === userReview.lunch_id))

    console.log("reviewIds: ", reviewIds)

    async function handleDelete(evt) {
        removeReview(userReview.id);
        setReviewIds([...reviewIds]);
        setReviewed(false);
        setShowReview(false);
        window.location.reload();
    }

    console.log("showReview: ", showReview)

    console.log("userReview: ", userReview)
    console.log("lunch: ", lunch)
   
    return (
        <div className='ReviewCard'>
            {showReview ? 
                <div className='ReviewCard-container'>
                    <div className='ReviewCard-comments'>
                        <p><b>Lunch: </b>{lunch[0].title}</p>
                        <p><b>Review comments: </b>{userReview.review_text} </p>
                    </div>
                    {/* <button className='ReviewCard-updateButton'><Link to={`/users/reviews/${userReview.id}`}>Update this Review</Link></button>    */}
                    <button className='ReviewCard-deleteButton' onClick={handleDelete}>Delete {lunch.title} Review</button>
                </div>
            : null}
        </div>
    )
}

export default ReviewCard;