import React, {useState, useEffect} from 'react';
import{Redirect} from 'react-router-dom';
import MklApi from '../api';
import Header from '../common/Header';

const ReviewDetail = ({id, reviewText, userId, lunchId}) => {
    const [review, setReview] = useState([]);
    const [lunch, setLunch] = useState([]);
    
    useEffect(() => {
        async function getReview(id) {
            let review  = await MklApi.getReview(id);
            setReview(review);
        }
        async function getLunch(lunchId) {
            let lunch = await MklApi.getLunch(lunchId)
            setLunch(lunch);
        }
        getReview();
        getLunch();
    }, [id, lunchId]);

    return (
        <div className="ReviewDetail">
            <Header />
            <h2>{`${review.text}`}</h2>
            <h4>{`${lunch.title}`}</h4>
        </div>
    );
}

export default ReviewDetail;