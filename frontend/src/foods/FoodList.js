import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import SearchForm from '../common/SearchForm';
import MklApi from '../api';
import FoodCardList from './FoodCardList';

const FoodList = () => {
    const [foods, setFoods] = useState([]);

    async function search(title) {
        let foods = await MklApi.getFood(title);
        setFoods(foods)
    }

    useEffect(function getAllFoods() {
        search();
    }, []);

    console.log(foods);

    // if (!foods) <Redirect to='/'></Redirect>

    return (
        <div className='FoodList'>
            <SearchForm searchTerm={search} />
            <h2 className='FoodList-h2'>All Foods: </h2>
            {foods.length 
                ? <FoodCardList foods={foods} />
                : <p>Sorry, no results were found with those search terms.</p>  
            }
        </div>
    );
}

export default FoodList;