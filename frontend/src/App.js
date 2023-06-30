import React, {useState, useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import Navbar from './home-nav/Navbar';
import Routes from './routes/Routes'
import useLocalStorage from './UseLocalStorage';
import MklApi from './api';
import UserContext from './users/UserContext';
import jwt_decode from 'jwt-decode';
import "./App.css"


export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [userLoaded, setUserLoaded] = useState(false);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState(new Set([]));

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let {id} = jwt_decode(token);
          MklApi.token = token;
          console.log(token)
          const currentUser = await MklApi.getUser(id);
          setCurrentUser(currentUser)
          setFavoriteIds(new Set(currentUser.applications));
        } catch (error) {
          console.error('App loadUser: problem loading', error)
          setCurrentUser(null)
        }
      }
      setUserLoaded(true);
    }
    setUserLoaded(false);
    getCurrentUser()
  }, [token]);

  // Handles user logout
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  // Handles user sign up
  async function registerUser(data) {
    try {
      let token = await MklApi.registerUser(data);
      setToken(token);
      return {success: true};
    } catch (errors) {
      console.error("signup failed", errors);
      return {success: false, errors}
    }
  }

  async function loginUser(data) {
    try {
      let token = await MklApi.loginUser(data);
      setToken(token);
      return {success: true};
    } catch (errors) {
      console.error("login failed", errors);
      return {success: false, errors};
    }
  }

  function hasFavoritedLunch(id) {
    return  favoriteIds && favoriteIds.has(id);

  }
  
  const addLunchToFavorites = (id) => {
    if(hasFavoritedLunch(id)) return;
    MklApi.addToFavorites(currentUser.username, id);
    setFavoriteIds(new Set([...favoriteIds, id]));
  }

  
  console.log(favoriteIds);

  return ( 
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider
            value={{currentUser, setCurrentUser, hasFavoritedLunch, addLunchToFavorites}}>
          <div className="App-container">
            <Navbar logout={logout} />
            <Routes login={loginUser} signup={registerUser} />
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </div>  
  );
}

export default App;