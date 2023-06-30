import React, {useState, useEffect} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import LunchFoodCard from "../lunches/LunchFoodCard";
import MklApi from '../api';

const LunchFoodCardList = ({foods}) => {
    return (
        <div className='LunchFoodCardList'>
            {foods.map(food => (
                <LunchFoodCard
                    key={food.id}
                    id={food.id}
                    title={food.title}
                    servingSize={food.servingSize}
                    calories={food.calories}
                    fat={food.fat}
                    protein={food.protein}
                    carbohydrates={food.carbohydrates}
                    sugar={food.sugar}
                />
            ))}
        </div>
    );
} 

export default LunchFoodCardList;