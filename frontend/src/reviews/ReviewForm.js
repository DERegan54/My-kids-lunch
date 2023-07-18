import React, {useState, useEffect, useContext} from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
import Header from '../common/Header';
import Alert from '../common/Alert';
import UserContext from '../users/UserContext';
import MklApi from '../api';

const ReviewForm = () => {
    const {id} = useParams();
    const {currentUser} = useContext(UserContext);
    const initialState = {reviewText: "", userId: currentUser.id, lunchId: Number(id)}
    const [lunch, setLunch] = useState([]);
    const [formData, setFormData] = useState(initialState)
    const [formErrors, setFormErrors] = useState([]);
    const [reviewAdded, setReviewAdded] = useState(false);
    
    useEffect(() => {
        async function getLunch() {
            let lunchRes = await MklApi.getLunch(id);
            setLunch(lunchRes);
        }
        getLunch()
    },[id]);

    
    // console.log("lunch: ", lunch);
    // console.log("id: ", id);


    let newLunchReview;

    // Handles form submit  
    async function handleSubmit(evt) {
        evt.preventDefault();
        let data = {
            reviewText: formData.reviewText,
            username: currentUser.username,
            lunchId: +id
        }; 
        try {
            newLunchReview =   await MklApi.createReview(data);
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
        <div className='ReviewForm'>
            <Header />
            <div className='ReviewForm-container'>
                <h3>Review {lunch.title} here:</h3>
                <form onSubmit={handleSubmit}>
                    <textarea
                        className='ReviewForm-reviewTextArea'
                        name="reviewText"
                        id="reviewText"
                        placeholder="Enter comments here"
                        value={formData.reviewText}
                        onChange={handleChange}
                        required>
                    </textarea>
                    {formErrors.length ? <Alert messages={formErrors} /> : null}
                    <br></br>
                    <button type="submit" onSubmit={handleSubmit}>Submit review!</button>
                    {reviewAdded ? <Alert messages={["Review added successfully"]} /> : null}
                </form>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}

export default ReviewForm;