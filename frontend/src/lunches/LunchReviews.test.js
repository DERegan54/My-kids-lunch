import React from 'react';
import {render} from '@testing-library/react';
import { BrowserRouter as Router} from 'react-router-dom';
import UserContext from '../users/UserContext';
import LunchReviews from '../lunches/LunchReviews';


describe('LunchReviews Component tests', () => {
jest.mock('../users/UserContext')

const mockLunchReviews = [
  {
    reviewText: "Delicious!",
    username: "testuser1",
    lunchId: "1"
  }
]

  // Smoke test
  it('should render without crashing', function() {
    render(
      <Router>
        <LunchReviews lunchReview={mockLunchReviews} />
      </Router>
    );
  });

  // Snapshot test
  it('should match snapshot', () => {
    const {asFragment} = render(
      <Router>
        <LunchReviews reviewText="Delicious" username="testuser1" lunchId="1" />
      </Router>  
    );
    expect(asFragment()).toMatchSnapshot()
  });
});