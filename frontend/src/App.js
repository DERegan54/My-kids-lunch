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
  const [reviewIds, setReviewIds] = useState(new Set([]));
  // const [lunches, setLunches] = useState(new Set([]));
  
  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let {username} = jwt_decode(token);
          MklApi.token = token;
          console.log(token)
          const currentUser = await MklApi.getUser(username);
          setCurrentUser(currentUser);
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

  // useEffect(() => {
  //   async function getLunches() {
  //     let lunchesRes = await MklApi.getAllLunches();
  //     setLunches(lunchesRes);
  //   }
  //   getLunches();
  // }, []);

  // console.log(lunches)

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

  function hasReviewedLunch(id) {
    return reviewIds && reviewIds.has(id);
  }
  
  async function reviewLunch (data) {
    if (hasReviewedLunch(true)) return;
    try {
      let reviewData = await MklApi.createReview(data);
      setReviewIds(new Set([...reviewIds, reviewData.id]));
      return {success: true};
    } catch (errors) {
      console.error("review failed", errors);
      return {success: false, errors};
    }
  }

  return ( 
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider
            value={{currentUser, setCurrentUser, reviewLunch, hasReviewedLunch}}>
          <div className="App-container">
            <Navbar logout={logout} />
            <Routes login={loginUser} signup={registerUser} review={reviewLunch} />
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </div>  
  );
}

export default App;