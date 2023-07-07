import React, {useState, useEffect, useContext} from "react";
import FavoriteCard from "./FavoriteCard";
import UserContext from "../users/UserContext";
import MklApi from "../api";


const UserFavoritesList = () => {
    const {lunches, currentUser} = useContext(UserContext);
    const [favorites, setFavorites] = useState([]);
    const [favoriteLunches, setFavoriteLunches] = useState([]);
    
    useEffect(() => {
        async function getUserFavorites() {
            let favoritesRes = await MklApi.findAllFavoritesOnUser(currentUser.id);
            setFavorites(favoritesRes);
        }
        getUserFavorites()
    }, [currentUser.id]);
    
    console.log("lunches: ", lunches)
    console.log("favorites: ", favorites);

    let favoriteLunchesArray = []
    function getFavoriteLunches(favorites) {
        for(let favorite of favorites) {
            if (favorite.isFavorite === true) { 
                favoriteLunchesArray.push(favorite);
            }
        }
        return favoriteLunchesArray;
    }
    
    useEffect(() => {
        let favoriteLunches = getFavoriteLunches(favorites);
        setFavoriteLunches(favoriteLunches)
    }, [favorites])
    
   console.log("favoriteLunches: ", favoriteLunches)
   

   
    return (
        <div className='Favorites'>
            <div>
                <h2 className="Favorites-header">My Favorite Lunches</h2>
                <div className='Favorites-lunches'>
                   {favoriteLunches.map((favorite) => ( 
                        <ul>
                            <FavoriteCard favorite={favorite} />
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserFavoritesList;