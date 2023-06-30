import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import MklApi from '../api';


const LunchFoodCard = ({title}) => {
    const [food, setFood] = useState();

    useEffect(() => {
        async function getFood(title) {
        const food = await MklApi.getFood(title);
        setFood(food);
        }
        getFood();

    }, [id]);

    return (
        <div className='LunchFoodCard'>
            <h3>{`${food.title}`}</h3>
            <p><b>Serving Size: </b> {`${food.servingSize}`}</p>
            <p><b>Calories: </b>{`${food.calories}`}</p>
            <p><b>Fat: </b>{`${food.fat}`}</p>
            <p><b>Protein: </b>{`${food.protein}`}</p>
            <p><b>Carbohydrates: </b>{`${food.carbohydrates}`}</p>
            <p><b>Sugar: </b>{`${food.sugar}`}</p>
        </div>
    );
}

export default LunchFoodCard;