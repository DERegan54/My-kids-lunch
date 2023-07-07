import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import MklApi from '../api';
import UserContext from '../users/UserContext';
import {VscHeart} from "react-icons/vsc";
import {VscHeartFilled} from "react-icons/vsc";


const FavoriteCard = ({favorite}) => {
    const {lunchId} = favorite;
    const {lunches, currentUser} = useContext(UserContext);
    const [lunch, setLunch] = useState([]);
   
    console.log("lunches: ", lunches )
    console.log("favorite: ", favorite)
    console.log("lunchId: ", lunchId);
    

    let favoriteLunch;
    // useEffect(() => {
    //     function getLunch(lunches) {
    //         favoriteLunch = lunches.map((lunch) => (lunch.id === lunchId))
    //         return favoriteLunch;
    //     }
    //     getLunch()
    //     setLunch(favoriteLunch);
    // }, [lunches]);

    // useEffect(() => {
    //     function getLunch(lunches) {
    //         for(let lunch of lunches) {
    //             if (lunch.id === lunchId) {
    //                 favoriteLunch = lunch;
    //             }
    //             return favoriteLunch;
    //         }    
    //     }
    //     getLunch()
    //     setLunch(favoriteLunch);
    // }, [lunches]);

    useEffect(() => {
        async function getLunch() {
            let lunchRes = await MklApi.getLunch(lunchId);
            setLunch(lunchRes)
        }
        getLunch();
    }, [lunchId]);
    

    console.log("lunch: ", lunch);

    



    // useEffect(() => {
    //     favoriteLunch = getFavoriteLunch(lunches);
    //     setFavoriteLunch(favoriteLunch);
    // }, [lunches]);
    
    // console.log("favoriteLunch: ", favoriteLunch);

    // console.log(title)

    // const handleFavoritedChange = () => {
    //     let data = {favorite: !favorite};
    //     MklApi.updateLunch(id, data);
    //     setIsFavorited(isFavorited => !isFavorited);
    // }

    // console.log(isFavorited);

    return (
        <div className='FavoriteCard'>
            <div className='FavoriteCard-lunches'>
                <p>
                    <b>{`${lunch.title}`} </b>
                    {/* {isFavorited ? (
                        <VscHeartFilled />
                    ) : (
                        <VscHeart />  
                    )}   */}
                </p>
                <p>{`${lunch.description}`}</p>    
            </div>
            <hr></hr>            
        </div>
    );
}

export default FavoriteCard;