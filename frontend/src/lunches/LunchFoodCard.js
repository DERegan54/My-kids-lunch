import React from 'react';
import {useParams} from 'react-router-dom';

const LunchFoodCard = ({title, servingSize, calories, fat, protein, carbohydrates, sugar, lunchId}) => {
   
    return (
        <div className='LunchFoodCard'>
            <div className='LunchFoodCard-foods'>
                <p><b>Item: </b> {`${title}`}</p>
                <p><b>Serving Size: </b> {`${servingSize}`}</p>
                <p><b>Calories:</b> {`${calories}`}</p>
                <p><b>Fat: </b>{`${fat}`} grams</p>
                <p><b>Protein: </b>{`${protein}`} grams</p>
                <p><b>Carbohydrates: </b>{`${carbohydrates}`} grams</p>
                <p><b>Sugar: </b>{`${sugar}`} grams</p>
                <br></br>
            </div>
            <hr></hr>
        </div>
    );
}

export default LunchFoodCard;