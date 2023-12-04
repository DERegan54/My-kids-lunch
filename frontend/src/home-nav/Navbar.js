import { useContext } from 'react';
import {Link, NavLink} from 'react-router-dom';
import UserContext from '../users/UserContext';
import './Navbar.css';


const Navbar = ({logout}) => {
    const {currentUser} = useContext(UserContext);

    const navIfLoggedIn = () => {
        return (
            <div className="Navbar-loggedIn">
                <span className='navBtnContainer'><NavLink className='navBtnLink' to="/"><button className='navBtn'>Home</button></NavLink></span>
                <span className='navBtnContainer'><NavLink className='navBtnLink' to="/lunches"><button className='navBtn'>Lunches</button></NavLink></span>
                <span className='navBtnContainer'><NavLink className='navBtnLink' to="/createlunch"><button className='navBtn'>My Kitchen</button></NavLink></span>
                <span className='navBtnContainer'><NavLink className='navBtnLink'  to="/users/reviews"><button className='navBtn'>My Reviews</button></NavLink></span>
                <span className='navBtnContainer'><NavLink className='navBtnLink' to="/users/favorites"><button className='navBtn'>My Favorites</button></NavLink></span>
                <span className='navBtnContainer'><NavLink className='navBtnLink' to="/users/profile/"><button className='navBtn'>My Profile</button></NavLink></span>
                <span className='navBtnContainer'><Link className='navBtnLink' to="/" onClick={logout}><button className='navBtn'>Log Out</button></Link></span>
            </div> 
        );
    }

    const navIfLoggedOut = () => {
        return (
            <div className='Navbar-loggedOut'>
                <span className='navBtnContainer'><NavLink className='navBtnLink'to="/"><button className='navBtn'>Home</button></NavLink></span>
                <span className='navBtnContainer'><NavLink className='navBtnLink' to="/login"><button className='navBtn'>Log In</button></NavLink></span>
                <span className='navBtnContainer'><NavLink className='navBtnLink'to="/register"><button className='navBtn'>Sign Up</button></NavLink></span>
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