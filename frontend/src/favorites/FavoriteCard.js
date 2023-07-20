import React, {useState, useEffect} from 'react';
import MklApi from '../api';
import {VscHeartFilled} from "react-icons/vsc";


const FavoriteCard = ({userFavoriteId, removeFavorite, setShowFavorite}) => {
    const [lunch, setLunch] = useState([]);
    const [favorited, setFavorited] = useState(true);
    
    useEffect(() => {
        async function getLunch() {
            let lunchRes = await MklApi.getLunch(userFavoriteId);
            setLunch(lunchRes);
        }
        getLunch();
    }, [userFavoriteId])
   
    async function handleRemoveFavorite(evt) {
        if (!favorited) return;
        removeFavorite(userFavoriteId);
        setFavorited(false);
        setShowFavorite(false);
    }

    return (
        <div className='FavoriteCard'>
            <p>
                <b>{`${lunch.title}`} </b>
                <VscHeartFilled />
            </p>
            <p>{`${lunch.description}`}</p>   
            <button onClick={handleRemoveFavorite}>Remove from Favorites</button>    
        </div>
    );
}

export default FavoriteCard;