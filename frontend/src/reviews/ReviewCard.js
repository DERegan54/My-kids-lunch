import React, {useState, useEffect, useContext} from 'react';
import MklApi from '../api';
import ReviewUpdateForm from './ReviewUpdateForm';

const ReviewCard = ({userReview}) => {
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
    
    // console.log("review: ", review);
    // console.log("lunch: ", lunch);
    // console.log("review: ", review);

    return (
        <div className='ReviewCard'>
            <div className='ReviewCard-container'>
                <div className='ReviewCard-comments'>
                    <p><b>Lunch: </b>{lunch.title}</p>
                    <p><b>Review comments: </b>{`${userReview.reviewText} `} </p>
                </div>
                   
                <div className='ReviewCard-updateForm'>
                    <ReviewUpdateForm userReview={userReview} />
                </div>
                <button className='ReviewCard-deleteButton' onClick={handleDelete}>Delete {lunch.title} Review</button>
            </div>
        </div>
    )
}

export default ReviewCard;