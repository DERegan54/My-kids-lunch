import React, {useState, useEffect, useContext} from "react";
import ReviewCard from "../reviews/ReviewCard";
import UserContext from "../users/UserContext";
import Header from "../common/Header";


const ReviewList = ({reviews}) => {
    const {currentUser} = useContext(UserContext);
    const [userReviews, setUserReviews] = useState([]);

    let username = currentUser.username;
    useEffect(() => {
        function getUserReviews(username) {
            setUserReviews(reviews.filter((reviews) => reviews.username = username));
        };
        getUserReviews(username)
    }, [username]);

    console.log("userReviews: ", userReviews);
    console.log("reviews: ", reviews);
 
    return (
        <div className="ReviewList-container">
            <Header />
            <br></br>
            <br></br>
            <h1 className="ReviewList-header">{currentUser.firstName || currentUser.username}'s Lunch Reviews:</h1>
            {userReviews.length
                ? (
                    <div className='ReviewsList-reviews'>
                        {userReviews.map((userReview) => (
                            <ReviewCard userReview={userReview} />
                        ))} 
                    </div>
                ) : (
                    <h4>No reviews yet.</h4>
            )}
            
        </div>
    ); 
}

export default ReviewList;