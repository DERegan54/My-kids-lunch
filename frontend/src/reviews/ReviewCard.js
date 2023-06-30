import React, {useContext, useState, useEffect} from 'react';
import UserContext from '../users/UserContext';

const ReviewCard = ({id, reviewText, userId, lunchId}) => {
    const {hasAddedLunchReview, addLunchReview, currentUser} = useContext(UserContext);
    const [addedReview, setAddedLunchReview] = useState();

    const userReviewedLunches = currentUser.reviews;

    useEffect(() => {
        setAddedLunchReview(hasAddedLunchReview(id));
    }, [id, hasAddedLunchReview]);

    async function handleReview(evt) {
        if (hasAddedLunchReview(id)) return;
        addLunchReview(id);
        setAddedLunchReview(true);
    }

    return (
        <div className="ReviewCard">
            <h3>{`${reviewText}`}</h3>
        </div>
    );
}

export default ReviewCard;