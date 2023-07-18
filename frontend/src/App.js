import React, {useState, useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import Navbar from './home-nav/Navbar';
import Routes from './routes/Routes'
import useLocalStorage from './UseLocalStorage';
import MklApi from './api';
import UserContext from './users/UserContext';
import jwt_decode from 'jwt-decode';
import "./App.css"

export const TOKEN_STORAGE_ID = "mkl-token";

function App() {
  const [userLoaded, setUserLoaded] = useState(false);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);
  const [reviews, setReviews] = useState(new Set([]));
  const [reviewIds, setReviewIds] = useState(new Set([]));
  const [lunches, setLunches] = useState([]);
  const [foods, setFoods] = useState([]);
  const [userFavoriteIds, setUserFavoriteIds] = useState(new Set([]));
  
  
  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let {username} = jwt_decode(token);
          MklApi.token = token;
          console.log(token)
          const currentUserRes = await MklApi.getUser(username);
          setCurrentUser(currentUserRes);
          setUserFavoriteIds(new Set(currentUserRes.favorites));
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


  useEffect(function getAllLunches () {
    async function search(title) {
        let lunches = await MklApi.getAllLunches(title);
        setLunches(lunches);
    };
    search()
  }, []);

  useEffect(() => {
    async function getAllReviews() {
        let reviewsRes = await MklApi.getAllReviews();
        setReviews(reviewsRes);
    }
    getAllReviews()
  }, []);

  useEffect(() => {
    async function getAllFoods(){
      let foodsRes = await MklApi.getAllFoods();
      setFoods(foodsRes);
    }
    getAllFoods();
  }, []);
    
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

  // Handles adding a food to db
  async function addFood(data) {
    try {
      let foodRes = await MklApi.createFood(data);
      console.log("foodRes: ", foodRes);
      return {success: true}
    } catch (errors) {
      console.error("food add failed", errors);
      return {success: false, errors}
    }
  }

  // Handles adding a lunch to db
  async function addLunch(data) {
    try{
      let lunchRes = await MklApi.createLunch(data);
      console.log("lunchRes: ", lunchRes);
      return {success: true};
    } catch (errors) {
      console.error("lunch add failed", errors);
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

  function isFavorited(id) {
    return userFavoriteIds && userFavoriteIds.has(id);
  }

  function addFavorite(id) {
    if (isFavorited(id)) return;
    MklApi.addFavorite(currentUser.username, id);
    setUserFavoriteIds(new Set([...userFavoriteIds, id]));
  }

  function removeFavorite(id) {
    if (!isFavorited(id)) return;
    MklApi.removeFavorite(currentUser.username, id);
    setUserFavoriteIds(new Set([...userFavoriteIds]));
  } 
   
  // console.log("currentUser: ", currentUser);
  // console.log("userFavoriteIds: ", userFavoriteIds);
  // console.log("lunches: ", lunches);
  // console.log("reviewIds: ", reviewIds);
  // console.log("foods: ", foods);
  // console.log("id: ", id)

  return ( 
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider
            value={{currentUser, setCurrentUser, userFavoriteIds, isFavorited, addFavorite, removeFavorite}}>
          <div className="App-container">
            <Navbar logout={logout} />
            <Routes 
              login={loginUser} 
              signup={registerUser} 
              review={reviewLunch} 
              addLunch={addLunch} 
              addFood={addFood} 
              reviews={reviews}
              lunches={lunches}
              foods={foods}
            />
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </div>  
  );
}

export default App;