import React, {useContext} from 'react';
import {Link, NavLink} from 'react-router-dom';
import UserContext from '../users/UserContext';

const Navbar = ({logout}) => {
    const {currentUser} = useContext(UserContext);

    const navIfLoggedIn = () => {
        return (
            <div className="Navbar-loggedIn">
                <span><button><NavLink to="/">Home</NavLink></button></span>
                <span><button><NavLink to="/lunches">Lunches</NavLink></button></span>
                <span><button><NavLink to="/foods">Food Items</NavLink></button></span>
                <span><button><NavLink to="/reviews">Reviews</NavLink></button></span>
                <span><button><NavLink to="/profile/favorites">{currentUser.firstName || currentUser.username}'s Favorites</NavLink></button></span>
                <span><button><NavLink to="/profile">{currentUser.firstName || currentUser.username}'s Profile</NavLink></button></span>
                <span><button><Link to="/" onClick={logout}>Log Out</Link></button></span>
            </div> 
        );
    }

    const navIfLoggedOut = () => {
        return (
            <div className='Navbar-loggedOut'>
                <span><button><NavLink to="/">Home</NavLink></button></span>
                <span><button><NavLink to="/login">Log In</NavLink></button></span>
                <span><button><NavLink to="/register">Sign Up</NavLink></button></span>
            </div>
        );
    }

    return (
        <div className='Navbar'>
            {currentUser ? navIfLoggedIn() : navIfLoggedOut()}
        </div>
    );
}

export default Navbar;