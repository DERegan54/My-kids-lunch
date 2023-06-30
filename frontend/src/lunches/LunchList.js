import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import MklApi from '../api';
import SearchForm from '../common/SearchForm';
import LunchCardList from './LunchCardList';


const LunchList = () => {
    const [lunches, setLunches] = useState([]);

    useEffect(function getAllLunches () {
        search()
    }, []);

    async function search(title) {
        let lunches  = await MklApi.getAllLunches(title);
        setLunches(lunches);
    };

    console.log(lunches);

    if (!lunches) <Redirect to="/"></Redirect>

    return (
        <div className='LunchList'>
            <SearchForm searchTerm={search} />
            <br></br>
       
            <h2>Lunches:</h2>
                <div className='LunchList-lunches'>
                    <LunchCardList lunches={lunches} />
                </div>        
        </div>
    );
}

export default LunchList;