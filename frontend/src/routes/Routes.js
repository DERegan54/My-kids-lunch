import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from '../home-nav/Home';
import RegistrationForm from '../users/RegistrationForm';
import ProfileCard from '../users/ProfileCard';
import LoginForm from '../users/LoginForm';
import LunchList from '../lunches/LunchList';
import LunchDetails from '../lunches/LunchDetails';
import FoodList from '../foods/FoodList';
import LunchReviews from '../lunches/LunchReviews';
import UserFavoritesList from '../favorites/UserFavoritesList';
import ReviewForm from '../reviews/ReviewForm';
import ReviewUpdateForm from '../reviews/ReviewUpdateForm';
import ReviewList from '../reviews/ReviewList';
import AddLunchForm from '../lunches/AddLunchForm';
import AddFoodForm from '../foods/AddFoodForm';
import PrivateRoute from './PrivateRoute';


const Routes = ({   
                    allUsers,
                    lunches, 
                    reviews, 
                    foods, 
                    login, 
                    signup, 
                    addFood, 
                    addLunch, 
                    reviewLunch, 
                }) => {

    return (
        <div className='Routes'>
            <Switch>
                <Route exact path="/"><Home /></Route>
                <Route exact path="/register"><RegistrationForm signup={signup} lunches={lunches} /></Route>
                <Route exact path="/login"><LoginForm login={login} /></Route>
                <PrivateRoute exact path="/users/profile/"><ProfileCard /></PrivateRoute> 
                <PrivateRoute exact path="/users/favorites/"><UserFavoritesList /></PrivateRoute>
                <PrivateRoute exact path="/users/reviews"><ReviewList reviews={reviews} /></PrivateRoute>
                <PrivateRoute exact path="/users/reviews/:id/"><ReviewUpdateForm /></PrivateRoute>
                <PrivateRoute exact path="/lunches"><LunchList allUsers={allUsers} lunches={lunches} reviews={reviews} /></PrivateRoute>
                <PrivateRoute exact path="/lunches/:id/details"><LunchDetails /></PrivateRoute> 
                <PrivateRoute exact path="/lunches/:id/reviews"><LunchReviews reviews={reviews} /></PrivateRoute>
                <PrivateRoute exact path="/lunches/:id/addreview"><ReviewForm reviewLunch={reviewLunch}  /></PrivateRoute>
                <PrivateRoute exact path="/lunches/addlunch"><AddLunchForm addLunch={addLunch} /></PrivateRoute>
                <PrivateRoute exact path="/foods"><FoodList foods={foods} addLunch={addLunch} /></PrivateRoute>
                <PrivateRoute exact path="/foods/addfood"><AddFoodForm addFood={addFood} /></PrivateRoute>
                
                {/* <Redirect to="/"></Redirect> */}
            </Switch>
        </div>
    );
}

export default Routes;