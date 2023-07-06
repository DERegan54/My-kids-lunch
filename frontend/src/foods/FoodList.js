import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import SearchForm from '../common/SearchForm';
import MklApi from '../api';
import Header from '../common/Header';
import FoodCardList from './FoodCardList';

const FoodList = () => {
    const [foods, setFoods] = useState([]);

    useEffect(function getAllFoods() {
        search();
    }, []);

    async function search(title) {
        let foods = await MklApi.getAllFoods(title);
        setFoods(foods)
    }

    console.log(foods);

    if (!foods) <Redirect to='/'></Redirect>

    return (
        <div className='FoodList'>
            <Header />
            <SearchForm searchTerm={search} />
            <br></br>
            <hr></hr>
            <h1 className='FoodList-header'>Foods: </h1>
                <div className='FoodList-foods'>
                    <FoodCardList foods={foods} />
                </div>
        </div>
    );
}

export default FoodList;