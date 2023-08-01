import React from 'react';
import {render} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LunchCard from '../lunches/LunchCard';

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
      <LunchCard lunch={{}} reviews={{reviews}} setLunchReviews={jest.fn()} initialState={true} isfavorited={jest.fn()} addFavorite={jest.fn()} removeFavorite={jest.fn()} />
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