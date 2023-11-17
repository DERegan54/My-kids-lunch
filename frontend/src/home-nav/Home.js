import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import Header from '../common/Header';
import UserContext from '../users/UserContext'
import './Home.css';


const Home = () => {
    const {currentUser} = useContext(UserContext);
    
    // console.log("currentUser: ", currentUser);
    
    const homeIfLoggedIn = () => {
        return (
            <div className='Home-loggedIn'>
                <h1>Welcome, {currentUser.firstName || currentUser.username}!</h1>
                <h2>What's for lunch today?</h2>
            </div>
        );
    }

    const homeIfLoggedOut = () => {
        return (
            <div className='Home-loggedOut'>
                <br></br>
                <br></br>
                <h2>New around here?</h2>
                <button className='navBtn home'><Link className='navBtnLink' to="/register">Sign Up!</Link></button>
                <br></br>
                <br></br>
                <h2>Let's pack some lunches!</h2>
                <button className='navBtn home'><Link className='navBtnLink' to="/login">Log In!</Link></button>
            </div>
        );
    }

    return (
        <div className="Home">
            <div className="home-container">
                <Header />
                {currentUser ? homeIfLoggedIn() : homeIfLoggedOut()}
            </div>
        </div>
    );
}

export default Home;