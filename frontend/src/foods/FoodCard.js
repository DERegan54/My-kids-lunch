import React from 'react';

const FoodCard = ({food}) => {
    const {foodTitle, servingSize, category, calories, fatContent, proteinContent, carbohydrates, sugar} = food;
   
    return (
        <div className="FoodCard">
            <h2>{`${foodTitle}`}</h2>
            <p><b>Category: </b>{`${category}`}</p>
            <p><b>Serving Size: </b> {`${servingSize}`}</p>
            <p><b>Calories:</b> {`${calories}`}</p>
            <p><b>Fat: </b>{`${fatContent}`} grams</p>
            <p><b>Protein: </b>{`${proteinContent}`} grams</p>
            <p><b>Carbohydrates: </b>{`${carbohydrates}`} grams</p>
            <p><b>Sugar: </b>{`${sugar}`} grams</p>
            <button className='FoodCard-addToLunchButton' >Add To Lunch</button>
            <br></br>
        </div>
    );
}

export default FoodCard;