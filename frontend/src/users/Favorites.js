import React, {useState, useEffect, useContext} from "react";
import LunchCard from "../lunches/LunchCard";
import UserContext from "./UserContext";
import MklApi from "../api";


const Favorites = () => {
    const {currentUser} = useContext(UserContext);
    const [lunches, setLunches] = useState([]);
    
    useEffect(() => {
        async function getLunches() {
            let lunchesRes = await MklApi.getAllLunches();
            setLunches(lunchesRes);
        }
        getLunches()
    }, [])
    
    console.log("lunches: ", lunches)
    let favoriteLunches = [];

    const getFavoriteLunches = (lunches) => {
        for(let i of lunches) {
            if(i.favorite === true) {
                favoriteLunches.push(i);
            }
            console.log(favoriteLunches) 
            return favoriteLunches;
        }
    }
    getFavoriteLunches(lunches)
       
    
    console.log("favoriteLunches:", favoriteLunches)
   
    return (
        <div className='Favorites'>
            <div>
                <h2 className="Favorites-header">My Favorite Lunches</h2>
                <div className='Favorites-lunches'>
                    {favoriteLunches.map((favoriteLunch) => ( 
                        <ul>
                            <LunchCard
                                key={favoriteLunch.id}
                                title={favoriteLunch.title}
                                description={favoriteLunch.description}
                                protein={favoriteLunch.protein}
                                carb={favoriteLunch.carb}
                                fruit={favoriteLunch.fruit}
                                vegetable={favoriteLunch.vegetable}
                                fat={favoriteLunch.fat}
                                sweet={favoriteLunch.sweet}
                                beverage={favoriteLunch.beverage}
                                favorite={favoriteLunch.favorite}
                            />
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Favorites;