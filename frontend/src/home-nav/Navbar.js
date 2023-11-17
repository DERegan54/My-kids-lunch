import { useContext } from 'react';
import {Link, NavLink} from 'react-router-dom';
import UserContext from '../users/UserContext';
import './Navbar.css';


const Navbar = ({logout}) => {
    const {currentUser} = useContext(UserContext);

    const navIfLoggedIn = () => {
        return (
            <div className="Navbar-loggedIn">
                <span className='navBtnContainer'><button className='navBtn'><NavLink className='navBtnLink' to="/">Home</NavLink></button></span>
                <span className='navBtnContainer'><button className='navBtn'><NavLink className='navBtnLink' to="/lunches">Lunches</NavLink></button></span>
                <span className='navBtnContainer'><button className='navBtn'><NavLink className='navBtnLink' to="/createlunch">My Kitchen</NavLink></button></span>
                <span className='navBtnContainer'><button className='navBtn'><NavLink className='navBtnLink'  to="/users/reviews">My Reviews</NavLink></button></span>
                <span className='navBtnContainer'><button className='navBtn'><NavLink className='navBtnLink' to="/users/favorites">My Favorites</NavLink></button></span>
                <span className='navBtnContainer'><button className='navBtn'><NavLink className='navBtnLink' to="/users/profile/">My Profile</NavLink></button></span>
                <span className='navBtnContainer'><button className='navBtn'><Link className='navBtnLink' to="/" onClick={logout}>Log Out</Link></button></span>
            </div> 
        );
    }

    const navIfLoggedOut = () => {
        return (
            <div className='Navbar-loggedOut'>
                <span className='navBtnContainer'><button className='navBtn'><NavLink className='navBtnLink'to="/">Home</NavLink></button></span>
                <span className='navBtnContainer'><button className='navBtn'><NavLink className='navBtnLink' to="/login">Log In</NavLink></button></span>
                <span className='navBtnContainer'><button className='navBtn'><NavLink className='navBtnLink'to="/register">Sign Up</NavLink></button></span>
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