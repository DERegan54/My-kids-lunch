import React from 'react';

const FoodCard = ({title, servingSize, calories, fat, protein, carbohydrates, sugar, lunchId}) => {
    return (
        <div className="FoodCard">
            <h2>{`${title}`}</h2>
            <p><b>Serving Size: </b> {`${servingSize}`}</p>
            <p><b>Calories:</b> {`${calories}`}</p>
            <p><b>Fat: </b>{`${fat}`} grams</p>
            <p><b>Protein: </b>{`${protein}`} grams</p>
            <p><b>Carbohydrates: </b>{`${carbohydrates}`} grams</p>
            <p><b>Sugar: </b>{`${sugar}`} grams</p>
            <br></br>
            <hr></hr>
        </div>
    );
}

export default FoodCard;