import React, {useState, useEffect} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import MklApi from '../api';
import Header from '../common/Header';
import LunchCard from "./LunchCard";
import LunchFoodCardList from "./LunchFoodCardList";

const LunchDetail = () => {
    const {id} = useParams();
    const [lunch, setLunch] = useState([]);
    const [foods, setFoods] = useState([]);

    console.log(foods);

    useEffect(() => {
        async function getLunch() {
            let lunch = await MklApi.getLunch(id);
            setLunch(lunch);
            setFoods(lunch.foods);
        }
        getLunch();
    }, [id]);

    // if (!lunch) <Redirect to="/"></Redirect> 

    return (
        <div className="LunchDetail">
            <Header />
            <br></br>
            <div className='LunchDetail-foods'>
                <LunchFoodCardList foods={foods} />
            </div>
        </div>
    );
}

export default LunchDetail;