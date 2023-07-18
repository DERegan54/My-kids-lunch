import React, {useState, useContext, useEffect} from 'react';
import MklApi from '../api';
import UserContext from '../users/UserContext';
import {VscHeart} from "react-icons/vsc";
import {VscHeartFilled} from "react-icons/vsc";


const FavoriteCard = ({userFavoriteId}) => {
    const {isFavorited, addFavorite, removeFavorite} = useContext(UserContext);
    const [lunch, setLunch] = useState([]);
    const initialState = isFavorited(userFavoriteId);
    const [favorited, setFavorited] = useState(initialState);

    useEffect(() => {
        async function getLunch() {
            let lunchRes = await MklApi.getLunch(userFavoriteId);
            setLunch(lunchRes);
        }
        getLunch();
    }, [userFavoriteId])
   
    async function handleAddFavorite(evt) {
        if(favorited) return;
        addFavorite(userFavoriteId);
        setFavorited(true);
    }

    async function handleRemoveFavorite(evt) {
        if(!isFavorited) return;
        removeFavorite(userFavoriteId);
        setFavorited(false);
    }

    return (
        <div className='FavoriteCard'>
            <div className='FavoriteCard-lunches'>
                <p>
                    <b>{`${lunch.title}`} </b>
                    {favorited ? (
                        <VscHeartFilled onClick={handleRemoveFavorite} />
                    ) : (
                        <VscHeart onClick={handleAddFavorite} />  
                    )}  
                </p>
                <p>{`${lunch.description}`}</p>    
            </div>  
        </div>
    );
}

export default FavoriteCard;