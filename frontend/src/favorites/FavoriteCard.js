
import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import MklApi from '../api';
import UserContext from '../users/UserContext';
import {VscHeart} from "react-icons/vsc";
import {VscHeartFilled} from "react-icons/vsc";


const FavoriteCard = ({favorite}) => {
    const {lunchId} = favorite;
    const [lunch, setLunch] = useState([]);
    const [isFavorited, setIsFavorited] = useState(true);
   
    console.log("favorite: ", favorite)
    console.log("lunchId: ", lunchId);


    useEffect(() => {
        async function getLunch() {
            let lunchRes = await MklApi.getLunch(lunchId);
            setLunch(lunchRes)
        }
        getLunch();
    }, [lunchId]);
    

    console.log("lunch: ", lunch);

    return (
        <div className='FavoriteCard'>
            <div className='FavoriteCard-lunches'>
                <p>
                    <b>{`${lunch.title}`} </b>
                    {isFavorited ? (
                        <VscHeartFilled />
                    ) : (
                        <VscHeart />  
                    )}  
                </p>
                <p>{`${lunch.description}`}</p>    
            </div>  
        </div>
    );
}

export default FavoriteCard;