import React from "react";
import LunchCard from '../lunches/LunchCard';


const Favorites = ({lunches, onFavoritedLunch}) => {
    const favoritedLunches = lunches.filter((lunch) => (lunch.favorite))

    const favoriteLunchCard = favoritedLunches.map((lunch) => (
        <LunchCard
            key={lunch.id}
            lunch={lunch}
            onFavoritedLunch={onFavoritedLunch}
        />
    ));
   
    return (
        <div className='Favorites'>
            <div>
                <h2 className="Favorites-header">My Favorite Lunches</h2>
            </div>
            <div>
                <ul className="Favorites-container">{favoriteLunchCard}</ul>
            </div>
        </div>
    );
}

export default Favorites;