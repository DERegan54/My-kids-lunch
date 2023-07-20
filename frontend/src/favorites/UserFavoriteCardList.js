import React, {useState} from 'react';
import FavoriteCard from './FavoriteCard';


const UserFavoriteCardList= ({favoriteIdsArr, removeFavorite}) => {
    const [showFavorite, setShowFavorite] = useState(true);
    
   
    //console.log("favoriteIdsArr: ", favoriteIdsArr)   
    
    return (
        <div className='UserFavoriteCardList'>
            {favoriteIdsArr.map((userFavoriteId) => (
                <div>
                    {showFavorite ?
                        <FavoriteCard key={userFavoriteId} userFavoriteId={userFavoriteId} removeFavorite={removeFavorite} setShowFavorite={setShowFavorite} />
                    : null}
                </div>
            ))}
        </div>
    );
}

export default UserFavoriteCardList;