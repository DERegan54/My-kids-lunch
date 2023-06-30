import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import Header from '../common/Header';
import Alert from '../common/Alert';
import MklApi from '../api';

const ReviewForm = ({id}) => {
    const initialState = {reviewText: "", userId: "", lunchId: ""}
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState([]);
    const [reviewAdded, setReviewAdded] = useState(false);
    const [lunch, setLunch] = useState([]);


    useEffect(() => {
        getLunch(id);
    }, [id]);

    async function getLunch(id) {
        let lunch = MklApi.getLunch(id);
        setLunch(lunch);
    }

    // Handles form submit
    async function handleSubmit(evt) {
        evt.preventDefault();
        let data = {reviewText: formData.reviewText};
        let review;
        try {
            review = await MklApi.createReview(data);
        } catch (errors) {
            setFormErrors(errors);
            return;
        }
        setFormData(data => ({...data}));
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
                <br></br>
                <form onSubmit={handleSubmit}>
                    <input 
                        className='ReviewForm-reviewTextInput'
                        type="text"
                        name="reviewText"
                        id="reviewText"
                        placeholder="Enter comments here"
                        value={formData.reviewText}
                        onChange={handleChange}
                        required>
                    </input>
                    {formErrors.length ? <Alert messages={formErrors} /> : null}
                    {reviewAdded ? <Alert messages={["Review added successfully"]} /> : null}
                    <button type="submit" onSubmit={handleSubmit}><Link to="/reviews">Submit review!</Link></button>
                </form>
            </div>
        </div>
    )
}

export default ReviewForm;