import React from 'react';
import {render} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserContext from '../users/UserContext';
import ReviewCard from '../reviews/ReviewCard';


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

// Smoke test
it('should render without crashing', function() {
  render(
    <BrowserRouter>
      <UserContext.Provider value={{currentUser: user}}>
        <ReviewCard userReview={{}} />
      </UserContext.Provider>  
    </BrowserRouter>  
  );
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(
    <BrowserRouter>
      <UserContext.Provider value={{currentUser: user}}>
        <ReviewCard userReview={{}} />
      </UserContext.Provider>  
    </BrowserRouter>     
  );
  expect(asFragment).toMatchSnapshot()
});