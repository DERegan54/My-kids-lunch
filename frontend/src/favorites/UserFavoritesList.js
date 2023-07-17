import React, {useContext, useState, useEffect} from "react";
import FavoriteCard from "./FavoriteCard";
import UserContext from "../users/UserContext";
import Header from "../common/Header";

const UserFavoritesList = () => {
    const {currentUser, userFavoriteIds, addFavorite, removeFavorite, isFavorited} = useContext(UserContext);
    
    console.log("userFavoriteIds: ", userFavoriteIds);

    return (
        <div className='UserFavoritesList'>
            <div>
                <Header />
                <br></br>
                <br></br>
                <h1 className="UserFavoritesList-header"> {currentUser.firstName|| currentUser.username}'s Favorite Lunches:</h1>
                <div className='UserFavoritesList-lunches'>
                   {[...userFavoriteIds].map((userFavoriteId) => ( 
                        <ul>
                            <FavoriteCard key={userFavoriteId} userFavoriteId={userFavoriteId} addFavorite={addFavorite} removeFavorite={removeFavorite} />
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserFavoritesList;