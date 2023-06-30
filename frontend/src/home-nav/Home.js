import React, {useState, useEffect, useContext} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Header from '../common/Header';
import UserContext from '../users/UserContext'


const Home = () => {
    const {currentUser} = useContext(UserContext);
    
    const homeIfLoggedIn = () => {
        return (
            <div className='Home-loggedIn'>
                <Header />
                <h2>Welcome, {currentUser.firstName || currentUser.username}!</h2>
                <h4>What's for Lunch?</h4>
            </div>
        );
    }

    const homeIfLoggedOut = () => {
        return (
            <div className='Home-loggedOut'>
                <Header />
                <br></br>
                <br></br>
                <h3>New around here?</h3>
                <button><Link to="/register">Sign Up Here!</Link></button>
                <br></br>
                <br></br>
                <h3>Let's pack some lunches!</h3>
                <button><Link to="/login">Log In Here!</Link></button>
            </div>
        );
    }

    return (
//         <div className='Home-loggedIn'>
//         <Header />
//         <h2>Welcome, Danielle!</h2>
//         <h4>What's for Lunch?</h4>
//     </div>
//     );
// }

        <div className="Home">
            <div className="Home-container">
                {currentUser ? homeIfLoggedIn() : homeIfLoggedOut()}
            </div>
        </div>
    );
}

export default Home;