import React from 'react';
import {render} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserContext from '../users/UserContext';
import LunchCard from '../lunches/LunchCard';

const user = {
  username: "testuser",
  firstName: "Test",
  lastName: "User",
  email: "testuser@email.com",
  diet: "standard",
  allergies: "none",
  preferences: "everything",
  aversions: "nothing",
}

const reviews = {
                id: 1,
                reviewText: 'delicous',
                lunchId: 1,
                username: "testuser1"
              }

// Smoke test
it('should render without crashing', function() {
  render(
    <BrowserRouter>
      <UserContext.Provider value={{currentUser:user, addFavorite:jest.fn(), removeFavorite:jest.fn(), userFavoriteIds:[] }}>
        <LunchCard lunch={{}} reviews={{reviews}} />
      </UserContext.Provider>
    </BrowserRouter>
  );  
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(
    <BrowserRouter>
        <LunchCard lunch={{}} reviews={{reviews}} setLunchReviews={jest.fn()} isFavorited={jest.fn()} addFavorite={jest.fn()} removeFavorite={jest.fn()} />
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot()
});