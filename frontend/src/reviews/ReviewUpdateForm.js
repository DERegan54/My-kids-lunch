import React, {useState, useEffect, useContext} from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
import Header from '../common/Header';
import Alert from '../common/Alert';
import UserContext from '../users/UserContext';
import MklApi from '../api';

const ReviewUpdateForm = ({userReview}) => {
    const {currentUser} = useContext(UserContext);
    const initialState = {reviewText: "", userId: currentUser.id, lunchId: Number(id)}
    const [lunch, setLunch] = useState([]);
    const [formData, setFormData] = useState(initialState)
    const [formErrors, setFormErrors] = useState([]);
    const [reviewAdded, setReviewAdded] = useState(false);
    
    let id = userReview.id;
    let username = currentUser.username
    let lunchId = userReview.lunchId
    console.log("id: ", id);
    console.log("username: ", username);
    console.log("lunchId: ", lunchId);

    // Handles form submit  
    async function handleSubmit(evt) {
        evt.preventDefault();
        let data = {
            reviewText: formData.reviewText,
            username: currentUser.username,
            lunchId: userReview.lunchId
        }; 
        try {
            await MklApi.updateReview(id, data);
        } catch (errors) {
            setFormErrors(errors);
            return;
        } 
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
            <div className='ReviewUpdateForm-container'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='reviewText'>Update Review: </label>
                    <br></br>
                    <br></br>
                    <textarea
                        className='ReviewUpdateForm'
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