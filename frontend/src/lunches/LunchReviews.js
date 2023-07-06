import React, {useState, useEffect} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import MklApi from '../api';
import Header from '../common/Header';
import LunchReviewCardList from './LunchReviewCardList';

const LunchReviews = () => {
    const {id} = useParams();
    const [lunch, setLunch] = useState([]);
    const [reviews, setReviews] = useState([])
    console.log(typeof +id)
   
    useEffect(() => {
        getLunch();
    }, []);
    
    async function getLunch() {
        let lunchRes = await MklApi.getLunch(id);
        setLunch(lunchRes);
        setReviews(lunch.reviews)
    }

    console.log("lunch: ", lunch)
    console.log("reviews: ", reviews)
   
    console.log("lunch.reviews: ", lunch.reviews);

    if (!lunch) <Redirect to='/'></Redirect>

    return (
        lunch && <div className="LunchReviews">
            <h2>Reviews For {lunch.title}:</h2>
            <div className='LunchReviews-reviews'>
                <LunchReviewCardList reviews={lunch.reviews} />
            </div>
        </div>
    );   
}

export default LunchReviews;