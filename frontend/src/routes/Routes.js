import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from '../home-nav/Home';
import RegistrationForm from '../users/RegistrationForm';
import ProfileCard from '../users/ProfileCard';
import LoginForm from '../users/LoginForm';
import LunchList from '../lunches/LunchList';
import LunchNutrition from '../lunches/LunchNutrition';
import FoodList from '../foods/FoodList';
import FoodDetail from '../foods/FoodDetail';
import LunchReviews from '../lunches/LunchReviews';
import Favorites from '../users/Favorites';
import ReviewForm from '../reviews/ReviewForm';
import AddLunchForm from '../lunches/AddLunchForm';
import ReviewList from '../reviews/ReviewList';
import PrivateRoute from './PrivateRoute';


const Routes = ({login, signup, review, favorite}) => {

    return (
        <div className='Routes'>
            <Switch>

                <Route exact path="/"><Home /></Route>
                <Route exact path="/register"><RegistrationForm signup={signup} /></Route>
                <Route exact path="/login"><LoginForm login={login} /></Route>
                <PrivateRoute exact path="/users/profile/"><ProfileCard /></PrivateRoute> 
                <PrivateRoute exact path="/favorites/"><Favorites /></PrivateRoute>
                <PrivateRoute exact path="/lunches"><LunchList /></PrivateRoute>
                <PrivateRoute exact path="/lunches/:id/nutrition"><LunchNutrition /></PrivateRoute> 
                <PrivateRoute exact path="/lunches/:id/reviews"><LunchReviews /></PrivateRoute>
                <PrivateRoute exact path="/lunches/:id/addreview"><ReviewForm  /></PrivateRoute>
                <PrivateRoute exact path="/foods"><FoodList /></PrivateRoute>
                <PrivateRoute exact path="/foods/:id"><FoodDetail /></PrivateRoute>
                <PrivateRoute exact path="/lunches/addlunch"><AddLunchForm /></PrivateRoute>
                <PrivateRoute exact path="/reviews"><ReviewList /></PrivateRoute>
                {/* <PrivateRoute exact path="/reviews/:id"><ReviewForm /></PrivateRoute> */}
                 
                <Redirect to="/"></Redirect>

            </Switch>
        </div>
    );
}

export default Routes;