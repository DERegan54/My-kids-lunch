import React, {useState, useEffect, useContext} from 'react';
import {Redirect} from 'react-router-dom';
import MklApi from '../api';
import SearchForm from '../common/SearchForm';
import UserContext from '../users/UserContext';
import LunchCard from './LunchCard';
import Header from '../common/Header';

const LunchList = ({reviews}) => {
    const [lunches, setLunches] = useState([]);

    async function search(title) {
        let lunches = await MklApi.getAllLunches(title);
        setLunches(lunches);
    };

    useEffect (function getAllLunches() {
        search();
    }, []);

    // console.log("id: ", id);
    // console.log("lunches: ", lunches);
    // console.log("reviews: ", reviews);
    // console.log("favorites: ", favorites);
    // console.log("userFavorites: ", userFavorites);
    
    if (!lunches) <Redirect to="/"></Redirect>

    return (
        <div className='LunchList'>
            <Header />
            <br></br>
            <br></br>
            <h1 className='LunchList-header'>Lunches:</h1>
            {lunches.length
                ? (
                    <div className='LunchList-lunches'>
                        {lunches.map((lunch) => (
                            <LunchCard  key={lunch.id} 
                                        lunch={lunch} 
                                        reviews={reviews} 
                            />
                        ))}
                    </div> 
                ) : (
                    <h4>Sorry, no lunches with that search term found.</h4>
            )}         
        </div>
    );
}

export default LunchList;