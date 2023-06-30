import React from 'react';
import {Link} from 'react-router-dom';

const FoodCard = ({id, title, category}) => {
    return (
        <div className="FoodCard">
            <p>{`${title}`}</p>
            <p>{`${category}`}</p>
            <Link to={`/foods/${title}`}><button>See nutrition info for {`${title}`}</button> </Link>
            <hr></hr>
        </div>
    );
}

export default FoodCard;