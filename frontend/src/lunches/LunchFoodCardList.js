import React, {useState, useEffect} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import FoodCard from "../foods/FoodCard";
import MklApi from '../api';

const LunchFoodCardList = ({id}) => {
    const [lunch, setLunch] = useState();
    const [foods, setFoods] = useState([]);
    

    useEffect(() => {
        async function getLunch() {
            let lunch = MklApi.getLunch(id);
            setLunch(lunch)
            setFoods(lunch.foods);
        }
        getLunch();
        
    }, [id]);

    return (
        <div className='LunchFoodCardList'>
            {foods.map(food => (
                <FoodCard
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