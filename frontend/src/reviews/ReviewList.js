import React, {useState, useEffect} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import MklApi from '../api';
import ReviewCardList from './ReviewCardList';

const ReviewList = () => {
    const {id} = useParams();
    const [reviews, setReviews] = useState([]);
    const [lunch, setLunch] = useState

    useEffect(function getAllReviews() {
        getReviews();
    },[]);

    async function getReviews() {
        let reviews = await MklApi.getAllReviews();
        setReviews(reviews);
    }

    console.log(reviews)

    if (!reviews) <Redirect to='/'></Redirect>

    return (
        <div className='ReviewList'>
            <h2 className='ReviewList-h2'>All Lunch Reviews: </h2>
               
        </div>
    );
}

export default ReviewList;