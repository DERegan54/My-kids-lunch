import React, {useState, useEffect, useContext} from 'react';
import {Link, useParams} from 'react-router-dom';
import Header from '../common/Header';
import Alert from '../common/Alert';
import UserContext from '../users/UserContext';
import MklApi from '../api';

const ReviewForm = () => {
    const {id} = useParams();
    const {currentUser} = useContext(UserContext);
    const initialState = {reviewText: "", userId: currentUser.id, lunchId: Number(id)}
    const [lunch, setLunch] = useState([]);
    const [title, setTitle] = useState([]);
    const [formData, setFormData] = useState(initialState)
    const [formErrors, setFormErrors] = useState([]);
    const [reviewAdded, setReviewAdded] = useState(false);
    
    useEffect(() => {
        async function getLunch() {
            let lunchRes = await MklApi.getLunch(id);
            setLunch(lunchRes);
            setTitle(lunchRes.title)
        }
        getLunch();
    }, [id]);

    const data = {
        reviewText: formData.reviewText,
        userId: currentUser.id,
        lunchId: lunch.id
    }

    console.log(data)

    // Handles form submit  
    async function handleSubmit(evt) {
        evt.preventDefault();
        let reviewRes = await MklApi.createReview(data);
        setReviewAdded(true);
        console.log(reviewRes)
        return reviewRes;
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
                <h3>Create a Review for {lunch.title} here:</h3>
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
                    <button type="submit" onSubmit={handleSubmit}><Link to={`/reviews`}>Submit review!</Link></button>
                    {reviewAdded ? <Alert messages={["Review added successfully"]} /> : null}
                </form>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}

export default ReviewForm;