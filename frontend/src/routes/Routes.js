import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from '../home-nav/Home';
import RegistrationForm from '../users/RegistrationForm';
import Profile from '../users/Profile';
import LoginForm from '../users/LoginForm';
import LunchList from '../lunches/LunchList';
import LunchDetail from '../lunches/LunchDetail';
import FoodList from '../foods/FoodList';
import FoodDetail from '../foods/FoodDetail';
import ReviewList from '../reviews/ReviewList';
import ReviewDetail from '../reviews/ReviewDetail';
import PrivateRoute from './PrivateRoute';


const Routes = ({login, signup}) => {

    return (
        <div className='Routes'>
            <Switch>
                <Route exact path="/"><Home /></Route>
                <Route exact path="/register"><RegistrationForm signup={signup} /></Route>
                <Route exact path="/login"><LoginForm login={login} /></Route>
                <Route exact path="/profile"><Profile /></Route>
                <Route exact path="/lunches"><LunchList /></Route>
                <Route exact path="/lunches/:id"><LunchDetail /></Route>
                <Route exact path="/foods"><FoodList /></Route>
                <Route exact path="/foods/:id"><FoodDetail /></Route>
                <Route exact path="/reviews"><ReviewList /></Route>
                <Route exact path="/reviews/:id"><ReviewDetail /></Route>
                {/* <PrivateRoute exact path="/profile"><Profile /></PrivateRoute>
                <PrivateRoute exact path="/lunches"><LunchList /></PrivateRoute>
                <PrivateRoute exact path="/lunches/:id"><LunchDetail /></PrivateRoute>
                <PrivateRoute exact path="/foods"><FoodList /></PrivateRoute>
                <PrivateRoute exact path="/foods/:id"><FoodDetail /></PrivateRoute>
                <PrivateRoute exact path="/reviews"><ReviewList /></PrivateRoute>
                <PrivateRoute exact path="/reviews/:id"><ReviewDetail /></PrivateRoute> */}
                <Redirect to="/"></Redirect>
            </Switch>
        </div>
    );
}

export default Routes;