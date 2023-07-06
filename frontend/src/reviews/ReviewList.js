import React, {useState, useEffect} from "react";
import ReviewCardList from "../lunches/LunchReviewCardList";
import MklApi from "../api";

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(function getReviewsToRender() {
        getAllReviews();
    }, []);

    async function getAllReviews() {
        let reviewsRes = MklApi.getAllReviews();
        setReviews(reviewsRes);
    }

    console.log(reviews);

    return (
        <div className="ReviewList">
            <ReviewCardList reviews={reviews} />
        </div>
    ); 
}

export default ReviewList;