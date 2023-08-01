import React, {useState, useEffect, useContext} from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
import Header from '../common/Header';
import Alert from '../common/Alert';
import UserContext from '../users/UserContext';
import MklApi from '../api';

const ReviewUpdateForm = () => {
    const {id} = useParams();
    const {currentUser, setReviewed} = useContext(UserContext);
    const initialState = {reviewText: "", userId: currentUser.id, lunchId: Number(id)}
    const [formData, setFormData] = useState(initialState)
    const [formErrors, setFormErrors] = useState([]);
    const [review, setReview] = useState([])
    const [reviewAdded, setReviewAdded] = useState(false);
    const [lunch, setLunch] = useState([]);

    console.log("id: ", id);
    console.log("review: ", review);


    useEffect(() => {
        async function getReview() {
            let reviewRes = await MklApi.getReview(id);
            setReview(reviewRes);
        }
        getReview();
    }, [id]);

    let lunchId = review.lunchId;
    
    useEffect(() => {
        async function getLunch(lunchId) {
           let lunchRes = await MklApi.getLunch(lunchId);
           setLunch(lunchRes);
        }
        getLunch(lunchId)
    }, []);

    // Handles form submit  
    async function handleSubmit(evt) {
        evt.preventDefault();
        let data = {
            reviewText: formData.reviewText,
            username: currentUser.username,
            lunchId: review.lunchId,
        }; 
        try {
            await MklApi.updateReview(review.id, data);
        } catch (errors) {
            setFormErrors(errors);
            return;
        } 
        setReviewed(true);
        setFormData(initialState);
        setFormErrors([]);
        setReviewAdded(true);
    }
       
    // Updates form data fields on change
    function handleChange(evt) {
        const {name, value} = evt.target;
        setFormData(data => ({...data, [name]: value}));
    }

    return (
        <div className='ReviewUpdateForm'>
            <Header />
            <h1 className='ReviewUpdateForm-h1'>Update Review for {lunch.title}: </h1>
            <div className='ReviewUpdateForm-container'>
                <form onSubmit={handleSubmit}>
                    <br></br>
                    <br></br>
                    <textarea
                        className='ReviewUpdateForm-textarea'
                        name="reviewText"
                        id="reviewText"
                        placeholder="Enter comments here"
                        value={formData.reviewText}
                        onChange={handleChange}
                        required>
                    </textarea>
                    {formErrors.length ? <Alert messages={formErrors} /> : null}
                    <br></br>
                    <button className='ReviewUpdateForm-submitButton'type="submit" onSubmit={handleSubmit}>Save changes!</button>
                    {reviewAdded ? <Alert messages={["Review added successfully"]} /> : null}
                </form>
            </div>
        </div>
    );
}

export default ReviewUpdateForm;