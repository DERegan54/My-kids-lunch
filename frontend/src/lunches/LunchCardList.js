import React from 'react';
import LunchCard from './LunchCard';

const LunchCardList = ({lunches}) => {
    return (
        <div className='LunchCardList'>
            <div className='LunchCardList-lunches'>
                {lunches.map(lunch => (
                    <LunchCard 
                        key={lunch.id}
                        id={lunch.id}
                        title={lunch.title}
                        description={lunch.description}
                        protein={lunch.protein}
                        carb={lunch.carb}
                        fruit={lunch.fruit}
                        vegetable={lunch.vegetable}
                        fat={lunch.fat}
                        sweet={lunch.sweet}
                        beverage={lunch.beverage}
                    />
                ))}
            </div>
        </div>
    );
}

export default LunchCardList;