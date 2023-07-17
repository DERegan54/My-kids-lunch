import React, {useState, useContext, useEffect} from 'react';
import MklApi from '../api';
import UserContext from '../users/UserContext';
import {VscHeart} from "react-icons/vsc";
import {VscHeartFilled} from "react-icons/vsc";


const FavoriteCard = ({userFavoriteId}) => {
    const {currentUser, userFavoriteIds, isFavorited, addFavorite, removeFavorite} = useContext(UserContext);
    const [favorited, setFavorited] = useState();
    const [lunch, setLunch] = useState([]);

    useEffect(() => {
        async function getLunch() {
            let lunchRes = await MklApi.getLunch(userFavoriteId);
            setLunch(lunchRes);
        }
        getLunch();
    }, [userFavoriteId])

    useEffect(() => {
        setFavorited(isFavorited(userFavoriteId));
    }, [userFavoriteId, isFavorited])

    const currentUserFavorites = currentUser.favorites;
    

    const handleToggleFavorite = (evt) => {
        if (favorited) {
            removeFavorite(userFavoriteId);
            setFavorited(false);
            isFavorited(userFavoriteId);
        } else {
            addFavorite(userFavoriteId);
            setFavorited(true);
            isFavorited(userFavoriteId);
        }
    }
   
    console.log("lunch: ", lunch);
    console.log("favorited: ", favorited)
    console.log("isFavorited: ", isFavorited(userFavoriteId))

    return (
        <div className='FavoriteCard'>
            <div className='FavoriteCard-lunches'>
                <p>
                    <b>{`${lunch.title}`} </b>
                    {favorited || currentUserFavorites.includes(userFavoriteId) ? (
                        <VscHeartFilled onClick={handleToggleFavorite} />
                    ) : (
                        <VscHeart onClick={handleToggleFavorite} />  
                    )}  
                </p>
                <p>{`${lunch.description}`}</p>    
            </div>  
        </div>
    );
}

export default FavoriteCard;