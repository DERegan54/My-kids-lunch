import React, {useState, useEffect} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import MklApi from '../api';
import Header from '../common/Header';
import LunchFoodCardList from "./LunchFoodCardList";


const LunchDetails = () => {
    const {id} = useParams();
    const [lunch, setLunch] = useState([]);
    const [foods, setFoods] = useState([]);
    
    useEffect(() => {
        async function getLunch() {
            let lunchRes = await MklApi.getLunch(id);
            setLunch(lunchRes);
            setFoods(lunchRes.foods)
        }
        getLunch()
    }, [id]);  
    
    // console.log("foods: ", foods);
    // console.log("lunch: ", lunch);

    if (!lunch) <Redirect to="/"></Redirect> 

    return (
        <div className="LunchDetails">
            <Header />
            <h1 className='LunchDetails-header'> {lunch.title}</h1>
            <div className='LunchDetails-container'>
                <p><b>Description:</b> {lunch.description}</p>
                <p><b>Protein: </b> {lunch.protein}</p>
                <p><b>Carb: </b> {lunch.carb}</p>
                <p><b>Fruit: </b> {lunch.fruit}</p>
                <p><b>Vegetable: </b> {lunch.vegetable}</p>
                <p><b>Fat: </b> {lunch.fat}</p>
                <p><b>Sweet: </b> {lunch.sweet}</p>
                <p><b>Beverage: </b> {lunch.beverage}</p>
            </div>
            <br></br>
            <br></br>
            <h2 className='LunchDetails-foodList'>Nutrition Information For Lunch Items:</h2>
            <div className='LunchDetails-foods'>
                <LunchFoodCardList foods={foods} />
            </div>
        </div>
    );
}

export default LunchDetails;