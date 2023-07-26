import React, {useState} from 'react';
import FavoriteCard from './FavoriteCard';


const UserFavoriteCardList= ({favoriteIdsArr, removeFavorite, isFavorited}) => {
    
    
   
    //console.log("favoriteIdsArr: ", favoriteIdsArr)   
    
    return (
        <div className='UserFavoriteCardList'>
            {favoriteIdsArr.map((userFavoriteId) => (
                <div>
                    <FavoriteCard key={userFavoriteId} userFavoriteId={userFavoriteId} removeFavorite={removeFavorite} isFavorited={isFavorited} />
                </div>
            ))}
        </div>
    );
}

export default UserFavoriteCardList;