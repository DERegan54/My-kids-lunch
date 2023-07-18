import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import MklApi from '../api';
import UserContext from '../users/UserContext';
import ReviewUpdateForm from './ReviewUpdateForm';

const ReviewCard = ({userReview}) => {
    const {currentUser} = useContext(UserContext);
    const [lunch, setLunch] = useState([])

   

    useEffect(() => {
        async function getLunch() {
            let lunchRes = await MklApi.getLunch(userReview.lunchId);
            setLunch(lunchRes);
        }
        getLunch();
    }, [userReview.lunchId])

    async function handleDelete(evt) {
        evt.preventDefault();
        try {
            await MklApi.removeReview(userReview.id);
        } catch (errors) {
            console.error(errors);
        }
    }

    let id = userReview.id
    
    console.log("lunch: ", lunch);
    console.log("review id: ", userReview.id);
    console.log("userReview: ", userReview)
    console.log("userReview.lunchId: ", userReview.lunchId)

    return (
        <div className='ReviewCard'>
            <div className='ReviewCard-container'>
                <div className='ReviewCard-comments'>
                    <p><b>Lunch: </b>{lunch.title}</p>
                    <p><b>Review comments: </b>{`${userReview.reviewText} `} </p>
                </div>
                <button classname='ReviewCard-updateButton'><Link to={`/users/reviews/${id}`}>Update this Review</Link></button>   
                <button className='ReviewCard-deleteButton' onClick={handleDelete}>Delete {lunch.title} Review</button>
            </div>
        </div>
    )
}

export default ReviewCard;