import React from 'react';
import {render} from '@testing-library/react';
import ReviewList from '../reviews/ReviewList';

// Smoke test 
it('should render without crashing', function() {
  render(<ReviewList />);
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(<ReviewList />);
  expect(asFragment).toMatchSnapshot()
});